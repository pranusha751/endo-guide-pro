import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Activity, BookOpen, Stethoscope, Wrench, User } from "lucide-react";


const tabs = [
  { to: "/workflow", label: "Workflow", icon: Activity },
  { to: "/anatomy", label: "Anatomy", icon: BookOpen },
  { to: "/diagnosis", label: "Diagnosis", icon: Stethoscope },
  { to: "/tools", label: "Tools", icon: Wrench },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell() {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);


  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <main className={`flex-1 ${!isAuthPage ? "pb-24" : ""} overflow-y-auto w-full max-w-lg mx-auto`}>
        <Outlet />
      </main>
      {!isAuthPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
          <ul className="grid grid-cols-5 px-2 py-2 max-w-lg mx-auto">
            {tabs.map((t) => {
              const active = location.pathname.startsWith(t.to);
              const Icon = t.icon;
              return (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    className={`flex flex-col items-center gap-1 py-2 rounded-xl text-[11px] font-medium transition-all ${
                      active
                        ? "text-primary-foreground bg-primary shadow-sm scale-105"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {t.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}




export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </header>
  );
}
