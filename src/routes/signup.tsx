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
import { signUpWithPassword } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signUpWithPassword({ data: { fullName: name, email, password } });
      console.log("Signup response:", res); // Debugging log
      if (!res) {
        throw new Error("Server function returned an empty response. Please check the backend.");
      }
      if (res.error) {
        setError(res.error ?? "Unable to create account.");
        return;
      }
      if (res.message) {
        setSuccess(res.message);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred during signup.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const GOOGLE_OAUTH_CONFIGURED =
    import.meta.env.VITE_GOOGLE_OAUTH_ENABLED === "true";

  const handleGoogleSignup = async () => {
    setError(null);

    if (!GOOGLE_OAUTH_CONFIGURED) {
      setError("Google sign-in is coming soon! Please use email and password to create your account.");
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
        err instanceof Error ? err.message : "An unexpected error occurred during Google signup.";
      setError(msg);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 overflow-y-auto">
        <Card className="w-full max-w-sm rounded-2xl shadow-sm border-0 sm:border">
          <CardHeader className="space-y-2 text-center">
            <div className="mb-2 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                <MailCheck className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Account Created</CardTitle>
            <CardDescription className="text-sm pt-2">{success}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button onClick={() => navigate({ to: "/login" })} className="w-full mt-4">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6 overflow-y-auto">
      <Card className="w-full max-w-sm rounded-2xl shadow-sm border-0 sm:border">
        <CardHeader className="space-y-2 text-center">
          <div className="mb-2 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <HeartPulse className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Join Endo Made Easy to manage your cases</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Dr. Jane Doe"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
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
                autoComplete="new-password"
                placeholder="At least 6 characters"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create account
            </Button>

          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
