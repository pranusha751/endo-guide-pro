import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { AuthUser } from "@/lib/auth-stub";

export const Route = createFileRoute("/verify")({
  component: VerifyRoute,
});

function VerifyRoute() {
  const navigate = useNavigate();
  const search: Record<string, string> = Route.useSearch();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const email = search.email as string | undefined;

    // Simulate verification delay
    setTimeout(() => {
      if (email) {
        const user: AuthUser = {
          id: crypto.randomUUID(),
          email: email,
          fullName: `Dr. ${email.split("@")[0]}`,
        };
        // Log them in
        localStorage.setItem("endo_made_easy_user", JSON.stringify(user));
      }
      setVerifying(false);

      // Redirect to workflow after a short delay
      setTimeout(() => navigate({ to: "/workflow" }), 1500);
    }, 1500);
  }, [search, navigate]);

  return (
    <div className="flex flex-1 items-center justify-center p-6 min-h-screen bg-background">
      <div className="text-center space-y-4">
        {verifying ? (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Verifying Magic Link...</h2>
            <p className="text-muted-foreground text-sm">Please wait while we log you in.</p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint">
              <CheckCircle2 className="h-6 w-6 text-mint-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Verification Successful!</h2>
            <p className="text-muted-foreground text-sm">Redirecting to the app...</p>
          </>
        )}
      </div>
    </div>
  );
}
