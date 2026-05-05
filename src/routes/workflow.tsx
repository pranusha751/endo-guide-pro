import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  TEETH,
  FILE_PROTOCOLS,
  FILE_SYSTEMS,
  type FileSystem,
  DIAGNOSES,
  IRRIGATION_STEPS,
  IRRIGATION_SAFETY,
  ACCESS_GUIDES,
  BUR_RECOMMENDATIONS,
  MAF_GUIDANCE,
  RUBBER_DAM_TIPS,
} from "@/lib/endo-data";
import { PageHeader } from "@/components/AppShell";
import { Check, ChevronLeft, ChevronRight, AlertTriangle, Save } from "lucide-react";

function accessGroupFor(fdi: string, group: "anterior" | "premolar" | "molar") {
  const upper = fdi.startsWith("1") || fdi.startsWith("2");
  if (group === "anterior") {
    // Canines get their own row in the spec for maxillary
    if (upper && fdi.endsWith("3")) return "Max Canine" as const;
    return upper ? ("Max Incisors" as const) : ("Mand Incisors" as const);
  }
  if (group === "premolar") return upper ? ("Max Premolars" as const) : ("Mand Premolars" as const);
  return upper ? ("Max Molars" as const) : ("Mand Molars" as const);
}

export const Route = createFileRoute("/workflow")({
  head: () => ({
    meta: [
      { title: "Workflow — Endo Made Easy" },
      { name: "description", content: "Guided 9-step root canal workflow." },
    ],
  }),
  component: WorkflowPage,
});

const STEPS = [
  "Tooth",
  "Symptoms",
  "Pulp Tests",
  "Diagnosis",
  "Access",
  "Files",
  "Irrigation",
  "Rubber Dam",
  "Summary",
];

interface Symptoms {
  spontaneous: boolean;
  cold: "none" | "brief" | "lingering";
  biting: boolean;
  swelling: "none" | "localized" | "diffuse";
  sinus: boolean;
}

interface PulpTests {
  cold: string;
  ept: string;
  percussion: string;
  palpation: string;
  radiograph: string;
}

