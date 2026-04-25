import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader, F as FILE_SYSTEMS, a as FILE_PROTOCOLS } from "./router-5bitkNwX.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-XkZdbdiT.js";
import { L as Label } from "./label-3j8ZWv3L.js";
import { Activity, Zap, CheckCircle2 } from "lucide-react";
import "@tanstack/react-router";
import "zod";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
function FileCalculatorPage() {
  const [fileSys, setFileSys] = useState("ProTaper Gold");
  const protocol = FILE_PROTOCOLS[fileSys];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "File Sequence Calculator", subtitle: "Optimized protocols for major file systems" }),
    /* @__PURE__ */ jsxs(Card, { className: "rounded-2xl border-border bg-card shadow-card", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Select System" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "system", children: "Instrument System" }),
          /* @__PURE__ */ jsx("select", { id: "system", value: fileSys, onChange: (e) => setFileSys(e.target.value), className: "w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring", children: FILE_SYSTEMS.map((f) => /* @__PURE__ */ jsx("option", { value: f, children: f }, f)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-mint/30 p-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium uppercase text-mint-foreground/70", children: "Speed" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-mint-foreground", children: protocol.rpm })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-mint/30 p-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium uppercase text-mint-foreground/70", children: "Torque" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-mint-foreground", children: protocol.torque })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Section, { title: "Glide Path", items: protocol.glidePath, icon: Activity, color: "mint" }),
      /* @__PURE__ */ jsx(Section, { title: "Shaping", items: protocol.shaping, icon: Zap, color: "peach" }),
      /* @__PURE__ */ jsx(Section, { title: "Finishing", items: protocol.finishing, icon: CheckCircle2, color: "mint" })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "rounded-2xl border-border bg-card p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Standard MAF" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-primary", children: protocol.maf })
    ] }) })
  ] });
}
function Section({
  title,
  items,
  icon: Icon,
  color
}) {
  return /* @__PURE__ */ jsxs(Card, { className: "rounded-2xl border-border bg-card overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: `px-4 py-2 bg-${color}/20 border-b border-${color}/20 flex items-center gap-2`, children: [
      /* @__PURE__ */ jsx(Icon, { className: `w-4 h-4 text-${color}-foreground` }),
      /* @__PURE__ */ jsx("span", { className: `text-xs font-bold uppercase tracking-wider text-${color}-foreground`, children: title })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-start", children: [
      /* @__PURE__ */ jsx("span", { className: `w-5 h-5 rounded-full bg-${color} text-${color}-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`, children: i + 1 }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: item })
    ] }, i)) }) })
  ] });
}
export {
  FileCalculatorPage as component
};
