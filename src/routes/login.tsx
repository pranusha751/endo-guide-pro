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
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await signInWithPassword({ data: { email, password } });
      if (res.error || !res.user) {
        setError(res.error ?? "Unable to sign in.");
        return;
      }
      navigate({ to: "/workflow" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred during login.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email to resend verification.");
      return;
    }
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const res = await resendVerificationEmail({ data: { email } });
      if (res.error) {
        setError(res.error);
      } else {
        setInfo(res.message ?? "Verification email sent.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const GOOGLE_OAUTH_CONFIGURED =
    import.meta.env.VITE_GOOGLE_OAUTH_ENABLED === "true";

  const handleGoogleLogin = async () => {
    setError(null);
    setInfo(null);

    if (!GOOGLE_OAUTH_CONFIGURED) {
      setInfo("Google sign-in is coming soon! Please use email and password to sign in.");
      return;
    }

    setLoading(true);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (oauthError) {
        setError(oauthError.message);
        setLoading(false);
      }
      // On success, browser is redirected to Google — no further action needed here
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred during Google login.";
      setError(msg);
      setLoading(false);
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
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
                <AlertDescription className="space-y-2">
                  <p>{error}</p>
                  {error.includes("verify your email") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResend}
                      className="mt-2 w-full"
                      type="button"
                      disabled={loading}
                    >
                      Resend Verification Email
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}
            {info && (
              <Alert>
                <MailCheck className="h-4 w-4 text-emerald-500" />
                <AlertTitle className="text-emerald-500">Success</AlertTitle>
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
