import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || "";

/**
 * Returns a server-side Supabase client.
 * Uses the secret (service_role) key if valid, otherwise falls back to publishable key.
 * All communication happens over HTTPS — no direct TCP database connection needed.
 */
export function createAdminClient() {
  // Use secret key only if it looks valid (not masked bullet characters)
  const hasValidSecret =
    supabaseSecretKey.length > 30 && !supabaseSecretKey.includes("\u2022");

  const key = hasValidSecret ? supabaseSecretKey : supabasePublishableKey;

  return createClient(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Returns a server-side Supabase client using the publishable key.
 * Use this for standard auth operations (signUp, signInWithPassword).
 */
export function createPublicClient() {
  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
