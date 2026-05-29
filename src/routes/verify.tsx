import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/verify")({
  component: VerifyRoute,
});

function VerifyRoute() {
  const navigate = useNavigate();
  const [state, setState] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // Supabase puts tokens in the URL hash on confirmation links.
      // detectSessionInUrl (default) processes them automatically; we just
      // wait briefly then check the resulting session.
      try {
        const hash = typeof window !== "undefined" ? window.location.hash : "";
        if (hash.includes("error")) {
          const params = new URLSearchParams(hash.replace(/^#/, ""));
          const desc = params.get("error_description") ?? params.get("error") ?? "Verification failed.";
          if (!cancelled) {
            setState("error");
            setMessage(desc.replace(/\+/g, " "));
          }
          return;
        }

        // Give Supabase a tick to process the URL hash if present.
        await new Promise((r) => setTimeout(r, 250));
        const { data, error } = await supabase.auth.getUser();
        if (cancelled) return;

        if (error || !data.user) {
          setState("error");
          setMessage(
            "We couldn't verify this link. It may have expired or already been used. Try signing in or request a new link.",
          );
          return;
        }

        if (!data.user.email_confirmed_at) {
          setState("error");
          setMessage("Email not confirmed yet. Please click the link in your inbox.");
          return;
        }

        setState("success");
        setTimeout(() => navigate({ to: "/workflow" }), 1200);
      } catch (e) {
        if (!cancelled) {
          setState("error");
          setMessage(e instanceof Error ? e.message : "Verification failed.");
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="flex flex-1 items-center justify-center p-6 min-h-screen bg-background">
      <div className="text-center space-y-4 max-w-xs">
        {state === "verifying" && (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Verifying your email…</h2>
            <p className="text-muted-foreground text-sm">Hang tight, almost done.</p>
          </>
        )}
        {state === "success" && (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Email verified</h2>
            <p className="text-muted-foreground text-sm">Redirecting to your workflow…</p>
          </>
        )}
        {state === "error" && (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold">Verification failed</h2>
            <p className="text-muted-foreground text-sm">{message}</p>
            <Button asChild>
              <Link to="/login">Back to login</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
