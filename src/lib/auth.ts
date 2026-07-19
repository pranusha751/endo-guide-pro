import { createServerFn } from "@tanstack/react-start";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";
import prisma from "./db";
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

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("auth_token");
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    
    if (user) {
      return { id: user.id, email: user.email, fullName: user.fullName } as AuthUser;
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
  return null;
});

export const signInWithPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthResponse> => {
    try {
      const user = await prisma.user.findUnique({ where: { email: data.email } });
      if (!user) {
        return { user: null, error: "Invalid email or password." };
      }

      const isMatch = await bcrypt.compare(data.password, user.passwordHash);
      if (!isMatch) {
        return { user: null, error: "Invalid email or password." };
      }

      if (!user.isEmailVerified) {
        return { user: null, error: "Please verify your email before logging in. If you didn't receive an email, click the button below to resend it." };
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

      setCookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return { user: { id: user.id, email: user.email, fullName: user.fullName }, error: null };
    } catch (error) {
      return { user: null, error: "Database connection error." };
    }
  });

export const signUpWithPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { fullName: string; email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthResponse> => {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingUser) {
        return { user: null, error: "Email already in use." };
      }

      const passwordHash = await bcrypt.hash(data.password, 10);
      const verificationToken = Math.random().toString(36).substring(2, 15);

      await prisma.user.create({
        data: {
          email: data.email,
          fullName: data.fullName,
          passwordHash,
          verificationToken,
          isEmailVerified: true, // Auto verify for now in dev/prod transition
        },
      });

      return { user: null, error: null, message: "Account created successfully. You can now log in." };
    } catch (error) {
      return { user: null, error: "Database connection error." };
    }
  });

export const resendVerificationEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<{ error: string | null; message: string | null }> => {
    try {
      const user = await prisma.user.findUnique({ where: { email: data.email } });
      if (!user) {
        return { error: "User not found.", message: null };
      }
      if (user.isEmailVerified) {
        return { error: "Email is already verified.", message: null };
      }
      // Pretend to send email
      return { error: null, message: "Verification email resent successfully! (Simulation)" };
    } catch (error) {
      return { error: "Database connection error.", message: null };
    }
  });

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("auth_token", { path: "/" });
});

export const signInWithGoogle = createServerFn({ method: "POST" })
  .inputValidator((data?: { email?: string }) => data || {})
  .handler(async ({ data }): Promise<AuthResponse> => {
    return { user: null, error: "Google sign-in is not configured yet." };
  });
