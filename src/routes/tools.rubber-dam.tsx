import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { TEETH, RUBBER_DAM_TIPS } from "@/lib/endo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/tools/rubber-dam")({
  head: () => ({ meta: [{ title: "Rubber Dam Guide — Endo Made Easy" }] }),
  component: RubberDamPage,
});

function RubberDamPage() {
  const [selectedTooth, setSelectedTooth] = useState("16");
  const toothInfo = TEETH.find((t) => t.fdi === selectedTooth);

  return (
    <div className="space-y-6">
      <PageHeader title="Rubber Dam Guide" subtitle="Optimal isolation for endodontics" />

      <Card className="rounded-2xl border-border bg-card shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Clamp Selector
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Tooth (FDI)</Label>
            <select
              value={selectedTooth}
              onChange={(e) => setSelectedTooth(e.target.value)}
              className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {TEETH.map((t) => (
                <option key={t.fdi} value={t.fdi}>
                  {t.fdi} — {t.name}
                </option>
              ))}
            </select>
          </div>

          {toothInfo && (
            <div className="rounded-2xl bg-peach p-5 border border-peach/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-peach-foreground" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-peach-foreground/60">
                    Recommended Clamp
                  </div>
                  <div className="text-lg font-bold text-peach-foreground">{toothInfo.clamp}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-medium uppercase text-peach-foreground/60">
                    Group
                  </div>
                  <div className="text-sm font-semibold text-peach-foreground capitalize">
                    {toothInfo.group}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-medium uppercase text-peach-foreground/60">
                    Isolation
                  </div>
                  <div className="text-sm font-semibold text-peach-foreground">Single tooth</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-1">
          Clinical Tips
        </h3>
        <div className="grid gap-3">
          {RUBBER_DAM_TIPS.map((tip) => (
            <Card key={tip.category} className="rounded-2xl border-border bg-card">
              <CardContent className="p-4 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-mint/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-mint-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">{tip.category}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {tip.details}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
