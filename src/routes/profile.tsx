import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Calendar, FileText, StickyNote, Clock } from "lucide-react";
import { getCurrentUser } from "@/lib/auth-stub";
import { getCases, type CaseRecord } from "@/lib/cases";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Endo Made Easy" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const location = useLocation();
  const user = getCurrentUser();
  const [cases, setCases] = useState<CaseRecord[]>([]);

  useEffect(() => {
    setCases(getCases());
  }, [location.pathname]);

  let displayName = "Doctor";
  let initials = "DR";

  if (user) {
    const nameStr = user.fullName || user.email.split("@")[0];
    const hasDrPrefix = /^dr\.?\s/i.test(nameStr);
    displayName = hasDrPrefix ? nameStr : `Dr. ${nameStr}`;

    const parts = nameStr.replace(/^dr\.?\s+/i, "").split(/[-_.\s]+/);
    if (parts.length >= 2 && parts[0] && parts[1]) {
      initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts[0] && parts[0].length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
  }

  return (
    <div>
      <PageHeader title="Profile" subtitle={`${displayName} · GP Endodontist`} />

      <div className="rounded-2xl bg-mint p-5 mb-5 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center text-xl font-bold text-mint-foreground">
            {initials}
          </div>
          <div>
            <div className="font-semibold text-mint-foreground">{cases.length} cases total</div>
            <div className="text-xs text-mint-foreground/80">
              {cases.filter((c) => c.status === "Follow-up due").length} follow-ups scheduled
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat icon={FileText} value={cases.length.toString()} label="Total" />
        <Stat
          icon={Calendar}
          value={cases.filter((c) => c.status === "Follow-up due").length.toString()}
          label="Follow-up"
        />
        <Stat icon={StickyNote} value="0" label="Notes" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Recent Cases
        </h3>
        {cases.length > 0 && (
          <Link to="/workflow" className="text-xs font-semibold text-primary hover:underline">
            + Add Case
          </Link>
        )}
      </div>
      <div className="space-y-3">
        {cases.length === 0 ? (
          <div className="text-center py-8 bg-card rounded-2xl border border-dashed border-border/60 shadow-sm">
            <p className="text-sm text-muted-foreground mb-4">No cases yet.</p>
            <Link
              to="/workflow"
              className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-semibold shadow-soft"
            >
              Start New Case
            </Link>
          </div>
        ) : (
          cases.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl bg-card border border-border p-4 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-peach flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-peach-foreground">{c.tooth}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{c.dx}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {c.date} · {c.id}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                    c.status === "Follow-up due"
                      ? "bg-warning/40 text-warning-foreground"
                      : c.status === "Completed"
                        ? "bg-mint text-mint-foreground"
                        : "bg-peach text-peach-foreground"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4 text-center shadow-card">
      <Icon className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
