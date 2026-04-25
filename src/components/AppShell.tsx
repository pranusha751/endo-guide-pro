import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Activity, BookOpen, Stethoscope, Wrench, User } from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";

const tabs = [
  { to: "/workflow", label: "Workflow", icon: Activity },
  { to: "/anatomy", label: "Anatomy", icon: BookOpen },
  { to: "/diagnosis", label: "Diagnosis", icon: Stethoscope },
  { to: "/tools", label: "Tools", icon: Wrench },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell() {
  const location = useLocation();
  return (
    <PhoneFrame>
        <main className="flex-1 pb-24 px-5 pt-6 overflow-y-auto">
          <Outlet />
        </main>
        <nav className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border">
          <ul className="grid grid-cols-5 px-2 py-2">
            {tabs.map((t) => {
              const active = location.pathname.startsWith(t.to);
              const Icon = t.icon;
              return (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    className={`flex flex-col items-center gap-1 py-2 rounded-xl text-[11px] font-medium transition-colors ${
                      active ? "text-primary-foreground bg-primary" : "text-muted-foreground hover:text-foreground"
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
      </div>
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
