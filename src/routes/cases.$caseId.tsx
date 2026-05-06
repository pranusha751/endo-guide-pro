import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { TEETH, DIAGNOSES, FILE_PROTOCOLS, type FileSystem } from "@/lib/endo-data";
import { getCaseById } from "@/lib/cases";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Share2, ArrowLeft, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cases/$caseId")({
  head: () => ({ meta: [{ title: "Case Details — Endo Made Easy" }] }),
  component: CaseDetailsPage,
});

function CaseDetailsPage() {
  const { caseId } = Route.useParams();
  const caseData = getCaseById(caseId);
  const navigate = useNavigate();

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">Case not found</h2>
        <p className="text-muted-foreground mb-6">The case record you're looking for doesn't exist.</p>
        <Button onClick={() => navigate({ to: "/profile" })}>Back to Profile</Button>
      </div>
    );
  }

  const toothInfo = TEETH.find((t) => t.fdi === caseData.tooth);
  const dxInfo = DIAGNOSES.find((d) => d.label === caseData.dx);
  const protocol = caseData.fileSystem ? FILE_PROTOCOLS[caseData.fileSystem as FileSystem] : null;

  const handleShare = async () => {
    const summaryText = `Endo Guide Pro Case Summary\n\nTooth: ${caseData.tooth} — ${toothInfo?.name}\nDiagnosis: ${caseData.dx}\nAccess: ${toothInfo?.accessShape ?? "—"}\nFile System: ${caseData.fileSystem ?? "—"}\nTarget MAF: ${protocol?.maf ?? "—"}\nClamp: ${toothInfo?.clamp ?? "—"}\n\nGenerated via Endo Guide Pro`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Endodontic Record — Tooth ${caseData.tooth}`,
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/profile" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <PageHeader title="Case Details" subtitle={`Record ID: ${caseData.id}`} />
      </div>

      <Card className="rounded-2xl border-border bg-card shadow-card">
        <CardHeader className="pb-2 border-b border-border/50 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Clinical Summary
          </CardTitle>
          <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {caseData.date}
          </span>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <span className="text-[10px] uppercase text-muted-foreground font-bold">Tooth</span>
                <div className="text-sm font-bold mt-1">{caseData.tooth} — {toothInfo?.name}</div>
             </div>
             <div>
                <span className="text-[10px] uppercase text-muted-foreground font-bold">Diagnosis</span>
                <div className="text-sm font-bold mt-1" style={{ color: dxInfo?.color ? `var(--${dxInfo.color}-foreground)` : undefined }}>
                  {caseData.dx}
                </div>
             </div>
          </div>
          
          <div className="h-px bg-border/50" />
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <span className="text-[10px] uppercase text-muted-foreground font-bold">Access Cavity</span>
                <div className="text-sm font-bold mt-1">{toothInfo?.accessShape ?? "—"}</div>
             </div>
             <div>
                <span className="text-[10px] uppercase text-muted-foreground font-bold">Clamp</span>
                <div className="text-sm font-bold mt-1">{toothInfo?.clamp ?? "—"}</div>
             </div>
          </div>

          <div className="h-px bg-border/50" />

          <div>
             <span className="text-[10px] uppercase text-muted-foreground font-bold">Endodontic Protocol</span>
             <div className="bg-primary/5 rounded-xl p-3 mt-2 space-y-2">
                <div className="flex justify-between text-xs">
                   <span className="text-muted-foreground">File System</span>
                   <span className="font-bold">{caseData.fileSystem ?? "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                   <span className="text-muted-foreground">Target MAF</span>
                   <span className="font-bold">{protocol?.maf ?? "—"}</span>
                </div>
             </div>
          </div>
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
          onClick={() => toast.info("Follow-up scheduling coming soon!")}
          className="rounded-2xl h-auto py-4 flex flex-col gap-1 border-border bg-card shadow-card"
        >
          <Calendar className="w-5 h-5 text-peach-foreground" />
          <span className="text-xs font-bold uppercase tracking-tighter">Follow-up</span>
        </Button>
      </div>
    </div>
  );
}
