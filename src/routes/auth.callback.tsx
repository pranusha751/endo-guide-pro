import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackComponent,
});

function AuthCallbackComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const token_hash = params.get("token_hash");
      const type = params.get("type") as "signup" | "recovery" | "email" | "magiclink" | null;
      const code = params.get("code");

      // --- Flow 1: Email confirmation / Magic link (token_hash + type) ---
      if (token_hash && type) {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash,
          type,
        });

        if (verifyError) {
          setError(verifyError.message);
        } else {
          navigate({ to: "/workflow" });
        }
        return;
      }

      // --- Flow 2: OAuth / PKCE (code in URL) ---
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
          window.location.href,
        );
        if (exchangeError) {
          setError(exchangeError.message);
        } else {
          navigate({ to: "/workflow" });
        }
        return;
      }

      // --- Flow 3: Already has a session (e.g. page refresh) ---
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setError(sessionError.message);
        return;
      }
      if (data.session) {
        navigate({ to: "/workflow" });
      } else {
        setError("No authentication parameters found. Please try signing up again.");
      }
    };

    handleCallback();
  }, [navigate]);

    if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-foreground">Authentication Failed</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Authenticating…</p>
      </div>
    </div>
  );
}
