import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TEETH } from "@/lib/endo-data";
import { PageHeader } from "@/components/AppShell";
import { Search } from "lucide-react";

export const Route = createFileRoute("/anatomy")({
  head: () => ({ meta: [{ title: "Anatomy — Endo Made Easy" }] }),
  component: AnatomyPage,
});

function AnatomyPage() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<"all" | "anterior" | "premolar" | "molar">("all");
  const filtered = TEETH.filter((t) => {
    const matchesQ = !q || t.fdi.includes(q) || t.name.toLowerCase().includes(q.toLowerCase());
    const matchesG = group === "all" || t.group === group;
    return matchesQ && matchesG;
  });

  return (
    <div>
      <PageHeader title="Tooth Anatomy" subtitle="Reference library for all FDI teeth" />

      <div className="relative mb-3">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search FDI or tooth name…"
          className="w-full rounded-2xl bg-card border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex gap-2 mb-5">
        {(["all", "anterior", "premolar", "molar"] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={`flex-1 capitalize text-xs py-2 rounded-xl border transition-all ${
              group === g
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((t) => (
          <article key={t.fdi} className="rounded-2xl bg-card border border-border p-4 shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-mint flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-mint-foreground">{t.fdi}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{t.name}</h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-xs">
                  <Info label="Roots" value={t.roots} />
                  <Info label="Canals" value={t.canals} />
                  <Info label="Access" value={t.accessShape} />
                  <Info label="WL" value={t.workingLength} />
                </div>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">
            No teeth match your search.
          </p>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}: </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
