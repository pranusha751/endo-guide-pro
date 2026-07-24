import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Activity,
  BookOpen,
  Stethoscope,
  Wrench,
  User,
  Bell,
  LogOut,
  ShieldPlus,
  CheckCircle,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { signOut } from "@/lib/auth";


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
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: number; text: string; read: boolean; time: string }>>([]);

  useEffect(() => {
    const saved = localStorage.getItem("endo_notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      const defaultNotifs = [
        { id: 1, text: "Welcome to Endo Guide Pro! Start by adding your first case.", read: false, time: "Just now" },
        { id: 2, text: "Tip: Use the file calculator for accurate MAF measurements.", read: false, time: "1 hour ago" },
        { id: 3, text: "Update: Diagnostic guidelines have been updated.", read: false, time: "Yesterday" }
      ];
      setNotifications(defaultNotifs);
      localStorage.setItem("endo_notifications", JSON.stringify(defaultNotifs));
    }
  }, []);

  const hasUnread = notifications.some((n) => !n.read);

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("endo_notifications", JSON.stringify(updated));
  };

  const clearNotification = (id: number) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("endo_notifications", JSON.stringify(updated));
  };

  return (
    <header className="mb-6 pt-6 flex items-start justify-between relative">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 relative z-50">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-background"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-card rounded-2xl border border-border shadow-lg p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                <span className="text-xs font-bold text-foreground">Notifications</span>
                {hasUnread && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] text-primary font-bold hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`text-xs p-2 rounded-xl border transition-colors flex items-start justify-between gap-2 ${
                        n.read ? "bg-muted/30 border-transparent text-muted-foreground" : "bg-primary/5 border-primary/10 text-foreground"
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="leading-relaxed">{n.text}</p>
                        <span className="text-[10px] text-muted-foreground block">{n.time}</span>
                      </div>
                      <button
                        onClick={() => clearNotification(n.id)}
                        className="text-muted-foreground hover:text-foreground text-[14px] leading-none font-bold ml-1 cursor-pointer"
                        title="Dismiss"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <button
          className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors cursor-pointer"
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
