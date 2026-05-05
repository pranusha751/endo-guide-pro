import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DIAGNOSES } from "@/lib/endo-data";
import { PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/diagnosis")({
  head: () => ({ meta: [{ title: "Diagnosis — Endo Made Easy" }] }),
  component: DiagnosisPage,
});

function DiagnosisPage() {
  const [selected, setSelected] = useState<string>("irreversible-symp");

  return (
    <div>
      <PageHeader
        title="Pulp Diagnosis Matrix"
        subtitle="Tap a row to highlight — based on AAE classification"
      />

      <div className="space-y-3">
        {DIAGNOSES.map((dx) => {
          const active = selected === dx.id;
          return (
            <button
              key={dx.id}
              onClick={() => setSelected(dx.id)}
              className={`w-full text-left rounded-2xl border p-4 transition-all shadow-card ${
                active ? `bg-${dx.color} border-transparent` : "bg-card border-border"
              }`}
            >
              <div
                className={`text-base font-semibold ${active ? `text-${dx.color}-foreground` : ""}`}
              >
                {dx.label}
              </div>
              <div
                className={`grid grid-cols-1 gap-1.5 mt-3 text-xs ${active ? `text-${dx.color}-foreground/90` : "text-muted-foreground"}`}
              >
                <Row label="Symptoms" value={dx.symptoms} />
                <Row label="Pulp test" value={dx.pulpTests} />
                <Row label="Radiograph" value={dx.radiograph} />
                <Row label="Treatment" value={dx.treatment} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-medium w-20 flex-shrink-0">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
