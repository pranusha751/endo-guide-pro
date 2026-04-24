export interface ToothInfo {
  fdi: string;
  name: string;
  roots: number;
  canals: number;
  accessShape: string;
  workingLength: string;
  group: "anterior" | "premolar" | "molar";
  clamp: string;
}

export const TEETH: ToothInfo[] = [
  // Upper right
  { fdi: "11", name: "Upper Central Incisor", roots: 1, canals: 1, accessShape: "Triangular", workingLength: "22.5 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "12", name: "Upper Lateral Incisor", roots: 1, canals: 1, accessShape: "Oval", workingLength: "22.0 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "13", name: "Upper Canine", roots: 1, canals: 1, accessShape: "Oval", workingLength: "26.5 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "14", name: "Upper First Premolar", roots: 2, canals: 2, accessShape: "Oval (BL)", workingLength: "20.6 mm", group: "premolar", clamp: "0 / 2" },
  { fdi: "15", name: "Upper Second Premolar", roots: 1, canals: 1, accessShape: "Oval (BL)", workingLength: "21.5 mm", group: "premolar", clamp: "0 / 2" },
  { fdi: "16", name: "Upper First Molar", roots: 3, canals: 4, accessShape: "Rhomboidal", workingLength: "20.8 mm", group: "molar", clamp: "8A / 14A" },
  { fdi: "17", name: "Upper Second Molar", roots: 3, canals: 3, accessShape: "Triangular", workingLength: "20.0 mm", group: "molar", clamp: "8A / 14A" },
  // Lower
  { fdi: "31", name: "Lower Central Incisor", roots: 1, canals: 1, accessShape: "Oval", workingLength: "20.7 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "32", name: "Lower Lateral Incisor", roots: 1, canals: 1, accessShape: "Oval", workingLength: "21.1 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "33", name: "Lower Canine", roots: 1, canals: 1, accessShape: "Oval", workingLength: "25.6 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "34", name: "Lower First Premolar", roots: 1, canals: 1, accessShape: "Oval", workingLength: "21.6 mm", group: "premolar", clamp: "0 / 2" },
  { fdi: "35", name: "Lower Second Premolar", roots: 1, canals: 1, accessShape: "Oval", workingLength: "22.3 mm", group: "premolar", clamp: "0 / 2" },
  { fdi: "36", name: "Lower First Molar", roots: 2, canals: 3, accessShape: "Trapezoidal", workingLength: "21.0 mm", group: "molar", clamp: "8A / 14A" },
  { fdi: "37", name: "Lower Second Molar", roots: 2, canals: 3, accessShape: "Trapezoidal", workingLength: "20.0 mm", group: "molar", clamp: "8A / 14A" },
  { fdi: "21", name: "Upper Central Incisor", roots: 1, canals: 1, accessShape: "Triangular", workingLength: "22.5 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "22", name: "Upper Lateral Incisor", roots: 1, canals: 1, accessShape: "Oval", workingLength: "22.0 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "23", name: "Upper Canine", roots: 1, canals: 1, accessShape: "Oval", workingLength: "26.5 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "24", name: "Upper First Premolar", roots: 2, canals: 2, accessShape: "Oval (BL)", workingLength: "20.6 mm", group: "premolar", clamp: "0 / 2" },
  { fdi: "25", name: "Upper Second Premolar", roots: 1, canals: 1, accessShape: "Oval (BL)", workingLength: "21.5 mm", group: "premolar", clamp: "0 / 2" },
  { fdi: "26", name: "Upper First Molar", roots: 3, canals: 4, accessShape: "Rhomboidal", workingLength: "20.8 mm", group: "molar", clamp: "8A / 14A" },
  { fdi: "27", name: "Upper Second Molar", roots: 3, canals: 3, accessShape: "Triangular", workingLength: "20.0 mm", group: "molar", clamp: "8A / 14A" },
  { fdi: "41", name: "Lower Central Incisor", roots: 1, canals: 1, accessShape: "Oval", workingLength: "20.7 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "42", name: "Lower Lateral Incisor", roots: 1, canals: 1, accessShape: "Oval", workingLength: "21.1 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "43", name: "Lower Canine", roots: 1, canals: 1, accessShape: "Oval", workingLength: "25.6 mm", group: "anterior", clamp: "9 / 212" },
  { fdi: "44", name: "Lower First Premolar", roots: 1, canals: 1, accessShape: "Oval", workingLength: "21.6 mm", group: "premolar", clamp: "0 / 2" },
  { fdi: "45", name: "Lower Second Premolar", roots: 1, canals: 1, accessShape: "Oval", workingLength: "22.3 mm", group: "premolar", clamp: "0 / 2" },
  { fdi: "46", name: "Lower First Molar", roots: 2, canals: 3, accessShape: "Trapezoidal", workingLength: "21.0 mm", group: "molar", clamp: "8A / 14A" },
  { fdi: "47", name: "Lower Second Molar", roots: 2, canals: 3, accessShape: "Trapezoidal", workingLength: "20.0 mm", group: "molar", clamp: "8A / 14A" },
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
  rpm: string;
  torque: string;
  maf: string;
}

export const FILE_PROTOCOLS: Record<FileSystem, FileProtocol> = {
  "ProTaper Gold": {
    glidePath: ["#10 K-File to WL", "PathFile #13/.02", "PathFile #16/.02"],
    shaping: ["SX (coronal flare)", "S1 to WL", "S2 to WL"],
    finishing: ["F1 (20/.07)", "F2 (25/.08)", "F3 if needed (30/.09)"],
    rpm: "300 RPM",
    torque: "1.5 – 5.2 Ncm",
    maf: "F2 (25/.08) recommended",
  },
  "ProTaper Next": {
    glidePath: ["#10 K-File to WL", "ProGlider (16/.02)"],
    shaping: ["X1 (17/.04)", "X2 (25/.06)"],
    finishing: ["X3 (30/.07) if wider canal"],
    rpm: "300 RPM",
    torque: "2.0 – 5.2 Ncm",
    maf: "X2 (25/.06)",
  },
  "WaveOne Gold": {
    glidePath: ["#10 K-File to WL", "Glide path file (15/.02)"],
    shaping: ["Primary (25/.07) reciprocating"],
    finishing: ["Medium (35/.06) if wider"],
    rpm: "Reciprocation (CCW 170°/CW 50°)",
    torque: "5.2 Ncm",
    maf: "Primary (25/.07)",
  },
  "Hyflex EDM": {
    glidePath: ["Glidepath file 10/.05"],
    shaping: ["OneFile 25/~"],
    finishing: ["Finishing 40/.04 or 50/.03"],
    rpm: "400 RPM",
    torque: "2.5 Ncm",
    maf: "25/~ OneFile",
  },
  "K-Files": {
    glidePath: ["#08 → #10 → #15 to WL"],
    shaping: ["Step-back: #20, #25, #30"],
    finishing: ["#35, #40 (1mm short increments)"],
    rpm: "Hand instrumentation",
    torque: "—",
    maf: "Minimum #25, ideally #30–35",
  },
};

export interface DiagnosisOption {
  id: string;
  label: string;
  treatment: string;
  color: "mint" | "peach" | "warning" | "destructive";
}

export const DIAGNOSES: DiagnosisOption[] = [
  { id: "normal", label: "Normal Pulp", treatment: "No treatment required. Monitor.", color: "mint" },
  { id: "reversible", label: "Reversible Pulpitis", treatment: "Remove caries, place sedative restoration, monitor.", color: "mint" },
  { id: "irreversible", label: "Irreversible Pulpitis", treatment: "Root canal treatment or extraction.", color: "peach" },
  { id: "necrosis", label: "Pulp Necrosis", treatment: "Root canal treatment indicated.", color: "peach" },
  { id: "apical", label: "Apical Periodontitis", treatment: "RCT with apical disinfection protocol.", color: "warning" },
  { id: "abscess", label: "Acute Apical Abscess", treatment: "Drainage, RCT, antibiotics if systemic involvement.", color: "destructive" },
];

export const IRRIGATION_STEPS = [
  { id: "naocl1", label: "Initial NaOCl rinse", concentration: "2.5–5.25%", volume: "5 mL", time: "1 min", warning: false },
  { id: "shape", label: "Irrigate between each file", concentration: "NaOCl 2.5–5.25%", volume: "2 mL / file", time: "—", warning: false },
  { id: "edta", label: "EDTA – smear layer removal", concentration: "17%", volume: "3 mL", time: "1 min", warning: false },
  { id: "naocl2", label: "Final NaOCl rinse", concentration: "5.25%", volume: "5 mL", time: "3 min", warning: true },
  { id: "saline", label: "Final rinse (saline / CHX)", concentration: "0.9% saline or 2% CHX", volume: "5 mL", time: "1 min", warning: false },
  { id: "dry", label: "Dry canals with paper points", concentration: "—", volume: "—", time: "—", warning: false },
];
