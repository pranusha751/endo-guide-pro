import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { T as TEETH, P as PageHeader, R as RUBBER_DAM_TIPS } from "./router-5bitkNwX.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-XkZdbdiT.js";
import { L as Label } from "./label-3j8ZWv3L.js";
import { Shield, Lightbulb } from "lucide-react";
import "@tanstack/react-router";
import "zod";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "class-variance-authority";
function RubberDamPage() {
  const [selectedTooth, setSelectedTooth] = useState("16");
  const toothInfo = TEETH.find((t) => t.fdi === selectedTooth);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Rubber Dam Guide", subtitle: "Optimal isolation for endodontics" }),
    /* @__PURE__ */ jsxs(Card, { className: "rounded-2xl border-border bg-card shadow-card", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Clamp Selector" }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Select Tooth (FDI)" }),
          /* @__PURE__ */ jsx("select", { value: selectedTooth, onChange: (e) => setSelectedTooth(e.target.value), className: "w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring", children: TEETH.map((t) => /* @__PURE__ */ jsxs("option", { value: t.fdi, children: [
            t.fdi,
            " — ",
            t.name
          ] }, t.fdi)) })
        ] }),
        toothInfo && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-peach p-5 border border-peach/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-peach-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-peach-foreground/60", children: "Recommended Clamp" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-peach-foreground", children: toothInfo.clamp })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium uppercase text-peach-foreground/60", children: "Group" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-peach-foreground capitalize", children: toothInfo.group })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium uppercase text-peach-foreground/60", children: "Isolation" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-peach-foreground", children: "Single tooth" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-muted-foreground px-1", children: "Clinical Tips" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: RUBBER_DAM_TIPS.map((tip) => /* @__PURE__ */ jsx(Card, { className: "rounded-2xl border-border bg-card", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-mint/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Lightbulb, { className: "w-5 h-5 text-mint-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-foreground", children: tip.category }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: tip.details })
        ] })
      ] }) }, tip.category)) })
    ] })
  ] });
}
export {
  RubberDamPage as component
};
