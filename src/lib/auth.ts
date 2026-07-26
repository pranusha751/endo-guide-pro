import { createServerFn } from "@tanstack/react-start";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
};

export type AuthResponse = {
  user: AuthUser | null;
  error: string | null;
  message?: string | null;
  verifyUrl?: string;
};

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-endo-guide";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const APP_URL = process.env.APP_URL || "https://endo-guide-pro-1.onrender.com";

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";
  return createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function sendVerificationEmail(email: string, fullName: string, token: string): Promise<boolean> {
  const verifyUrl = `${APP_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Endo Made Easy <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your Endo Made Easy account",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #16a34a;">Welcome to Endo Made Easy, ${fullName}!</h2>
          <p>Thank you for signing up. Please verify your email address to activate your account.</p>
          <a href="${verifyUrl}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">
            Verify Email Address
          </a>
          <p style="color: #6b7280; font-size: 14px;">Or copy this link: ${verifyUrl}</p>
          <p style="color: #6b7280; font-size: 14px;">This link expires in 24 hours.</p>
        </div>
      `,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
  return true;
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
        .select("id, isEmailVerified")
        .eq("email", data.email)
        .maybeSingle();

      if (existing) {
        if (!existing.isEmailVerified) {
          return {
            user: null,
            error: "An account with this email exists but is not verified. Please check your inbox or request a new verification email.",
          };
        }
        return { user: null, error: "An account with this email already exists. Please log in." };
      }

      const passwordHash = await bcrypt.hash(data.password, 10);
      const verificationToken = randomUUID();
      const now = new Date().toISOString();

      const { error } = await supabase.from("User").insert({
        id: randomUUID(),
        email: data.email,
        fullName: data.fullName,
        passwordHash,
        verificationToken,
        isEmailVerified: false,
        createdAt: now,
        updatedAt: now,
      });

      if (error) {
        console.error("Signup insert error:", error);
        const msg = (error as any).message || JSON.stringify(error);
        return { user: null, error: msg || "Failed to create account. Please try again." };
      }

      const verifyUrl = `${APP_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(data.email)}`;

      // Send verification email via Resend (best effort — may fail on free plan for non-owner emails)
      let emailSent = false;
      try {
        const emailRes = await sendVerificationEmail(data.email, data.fullName, verificationToken);
        emailSent = true;
      } catch (emailErr) {
        console.error("Failed to send verification email:", emailErr);
      }

      return {
        user: null,
        error: null,
        message: emailSent
          ? "Account created! Please check your email to verify your account before logging in."
          : "Account created! Click the button below to verify your email and activate your account.",
        verifyUrl: emailSent ? undefined : verifyUrl,
      };
    } catch (err) {
      console.error("Signup unexpected error:", err);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      return { user: null, error: msg === "{}" ? "An unexpected server error occurred. Please try again." : msg };
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
          error: "Your email is not verified yet. Please check your inbox and click the verification link.",
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
      console.error("Login unexpected error:", err);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      return { user: null, error: msg === "{}" ? "An unexpected server error occurred. Please try again." : msg };
    }
  });

// ─── Verify Email ──────────────────────────────────────────────────────────────

export const verifyEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string; email: string }) => data)
  .handler(async ({ data }): Promise<{ error: string | null; success: boolean }> => {
    try {
      const supabase = getSupabaseClient();

      const { data: user, error } = await supabase
        .from("User")
        .select("id, verificationToken, isEmailVerified")
        .eq("email", data.email)
        .maybeSingle();

      if (error || !user) {
        return { error: "User not found.", success: false };
      }

      if (user.isEmailVerified) {
        return { error: null, success: true }; // Already verified
      }

      if (user.verificationToken !== data.token) {
        return { error: "Invalid or expired verification link.", success: false };
      }

      const { error: updateError } = await supabase
        .from("User")
        .update({ isEmailVerified: true, verificationToken: null, updatedAt: new Date().toISOString() })
        .eq("id", user.id);

      if (updateError) {
        return { error: "Failed to verify email. Please try again.", success: false };
      }

      return { error: null, success: true };
    } catch (err) {
      console.error("Email verification error:", err);
      return { error: "An unexpected error occurred during verification.", success: false };
    }
  });

// ─── Resend Verification Email ────────────────────────────────────────────────

export const resendVerificationEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<{ error: string | null; message: string | null }> => {
    try {
      const supabase = getSupabaseClient();

      const { data: user } = await supabase
        .from("User")
        .select("id, fullName, isEmailVerified, verificationToken")
        .eq("email", data.email)
        .maybeSingle();

      if (!user) return { error: "No account found with this email.", message: null };
      if (user.isEmailVerified) return { error: "This email is already verified. You can log in.", message: null };

      // Generate new token
      const newToken = randomUUID();
      await supabase
        .from("User")
        .update({ verificationToken: newToken, updatedAt: new Date().toISOString() })
        .eq("id", user.id);

      await sendVerificationEmail(data.email, user.fullName || "User", newToken);

      return { error: null, message: "Verification email resent! Please check your inbox." };
    } catch (err) {
      console.error("Resend verification error:", err);
      return { error: "Failed to resend verification email. Please try again.", message: null };
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
