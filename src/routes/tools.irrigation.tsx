import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { IRRIGATION_STEPS, IRRIGATION_SAFETY } from "@/lib/endo-data";
import { Card, CardContent } from "@/components/ui/card";
import { Check, AlertTriangle, Info } from "lucide-react";

export const Route = createFileRoute("/tools/irrigation")({
  head: () => ({ meta: [{ title: "Irrigation Protocol — Endo Made Easy" }] }),
  component: IrrigationPage,
});

function IrrigationPage() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Irrigation Protocol"
        subtitle="Step-by-step chemo-mechanical debridement"
      />

      <div className="space-y-3">
        {IRRIGATION_STEPS.map((step) => {
          const isDone = !!completed[step.id];
          return (
            <button
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`w-full text-left rounded-2xl border p-4 transition-all ${
                isDone ? "bg-mint border-mint shadow-sm" : "bg-card border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                    isDone ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  {isDone && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    {step.label}
                    {step.warning && <AlertTriangle className="w-4 h-4 text-warning-foreground" />}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>
                      <span className="font-medium">Conc:</span> {step.concentration}
                    </span>
                    <span>
                      <span className="font-medium">Vol:</span> {step.volume}
                    </span>
                    <span>
                      <span className="font-medium">Time:</span> {step.time}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Card className="rounded-2xl bg-warning/20 border-warning/30 p-4">
        <div className="flex items-center gap-2 font-bold text-sm text-warning-foreground mb-3">
          <AlertTriangle className="w-5 h-5" />
          Critical Safety Notes
        </div>
        <ul className="space-y-2">
          {IRRIGATION_SAFETY.map((note, i) => (
            <li key={i} className="text-xs text-warning-foreground/90 flex gap-2">
              <span className="mt-1 flex-shrink-0">•</span>
              {note}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="rounded-2xl bg-mint/20 border-mint/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-mint-foreground mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-mint-foreground">Activation Tip</h4>
            <p className="text-xs text-mint-foreground/80 mt-1 leading-relaxed">
              Sonic or ultrasonic activation for 30-60 seconds per canal significantly improves
              biofilm disruption and smear layer removal.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
