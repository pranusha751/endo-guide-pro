import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { createServerClient } from "@supabase/ssr";

export type AuthUser = {
  id: string;
  email: string;
  fullName?: string;
};

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
  
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return getCookie(name);
      },
      set(name: string, value: string, options: any) {
        setCookie(name, value, { ...options, path: "/" });
      },
      remove(name: string, options: any) {
        setCookie(name, "", { ...options, path: "/", maxAge: 0 });
      },
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;
  
  return { 
    id: user.id, 
    email: user.email, 
    fullName: user.user_metadata?.fullName 
  } as AuthUser;
});

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  // Client-side supabase.auth.signOut() handles session removal.
  // The server function is kept as a stub to avoid breaking existing calls.
});
