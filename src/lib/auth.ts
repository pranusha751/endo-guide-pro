import { createServerFn } from "@tanstack/react-start";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
};

export type AuthResponse = {
  user: AuthUser | null;
  error: string | null;
  message?: string | null;
};

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-endo-guide";

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";
  return createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ─── Get Current User ─────────────────────────────────────────────────────────

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("auth_token");
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("User")
      .select("id, email, fullName")
      .eq("id", decoded.userId)
      .single();

    if (error || !data) return null;
    return { id: data.id, email: data.email, fullName: data.fullName } as AuthUser;
  } catch {
    return null;
  }
});

// ─── Sign Up ──────────────────────────────────────────────────────────────────

export const signUpWithPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { fullName: string; email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthResponse> => {
    try {
      const supabase = getSupabaseClient();

      // Check if user already exists
      const { data: existing } = await supabase
        .from("User")
        .select("id")
        .eq("email", data.email)
        .maybeSingle();

      if (existing) {
        return { user: null, error: "Email already in use." };
      }

      const passwordHash = await bcrypt.hash(data.password, 10);
      const verificationToken = Math.random().toString(36).substring(2, 15);

      const now = new Date().toISOString();
      const { error } = await supabase.from("User").insert({
        id: crypto.randomUUID(),
        email: data.email,
        fullName: data.fullName,
        passwordHash,
        verificationToken,
        isEmailVerified: true,
        createdAt: now,
        updatedAt: now,
      });

      if (error) {
        console.error("Signup insert error:", error);
        return { user: null, error: error.message };
      }

      return {
        user: null,
        error: null,
        message: "Account created successfully. You can now log in.",
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      return { user: null, error: msg };
    }
  });

// ─── Sign In ──────────────────────────────────────────────────────────────────

export const signInWithPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthResponse> => {
    try {
      const supabase = getSupabaseClient();

      const { data: user, error } = await supabase
        .from("User")
        .select("id, email, fullName, passwordHash, isEmailVerified")
        .eq("email", data.email)
        .single();

      if (error || !user) {
        return { user: null, error: "Invalid email or password." };
      }

      const isMatch = await bcrypt.compare(data.password, user.passwordHash);
      if (!isMatch) {
        return { user: null, error: "Invalid email or password." };
      }

      if (!user.isEmailVerified) {
        return {
          user: null,
          error:
            "Please verify your email before logging in. If you didn't receive an email, click the button below to resend it.",
        };
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

      setCookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return { user: { id: user.id, email: user.email, fullName: user.fullName }, error: null };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      return { user: null, error: msg };
    }
  });

// ─── Resend Verification ───────────────────────────────────────────────────────

export const resendVerificationEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<{ error: string | null; message: string | null }> => {
    try {
      const supabase = getSupabaseClient();
      const { data: user } = await supabase
        .from("User")
        .select("id, isEmailVerified")
        .eq("email", data.email)
        .maybeSingle();

      if (!user) return { error: "User not found.", message: null };
      if (user.isEmailVerified) return { error: "Email is already verified.", message: null };
      return { error: null, message: "Verification email resent successfully! (Simulation)" };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      return { error: msg, message: null };
    }
  });

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("auth_token", { path: "/" });
});

// ─── Google Sign-In (placeholder) ────────────────────────────────────────────

export const signInWithGoogle = createServerFn({ method: "POST" })
  .inputValidator((data?: { email?: string }) => data || {})
  .handler(async (): Promise<AuthResponse> => {
    return { user: null, error: "Google sign-in is not configured yet." };
  });
