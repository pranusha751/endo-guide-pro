import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HeartPulse, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { verifyEmail } from "@/lib/auth";
import { z } from "zod";

const verifySearchSchema = z.object({
  token: z.string().optional(),
  email: z.string().optional(),
});

export const Route = createFileRoute("/verify-email")({
  validateSearch: verifySearchSchema,
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!search.token || !search.email) {
        setStatus("error");
        setMessage("Invalid verification link. Please check your email and try again.");
        return;
      }

      try {
        const res = await verifyEmail({
          data: { token: search.token, email: search.email },
        });

        if (res.success) {
          setStatus("success");
          setMessage("Your email has been verified successfully! You can now log in.");
          setTimeout(() => navigate({ to: "/login", search: { verified: "true" } }), 3000);
        } else {
          setStatus("error");
          setMessage(res.error || "Verification failed. Please try again.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verify();
  }, [search.token, search.email]);

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="text-center max-w-sm w-full space-y-6">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <HeartPulse className="h-8 w-8 text-primary" />
          </div>
        </div>

        {status === "loading" && (
          <>
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-14 w-14 mx-auto text-emerald-500" />
            <h2 className="text-2xl font-bold text-emerald-600">Email Verified!</h2>
            <p className="text-muted-foreground">{message}</p>
            <p className="text-sm text-muted-foreground">Redirecting to login in 3 seconds...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="h-14 w-14 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold text-destructive">Verification Failed</h2>
            <p className="text-muted-foreground">{message}</p>
            <button
              onClick={() => navigate({ to: "/login" })}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
