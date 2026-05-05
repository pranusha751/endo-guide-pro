import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PageHeader } from "./router-BuawVOqo.js";
import { Calculator, Droplets, Shield, ChevronRight } from "lucide-react";
import "zod";
const TOOLS = [{
  icon: Calculator,
  title: "File Sequence Calculator",
  desc: "ProTaper, WaveOne, Hyflex & more",
  color: "mint",
  to: "/tools/file-calculator"
}, {
  icon: Droplets,
  title: "Irrigation Protocol",
  desc: "NaOCl, EDTA, final rinse",
  color: "peach",
  to: "/tools/irrigation"
}, {
  icon: Shield,
  title: "Rubber Dam Guide",
  desc: "Clamp selection by tooth group",
  color: "mint",
  to: "/tools/rubber-dam"
}];
function ToolsPage() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Standalone Tools", subtitle: "Quick-access clinical utilities" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: TOOLS.map((t) => {
      const Icon = t.icon;
      return /* @__PURE__ */ jsx(Link, { to: t.to, className: "block rounded-2xl bg-card border border-border p-4 shadow-card active:scale-[0.99] transition-transform", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-2xl bg-${t.color} flex items-center justify-center flex-shrink-0`, children: /* @__PURE__ */ jsx(Icon, { className: `w-6 h-6 text-${t.color}-foreground` }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", children: t.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: t.desc })
        ] }),
        /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
      ] }) }, t.title);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl bg-mint/40 border border-mint p-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-mint-foreground", children: "Pro tip" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-mint-foreground/80 mt-1", children: "Run the full guided workflow for best results — it auto-configures every tool based on your tooth selection and diagnosis." })
    ] })
  ] });
}
export {
  ToolsPage as component
};
