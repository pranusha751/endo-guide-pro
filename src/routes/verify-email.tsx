import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type VerifyEmailSearch = {
  token: string;
};

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, unknown>): VerifyEmailSearch => {
    return {
      token: (search.token as string) || "",
    };
  },
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email address...");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email successfully verified!");
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed. The link may have expired.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Network error. Could not reach the server.");
      }
    };

    verifyToken();
  }, [token, BACKEND_URL]);

  return (
    <div className="flex flex-1 items-center justify-center p-6 overflow-y-auto">
      <Card className="w-full max-w-sm rounded-2xl shadow-sm border-0 sm:border">
        <CardHeader className="space-y-2 text-center">
          <div className="mb-2 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              {status === "loading" && <Loader2 className="h-6 w-6 text-primary animate-spin" />}
              {status === "success" && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
              {status === "error" && <XCircle className="h-6 w-6 text-destructive" />}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription className="text-sm pt-2">{message}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {status !== "loading" && (
            <Button onClick={() => navigate({ to: "/login" })} className="w-full mt-4">
              Go to Login
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
