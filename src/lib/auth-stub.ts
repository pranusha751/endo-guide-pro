// Auth wrapper around Lovable Cloud (Supabase Auth).
// Email verification is enabled — users receive a real email with a link
// that brings them back to /verify, which finalizes the session.
import { supabase } from "@/integrations/supabase/client";

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
  emailVerified: boolean;
};

export type AuthResponse = {
  user: AuthUser | null;
  error: string | null;
  needsVerification?: boolean;
};

function getRedirectUrl() {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}/verify`;
}

function toAuthUser(u: { id: string; email?: string | null; user_metadata?: Record<string, unknown>; email_confirmed_at?: string | null } | null): AuthUser | null {
  if (!u) return null;
  return {
    id: u.id,
    email: u.email ?? "",
    fullName: (u.user_metadata?.full_name as string | undefined) ?? undefined,
    emailVerified: !!u.email_confirmed_at,
  };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data } = await supabase.auth.getUser();
  return toAuthUser(data.user as any);
}

export async function signUpWithPassword(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const { fullName, email, password } = input;
  if (!fullName || !email || !password) {
    return { user: null, error: "All fields are required." };
  }
  if (password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters." };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: getRedirectUrl(),
      data: { full_name: fullName },
    },
  });
  if (error) return { user: null, error: error.message };
  const user = toAuthUser(data.user as any);
  // With email confirmation on, session is null until the user clicks the link.
  return { user, error: null, needsVerification: !data.session };
}

export async function signInWithPassword(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const { email, password } = input;
  if (!email || !password) return { user: null, error: "Email and password are required." };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const needsVerification = /confirm|verify/i.test(error.message);
    return { user: null, error: error.message, needsVerification };
  }
  return { user: toAuthUser(data.user as any), error: null };
}

export async function resendVerification(email: string): Promise<{ error: string | null }> {
  if (!email) return { error: "Email is required." };
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: getRedirectUrl() },
  });
  return { error: error?.message ?? null };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  const redirectUrl =
    typeof window !== "undefined" ? `${window.location.origin}/workflow` : undefined;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: redirectUrl },
  });
  if (error) return { user: null, error: error.message };
  // Browser is redirecting; nothing to return synchronously.
  return { user: null, error: null };
}

// Called by /verify after Supabase has set the session from the email link.
export async function verifyEmail(): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { user: null, error: error?.message ?? "Verification session not found." };
  }
  return { user: toAuthUser(data.user as any), error: null };
}
