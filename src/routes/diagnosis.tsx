import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DIAGNOSES } from "@/lib/endo-data";
import { PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/diagnosis")({
  head: () => ({ meta: [{ title: "Diagnosis — Endo Made Easy" }] }),
  component: DiagnosisPage,
});

const MATRIX = [
  { dx: "normal", symptoms: "None", pulpTest: "Normal response", radiograph: "Normal PDL", treatment: "Monitor" },
  { dx: "reversible", symptoms: "Brief cold pain", pulpTest: "Heightened brief", radiograph: "Normal PDL", treatment: "Sedative restoration" },
  { dx: "irreversible", symptoms: "Lingering / spontaneous pain", pulpTest: "Lingering response", radiograph: "Normal / widened PDL", treatment: "RCT or extraction" },
  { dx: "necrosis", symptoms: "Often asymptomatic", pulpTest: "No response", radiograph: "Normal / widened PDL", treatment: "RCT" },
  { dx: "apical", symptoms: "Pain on biting", pulpTest: "No response + percussion +", radiograph: "PA radiolucency", treatment: "RCT + apical disinfection" },
  { dx: "abscess", symptoms: "Swelling, sinus tract", pulpTest: "No response", radiograph: "PA radiolucency", treatment: "Drainage + RCT" },
];

function DiagnosisPage() {
  const [selected, setSelected] = useState<string>("irreversible");

  return (
    <div>
      <PageHeader title="Diagnosis Matrix" subtitle="Tap a row to highlight" />

      <div className="space-y-3">
        {MATRIX.map((row) => {
          const dx = DIAGNOSES.find((d) => d.id === row.dx)!;
          const active = selected === row.dx;
          return (
            <button
              key={row.dx}
              onClick={() => setSelected(row.dx)}
              className={`w-full text-left rounded-2xl border p-4 transition-all shadow-card ${
                active ? `bg-${dx.color} border-transparent` : "bg-card border-border"
              }`}
            >
              <div className={`text-base font-semibold ${active ? `text-${dx.color}-foreground` : ""}`}>
                {dx.label}
              </div>
              <div className={`grid grid-cols-1 gap-1.5 mt-3 text-xs ${active ? `text-${dx.color}-foreground/90` : "text-muted-foreground"}`}>
                <Row label="Symptoms" value={row.symptoms} />
                <Row label="Pulp test" value={row.pulpTest} />
                <Row label="Radiograph" value={row.radiograph} />
                <Row label="Treatment" value={row.treatment} />
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
