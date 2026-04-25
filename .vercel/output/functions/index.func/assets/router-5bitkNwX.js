import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation, Outlet, Link, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import { Activity, BookOpen, Stethoscope, Wrench, User } from "lucide-react";
import { z } from "zod";
const tabs = [
  { to: "/workflow", label: "Workflow", icon: Activity },
  { to: "/anatomy", label: "Anatomy", icon: BookOpen },
  { to: "/diagnosis", label: "Diagnosis", icon: Stethoscope },
  { to: "/tools", label: "Tools", icon: Wrench },
  { to: "/profile", label: "Profile", icon: User }
];
function AppShell() {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsx("main", { className: `flex-1 ${!isAuthPage ? "pb-24" : ""} overflow-y-auto`, children: /* @__PURE__ */ jsx("div", { className: `w-full ${!isAuthPage ? "max-w-lg mx-auto px-4" : ""}`, children: /* @__PURE__ */ jsx(Outlet, {}) }) }),
    !isAuthPage && /* @__PURE__ */ jsx("nav", { className: "fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-5 px-2 py-2 max-w-lg mx-auto", children: tabs.map((t) => {
      const active = location.pathname.startsWith(t.to);
      const Icon = t.icon;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: t.to,
          className: `flex flex-col items-center gap-1 py-2 rounded-xl text-[11px] font-medium transition-all ${active ? "text-primary-foreground bg-primary shadow-sm scale-105" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }),
            t.label
          ]
        }
      ) }, t.to);
    }) }) })
  ] });
}
function PageHeader({ title, subtitle }) {
  return /* @__PURE__ */ jsxs("header", { className: "mb-6 pt-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
  ] });
}
const appCss = "/assets/styles-DZdGX6MJ.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$c = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Endo Made Easy — Clinical Decision Support" },
      { name: "description", content: "Step-by-step root canal workflow assistant for general dental practitioners." },
      { name: "theme-color", content: "#A7F3D0" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsx(AppShell, {});
}
const $$splitComponentImporter$b = () => import("./workflow-BVf00kae.js");
const Route$b = createFileRoute("/workflow")({
  head: () => ({
    meta: [{
      title: "Workflow — Endo Made Easy"
    }, {
      name: "description",
      content: "Guided 9-step root canal workflow."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./tools-CCCKuTV0.js");
const Route$a = createFileRoute("/tools")({
  head: () => ({
    meta: [{
      title: "Tools — Endo Made Easy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./signup-BCWvQWfS.js");
const Route$9 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./profile-DEU6zc-N.js");
const Route$8 = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "Profile — Endo Made Easy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-MTZnHsVt.js");
const Route$7 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./diagnosis-CfZ-HwsG.js");
const Route$6 = createFileRoute("/diagnosis")({
  head: () => ({
    meta: [{
      title: "Diagnosis — Endo Made Easy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./anatomy-DJr03Z1w.js");
const Route$5 = createFileRoute("/anatomy")({
  head: () => ({
    meta: [{
      title: "Anatomy — Endo Made Easy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-FDwuVWDr.js");
const Route$4 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const TEETH = [
  { fdi: "11", name: "Max Central Incisor", roots: "1", canals: "1", accessShape: "Triangular (lingual)", workingLength: "22.5 mm", group: "anterior", clamp: "Butterfly W2/W2A or Ivory #9" },
  { fdi: "21", name: "Max Central Incisor", roots: "1", canals: "1", accessShape: "Triangular (lingual)", workingLength: "22.5 mm", group: "anterior", clamp: "Butterfly W2/W2A or Ivory #9" },
  { fdi: "12", name: "Max Lateral Incisor", roots: "1", canals: "1", accessShape: "Ovoid (lingual)", workingLength: "22.0 mm", group: "anterior", clamp: "Butterfly W2/W2A or Ivory #9" },
  { fdi: "22", name: "Max Lateral Incisor", roots: "1", canals: "1", accessShape: "Ovoid (lingual)", workingLength: "22.0 mm", group: "anterior", clamp: "Butterfly W2/W2A or Ivory #9" },
  { fdi: "13", name: "Max Canine", roots: "1", canals: "1", accessShape: "Ovoid (lingual)", workingLength: "26.5 mm", group: "anterior", clamp: "Ivory #9 / W2A" },
  { fdi: "23", name: "Max Canine", roots: "1", canals: "1", accessShape: "Ovoid (lingual)", workingLength: "26.5 mm", group: "anterior", clamp: "Ivory #9 / W2A" },
  { fdi: "14", name: "Max 1st Premolar", roots: "1–2", canals: "2 (60–65%)", accessShape: "Ovoid (occlusal)", workingLength: "21.5 mm", group: "premolar", clamp: "#2 universal premolar" },
  { fdi: "24", name: "Max 1st Premolar", roots: "1–2", canals: "2 (60–65%)", accessShape: "Ovoid (occlusal)", workingLength: "21.5 mm", group: "premolar", clamp: "#2 universal premolar" },
  { fdi: "15", name: "Max 2nd Premolar", roots: "1", canals: "1 (75%)", accessShape: "Ovoid (occlusal)", workingLength: "21.5 mm", group: "premolar", clamp: "#2 / #2A premolar" },
  { fdi: "25", name: "Max 2nd Premolar", roots: "1", canals: "1 (75%)", accessShape: "Ovoid (occlusal)", workingLength: "21.5 mm", group: "premolar", clamp: "#2 / #2A premolar" },
  { fdi: "16", name: "Max 1st Molar", roots: "3", canals: "3–4 (MB2: 60–90%)", accessShape: "Triangular (occlusal)", workingLength: "21.0 mm", group: "molar", clamp: "#14 / #14A maxillary molar" },
  { fdi: "26", name: "Max 1st Molar", roots: "3", canals: "3–4 (MB2: 60–90%)", accessShape: "Triangular (occlusal)", workingLength: "21.0 mm", group: "molar", clamp: "#14 / #14A maxillary molar" },
  { fdi: "17", name: "Max 2nd Molar", roots: "3", canals: "3–4", accessShape: "Triangular (occlusal)", workingLength: "20.0 mm", group: "molar", clamp: "#14 / #14A maxillary molar" },
  { fdi: "27", name: "Max 2nd Molar", roots: "3", canals: "3–4", accessShape: "Triangular (occlusal)", workingLength: "20.0 mm", group: "molar", clamp: "#14 / #14A maxillary molar" },
  { fdi: "31", name: "Mand Central Incisor", roots: "1", canals: "1–2", accessShape: "Ovoid (lingual)", workingLength: "21.0 mm", group: "anterior", clamp: "#00 / Butterfly small" },
  { fdi: "41", name: "Mand Central Incisor", roots: "1", canals: "1–2", accessShape: "Ovoid (lingual)", workingLength: "21.0 mm", group: "anterior", clamp: "#00 / Butterfly small" },
  { fdi: "32", name: "Mand Lateral Incisor", roots: "1", canals: "1–2", accessShape: "Ovoid (lingual)", workingLength: "21.5 mm", group: "anterior", clamp: "#00 / Butterfly small" },
  { fdi: "42", name: "Mand Lateral Incisor", roots: "1", canals: "1–2", accessShape: "Ovoid (lingual)", workingLength: "21.5 mm", group: "anterior", clamp: "#00 / Butterfly small" },
  { fdi: "33", name: "Mand Canine", roots: "1", canals: "1–2", accessShape: "Ovoid (lingual)", workingLength: "25.5 mm", group: "anterior", clamp: "Ivory #9 / W2A" },
  { fdi: "43", name: "Mand Canine", roots: "1", canals: "1–2", accessShape: "Ovoid (lingual)", workingLength: "25.5 mm", group: "anterior", clamp: "Ivory #9 / W2A" },
  { fdi: "34", name: "Mand 1st Premolar", roots: "1", canals: "1 (75%)", accessShape: "Ovoid (occlusal)", workingLength: "21.5 mm", group: "premolar", clamp: "#2 / W8A premolar" },
  { fdi: "44", name: "Mand 1st Premolar", roots: "1", canals: "1 (75%)", accessShape: "Ovoid (occlusal)", workingLength: "21.5 mm", group: "premolar", clamp: "#2 / W8A premolar" },
  { fdi: "35", name: "Mand 2nd Premolar", roots: "1", canals: "1 (85%)", accessShape: "Ovoid (occlusal)", workingLength: "22.0 mm", group: "premolar", clamp: "#2 / W8A premolar" },
  { fdi: "45", name: "Mand 2nd Premolar", roots: "1", canals: "1 (85%)", accessShape: "Ovoid (occlusal)", workingLength: "22.0 mm", group: "premolar", clamp: "#2 / W8A premolar" },
  { fdi: "36", name: "Mand 1st Molar", roots: "2", canals: "3–4 (M: 2, D: 1–2)", accessShape: "Trapezoidal (occlusal)", workingLength: "21.0 mm", group: "molar", clamp: "#7 or #56 mandibular molar" },
  { fdi: "46", name: "Mand 1st Molar", roots: "2", canals: "3–4 (M: 2, D: 1–2)", accessShape: "Trapezoidal (occlusal)", workingLength: "21.0 mm", group: "molar", clamp: "#7 or #56 mandibular molar" },
  { fdi: "37", name: "Mand 2nd Molar", roots: "2", canals: "3 (M: 2, D: 1)", accessShape: "Trapezoidal (occlusal)", workingLength: "20.0 mm", group: "molar", clamp: "#7 or #56 mandibular molar" },
  { fdi: "47", name: "Mand 2nd Molar", roots: "2", canals: "3 (M: 2, D: 1)", accessShape: "Trapezoidal (occlusal)", workingLength: "20.0 mm", group: "molar", clamp: "#7 or #56 mandibular molar" }
];
const ACCESS_GUIDES = [
  { group: "Max Incisors", shape: "Triangular", entry: "Cingulum (lingual)", landmarks: "Stays within cingulum; slight incisal extension", errors: "Too far incisal — weakens incisal edge" },
  { group: "Max Canine", shape: "Ovoid", entry: "Cingulum (lingual)", landmarks: "Ovoid shape follows root cross-section", errors: "Under-extension bucco-lingually" },
  { group: "Max Premolars", shape: "Ovoid / Slot", entry: "Central fossa (occlusal)", landmarks: "B–L oriented; two orifices in 1st premolar", errors: "Too conservative — miss 2nd canal" },
  { group: "Max Molars", shape: "Triangular", entry: "Mesial to central fossa", landmarks: "Triangle: MB, DB, P orifices; search for MB2", errors: "Not extending mesially enough for MB2" },
  { group: "Mand Incisors", shape: "Ovoid", entry: "Cingulum (lingual)", landmarks: "Very narrow B–L; ~40% have 2 canals", errors: "Miss lingual canal" },
  { group: "Mand Premolars", shape: "Ovoid", entry: "Central fossa (occlusal)", landmarks: "Round to slightly ovoid", errors: "Excessive enlargement" },
  { group: "Mand Molars", shape: "Trapezoidal", entry: "Mesial to central pit", landmarks: "Wider mesially; 2 mesial + 1–2 distal orifices", errors: "Not extending far enough mesially" }
];
const BUR_RECOMMENDATIONS = [
  { phase: "Initial penetration", bur: "Endo Access bur (size 1 or 2) or round diamond bur (BR-46)" },
  { phase: "Deroofing", bur: "Non-end-cutting bur (Endo-Z) to safely remove pulp chamber roof" },
  { phase: "Orifice location", bur: "DG16 explorer or ultrasonic tips (Start-X) for finding/troughing orifices" },
  { phase: "Straight-line access", bur: "Gates Glidden #2–#3 for coronal flaring (use carefully in thin roots)" }
];
const FILE_SYSTEMS = [
  "ProTaper Gold",
  "ProTaper Next",
  "WaveOne Gold",
  "Hyflex EDM",
  "K-Files"
];
const FILE_PROTOCOLS = {
  "ProTaper Gold": {
    glidePath: ["#10 K-File to WL", "#15 K-File to WL", "PathFile #1 → #2 → #3"],
    shaping: ["SX (coronal flare)", "S1 to WL", "S2 to WL"],
    finishing: ["F1 (20/.07)", "F2 (25/.08)", "F3 (30/.09)"],
    taper: "Variable",
    rpm: "300 RPM",
    torque: "2 – 5 Ncm (file-dependent)",
    maf: "F2 (25/.08) standard; F3 for wider canals"
  },
  "ProTaper Next": {
    glidePath: ["#10 K-File to WL", "#15 K-File to WL", "PathFile #1 → #2 → #3"],
    shaping: ["X1 (17/.04)", "X2 (25/.06)"],
    finishing: ["X3 (30/.07)", "X4 (40/.06)", "X5 (50/.06)"],
    taper: "Variable",
    rpm: "300 RPM",
    torque: "2 – 5 Ncm (file-dependent)",
    maf: "X2 (25/.06) standard"
  },
  "WaveOne Gold": {
    glidePath: ["#10 K-File to WL", "#15 K-File to WL", "Glide path file"],
    shaping: ["Primary (25/.07) – single file reciprocating"],
    finishing: ["Small (20/.07)", "Medium (35/.06)", "Large (45/.05)"],
    taper: "Variable",
    rpm: "Reciprocation – WaveOne ALL setting",
    torque: "Motor preset",
    maf: "Primary (25/.07)"
  },
  "Hyflex EDM": {
    glidePath: ["#10 K-File to WL", "#15 K-File to WL", "Glidepath file (10/.05)"],
    shaping: ["Orifice opener", "Glidepath", "OneFile (25/~)"],
    finishing: ["OneFile or step up to desired size"],
    taper: "Variable",
    rpm: "300 – 500 RPM",
    torque: "2.5 Ncm",
    maf: "25/~ OneFile"
  },
  "K-Files": {
    glidePath: ["#10 → #15 to WL"],
    shaping: ["Step-back: #20 → #25 → #30 → #35 at WL"],
    finishing: ["Step-back 1mm increments: #40, #45, #50"],
    taper: "0.02",
    rpm: "Hand instrumentation (watch-winding + pull)",
    torque: "—",
    maf: "Minimum #25, ideally #30–35"
  }
};
const MAF_GUIDANCE = [
  { canal: "Narrow (incisors, premolars)", maf: "#25 or #30 (0.04–0.06 taper)" },
  { canal: "Medium (canines, distal molar canals)", maf: "#30–#35" },
  { canal: "Wide (palatal, single-rooted)", maf: "#35–#50" }
];
const DIAGNOSES = [
  {
    id: "normal",
    label: "Normal Pulp",
    symptoms: "No spontaneous pain; responds normally to tests",
    pulpTests: "Positive (normal response to cold/EPT)",
    radiograph: "Normal PDL, no periapical radiolucency",
    treatment: "No treatment needed",
    color: "mint"
  },
  {
    id: "reversible",
    label: "Reversible Pulpitis",
    symptoms: "Sharp, brief pain to cold/sweet; no spontaneous pain",
    pulpTests: "Exaggerated but brief response to cold",
    radiograph: "Normal or slightly widened PDL",
    treatment: "Remove irritant; restore tooth",
    color: "mint"
  },
  {
    id: "irreversible-symp",
    label: "Irreversible Pulpitis (Symptomatic)",
    symptoms: "Spontaneous, lingering pain; worse at night; referred pain",
    pulpTests: "Lingering pain to cold (>30s); may respond to heat",
    radiograph: "Normal to slight PDL widening",
    treatment: "Root canal treatment",
    color: "peach"
  },
  {
    id: "irreversible-asymp",
    label: "Irreversible Pulpitis (Asymptomatic)",
    symptoms: "No symptoms; incidental finding",
    pulpTests: "Delayed/diminished response",
    radiograph: "Normal to slight changes",
    treatment: "Root canal treatment",
    color: "peach"
  },
  {
    id: "necrosis",
    label: "Pulp Necrosis",
    symptoms: "No response to vitality tests; history of trauma/caries",
    pulpTests: "No response to cold or EPT",
    radiograph: "Periapical radiolucency possible",
    treatment: "Root canal treatment",
    color: "peach"
  },
  {
    id: "apical",
    label: "Symptomatic Apical Periodontitis",
    symptoms: "Pain on biting/percussion; localized swelling possible",
    pulpTests: "Variable (may be non-responsive)",
    radiograph: "Periapical radiolucency",
    treatment: "Root canal treatment",
    color: "warning"
  },
  {
    id: "chronic-abscess",
    label: "Chronic Apical Abscess",
    symptoms: "Sinus tract; mild or no pain",
    pulpTests: "Non-responsive",
    radiograph: "Well-defined periapical radiolucency",
    treatment: "Root canal treatment",
    color: "warning"
  },
  {
    id: "acute-abscess",
    label: "Acute Apical Abscess",
    symptoms: "Severe throbbing pain; swelling; fever; malaise",
    pulpTests: "Non-responsive",
    radiograph: "May show widened PDL or radiolucency",
    treatment: "I&D + RCT or extraction",
    color: "destructive"
  }
];
const IRRIGATION_STEPS = [
  { id: "init", label: "Initial flood — NaOCl", concentration: "2.5–5.25%", volume: "2–3 mL", time: "Fill chamber; replenish each file", warning: false },
  { id: "during", label: "During instrumentation — NaOCl", concentration: "2.5–5.25%", volume: "1–2 mL / file", time: "Side-vented needle 1mm short of WL", warning: false },
  { id: "calcified", label: "Calcified canals — EDTA", concentration: "17% (gel/liquid)", volume: "1 mL", time: "Alternate with NaOCl to negotiate", warning: false },
  { id: "final1", label: "Final rinse 1 — NaOCl", concentration: "2.5–5.25%", volume: "3–5 mL", time: "1 min; activate with PUI/sonic if available", warning: true },
  { id: "smear", label: "Smear layer removal — EDTA", concentration: "17%", volume: "1–3 mL", time: "1 min; agitate", warning: false },
  { id: "final2", label: "Final rinse 2 — NaOCl", concentration: "2.5–5.25%", volume: "2–3 mL", time: "30 sec; penetrates open tubules", warning: true },
  { id: "chx", label: "Optional — CHX (persistent infection)", concentration: "2%", volume: "2–3 mL", time: "Saline flush BEFORE CHX (avoid precipitate)", warning: true },
  { id: "dry", label: "Drying — Paper points", concentration: "—", volume: "—", time: "Dry to WL; ready for obturation", warning: false }
];
const IRRIGATION_SAFETY = [
  "NEVER mix NaOCl and CHX directly — forms toxic parachloroaniline. Always flush with saline between them.",
  "Use side-vented needles (27 or 30 gauge) positioned 1–2 mm short of WL. Never bind in the canal.",
  "Rubber dam is MANDATORY during NaOCl irrigation to prevent soft-tissue contact.",
  "Open apex cases: use lower NaOCl concentration (1–2.5%) and avoid aggressive apical delivery.",
  "Activation methods (PUI, sonic, laser) significantly improve cleaning when available."
];
const RUBBER_DAM_TIPS = [
  { category: "Anteriors", details: "Butterfly clamp (W2/W2A) or Ivory #9 for incisors; #00 for smaller teeth; winged clamps allow simultaneous placement" },
  { category: "Premolars", details: "#2 (universal premolar); #2A for smaller premolars; W8A (wingless) for sub-gingival margins" },
  { category: "Molars", details: "#14/14A for maxillary molars; #7 or #56 for mandibular molars; #8A for partially erupted" },
  { category: "Broken-down teeth", details: "Build up with GIC/composite band before clamping; consider #212 or #26N for minimal structure" },
  { category: "Isolation strategy", details: "Single-tooth isolation preferred for endo; clamp on the tooth being treated; frame placement before inversion" },
  { category: "Punching holes", details: "Use correct hole size from punch template; single hole for endo; position tooth correctly on dam grid" },
  { category: "Inversion technique", details: "Use flat plastic or explorer to tuck dam into sulcus; dry tooth first; air from 3-in-1 syringe helps" },
  { category: "Common problems", details: "Dam tears: use heavy-gauge dam; clamp slips: ensure 4-point contact; leakage: use OraSeal/dam sealant" },
  { category: "Special situations", details: "Braces: wedjets or floss ties; Bridges: pass dam under pontic; Crowns: clamp may need to be inverted (jaws-down)" }
];
const $$splitComponentImporter$3 = () => import("./workflow.summary-FT_l52JC.js");
const searchSchema = z.object({
  tooth: z.string().optional().default("16"),
  dx: z.string().optional().default("normal"),
  files: z.enum(FILE_SYSTEMS).optional().default("ProTaper Gold")
});
const Route$3 = createFileRoute("/workflow/summary")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Case Summary — Endo Made Easy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./tools.rubber-dam--MYwjkIQ.js");
const Route$2 = createFileRoute("/tools/rubber-dam")({
  head: () => ({
    meta: [{
      title: "Rubber Dam Guide — Endo Made Easy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./tools.irrigation-92OfHONK.js");
const Route$1 = createFileRoute("/tools/irrigation")({
  head: () => ({
    meta: [{
      title: "Irrigation Protocol — Endo Made Easy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./tools.file-calculator-CtN1gGSE.js");
const Route = createFileRoute("/tools/file-calculator")({
  head: () => ({
    meta: [{
      title: "File Calculator — Endo Made Easy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WorkflowRoute = Route$b.update({
  id: "/workflow",
  path: "/workflow",
  getParentRoute: () => Route$c
});
const ToolsRoute = Route$a.update({
  id: "/tools",
  path: "/tools",
  getParentRoute: () => Route$c
});
const SignupRoute = Route$9.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$c
});
const ProfileRoute = Route$8.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$c
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$c
});
const DiagnosisRoute = Route$6.update({
  id: "/diagnosis",
  path: "/diagnosis",
  getParentRoute: () => Route$c
});
const AnatomyRoute = Route$5.update({
  id: "/anatomy",
  path: "/anatomy",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const WorkflowSummaryRoute = Route$3.update({
  id: "/summary",
  path: "/summary",
  getParentRoute: () => WorkflowRoute
});
const ToolsRubberDamRoute = Route$2.update({
  id: "/rubber-dam",
  path: "/rubber-dam",
  getParentRoute: () => ToolsRoute
});
const ToolsIrrigationRoute = Route$1.update({
  id: "/irrigation",
  path: "/irrigation",
  getParentRoute: () => ToolsRoute
});
const ToolsFileCalculatorRoute = Route.update({
  id: "/file-calculator",
  path: "/file-calculator",
  getParentRoute: () => ToolsRoute
});
const ToolsRouteChildren = {
  ToolsFileCalculatorRoute,
  ToolsIrrigationRoute,
  ToolsRubberDamRoute
};
const ToolsRouteWithChildren = ToolsRoute._addFileChildren(ToolsRouteChildren);
const WorkflowRouteChildren = {
  WorkflowSummaryRoute
};
const WorkflowRouteWithChildren = WorkflowRoute._addFileChildren(
  WorkflowRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AnatomyRoute,
  DiagnosisRoute,
  LoginRoute,
  ProfileRoute,
  SignupRoute,
  ToolsRoute: ToolsRouteWithChildren,
  WorkflowRoute: WorkflowRouteWithChildren
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ACCESS_GUIDES as A,
  BUR_RECOMMENDATIONS as B,
  DIAGNOSES as D,
  FILE_SYSTEMS as F,
  IRRIGATION_STEPS as I,
  MAF_GUIDANCE as M,
  PageHeader as P,
  RUBBER_DAM_TIPS as R,
  TEETH as T,
  FILE_PROTOCOLS as a,
  IRRIGATION_SAFETY as b,
  Route$3 as c,
  router as r
};
