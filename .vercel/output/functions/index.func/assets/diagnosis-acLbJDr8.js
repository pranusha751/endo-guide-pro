import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader, D as DIAGNOSES } from "./router-BuawVOqo.js";
import "@tanstack/react-router";
import "lucide-react";
import "zod";
function DiagnosisPage() {
  const [selected, setSelected] = useState("irreversible-symp");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Pulp Diagnosis Matrix", subtitle: "Tap a row to highlight — based on AAE classification" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: DIAGNOSES.map((dx) => {
      const active = selected === dx.id;
      return /* @__PURE__ */ jsxs("button", { onClick: () => setSelected(dx.id), className: `w-full text-left rounded-2xl border p-4 transition-all shadow-card ${active ? `bg-${dx.color} border-transparent` : "bg-card border-border"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-base font-semibold ${active ? `text-${dx.color}-foreground` : ""}`, children: dx.label }),
        /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 gap-1.5 mt-3 text-xs ${active ? `text-${dx.color}-foreground/90` : "text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsx(Row, { label: "Symptoms", value: dx.symptoms }),
          /* @__PURE__ */ jsx(Row, { label: "Pulp test", value: dx.pulpTests }),
          /* @__PURE__ */ jsx(Row, { label: "Radiograph", value: dx.radiograph }),
          /* @__PURE__ */ jsx(Row, { label: "Treatment", value: dx.treatment })
        ] })
      ] }, dx.id);
    }) })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxs("span", { className: "font-medium w-20 flex-shrink-0", children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsx("span", { children: value })
  ] });
}
export {
  DiagnosisPage as component
};