function WorkflowPage() {
  const [step, setStep] = useState(0);
  const [tooth, setTooth] = useState("16");
  const [symptoms, setSymptoms] = useState<Symptoms>({
    spontaneous: false,
    cold: "none",
    biting: false,
    swelling: "none",
    sinus: false,
  });
  const [tests, setTests] = useState<PulpTests>({
    cold: "Normal",
    ept: "Normal",
    percussion: "Negative",
    palpation: "Negative",
    radiograph: "Normal PDL",
  });
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [fileSys, setFileSys] = useState<FileSystem>("ProTaper Gold");
  const [bindingSize, setBindingSize] = useState(15);
  const [irrigDone, setIrrigDone] = useState<Record<string, boolean>>({});

  const toothInfo = useMemo(() => TEETH.find((t) => t.fdi === tooth), [tooth]);
  const protocol = FILE_PROTOCOLS[fileSys];

  const suggestedDx = useMemo(() => {
    if (symptoms.swelling === "diffuse") return "acute-abscess";
    if (symptoms.sinus) return "chronic-abscess";
    if (symptoms.swelling === "localized" && symptoms.spontaneous) return "acute-abscess";
    if (
      tests.percussion !== "Negative" &&
      (tests.cold === "No response" || tests.radiograph === "PA radiolucency")
    )
      return "apical";
    if (tests.cold === "No response" && tests.ept === "No response") return "necrosis";
    if (symptoms.cold === "lingering" || symptoms.spontaneous) return "irreversible-symp";
    if (symptoms.cold === "brief") return "reversible";
    return "normal";
  }, [symptoms, tests]);

  const activeDx = diagnosis || suggestedDx;
  const dxInfo = DIAGNOSES.find((d) => d.id === activeDx);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      <PageHeader
        title="Endodontic Workflow"
        subtitle={`Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`}
      />

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" key={step}>
        {step === 0 && (
          <Card title="Tooth Selection">
            <Label>FDI Tooth Number</Label>
            <select
              value={tooth}
              onChange={(e) => setTooth(e.target.value)}
              className="w-full rounded-2xl bg-input/40 border border-border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {TEETH.map((t) => (
                <option key={t.fdi} value={t.fdi}>
                  {t.fdi} — {t.name}
                </option>
              ))}
            </select>

            {toothInfo && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat label="Roots" value={toothInfo.roots} />
                <Stat label="Canals" value={toothInfo.canals} />
                <Stat label="Access shape" value={toothInfo.accessShape} />
                <Stat label="Working length" value={toothInfo.workingLength} />
              </div>
            )}
          </Card>
        )}

        {step === 1 && (
          <Card title="Symptoms">
            <Toggle
              label="Spontaneous pain"
              value={symptoms.spontaneous}
              onChange={(v) => setSymptoms({ ...symptoms, spontaneous: v })}
            />
            <SegGroup
              label="Pain to cold"
              value={symptoms.cold}
              options={["none", "brief", "lingering"]}
              onChange={(v) => setSymptoms({ ...symptoms, cold: v as Symptoms["cold"] })}
            />
            <Toggle
              label="Pain on biting"
              value={symptoms.biting}
              onChange={(v) => setSymptoms({ ...symptoms, biting: v })}
            />
            <SegGroup
              label="Swelling"
              value={symptoms.swelling}
              options={["none", "localized", "diffuse"]}
              onChange={(v) => setSymptoms({ ...symptoms, swelling: v as Symptoms["swelling"] })}
            />
            <Toggle
              label="Sinus tract"
              value={symptoms.sinus}
              onChange={(v) => setSymptoms({ ...symptoms, sinus: v })}
            />
          </Card>
        )}

        {step === 2 && (
          <Card title="Pulp & Periapical Tests">
            <SelectField
              label="Cold test"
              value={tests.cold}
              options={["Normal", "Brief response", "Lingering response", "No response"]}
              onChange={(v) => setTests({ ...tests, cold: v })}
            />
            <SelectField
              label="EPT response"
              value={tests.ept}
              options={["Normal", "Reduced", "Heightened", "No response"]}
              onChange={(v) => setTests({ ...tests, ept: v })}
            />
            <SelectField
              label="Percussion"
              value={tests.percussion}
              options={["Negative", "Mild", "Severe"]}
              onChange={(v) => setTests({ ...tests, percussion: v })}
            />
            <SelectField
              label="Palpation"
              value={tests.palpation}
              options={["Negative", "Tender", "Swelling"]}
              onChange={(v) => setTests({ ...tests, palpation: v })}
            />
            <SelectField
              label="Radiograph findings"
              value={tests.radiograph}
              options={["Normal PDL", "Widened PDL", "PA radiolucency", "Resorption"]}
              onChange={(v) => setTests({ ...tests, radiograph: v })}
            />
          </Card>
        )}

        {step === 3 && (
          <>
            <Card title="Suggested Diagnosis">
              <div
                className={`rounded-2xl p-4 bg-${dxInfo?.color} text-${dxInfo?.color}-foreground`}
              >
                <div className="text-xs uppercase tracking-wide opacity-70">Most likely</div>
                <div className="text-xl font-semibold mt-1">{dxInfo?.label}</div>
                <p className="text-sm mt-2 opacity-90">{dxInfo?.treatment}</p>
              </div>
            </Card>
            <Card title="Override (Manual)">
              <div className="space-y-2">
                {DIAGNOSES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDiagnosis(d.id)}
                    className={`w-full text-left rounded-2xl px-4 py-3 border transition-all ${
                      activeDx === d.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="font-medium text-sm">{d.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{d.treatment}</div>
                  </button>
                ))}
              </div>
            </Card>
          </>
        )}

        {step === 4 &&
          toothInfo &&
          (() => {
            const guide = ACCESS_GUIDES.find(
              (g) => g.group === accessGroupFor(toothInfo.fdi, toothInfo.group),
            )!;
            return (
              <>
                <Card title="Access Cavity Design">
                  <div className="aspect-square rounded-2xl bg-mint/40 flex items-center justify-center mb-4 border border-border">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-mint-foreground">{toothInfo.fdi}</div>
                      <div className="text-sm text-mint-foreground/80 mt-1">{guide.shape}</div>
                    </div>
                  </div>
                  <Stat label="Tooth group" value={guide.group} />
                  <div className="h-2" />
                  <Stat label="Access shape" value={guide.shape} />
                  <div className="h-2" />
                  <Stat label="Bur entry point" value={guide.entry} />
                  <div className="h-2" />
                  <Stat label="Key landmarks" value={guide.landmarks} />
                </Card>
                <Card title="Bur Recommendations">
                  <ul className="text-sm space-y-2">
                    {BUR_RECOMMENDATIONS.map((b) => (
                      <li key={b.phase}>
                        <span className="font-medium">{b.phase}:</span>{" "}
                        <span className="text-muted-foreground">{b.bur}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card title="Common Errors">
                  <p className="text-sm text-muted-foreground">{guide.errors}</p>
                </Card>
              </>
            );
          })()}

        {step === 5 && (
          <>
            <Card title="File System">
              <Label>System</Label>
              <select
                value={fileSys}
                onChange={(e) => setFileSys(e.target.value as FileSystem)}
                className="w-full rounded-2xl bg-input/40 border border-border px-4 py-3"
              >
                {FILE_SYSTEMS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
              <div className="h-3" />
              <Label>Initial binding file size (#{bindingSize})</Label>
              <input
                type="range"
                min={8}
                max={40}
                step={1}
                value={bindingSize}
                onChange={(e) => setBindingSize(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
            </Card>
            <Card title="Sequence">
              <Section heading="Glide path" items={protocol.glidePath} />
              <Section heading="Shaping" items={protocol.shaping} />
              <Section heading="Finishing" items={protocol.finishing} />
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Stat label="RPM" value={protocol.rpm} />
                <Stat label="Torque" value={protocol.torque} />
              </div>
              <div className="h-2" />
              <Stat label="Taper" value={protocol.taper} />
              <div className="h-2" />
              <Stat label="Master apical file" value={protocol.maf} />
            </Card>
            <Card title="MAF Guidance">
              <ul className="text-sm space-y-2">
                {MAF_GUIDANCE.map((m) => (
                  <li key={m.canal}>
                    <span className="font-medium">{m.canal}:</span>{" "}
                    <span className="text-muted-foreground">{m.maf}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-3">
                Minimum recommended apical preparation for adequate irrigation: ISO #25 with ≥0.04
                taper.
              </p>
            </Card>
          </>
        )}

        {step === 6 && (
          <Card title="Irrigation Protocol">
            <div className="space-y-3">
              {IRRIGATION_STEPS.map((s) => {
                const done = !!irrigDone[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() => setIrrigDone({ ...irrigDone, [s.id]: !done })}
                    className={`w-full text-left rounded-2xl border p-4 transition-all ${
                      done ? "bg-mint border-mint" : "bg-card border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                          done ? "bg-primary border-primary" : "border-border"
                        }`}
                      >
                        {done && <Check className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm flex items-center gap-2">
                          {s.label}
                          {s.warning && (
                            <AlertTriangle className="w-4 h-4 text-warning-foreground" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {s.concentration} · {s.volume} · {s.time}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-2xl bg-warning/30 border border-warning/40 p-3 text-xs text-warning-foreground space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4" /> Safety notes
              </div>
              <ul className="space-y-1.5 list-disc pl-4">
                {IRRIGATION_SAFETY.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {step === 7 && toothInfo && (
          <>
            <Card title="Rubber Dam Setup">
              <div className="rounded-2xl bg-peach p-4 mb-4">
                <div className="text-xs uppercase tracking-wide text-peach-foreground/70">
                  Tooth group
                </div>
                <div className="text-lg font-semibold capitalize text-peach-foreground">
                  {toothInfo.group}
                </div>
              </div>
              <Stat label="Recommended clamp" value={toothInfo.clamp} />
            </Card>
            <Card title="Tips & Clamp Guide">
              <div className="space-y-3">
                {RUBBER_DAM_TIPS.map((t) => (
                  <div key={t.category} className="rounded-xl border border-border p-3">
                    <div className="text-xs font-semibold text-foreground">{t.category}</div>
                    <div className="text-xs text-muted-foreground mt-1">{t.details}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {step === 8 && (
          <>
            <Card title="Case Summary">
              <Row label="Tooth" value={`${tooth} — ${toothInfo?.name}`} />
              <Row label="Diagnosis" value={dxInfo?.label ?? "—"} />
              <Row label="Access" value={toothInfo?.accessShape ?? "—"} />
              <Row label="File system" value={fileSys} />
              <Row label="MAF" value={protocol.maf} />
              <Row label="Clamp" value={toothInfo?.clamp ?? "—"} />
            </Card>
            <Link
              to="/workflow/summary"
              search={{ tooth, dx: activeDx, files: fileSys }}
              className="w-full rounded-2xl bg-primary text-primary-foreground py-4 font-semibold flex items-center justify-center gap-2 shadow-soft"
            >
              <Save className="w-5 h-5" /> Save Case & Schedule Follow-up
            </Link>
            <Link to="/profile" className="block text-center text-sm text-muted-foreground">
              View saved cases →
            </Link>
          </>
        )}
      </div>

      {/* Nav buttons */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={prev}
          disabled={step === 0}
          className="flex-1 rounded-2xl border border-border bg-card py-3 font-medium flex items-center justify-center gap-1 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={next}
          disabled={step === STEPS.length - 1}
          className="flex-[2] rounded-2xl bg-primary text-primary-foreground py-3 font-semibold flex items-center justify-center gap-1 disabled:opacity-40 shadow-soft"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card border border-border p-5 shadow-card">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-muted-foreground mb-2">{children}</label>;
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-mint/30 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wide text-mint-foreground/70 font-medium">
        {label}
      </div>
      <div className="text-sm font-semibold text-mint-foreground mt-0.5">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`absolute top-1 w-5 h-5 rounded-full bg-card transition-all ${value ? "left-6" : "left-1"}`}
        />
      </button>
    </div>
  );
}

function SegGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <div className="text-sm mb-2">{label}</div>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`flex-1 capitalize text-xs py-2 rounded-xl border transition-all ${
              value === o
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="py-2">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-input/40 border border-border px-4 py-3 text-sm"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Section({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="mb-3">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
        {heading}
      </div>
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm flex gap-2">
            <span className="w-5 h-5 rounded-full bg-mint text-mint-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
