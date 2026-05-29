// Frontend-only auth stub. Mirrors the Supabase Auth API surface so we can
// swap to `@supabase/supabase-js` after deploy without touching UI code.
//
// TODO(supabase): replace every function below with the equivalent
// `supabase.auth.*` call. Sign-up should rely on Supabase's email confirmation
// (set `emailRedirectTo: ${window.location.origin}/verify`).

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
  emailVerified: boolean;
};

export type AuthResponse = { user: AuthUser | null; error: string | null };

type StoredUser = AuthUser & { password: string };

const USERS_KEY = "eme.users";
const SESSION_KEY = "eme.session";
const PENDING_KEY = "eme.pendingVerification";

const isBrowser = () => typeof window !== "undefined";

function readUsers(): StoredUser[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  if (!isBrowser()) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function publicUser(u: StoredUser): AuthUser {
  return { id: u.id, email: u.email, fullName: u.fullName, emailVerified: u.emailVerified };
}

export function getCurrentUser(): AuthUser | null {
  if (!isBrowser()) return null;
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function getPendingVerificationEmail(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(PENDING_KEY);
}

export async function signUpWithPassword(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<AuthResponse & { needsVerification?: boolean }> {
  const { fullName, email, password } = input;
  if (!fullName || !email || !password) {
    return { user: null, error: "All fields are required." };
  }
  if (password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters." };
  }
  const users = readUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { user: null, error: "Email is already registered." };
  }
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    email,
    fullName,
    password,
    emailVerified: false,
  };
  users.push(newUser);
  writeUsers(users);
  localStorage.setItem(PENDING_KEY, email);
  // TODO(supabase): Supabase will send the verification email automatically.
  return { user: publicUser(newUser), error: null, needsVerification: true };
}

export async function signInWithPassword(input: {
  email: string;
  password: string;
}): Promise<AuthResponse & { needsVerification?: boolean }> {
  const { email, password } = input;
  if (!email || !password) return { user: null, error: "Email and password are required." };
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return { user: null, error: "Invalid email or password." };
  }
  if (!user.emailVerified) {
    localStorage.setItem(PENDING_KEY, user.email);
    return {
      user: null,
      error: "Please verify your email before signing in. Check your inbox for the link.",
      needsVerification: true,
    };
  }
  const pub = publicUser(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(pub));
  return { user: pub, error: null };
}

export async function verifyEmail(email: string): Promise<AuthResponse> {
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { user: null, error: "No account found for this email." };
  user.emailVerified = true;
  writeUsers(users);
  const pub = publicUser(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(pub));
  localStorage.removeItem(PENDING_KEY);
  return { user: pub, error: null };
}

export async function resendVerification(email: string): Promise<{ error: string | null }> {
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { error: "No account found for this email." };
  localStorage.setItem(PENDING_KEY, email);
  // TODO(supabase): supabase.auth.resend({ type: 'signup', email })
  return { error: null };
}

export async function signOut(): Promise<void> {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  // TODO(supabase): supabase.auth.signInWithOAuth({ provider: 'google' })
  const email = "demo.doctor@google.com";
  const users = readUsers();
  let user = users.find((u) => u.email === email);
  if (!user) {
    user = {
      id: crypto.randomUUID(),
      email,
      fullName: "Dr. Demo (Google)",
      password: crypto.randomUUID(),
      emailVerified: true,
    };
    users.push(user);
    writeUsers(users);
  }
  const pub = publicUser(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(pub));
  return { user: pub, error: null };
}
