import { createServerFn } from "@tanstack/react-start";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";

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

const BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:4000";

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("auth_token");
  if (!token) return null;

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      return (await res.json()) as AuthUser;
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
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        return { user: null, error: errData?.error || "Invalid email or password." };
      }

      const result = await res.json();
      const authUser: AuthUser = { id: result.id, email: result.email, fullName: result.fullName };

      setCookie("auth_token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return { user: authUser, error: null };
    } catch (error) {
      return { user: null, error: "Network error. Is the backend running?" };
    }
  });

export const signUpWithPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { fullName: string; email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthResponse> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const errorMsg = Array.isArray(errData?.error)
          ? errData.error.map((e: { message: string }) => e.message).join(", ")
          : errData?.error || "Registration failed.";
        return { user: null, error: errorMsg };
      }

      const result = await res.json();

      // Do not set cookie or return user on signup since they need to verify email
      return { user: null, error: null, message: result.message };
    } catch (error) {
      return { user: null, error: "Network error. Is the backend running?" };
    }
  });

export const resendVerificationEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<{ error: string | null; message: string | null }> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        return { error: errData?.error || "Failed to resend verification.", message: null };
      }

      const result = await res.json();
      return { error: null, message: result.message };
    } catch (error) {
      return { error: "Network error. Is the backend running?", message: null };
    }
  });

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  try {
    await fetch(`${BACKEND_URL}/api/auth/logout`, { method: "POST" });
  } catch (error) {
    // Ignore error on logout
  }
  deleteCookie("auth_token", { path: "/" });
});

export const signInWithGoogle = createServerFn({ method: "POST" })
  .inputValidator((data?: { email?: string }) => data || {})
  .handler(async ({ data }): Promise<AuthResponse> => {
    return { user: null, error: "Google sign-in is not configured on the backend yet." };
  });
