import { createServerFn } from "@tanstack/react-start";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { saveUser, getUserByEmail, User } from "../server/db";

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
};

export type AuthResponse = {
  user: AuthUser | null;
  error: string | null;
};

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "endo-guide-pro-super-secret-jwt-key-2026",
);

async function createToken(user: AuthUser) {
  return await new SignJWT({ id: user.id, email: user.email, fullName: user.fullName })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      email: payload.email as string,
      fullName: payload.fullName as string | undefined,
    };
  } catch {
    return null;
  }
}

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("auth_token");
  if (!token) return null;
  return await verifyToken(token);
});

export const signInWithPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthResponse> => {
    if (!data.email || !data.password) {
      return { user: null, error: "Email and password are required." };
    }

    const user = await getUserByEmail(data.email);
    if (!user) {
      return { user: null, error: "Invalid email or password." };
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      return { user: null, error: "Invalid email or password." };
    }

    const authUser: AuthUser = { id: user.id, email: user.email, fullName: user.fullName };
    const token = await createToken(authUser);

    setCookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { user: authUser, error: null };
  });

export const signUpWithPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { fullName: string; email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthResponse> => {
    if (!data.fullName || !data.email || !data.password) {
      return { user: null, error: "All fields are required." };
    }
    if (data.password.length < 6) {
      return { user: null, error: "Password must be at least 6 characters." };
    }

    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return { user: null, error: "Email is already registered." };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      fullName: data.fullName,
      passwordHash,
    };

    await saveUser(newUser);

    const authUser: AuthUser = { id: newUser.id, email: newUser.email, fullName: newUser.fullName };
    const token = await createToken(authUser);

    setCookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { user: authUser, error: null };
  });

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("auth_token", { path: "/" });
});

export const signInWithGoogle = createServerFn({ method: "POST" })
  .inputValidator((data?: { email?: string }) => data || {})
  .handler(async ({ data }): Promise<AuthResponse> => {
    // Mocked for now since real Google OAuth requires a client ID and secret
    const email = data?.email || "doctor@google.com";

    let user = await getUserByEmail(email);
    if (!user) {
      user = {
        id: crypto.randomUUID(),
        email,
        fullName: `Dr. ${email.split("@")[0]}`,
        passwordHash: await bcrypt.hash(crypto.randomUUID(), 10), // Random password
      };
      await saveUser(user);
    }

    const authUser: AuthUser = { id: user.id, email: user.email, fullName: user.fullName };
    const token = await createToken(authUser);

    setCookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { user: authUser, error: null };
  });
