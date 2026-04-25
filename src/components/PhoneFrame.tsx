import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40 flex justify-center min-[400px]:items-center min-[400px]:py-8">
      <div className="w-full min-[400px]:w-[390px] min-[400px]:h-[844px] min-[400px]:max-h-[calc(100vh-4rem)] min-[400px]:rounded-[2.5rem] min-[400px]:border-[10px] min-[400px]:border-foreground/90 min-[400px]:shadow-2xl min-[400px]:overflow-hidden bg-background flex flex-col min-h-screen min-[400px]:min-h-0 relative">
        {children}
      </div>
    </div>
  );
}
