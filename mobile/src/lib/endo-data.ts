export interface ToothInfo {
  fdi: string;
  name: string;
  roots: string;
  canals: string;
  accessShape: string;
  workingLength: string;
  group: "anterior" | "premolar" | "molar";
  clamp: string;
}

// Anatomy values per Endo Made Easy spec (Section 3)
export const TEETH: ToothInfo[] = [
  {
    fdi: "11",
    name: "Max Central Incisor",
    roots: "1",
    canals: "1",
    accessShape: "Triangular (lingual)",
    workingLength: "22.5 mm",
    group: "anterior",
    clamp: "Butterfly W2/W2A or Ivory #9",
  },
  {
    fdi: "21",
    name: "Max Central Incisor",
    roots: "1",
    canals: "1",
    accessShape: "Triangular (lingual)",
    workingLength: "22.5 mm",
    group: "anterior",
    clamp: "Butterfly W2/W2A or Ivory #9",
  },
  {
    fdi: "12",
    name: "Max Lateral Incisor",
    roots: "1",
    canals: "1",
    accessShape: "Ovoid (lingual)",
    workingLength: "22.0 mm",
    group: "anterior",
    clamp: "Butterfly W2/W2A or Ivory #9",
  },
  {
    fdi: "22",
    name: "Max Lateral Incisor",
    roots: "1",
    canals: "1",
    accessShape: "Ovoid (lingual)",
    workingLength: "22.0 mm",
    group: "anterior",
    clamp: "Butterfly W2/W2A or Ivory #9",
  },
  {
    fdi: "13",
    name: "Max Canine",
    roots: "1",
    canals: "1",
    accessShape: "Ovoid (lingual)",
    workingLength: "26.5 mm",
    group: "anterior",
    clamp: "Ivory #9 / W2A",
  },
  {
    fdi: "23",
    name: "Max Canine",
    roots: "1",
    canals: "1",
    accessShape: "Ovoid (lingual)",
    workingLength: "26.5 mm",
    group: "anterior",
    clamp: "Ivory #9 / W2A",
  },
  {
    fdi: "14",
    name: "Max 1st Premolar",
    roots: "1–2",
    canals: "2 (60–65%)",
    accessShape: "Ovoid (occlusal)",
    workingLength: "21.5 mm",
    group: "premolar",
    clamp: "#2 universal premolar",
  },
  {
    fdi: "24",
    name: "Max 1st Premolar",
    roots: "1–2",
    canals: "2 (60–65%)",
    accessShape: "Ovoid (occlusal)",
    workingLength: "21.5 mm",
    group: "premolar",
    clamp: "#2 universal premolar",
  },
  {
    fdi: "15",
    name: "Max 2nd Premolar",
    roots: "1",
    canals: "1 (75%)",
    accessShape: "Ovoid (occlusal)",
    workingLength: "21.5 mm",
    group: "premolar",
    clamp: "#2 / #2A premolar",
  },
  {
    fdi: "25",
    name: "Max 2nd Premolar",
    roots: "1",
    canals: "1 (75%)",
    accessShape: "Ovoid (occlusal)",
    workingLength: "21.5 mm",
    group: "premolar",
    clamp: "#2 / #2A premolar",
  },
  {
    fdi: "16",
    name: "Max 1st Molar",
    roots: "3",
    canals: "3–4 (MB2: 60–90%)",
    accessShape: "Triangular (occlusal)",
    workingLength: "21.0 mm",
    group: "molar",
    clamp: "#14 / #14A maxillary molar",
  },
  {
    fdi: "26",
    name: "Max 1st Molar",
    roots: "3",
    canals: "3–4 (MB2: 60–90%)",
    accessShape: "Triangular (occlusal)",
    workingLength: "21.0 mm",
    group: "molar",
    clamp: "#14 / #14A maxillary molar",
  },
  {
    fdi: "17",
    name: "Max 2nd Molar",
    roots: "3",
    canals: "3–4",
    accessShape: "Triangular (occlusal)",
    workingLength: "20.0 mm",
    group: "molar",
    clamp: "#14 / #14A maxillary molar",
  },
  {
    fdi: "27",
    name: "Max 2nd Molar",
    roots: "3",
    canals: "3–4",
    accessShape: "Triangular (occlusal)",
    workingLength: "20.0 mm",
    group: "molar",
    clamp: "#14 / #14A maxillary molar",
  },
  {
    fdi: "31",
    name: "Mand Central Incisor",
    roots: "1",
    canals: "1–2",
    accessShape: "Ovoid (lingual)",
    workingLength: "21.0 mm",
    group: "anterior",
    clamp: "#00 / Butterfly small",
  },
  {
    fdi: "41",
    name: "Mand Central Incisor",
    roots: "1",
    canals: "1–2",
    accessShape: "Ovoid (lingual)",
    workingLength: "21.0 mm",
    group: "anterior",
    clamp: "#00 / Butterfly small",
  },
  {
    fdi: "32",
    name: "Mand Lateral Incisor",
    roots: "1",
    canals: "1–2",
    accessShape: "Ovoid (lingual)",
    workingLength: "21.5 mm",
    group: "anterior",
    clamp: "#00 / Butterfly small",
  },
  {
    fdi: "42",
    name: "Mand Lateral Incisor",
    roots: "1",
    canals: "1–2",
    accessShape: "Ovoid (lingual)",
    workingLength: "21.5 mm",
    group: "anterior",
    clamp: "#00 / Butterfly small",
  },
  {
    fdi: "33",
    name: "Mand Canine",
    roots: "1",
    canals: "1–2",
    accessShape: "Ovoid (lingual)",
    workingLength: "25.5 mm",
    group: "anterior",
    clamp: "Ivory #9 / W2A",
  },
  {
    fdi: "43",
    name: "Mand Canine",
    roots: "1",
    canals: "1–2",
    accessShape: "Ovoid (lingual)",
    workingLength: "25.5 mm",
    group: "anterior",
    clamp: "Ivory #9 / W2A",
  },
  {
    fdi: "34",
    name: "Mand 1st Premolar",
    roots: "1",
    canals: "1 (75%)",
    accessShape: "Ovoid (occlusal)",
    workingLength: "21.5 mm",
    group: "premolar",
    clamp: "#2 / W8A premolar",
  },
  {
    fdi: "44",
    name: "Mand 1st Premolar",
    roots: "1",
    canals: "1 (75%)",
    accessShape: "Ovoid (occlusal)",
    workingLength: "21.5 mm",
    group: "premolar",
    clamp: "#2 / W8A premolar",
  },
  {
    fdi: "35",
    name: "Mand 2nd Premolar",
    roots: "1",
    canals: "1 (85%)",
    accessShape: "Ovoid (occlusal)",
    workingLength: "22.0 mm",
    group: "premolar",
    clamp: "#2 / W8A premolar",
  },
  {
    fdi: "45",
    name: "Mand 2nd Premolar",
    roots: "1",
    canals: "1 (85%)",
    accessShape: "Ovoid (occlusal)",
    workingLength: "22.0 mm",
    group: "premolar",
    clamp: "#2 / W8A premolar",
  },
  {
    fdi: "36",
    name: "Mand 1st Molar",
    roots: "2",
    canals: "3–4 (M: 2, D: 1–2)",
    accessShape: "Trapezoidal (occlusal)",
    workingLength: "21.0 mm",
    group: "molar",
    clamp: "#7 or #56 mandibular molar",
  },
  {
    fdi: "46",
    name: "Mand 1st Molar",
    roots: "2",
    canals: "3–4 (M: 2, D: 1–2)",
    accessShape: "Trapezoidal (occlusal)",
    workingLength: "21.0 mm",
    group: "molar",
    clamp: "#7 or #56 mandibular molar",
  },
  {
    fdi: "37",
    name: "Mand 2nd Molar",
    roots: "2",
    canals: "3 (M: 2, D: 1)",
    accessShape: "Trapezoidal (occlusal)",
    workingLength: "20.0 mm",
    group: "molar",
    clamp: "#7 or #56 mandibular molar",
  },
  {
    fdi: "47",
    name: "Mand 2nd Molar",
    roots: "2",
    canals: "3 (M: 2, D: 1)",
    accessShape: "Trapezoidal (occlusal)",
    workingLength: "20.0 mm",
    group: "molar",
    clamp: "#7 or #56 mandibular molar",
  },
];

