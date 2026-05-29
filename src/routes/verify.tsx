import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/lib/auth-stub";

const searchSchema = z.object({
  email: z.string().optional(),
});

export const Route = createFileRoute("/verify")({
  validateSearch: searchSchema,
  component: VerifyRoute,
});

function VerifyRoute() {
  const navigate = useNavigate();
  const { email } = Route.useSearch();
  const [state, setState] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) {
      setState("error");
      setMessage("Missing verification token.");
      return;
    }
    verifyEmail(email).then((res) => {
      if (res.error || !res.user) {
        setState("error");
        setMessage(res.error ?? "Verification failed.");
        return;
      }
      setState("success");
      setTimeout(() => navigate({ to: "/workflow" }), 1500);
    });
  }, [email, navigate]);

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
