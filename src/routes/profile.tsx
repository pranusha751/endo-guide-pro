import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Calendar, FileText, StickyNote, Clock } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Endo Made Easy" }] }),
  component: ProfilePage,
});

const CASES = [
  { id: "C-104", tooth: "16", dx: "Irreversible Pulpitis", date: "2 days ago", status: "Follow-up due" },
  { id: "C-103", tooth: "26", dx: "Pulp Necrosis", date: "5 days ago", status: "Completed" },
  { id: "C-102", tooth: "36", dx: "Apical Periodontitis", date: "1 wk ago", status: "Completed" },
  { id: "C-101", tooth: "11", dx: "Reversible Pulpitis", date: "2 wk ago", status: "Monitoring" },
];

function ProfilePage() {
  return (
    <div>
      <PageHeader title="Profile" subtitle="Dr. A. Patel · GP Endodontist" />

      <div className="rounded-2xl bg-mint p-5 mb-5 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center text-xl font-bold text-mint-foreground">
            AP
          </div>
          <div>
            <div className="font-semibold text-mint-foreground">12 cases this month</div>
            <div className="text-xs text-mint-foreground/80">3 follow-ups scheduled</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat icon={FileText} value="47" label="Total" />
        <Stat icon={Calendar} value="3" label="Follow-up" />
        <Stat icon={StickyNote} value="9" label="Notes" />
      </div>

      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Recent Cases</h3>
      <div className="space-y-3">
        {CASES.map((c) => (
          <article key={c.id} className="rounded-2xl bg-card border border-border p-4 shadow-card">
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
              <span className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                c.status === "Follow-up due" ? "bg-warning/40 text-warning-foreground" :
                c.status === "Completed" ? "bg-mint text-mint-foreground" :
                "bg-peach text-peach-foreground"
              }`}>
                {c.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4 text-center shadow-card">
      <Icon className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
