import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartPulse, Loader2, MailCheck, AlertCircle } from "lucide-react";
import { signInWithPassword, resendVerificationEmail } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";

const loginSearchSchema = z.object({
  verified: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showResend, setShowResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(
    search.verified === "true"
      ? "Account created! Please check your email and click the verification link to activate your account."
      : search.verified === "check-email"
        ? "Please check your email and click the verification link before logging in."
        : null,
  );
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setShowResend(false);
    setResendMsg(null);
    setLoading(true);
    try {
      const res = await signInWithPassword({
        data: { email, password },
      });

      if (res.error) {
        setError(res.error);
        // Show resend button if the error is about email verification
        if (res.error.toLowerCase().includes("not verified") || res.error.toLowerCase().includes("verification")) {
          setShowResend(true);
        }
        return;
      }
      navigate({ to: "/workflow" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred during login.";
      setError(msg === "{}" ? "An unexpected error occurred. Please try again." : msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError("Please enter your email address above first.");
      return;
    }
    setResendLoading(true);
    setResendMsg(null);
    try {
      const res = await resendVerificationEmail({ data: { email } });
      if (res.error) {
        setResendMsg(res.error);
      } else {
        setResendMsg(res.message || "Verification email sent! Check your inbox.");
      }
    } catch {
      setResendMsg("Failed to resend email. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 overflow-y-auto">
      <Card className="w-full max-w-sm rounded-2xl shadow-sm border-0 sm:border">
        <CardHeader className="space-y-2 text-center">
          <div className="mb-2 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <HeartPulse className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to continue your endodontic workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@clinic.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showResend && (
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-sm"
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                >
                  {resendLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Resend Verification Email
                </Button>
                {resendMsg && (
                  <p className="text-sm text-center text-muted-foreground">{resendMsg}</p>
                )}
              </div>
            )}

            {info && (
              <Alert>
                <MailCheck className="h-4 w-4 text-emerald-500" />
                <AlertTitle className="text-emerald-500">Check Your Email</AlertTitle>
                <AlertDescription className="text-emerald-600">{info}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
