import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { FILE_PROTOCOLS, FILE_SYSTEMS, type FileSystem } from "@/lib/endo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Activity, Zap, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/tools/file-calculator")({
  head: () => ({ meta: [{ title: "File Calculator — Endo Made Easy" }] }),
  component: FileCalculatorPage,
});

function FileCalculatorPage() {
  const [fileSys, setFileSys] = useState<FileSystem>("ProTaper Gold");
  const protocol = FILE_PROTOCOLS[fileSys];

  return (
    <div className="space-y-6">
      <PageHeader
        title="File Sequence Calculator"
        subtitle="Optimized protocols for major file systems"
      />

      <Card className="rounded-2xl border-border bg-card shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Select System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system">Instrument System</Label>
              <select
                id="system"
                value={fileSys}
                onChange={(e) => setFileSys(e.target.value as FileSystem)}
                className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {FILE_SYSTEMS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-mint/30 p-3">
                <div className="text-[10px] font-medium uppercase text-mint-foreground/70">
                  Speed
                </div>
                <div className="text-sm font-semibold text-mint-foreground">{protocol.rpm}</div>
              </div>
              <div className="rounded-xl bg-mint/30 p-3">
                <div className="text-[10px] font-medium uppercase text-mint-foreground/70">
                  Torque
                </div>
                <div className="text-sm font-semibold text-mint-foreground">{protocol.torque}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Section title="Glide Path" items={protocol.glidePath} icon={Activity} color="mint" />
        <Section title="Shaping" items={protocol.shaping} icon={Zap} color="peach" />
        <Section title="Finishing" items={protocol.finishing} icon={CheckCircle2} color="mint" />
      </div>

      <Card className="rounded-2xl border-border bg-card p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Standard MAF</span>
          <span className="text-sm font-bold text-primary">{protocol.maf}</span>
        </div>
      </Card>
    </div>
  );
}

function Section({
  title,
  items,
  icon: Icon,
  color,
}: {
  title: string;
  items: string[];
  icon: React.ElementType;
  color: "mint" | "peach";
}) {
  return (
    <Card className="rounded-2xl border-border bg-card overflow-hidden">
      <div
        className={`px-4 py-2 bg-${color}/20 border-b border-${color}/20 flex items-center gap-2`}
      >
        <Icon className={`w-4 h-4 text-${color}-foreground`} />
        <span className={`text-xs font-bold uppercase tracking-wider text-${color}-foreground`}>
          {title}
        </span>
      </div>
      <CardContent className="p-4">
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                className={`w-5 h-5 rounded-full bg-${color} text-${color}-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                {i + 1}
              </span>
              <span className="text-sm text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
