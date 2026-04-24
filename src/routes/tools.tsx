import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { Calculator, Droplets, Shield, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/tools")({
  head: () => ({ meta: [{ title: "Tools — Endo Made Easy" }] }),
  component: ToolsPage,
});

const TOOLS = [
  { icon: Calculator, title: "File Sequence Calculator", desc: "ProTaper, WaveOne, Hyflex & more", color: "mint" as const },
  { icon: Droplets, title: "Irrigation Protocol", desc: "NaOCl, EDTA, final rinse", color: "peach" as const },
  { icon: Shield, title: "Rubber Dam Guide", desc: "Clamp selection by tooth group", color: "mint" as const },
];

function ToolsPage() {
  return (
    <div>
      <PageHeader title="Standalone Tools" subtitle="Quick-access clinical utilities" />
      <div className="space-y-3">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.title}
              to="/workflow"
              className="block rounded-2xl bg-card border border-border p-4 shadow-card active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-${t.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 text-${t.color}-foreground`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{t.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-mint/40 border border-mint p-4">
        <h4 className="font-semibold text-sm text-mint-foreground">Pro tip</h4>
        <p className="text-xs text-mint-foreground/80 mt-1">
          Run the full guided workflow for best results — it auto-configures every tool based on your tooth selection and diagnosis.
        </p>
      </div>
    </div>
  );
}
