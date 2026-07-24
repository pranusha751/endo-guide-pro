import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  Stethoscope,
  Wrench,
  User,
  Bell,
  LogOut,
  ShieldPlus,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { signOut } from "@/lib/auth";
import { usePWA } from "@/hooks/usePWA";

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
  const { isInstallable, isInstalled, install } = usePWA();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Bottom Navigation */}
      {!isAuthPage && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
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

      {/* Desktop Sidebar */}
      {!isAuthPage && (
        <aside className="hidden md:flex flex-col w-64 bg-card/95 border-r border-border fixed top-0 bottom-0 left-0 z-50 py-6">
          <div className="px-6 mb-8 flex items-center gap-2 text-xl font-bold tracking-tight text-primary">
            <ShieldPlus className="w-7 h-7" />
            Endo Guide
          </div>
          <ul className="flex flex-col gap-2 px-4 flex-1">
            {tabs.map((t) => {
              const active = location.pathname.startsWith(t.to);
              const Icon = t.icon;
              return (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      active
                        ? "text-primary-foreground bg-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {t.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {isInstallable && !isInstalled && (
            <div className="px-4 mt-auto">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-center">
                <p className="text-xs font-semibold text-primary mb-1">Get the App</p>
                <p className="text-[11px] text-muted-foreground mb-3">Install Endo Guide Pro for offline support and faster access.</p>
                <button
                  onClick={install}
                  className="w-full py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl shadow-soft hover:bg-primary/95 transition-colors cursor-pointer"
                >
                  Install App
                </button>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 ${!isAuthPage ? "pb-24 md:pb-8 md:ml-64" : ""} h-screen overflow-y-auto`}
      >
        <div
          className={`w-full ${!isAuthPage ? "max-w-lg md:max-w-5xl mx-auto px-4 md:px-8" : ""}`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const navigate = useNavigate();
  const signOutFn = useServerFn(signOut);

  return (
    <header className="mb-6 pt-6 flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-background"></span>
        </button>
        <button
          className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
          onClick={async () => {
            await signOutFn({ data: undefined });
            navigate({ to: "/login" });
          }}
          title="Log out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