// Access cavity guide per Section 5
export interface AccessGuide {
  group:
    | "Max Incisors"
    | "Max Canine"
    | "Max Premolars"
    | "Max Molars"
    | "Mand Incisors"
    | "Mand Premolars"
    | "Mand Molars";
  shape: string;
  entry: string;
  landmarks: string;
  errors: string;
}

export const ACCESS_GUIDES: AccessGuide[] = [
  {
    group: "Max Incisors",
    shape: "Triangular",
    entry: "Cingulum (lingual)",
    landmarks: "Stays within cingulum; slight incisal extension",
    errors: "Too far incisal — weakens incisal edge",
  },
  {
    group: "Max Canine",
    shape: "Ovoid",
    entry: "Cingulum (lingual)",
    landmarks: "Ovoid shape follows root cross-section",
    errors: "Under-extension bucco-lingually",
  },
  {
    group: "Max Premolars",
    shape: "Ovoid / Slot",
    entry: "Central fossa (occlusal)",
    landmarks: "B–L oriented; two orifices in 1st premolar",
    errors: "Too conservative — miss 2nd canal",
  },
  {
    group: "Max Molars",
    shape: "Triangular",
    entry: "Mesial to central fossa",
    landmarks: "Triangle: MB, DB, P orifices; search for MB2",
    errors: "Not extending mesially enough for MB2",
  },
  {
    group: "Mand Incisors",
    shape: "Ovoid",
    entry: "Cingulum (lingual)",
    landmarks: "Very narrow B–L; ~40% have 2 canals",
    errors: "Miss lingual canal",
  },
  {
    group: "Mand Premolars",
    shape: "Ovoid",
    entry: "Central fossa (occlusal)",
    landmarks: "Round to slightly ovoid",
    errors: "Excessive enlargement",
  },
  {
    group: "Mand Molars",
    shape: "Trapezoidal",
    entry: "Mesial to central pit",
    landmarks: "Wider mesially; 2 mesial + 1–2 distal orifices",
    errors: "Not extending far enough mesially",
  },
];

