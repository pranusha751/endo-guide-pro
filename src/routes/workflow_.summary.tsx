import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { TEETH, DIAGNOSES, FILE_PROTOCOLS, FILE_SYSTEMS, type FileSystem } from "@/lib/endo-data";
import { saveCase } from "@/lib/cases";
import { getCurrentUser } from "@/lib/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Save, Share2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const searchSchema = z.object({
  tooth: z.string().optional().default("16"),
  dx: z.string().optional().default("normal"),
  files: z
    .enum(FILE_SYSTEMS as unknown as [string, ...string[]])
    .optional()
    .default("ProTaper Gold"),
  patientName: z.string().optional().default(""),
  patientAge: z.string().optional().default(""),
  patientGender: z.string().optional().default(""),
});

export const Route = createFileRoute("/workflow_/summary")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Case Summary — Endo Made Easy" }] }),
  loader: async () => {
    const user = await getCurrentUser();
    return { user };
  },
  component: SummaryPage,
});

function SummaryPage() {
  const { tooth, dx, files, patientName, patientAge, patientGender } = Route.useSearch();
  const { user } = Route.useLoaderData();
  const toothInfo = TEETH.find((t) => t.fdi === tooth);
  const dxInfo = DIAGNOSES.find((d) => d.id === dx);
  const protocol = FILE_PROTOCOLS[files as FileSystem];
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!user) {
      toast.error("Please login to save cases.");
      return;
    }
    
    try {
      await saveCase({
        data: {
          patientName,
          patientAge,
          patientGender,
          tooth,
          dx: dxInfo?.label || dx,
          status: "Completed",
          fileSystem: files,
        }
      });
      navigate({ to: "/profile" });
    } catch (error) {
      toast.error("Failed to save case. Please try again.");
    }
  };

  const handleShare = async () => {
    const summaryText = `Endo Guide Pro Case Summary\n\nTooth: ${tooth} — ${toothInfo?.name}\nDiagnosis: ${dxInfo?.label ?? "—"}\nAccess: ${toothInfo?.accessShape ?? "—"}\nFile System: ${files}\nTarget MAF: ${protocol?.maf ?? "—"}\nClamp: ${toothInfo?.clamp ?? "—"}\n\nGenerated via Endo Guide Pro`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Endodontic Record — Tooth ${tooth}`,
          text: summaryText,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Sharing failed");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(summaryText);
        toast.success("Summary copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy summary");
      }
    }
  };

  const handleFollowUp = () => {
    toast.info("Follow-up scheduling coming soon!", {
      description: "This feature is currently in development.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/workflow" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <PageHeader title="Case Summary" subtitle="Review and finalize your endodontic record" />
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-soft">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-primary-foreground">Protocol Complete</h3>
          <p className="text-sm text-primary-foreground/70">
            Treatment plan successfully generated
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {(patientName || patientAge || patientGender) && (
          <Card className="rounded-2xl border-border bg-card shadow-card">
            <CardHeader className="pb-2 border-b border-border/50">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Patient Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {patientName && <SummaryRow label="Name" value={patientName} />}
              {patientAge && <SummaryRow label="Age" value={patientAge} />}
              {patientGender && <SummaryRow label="Gender" value={patientGender} />}
            </CardContent>
          </Card>
        )}

        <Card className="rounded-2xl border-border bg-card shadow-card">
          <CardHeader className="pb-2 border-b border-border/50">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Clinical Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <SummaryRow label="Tooth" value={`${tooth} — ${toothInfo?.name}`} />
            <SummaryRow label="Diagnosis" value={dxInfo?.label ?? "—"} color={dxInfo?.color} />
            <SummaryRow label="Access" value={toothInfo?.accessShape ?? "—"} />
            <SummaryRow label="File System" value={files} />
            <SummaryRow label="Target MAF" value={protocol?.maf ?? "—"} />
            <SummaryRow label="Clamp" value={toothInfo?.clamp ?? "—"} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleShare}
            className="rounded-2xl h-auto py-4 flex flex-col gap-1 border-border bg-card shadow-card"
          >
            <Share2 className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-tighter">Share Report</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleFollowUp}
            className="rounded-2xl h-auto py-4 flex flex-col gap-1 border-border bg-card shadow-card"
          >
            <Calendar className="w-5 h-5 text-peach-foreground" />
            <span className="text-xs font-bold uppercase tracking-tighter">Follow-up</span>
          </Button>
        </div>

        <Button
          onClick={handleSave}
          className="w-full rounded-2xl py-6 text-lg font-bold shadow-soft gap-2"
        >
          <Save className="w-6 h-6" />
          Save to Clinical Record
        </Button>
      </div>

      <p className="text-[10px] text-center text-muted-foreground px-6 leading-relaxed">
        * This summary is for clinical reference only. Ensure all findings are cross-verified with
        radiographic and clinical examination before finalizing the treatment record.
      </p>
    </div>
  );
}

function SummaryRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-bold ${color ? `text-${color}-foreground bg-${color}/20 px-2 py-0.5 rounded-lg` : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}
