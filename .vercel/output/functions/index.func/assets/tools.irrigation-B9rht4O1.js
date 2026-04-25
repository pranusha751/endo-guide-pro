import { r as reactExports, T as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, P as PageHeader, I as IRRIGATION_STEPS, b as IRRIGATION_SAFETY } from "./router-kFOIupVK.js";
import { C as Card } from "./card-CPypLJbI.js";
import { C as Check, T as TriangleAlert } from "./triangle-alert-D6gMd2pV.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function IrrigationPage() {
  const [completed, setCompleted] = reactExports.useState({});
  const toggleStep = (id) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Irrigation Protocol", subtitle: "Step-by-step chemo-mechanical debridement" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: IRRIGATION_STEPS.map((step) => {
      const isDone = !!completed[step.id];
      return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleStep(step.id), className: `w-full text-left rounded-2xl border p-4 transition-all ${isDone ? "bg-mint border-mint shadow-sm" : "bg-card border-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-6 h-6 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors ${isDone ? "bg-primary border-primary" : "border-border"}`, children: isDone && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-sm flex items-center gap-2", children: [
            step.label,
            step.warning && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-warning-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Conc:" }),
              " ",
              step.concentration
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Vol:" }),
              " ",
              step.volume
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Time:" }),
              " ",
              step.time
            ] })
          ] })
        ] })
      ] }) }, step.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-2xl bg-warning/20 border-warning/30 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-bold text-sm text-warning-foreground mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
        "Critical Safety Notes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: IRRIGATION_SAFETY.map((note, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-warning-foreground/90 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 flex-shrink-0", children: "•" }),
        note
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-2xl bg-mint/20 border-mint/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-mint-foreground mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm text-mint-foreground", children: "Activation Tip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mint-foreground/80 mt-1 leading-relaxed", children: "Sonic or ultrasonic activation for 30-60 seconds per canal significantly improves biofilm disruption and smear layer removal." })
      ] })
    ] }) })
  ] });
}
export {
  IrrigationPage as component
};