export const BUR_RECOMMENDATIONS = [
  {
    phase: "Initial penetration",
    bur: "Endo Access bur (size 1 or 2) or round diamond bur (BR-46)",
  },
  { phase: "Deroofing", bur: "Non-end-cutting bur (Endo-Z) to safely remove pulp chamber roof" },
  {
    phase: "Orifice location",
    bur: "DG16 explorer or ultrasonic tips (Start-X) for finding/troughing orifices",
  },
  {
    phase: "Straight-line access",
    bur: "Gates Glidden #2–#3 for coronal flaring (use carefully in thin roots)",
  },
];

export const FILE_SYSTEMS = [
  "ProTaper Gold",
  "ProTaper Next",
  "WaveOne Gold",
  "Hyflex EDM",
  "K-Files",
] as const;

export type FileSystem = (typeof FILE_SYSTEMS)[number];

export interface FileProtocol {
  glidePath: string[];
  shaping: string[];
  finishing: string[];
  taper: string;
  rpm: string;
  torque: string;
  maf: string;
}

// File sequences per Section 6 of spec
export const FILE_PROTOCOLS: Record<FileSystem, FileProtocol> = {
  "ProTaper Gold": {
    glidePath: ["#10 K-File to WL", "#15 K-File to WL", "PathFile #1 → #2 → #3"],
    shaping: ["SX (coronal flare)", "S1 to WL", "S2 to WL"],
    finishing: ["F1 (20/.07)", "F2 (25/.08)", "F3 (30/.09)"],
    taper: "Variable",
    rpm: "300 RPM",
    torque: "2 – 5 Ncm (file-dependent)",
    maf: "F2 (25/.08) standard; F3 for wider canals",
  },
  "ProTaper Next": {
    glidePath: ["#10 K-File to WL", "#15 K-File to WL", "PathFile #1 → #2 → #3"],
    shaping: ["X1 (17/.04)", "X2 (25/.06)"],
    finishing: ["X3 (30/.07)", "X4 (40/.06)", "X5 (50/.06)"],
    taper: "Variable",
    rpm: "300 RPM",
    torque: "2 – 5 Ncm (file-dependent)",
    maf: "X2 (25/.06) standard",
  },
  "WaveOne Gold": {
    glidePath: ["#10 K-File to WL", "#15 K-File to WL", "Glide path file"],
    shaping: ["Primary (25/.07) – single file reciprocating"],
    finishing: ["Small (20/.07)", "Medium (35/.06)", "Large (45/.05)"],
    taper: "Variable",
    rpm: "Reciprocation – WaveOne ALL setting",
    torque: "Motor preset",
    maf: "Primary (25/.07)",
  },
  "Hyflex EDM": {
    glidePath: ["#10 K-File to WL", "#15 K-File to WL", "Glidepath file (10/.05)"],
    shaping: ["Orifice opener", "Glidepath", "OneFile (25/~)"],
    finishing: ["OneFile or step up to desired size"],
    taper: "Variable",
    rpm: "300 – 500 RPM",
    torque: "2.5 Ncm",
    maf: "25/~ OneFile",
  },
  "K-Files": {
    glidePath: ["#10 → #15 to WL"],
    shaping: ["Step-back: #20 → #25 → #30 → #35 at WL"],
    finishing: ["Step-back 1mm increments: #40, #45, #50"],
    taper: "0.02",
    rpm: "Hand instrumentation (watch-winding + pull)",
    torque: "—",
    maf: "Minimum #25, ideally #30–35",
  },
};

