import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader, I as IRRIGATION_STEPS, b as IRRIGATION_SAFETY } from "./router-5bitkNwX.js";
import { C as Card } from "./card-XkZdbdiT.js";
import { Check, AlertTriangle, Info } from "lucide-react";
import "@tanstack/react-router";
import "zod";
import "clsx";
import "tailwind-merge";
function IrrigationPage() {
  const [completed, setCompleted] = useState({});
  const toggleStep = (id) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Irrigation Protocol", subtitle: "Step-by-step chemo-mechanical debridement" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: IRRIGATION_STEPS.map((step) => {
      const isDone = !!completed[step.id];
      return /* @__PURE__ */ jsx("button", { onClick: () => toggleStep(step.id), className: `w-full text-left rounded-2xl border p-4 transition-all ${isDone ? "bg-mint border-mint shadow-sm" : "bg-card border-border"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: `w-6 h-6 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors ${isDone ? "bg-primary border-primary" : "border-border"}`, children: isDone && /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-semibold text-sm flex items-center gap-2", children: [
            step.label,
            step.warning && /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-warning-foreground" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Conc:" }),
              " ",
              step.concentration
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Vol:" }),
              " ",
              step.volume
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Time:" }),
              " ",
              step.time
            ] })
          ] })
        ] })
      ] }) }, step.id);
    }) }),
    /* @__PURE__ */ jsxs(Card, { className: "rounded-2xl bg-warning/20 border-warning/30 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-bold text-sm text-warning-foreground mb-3", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }),
        "Critical Safety Notes"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: IRRIGATION_SAFETY.map((note, i) => /* @__PURE__ */ jsxs("li", { className: "text-xs text-warning-foreground/90 flex gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "mt-1 flex-shrink-0", children: "•" }),
        note
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "rounded-2xl bg-mint/20 border-mint/30 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-mint-foreground mt-0.5" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-mint-foreground", children: "Activation Tip" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-mint-foreground/80 mt-1 leading-relaxed", children: "Sonic or ultrasonic activation for 30-60 seconds per canal significantly improves biofilm disruption and smear layer removal." })
      ] })
    ] }) })
  ] });
}
export {
  IrrigationPage as component
};
