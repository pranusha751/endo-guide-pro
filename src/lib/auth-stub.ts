// Auth stub — Supabase-ready interface.
// When ready to integrate Supabase, replace these functions with real
// `supabase.auth.signInWithPassword`, `supabase.auth.signUp`, etc.
// The component code does not need to change — only this file.

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
};

export type AuthResponse = {
  user: AuthUser | null;
  error: string | null;
};

const STORAGE_KEY = "endo_made_easy_user";

function persist(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

// TODO(supabase): replace with
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
export async function signInWithPassword(
  email: string,
  password: string,
): Promise<AuthResponse> {
  await new Promise((r) => setTimeout(r, 400));
  if (!email || !password) {
    return { user: null, error: "Email and password are required." };
  }
  if (password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters." };
  }
  const user: AuthUser = { id: crypto.randomUUID(), email };
  persist(user);
  return { user, error: null };
}

// TODO(supabase): replace with
//   const { data, error } = await supabase.auth.signUp({
//     email, password,
//     options: { emailRedirectTo: `${window.location.origin}/workflow`, data: { full_name: fullName } }
//   });
export async function signUpWithPassword(
  fullName: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  await new Promise((r) => setTimeout(r, 400));
  if (!fullName || !email || !password) {
    return { user: null, error: "All fields are required." };
  }
  if (password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters." };
  }
  const user: AuthUser = { id: crypto.randomUUID(), email, fullName };
  persist(user);
  return { user, error: null };
}

// TODO(supabase): replace with `await supabase.auth.signOut();`
export async function signOut(): Promise<void> {
  persist(null);
}

// TODO(supabase): replace with
//   await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `${window.location.origin}/reset-password`
//   });
export async function requestPasswordReset(email: string): Promise<AuthResponse> {
  await new Promise((r) => setTimeout(r, 300));
  if (!email) return { user: null, error: "Email is required." };
  return { user: null, error: null };
}