// MAF guidance per Section 6.3
export const MAF_GUIDANCE = [
  { canal: "Narrow (incisors, premolars)", maf: "#25 or #30 (0.04–0.06 taper)" },
  { canal: "Medium (canines, distal molar canals)", maf: "#30–#35" },
  { canal: "Wide (palatal, single-rooted)", maf: "#35–#50" },
];

export interface DiagnosisOption {
  id: string;
  label: string;
  symptoms: string;
  pulpTests: string;
  radiograph: string;
  treatment: string;
  color: "mint" | "peach" | "warning" | "destructive";
}

// Full pulp diagnosis matrix per Section 4.1
export const DIAGNOSES: DiagnosisOption[] = [
  {
    id: "normal",
    label: "Normal Pulp",
    symptoms: "No spontaneous pain; responds normally to tests",
    pulpTests: "Positive (normal response to cold/EPT)",
    radiograph: "Normal PDL, no periapical radiolucency",
    treatment: "No treatment needed",
    color: "mint",
  },
  {
    id: "reversible",
    label: "Reversible Pulpitis",
    symptoms: "Sharp, brief pain to cold/sweet; no spontaneous pain",
    pulpTests: "Exaggerated but brief response to cold",
    radiograph: "Normal or slightly widened PDL",
    treatment: "Remove irritant; restore tooth",
    color: "mint",
  },
  {
    id: "irreversible-symp",
    label: "Irreversible Pulpitis (Symptomatic)",
    symptoms: "Spontaneous, lingering pain; worse at night; referred pain",
    pulpTests: "Lingering pain to cold (>30s); may respond to heat",
    radiograph: "Normal to slight PDL widening",
    treatment: "Root canal treatment",
    color: "peach",
  },
  {
    id: "irreversible-asymp",
    label: "Irreversible Pulpitis (Asymptomatic)",
    symptoms: "No symptoms; incidental finding",
    pulpTests: "Delayed/diminished response",
    radiograph: "Normal to slight changes",
    treatment: "Root canal treatment",
    color: "peach",
  },
  {
    id: "necrosis",
    label: "Pulp Necrosis",
    symptoms: "No response to vitality tests; history of trauma/caries",
    pulpTests: "No response to cold or EPT",
    radiograph: "Periapical radiolucency possible",
    treatment: "Root canal treatment",
    color: "peach",
  },
  {
    id: "apical",
    label: "Symptomatic Apical Periodontitis",
    symptoms: "Pain on biting/percussion; localized swelling possible",
    pulpTests: "Variable (may be non-responsive)",
    radiograph: "Periapical radiolucency",
    treatment: "Root canal treatment",
    color: "warning",
  },
  {
    id: "chronic-abscess",
    label: "Chronic Apical Abscess",
    symptoms: "Sinus tract; mild or no pain",
    pulpTests: "Non-responsive",
    radiograph: "Well-defined periapical radiolucency",
    treatment: "Root canal treatment",
    color: "warning",
  },
  {
    id: "acute-abscess",
    label: "Acute Apical Abscess",
    symptoms: "Severe throbbing pain; swelling; fever; malaise",
    pulpTests: "Non-responsive",
    radiograph: "May show widened PDL or radiolucency",
    treatment: "I&D + RCT or extraction",
    color: "destructive",
  },
];

