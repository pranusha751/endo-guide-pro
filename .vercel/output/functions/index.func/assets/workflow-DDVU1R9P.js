import { r as reactExports, T as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, T as TEETH, D as DIAGNOSES, P as PageHeader, A as ACCESS_GUIDES, B as BUR_RECOMMENDATIONS, F as FILE_SYSTEMS, a as FILE_PROTOCOLS, M as MAF_GUIDANCE, I as IRRIGATION_STEPS, b as IRRIGATION_SAFETY, R as RUBBER_DAM_TIPS, L as Link } from "./router-kFOIupVK.js";
import { C as Check, T as TriangleAlert } from "./triangle-alert-D6gMd2pV.js";
import { S as Save } from "./save-C4eYZ71g.js";
import { C as ChevronRight } from "./chevron-right-DORqQToG.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
function accessGroupFor(fdi, group) {
  const upper = fdi.startsWith("1") || fdi.startsWith("2");
  if (group === "anterior") {
    if (upper && fdi.endsWith("3")) return "Max Canine";
    return upper ? "Max Incisors" : "Mand Incisors";
  }
  if (group === "premolar") return upper ? "Max Premolars" : "Mand Premolars";
  return upper ? "Max Molars" : "Mand Molars";
}
const STEPS = ["Tooth", "Symptoms", "Pulp Tests", "Diagnosis", "Access", "Files", "Irrigation", "Rubber Dam", "Summary"];
function WorkflowPage() {
  const [step, setStep] = reactExports.useState(0);
  const [tooth, setTooth] = reactExports.useState("16");
  const [symptoms, setSymptoms] = reactExports.useState({
    spontaneous: false,
    cold: "none",
    biting: false,
    swelling: "none",
    sinus: false
  });
  const [tests, setTests] = reactExports.useState({
    cold: "Normal",
    ept: "Normal",
    percussion: "Negative",
    palpation: "Negative",
    radiograph: "Normal PDL"
  });
  const [diagnosis, setDiagnosis] = reactExports.useState("");
  const [fileSys, setFileSys] = reactExports.useState("ProTaper Gold");
  const [bindingSize, setBindingSize] = reactExports.useState(15);
  const [irrigDone, setIrrigDone] = reactExports.useState({});
  const toothInfo = reactExports.useMemo(() => TEETH.find((t) => t.fdi === tooth), [tooth]);
  const protocol = FILE_PROTOCOLS[fileSys];
  const suggestedDx = reactExports.useMemo(() => {
    if (symptoms.swelling === "diffuse") return "acute-abscess";
    if (symptoms.sinus) return "chronic-abscess";
    if (symptoms.swelling === "localized" && symptoms.spontaneous) return "acute-abscess";
    if (tests.percussion !== "Negative" && (tests.cold === "No response" || tests.radiograph === "PA radiolucency")) return "apical";
    if (tests.cold === "No response" && tests.ept === "No response") return "necrosis";
    if (symptoms.cold === "lingering" || symptoms.spontaneous) return "irreversible-symp";
    if (symptoms.cold === "brief") return "reversible";
    return "normal";
  }, [symptoms, tests]);
  const activeDx = diagnosis || suggestedDx;
  const dxInfo = DIAGNOSES.find((d) => d.id === activeDx);
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Endodontic Workflow", subtitle: `Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-6", children: STEPS.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}` }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300", children: [
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Tooth Selection", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "FDI Tooth Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: tooth, onChange: (e) => setTooth(e.target.value), className: "w-full rounded-2xl bg-input/40 border border-border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring", children: TEETH.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: t.fdi, children: [
          t.fdi,
          " — ",
          t.name
        ] }, t.fdi)) }),
        toothInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Roots", value: toothInfo.roots }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Canals", value: toothInfo.canals }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Access shape", value: toothInfo.accessShape }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Working length", value: toothInfo.workingLength })
        ] })
      ] }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Symptoms", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Spontaneous pain", value: symptoms.spontaneous, onChange: (v) => setSymptoms({
          ...symptoms,
          spontaneous: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SegGroup, { label: "Pain to cold", value: symptoms.cold, options: ["none", "brief", "lingering"], onChange: (v) => setSymptoms({
          ...symptoms,
          cold: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Pain on biting", value: symptoms.biting, onChange: (v) => setSymptoms({
          ...symptoms,
          biting: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SegGroup, { label: "Swelling", value: symptoms.swelling, options: ["none", "localized", "diffuse"], onChange: (v) => setSymptoms({
          ...symptoms,
          swelling: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Sinus tract", value: symptoms.sinus, onChange: (v) => setSymptoms({
          ...symptoms,
          sinus: v
        }) })
      ] }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Pulp & Periapical Tests", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "Cold test", value: tests.cold, options: ["Normal", "Brief response", "Lingering response", "No response"], onChange: (v) => setTests({
          ...tests,
          cold: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "EPT response", value: tests.ept, options: ["Normal", "Reduced", "Heightened", "No response"], onChange: (v) => setTests({
          ...tests,
          ept: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "Percussion", value: tests.percussion, options: ["Negative", "Mild", "Severe"], onChange: (v) => setTests({
          ...tests,
          percussion: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "Palpation", value: tests.palpation, options: ["Negative", "Tender", "Swelling"], onChange: (v) => setTests({
          ...tests,
          palpation: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "Radiograph findings", value: tests.radiograph, options: ["Normal PDL", "Widened PDL", "PA radiolucency", "Resorption"], onChange: (v) => setTests({
          ...tests,
          radiograph: v
        }) })
      ] }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Suggested Diagnosis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl p-4 bg-${dxInfo?.color} text-${dxInfo?.color}-foreground`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide opacity-70", children: "Most likely" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold mt-1", children: dxInfo?.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 opacity-90", children: dxInfo?.treatment })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Override (Manual)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: DIAGNOSES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDiagnosis(d.id), className: `w-full text-left rounded-2xl px-4 py-3 border transition-all ${activeDx === d.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: d.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: d.treatment })
        ] }, d.id)) }) })
      ] }),
      step === 4 && toothInfo && (() => {
        const guide = ACCESS_GUIDES.find((g) => g.group === accessGroupFor(toothInfo.fdi, toothInfo.group));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Access Cavity Design", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-2xl bg-mint/40 flex items-center justify-center mb-4 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-bold text-mint-foreground", children: toothInfo.fdi }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-mint-foreground/80 mt-1", children: guide.shape })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Tooth group", value: guide.group }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Access shape", value: guide.shape }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Bur entry point", value: guide.entry }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Key landmarks", value: guide.landmarks })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Bur Recommendations", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm space-y-2", children: BUR_RECOMMENDATIONS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              b.phase,
              ":"
            ] }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: b.bur })
          ] }, b.phase)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Common Errors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: guide.errors }) })
        ] });
      })(),
      step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "File System", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "System" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: fileSys, onChange: (e) => setFileSys(e.target.value), className: "w-full rounded-2xl bg-input/40 border border-border px-4 py-3", children: FILE_SYSTEMS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: f }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "Initial binding file size (#",
            bindingSize,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 8, max: 40, step: 1, value: bindingSize, onChange: (e) => setBindingSize(parseInt(e.target.value)), className: "w-full accent-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Sequence", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { heading: "Glide path", items: protocol.glidePath }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { heading: "Shaping", items: protocol.shaping }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { heading: "Finishing", items: protocol.finishing }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "RPM", value: protocol.rpm }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Torque", value: protocol.torque })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Taper", value: protocol.taper }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Master apical file", value: protocol.maf })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "MAF Guidance", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm space-y-2", children: MAF_GUIDANCE.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              m.canal,
              ":"
            ] }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: m.maf })
          ] }, m.canal)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "Minimum recommended apical preparation for adequate irrigation: ISO #25 with ≥0.04 taper." })
        ] })
      ] }),
      step === 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Irrigation Protocol", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: IRRIGATION_STEPS.map((s) => {
          const done = !!irrigDone[s.id];
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIrrigDone({
            ...irrigDone,
            [s.id]: !done
          }), className: `w-full text-left rounded-2xl border p-4 transition-all ${done ? "bg-mint border-mint" : "bg-card border-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-6 h-6 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${done ? "bg-primary border-primary" : "border-border"}`, children: done && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-sm flex items-center gap-2", children: [
                s.label,
                s.warning && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-warning-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                s.concentration,
                " · ",
                s.volume,
                " · ",
                s.time
              ] })
            ] })
          ] }) }, s.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-warning/30 border border-warning/40 p-3 text-xs text-warning-foreground space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
            " Safety notes"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 list-disc pl-4", children: IRRIGATION_SAFETY.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: s }, s)) })
        ] })
      ] }),
      step === 7 && toothInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Rubber Dam Setup", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-peach p-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-peach-foreground/70", children: "Tooth group" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold capitalize text-peach-foreground", children: toothInfo.group })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Recommended clamp", value: toothInfo.clamp })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Tips & Clamp Guide", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: RUBBER_DAM_TIPS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-foreground", children: t.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: t.details })
        ] }, t.category)) }) })
      ] }),
      step === 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Case Summary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Tooth", value: `${tooth} — ${toothInfo?.name}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Diagnosis", value: dxInfo?.label ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Access", value: toothInfo?.accessShape ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "File system", value: fileSys }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "MAF", value: protocol.maf }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Clamp", value: toothInfo?.clamp ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/workflow/summary", search: {
          tooth,
          dx: activeDx,
          files: fileSys
        }, className: "w-full rounded-2xl bg-primary text-primary-foreground py-4 font-semibold flex items-center justify-center gap-2 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-5 h-5" }),
          " Save Case & Schedule Follow-up"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", className: "block text-center text-sm text-muted-foreground", children: "View saved cases →" })
      ] })
    ] }, step),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: prev, disabled: step === 0, className: "flex-1 rounded-2xl border border-border bg-card py-3 font-medium flex items-center justify-center gap-1 disabled:opacity-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: next, disabled: step === STEPS.length - 1, className: "flex-[2] rounded-2xl bg-primary text-primary-foreground py-3 font-semibold flex items-center justify-center gap-1 disabled:opacity-40 shadow-soft", children: [
        "Continue ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
      ] })
    ] })
  ] });
}
function Card({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card border border-border p-5 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4", children: title }),
    children
  ] });
}
function Label({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-2", children });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-mint/30 px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wide text-mint-foreground/70 font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-mint-foreground mt-0.5", children: value })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-2 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: value })
  ] });
}
function Toggle({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(!value), className: `w-12 h-7 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-muted"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-1 w-5 h-5 rounded-full bg-card transition-all ${value ? "left-6" : "left-1"}` }) })
  ] });
}
function SegGroup({
  label,
  value,
  options,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(o), className: `flex-1 capitalize text-xs py-2 rounded-xl border transition-all ${value === o ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"}`, children: o }, o)) })
  ] });
}
function SelectField({
  label,
  value,
  options,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value, onChange: (e) => onChange(e.target.value), className: "w-full rounded-2xl bg-input/40 border border-border px-4 py-3 text-sm", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: o }, o)) })
  ] });
}
function Section({
  heading,
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: heading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1.5", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-mint text-mint-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0", children: i + 1 }),
      item
    ] }, i)) })
  ] });
}
export {
  WorkflowPage as component
};
