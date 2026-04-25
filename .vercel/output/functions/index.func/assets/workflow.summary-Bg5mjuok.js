import { T as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, d as Route, T as TEETH, D as DIAGNOSES, L as Link, P as PageHeader, a as FILE_PROTOCOLS } from "./router-BviRwo8l.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-CPypLJbI.js";
import { B as Button } from "./button-2iViTmHw.js";
import { C as CircleCheck } from "./circle-check-CKU01k3E.js";
import { C as Calendar } from "./calendar-CuzadvLl.js";
import { S as Save } from "./save-Bqhc2rFl.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-fpruKui8.js";
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function SummaryPage() {
  const {
    tooth,
    dx,
    files
  } = Route.useSearch();
  const toothInfo = TEETH.find((t) => t.fdi === tooth);
  const dxInfo = DIAGNOSES.find((d) => d.id === dx);
  const protocol = FILE_PROTOCOLS[files];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workflow", className: "p-2 -ml-2 rounded-full hover:bg-muted transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Case Summary", subtitle: "Review and finalize your endodontic record" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border border-primary/20 rounded-2xl p-5 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-primary-foreground", children: "Protocol Complete" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/70", children: "Treatment plan successfully generated" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-2xl border-border bg-card shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Clinical Details" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Tooth", value: `${tooth} — ${toothInfo?.name}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Diagnosis", value: dxInfo?.label ?? "—", color: dxInfo?.color }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Access", value: toothInfo?.accessShape ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "File System", value: files }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Target MAF", value: protocol?.maf ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryRow, { label: "Clamp", value: toothInfo?.clamp ?? "—" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-2xl h-auto py-4 flex flex-col gap-1 border-border bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-tighter", children: "Share Report" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-2xl h-auto py-4 flex flex-col gap-1 border-border bg-card shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-peach-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-tighter", children: "Follow-up" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full rounded-2xl py-6 text-lg font-bold shadow-soft gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-6 h-6" }),
        "Save to Clinical Record"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-center text-muted-foreground px-6 leading-relaxed", children: "* This summary is for clinical reference only. Ensure all findings are cross-verified with radiographic and clinical examination before finalizing the treatment record." })
  ] });
}
function SummaryRow({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-bold ${color ? `text-${color}-foreground bg-${color}/20 px-2 py-0.5 rounded-lg` : "text-foreground"}`, children: value })
  ] });
}
export {
  SummaryPage as component
};