// Irrigation protocol per Section 7 (NaOCl → EDTA → NaOCl + CHX option)
export const IRRIGATION_STEPS = [
  {
    id: "init",
    label: "Initial flood — NaOCl",
    concentration: "2.5–5.25%",
    volume: "2–3 mL",
    time: "Fill chamber; replenish each file",
    warning: false,
  },
  {
    id: "during",
    label: "During instrumentation — NaOCl",
    concentration: "2.5–5.25%",
    volume: "1–2 mL / file",
    time: "Side-vented needle 1mm short of WL",
    warning: false,
  },
  {
    id: "calcified",
    label: "Calcified canals — EDTA",
    concentration: "17% (gel/liquid)",
    volume: "1 mL",
    time: "Alternate with NaOCl to negotiate",
    warning: false,
  },
  {
    id: "final1",
    label: "Final rinse 1 — NaOCl",
    concentration: "2.5–5.25%",
    volume: "3–5 mL",
    time: "1 min; activate with PUI/sonic if available",
    warning: true,
  },
  {
    id: "smear",
    label: "Smear layer removal — EDTA",
    concentration: "17%",
    volume: "1–3 mL",
    time: "1 min; agitate",
    warning: false,
  },
  {
    id: "final2",
    label: "Final rinse 2 — NaOCl",
    concentration: "2.5–5.25%",
    volume: "2–3 mL",
    time: "30 sec; penetrates open tubules",
    warning: true,
  },
  {
    id: "chx",
    label: "Optional — CHX (persistent infection)",
    concentration: "2%",
    volume: "2–3 mL",
    time: "Saline flush BEFORE CHX (avoid precipitate)",
    warning: true,
  },
  {
    id: "dry",
    label: "Drying — Paper points",
    concentration: "—",
    volume: "—",
    time: "Dry to WL; ready for obturation",
    warning: false,
  },
];

export const IRRIGATION_SAFETY = [
  "NEVER mix NaOCl and CHX directly — forms toxic parachloroaniline. Always flush with saline between them.",
  "Use side-vented needles (27 or 30 gauge) positioned 1–2 mm short of WL. Never bind in the canal.",
  "Rubber dam is MANDATORY during NaOCl irrigation to prevent soft-tissue contact.",
  "Open apex cases: use lower NaOCl concentration (1–2.5%) and avoid aggressive apical delivery.",
  "Activation methods (PUI, sonic, laser) significantly improve cleaning when available.",
];

// Rubber dam tips per Section 8
export const RUBBER_DAM_TIPS = [
  {
    category: "Anteriors",
    details:
      "Butterfly clamp (W2/W2A) or Ivory #9 for incisors; #00 for smaller teeth; winged clamps allow simultaneous placement",
  },
  {
    category: "Premolars",
    details:
      "#2 (universal premolar); #2A for smaller premolars; W8A (wingless) for sub-gingival margins",
  },
  {
    category: "Molars",
    details:
      "#14/14A for maxillary molars; #7 or #56 for mandibular molars; #8A for partially erupted",
  },
  {
    category: "Broken-down teeth",
    details:
      "Build up with GIC/composite band before clamping; consider #212 or #26N for minimal structure",
  },
  {
    category: "Isolation strategy",
    details:
      "Single-tooth isolation preferred for endo; clamp on the tooth being treated; frame placement before inversion",
  },
  {
    category: "Punching holes",
    details:
      "Use correct hole size from punch template; single hole for endo; position tooth correctly on dam grid",
  },
  {
    category: "Inversion technique",
    details:
      "Use flat plastic or explorer to tuck dam into sulcus; dry tooth first; air from 3-in-1 syringe helps",
  },
  {
    category: "Common problems",
    details:
      "Dam tears: use heavy-gauge dam; clamp slips: ensure 4-point contact; leakage: use OraSeal/dam sealant",
  },
  {
    category: "Special situations",
    details:
      "Braces: wedjets or floss ties; Bridges: pass dam under pontic; Crowns: clamp may need to be inverted (jaws-down)",
  },
];
