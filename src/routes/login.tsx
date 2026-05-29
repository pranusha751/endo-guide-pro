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
import { HeartPulse, Loader2, MailCheck } from "lucide-react";
import { signInWithPassword, signInWithGoogle, resendVerification } from "@/lib/auth-stub";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setNeedsVerification(false);
    setLoading(true);
    const res = await signInWithPassword({ email, password });
    setLoading(false);
    if (res.error || !res.user) {
      setError(res.error ?? "Unable to sign in.");
      if (res.needsVerification) setNeedsVerification(true);
      return;
    }
    navigate({ to: "/workflow" });
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setInfo(null);
    setLoading(true);
    const { user, error: authError } = await signInWithGoogle();
    setLoading(false);
    if (authError || !user) {
      setError(authError ?? "Unable to sign in with Google.");
      return;
    }
    navigate({ to: "/workflow" });
  };

  const handleResend = async () => {
    setError(null);
    const { error: e } = await resendVerification(email);
    if (e) setError(e);
    else {
      setInfo(`Verification link re-sent to ${email}. (Demo) Open /verify?email=${encodeURIComponent(email)}`);
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
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive space-y-2">
                <p>{error}</p>
                {needsVerification && email && (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-xs font-medium underline"
                  >
                    Resend verification email
                  </button>
                )}
              </div>
            )}
            {info && (
              <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-foreground">{info}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign in
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-card"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </Button>

            <div className="flex items-start gap-2 rounded-xl bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              <MailCheck className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              <span>
                New accounts require email verification. After signup, we'll send a confirmation link to your inbox.
              </span>
            </div>
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
