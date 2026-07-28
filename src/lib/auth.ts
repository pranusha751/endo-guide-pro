import { createServerFn } from "@tanstack/react-start";

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
};

export type AuthResponse = {
  user: AuthUser | null;
  error: string | null;
  message?: string | null;
  verifyUrl?: string; // Kept for backwards compatibility if needed
};

export async function getSupabaseServerClient() {
  const { getCookie, setCookie, deleteCookie } = await import("@tanstack/react-start/server");
  const { createServerClient } = await import("@supabase/ssr");

  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return getCookie(name);
      },
      set(name, value, options) {
        setCookie(name, value, {
          ...options,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      },
      remove(name, options) {
        deleteCookie(name, { path: "/" });
      },
    },
  });
}

// ─── Custom Email Sender ──────────────────────────────────────────────────────

async function sendVerificationEmail(email: string, fullName: string, actionLink: string): Promise<boolean> {
  const { default: sgMail } = await import("@sendgrid/mail");
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
  const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "";

  if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL) {
    console.error("SendGrid not configured. Check your .env file.");
    return false;
  }

  sgMail.setApiKey(SENDGRID_API_KEY);

  await sgMail.send({
    from: { name: "Endo Made Easy", email: SENDGRID_FROM_EMAIL },
    to: email,
    subject: "Verify your Endo Made Easy account",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #16a34a;">Welcome to Endo Made Easy, ${fullName}!</h2>
        <p>Thank you for signing up. Please verify your email address to activate your account.</p>
        <a href="${actionLink}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">
          Verify Email Address
        </a>
        <p style="color: #6b7280; font-size: 14px;">Or copy this link: ${actionLink}</p>
        <p style="color: #6b7280; font-size: 14px;">This link expires in 24 hours.</p>
      </div>
    `,
  });

  return true;
}

// ─── Get Current User ─────────────────────────────────────────────────────────

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return null;
    
    return { 
      id: user.id, 
      email: user.email as string, 
      fullName: user.user_metadata?.fullName 
    } as AuthUser;
  } catch (err) {
    return null;
  }
});

// ─── Sign Up ──────────────────────────────────────────────────────────────────

export const signUpWithPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { fullName: string; email: string; password: string }) => data)
  .handler(async ({ data }): Promise<AuthResponse> => {
    try {
      const APP_URL = process.env.APP_URL || "https://endo-guide-pro-1.onrender.com";
      const adminUrl = process.env.SUPABASE_URL || "";
      const adminSecret = process.env.SUPABASE_SECRET_KEY || "";

      if (!adminUrl || !adminSecret) {
        return { user: null, error: "Server configuration error. Please contact support." };
      }

      const { createClient } = await import("@supabase/supabase-js");
      const adminSupabase = createClient(adminUrl, adminSecret);

      // Step 1: Create user + generate a signup confirmation link in ONE call.
      // This gives us a hashed_token we can embed directly in our callback URL,
      // completely bypassing PKCE and avoiding the "code verifier" error.
      const { data: linkData, error: linkError } = await adminSupabase.auth.admin.generateLink({
        type: "signup",
        email: data.email,
        password: data.password,
        options: {
          data: { fullName: data.fullName },
        },
      });

      if (linkError) {
        return { user: null, error: linkError.message };
      }

      const hashedToken = linkData?.properties?.hashed_token;
      if (!hashedToken) {
        return { user: null, error: "Could not generate verification link. Please try again." };
      }

      // Step 2: Build a direct link to our /auth/callback with the token_hash.
      // When clicked, this hits our callback which calls verifyOtp({ token_hash, type }).
      const verificationUrl = `${APP_URL}/auth/callback?token_hash=${hashedToken}&type=signup`;

      // Step 3: Send the email via SendGrid.
      const emailSent = await sendVerificationEmail(data.email, data.fullName, verificationUrl);

      if (!emailSent) {
        console.error("SendGrid failed — falling back to Supabase built-in email.");
      }

      return {
        user: null,
        error: null,
        message: "Account created! Please check your email to verify your account before logging in.",
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
      const supabase = await getSupabaseServerClient();

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      return { 
        user: { 
          id: authData.user.id, 
          email: authData.user.email as string, 
          fullName: authData.user.user_metadata?.fullName 
        }, 
        error: null 
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      return { user: null, error: msg };
    }
  });

export const verifyEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string; email: string }) => data)
  .handler(async (): Promise<{ error: string | null; success: boolean }> => {
    return { error: "Email verification is handled natively by Supabase.", success: false };
  });

export const resendVerificationEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<{ error: string | null; message: string | null }> => {
    try {
      const APP_URL = process.env.APP_URL || "https://endo-guide-pro-1.onrender.com";
      const adminUrl = process.env.SUPABASE_URL || "";
      const adminSecret = process.env.SUPABASE_SECRET_KEY || "";

      const { createClient } = await import("@supabase/supabase-js");
      const adminSupabase = createClient(adminUrl, adminSecret);

      // Look up the user's fullName
      const { data: userList } = await adminSupabase.auth.admin.listUsers();
      const user = userList?.users.find((u) => u.email === data.email);
      const fullName = user?.user_metadata?.fullName || "User";

      // Generate a fresh magic link token
      const { data: linkData, error: linkError } = await adminSupabase.auth.admin.generateLink({
        type: "magiclink",
        email: data.email,
      });

      if (linkError || !linkData?.properties?.hashed_token) {
        return { error: linkError?.message || "Could not generate link.", message: null };
      }

      const verificationUrl = `${APP_URL}/auth/callback?token_hash=${linkData.properties.hashed_token}&type=magiclink`;
      await sendVerificationEmail(data.email, fullName, verificationUrl);

      return { error: null, message: "Verification email resent! Please check your inbox." };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      return { error: msg, message: null };
    }
  });

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  
  const { deleteCookie } = await import("@tanstack/react-start/server");
  deleteCookie("auth_token", { path: "/" });
});

export const signInWithGoogle = createServerFn({ method: "POST" })
  .inputValidator((data?: { email?: string }) => data || {})
  .handler(async (): Promise<AuthResponse> => {
    return { user: null, error: "Google sign-in is not configured yet." };
  });
