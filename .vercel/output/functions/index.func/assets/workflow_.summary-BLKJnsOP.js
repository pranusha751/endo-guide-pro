import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { f as Route, T as TEETH, D as DIAGNOSES, P as PageHeader, a as FILE_PROTOCOLS } from "./router-BuawVOqo.js";
import { s as saveCase } from "./cases-C1qlkyIm.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-XkZdbdiT.js";
import { B as Button } from "./button-Db1c3JUm.js";
import { ArrowLeft, CheckCircle2, Share2, Calendar, Save } from "lucide-react";
import "zod";
import "react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
function SummaryPage() {
  const {
    tooth,
    dx,
    files
  } = Route.useSearch();
  const toothInfo = TEETH.find((t) => t.fdi === tooth);
  const dxInfo = DIAGNOSES.find((d) => d.id === dx);
  const protocol = FILE_PROTOCOLS[files];
  const navigate = useNavigate();
  const handleSave = () => {
    saveCase({
      tooth,
      dx: dxInfo?.label || dx,
      status: "Completed"
    });
    navigate({
      to: "/profile"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Link, { to: "/workflow", className: "p-2 -ml-2 rounded-full hover:bg-muted transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx(PageHeader, { title: "Case Summary", subtitle: "Review and finalize your endodontic record" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-primary/10 border border-primary/20 rounded-2xl p-5 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-7 h-7" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-primary-foreground", children: "Protocol Complete" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-foreground/70", children: "Treatment plan successfully generated" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(Card, { className: "rounded-2xl border-border bg-card shadow-card", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2 border-b border-border/50", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Clinical Details" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 space-y-3", children: [
          /* @__PURE__ */ jsx(SummaryRow, { label: "Tooth", value: `${tooth} — ${toothInfo?.name}` }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Diagnosis", value: dxInfo?.label ?? "—", color: dxInfo?.color }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Access", value: toothInfo?.accessShape ?? "—" }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "File System", value: files }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Target MAF", value: protocol?.maf ?? "—" }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Clamp", value: toothInfo?.clamp ?? "—" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "rounded-2xl h-auto py-4 flex flex-col gap-1 border-border bg-card shadow-card", children: [
          /* @__PURE__ */ jsx(Share2, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-tighter", children: "Share Report" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "rounded-2xl h-auto py-4 flex flex-col gap-1 border-border bg-card shadow-card", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-peach-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-tighter", children: "Follow-up" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleSave, className: "w-full rounded-2xl py-6 text-lg font-bold shadow-soft gap-2", children: [
        /* @__PURE__ */ jsx(Save, { className: "w-6 h-6" }),
        "Save to Clinical Record"
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-center text-muted-foreground px-6 leading-relaxed", children: "* This summary is for clinical reference only. Ensure all findings are cross-verified with radiographic and clinical examination before finalizing the treatment record." })
  ] });
}
function SummaryRow({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-1", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: `text-sm font-bold ${color ? `text-${color}-foreground bg-${color}/20 px-2 py-0.5 rounded-lg` : "text-foreground"}`, children: value })
  ] });
}
export {
  SummaryPage as component
};
