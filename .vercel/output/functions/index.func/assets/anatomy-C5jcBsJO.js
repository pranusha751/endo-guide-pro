import { r as reactExports, T as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, T as TEETH, P as PageHeader } from "./router-kFOIupVK.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function AnatomyPage() {
  const [q, setQ] = reactExports.useState("");
  const [group, setGroup] = reactExports.useState("all");
  const filtered = TEETH.filter((t) => {
    const matchesQ = !q || t.fdi.includes(q) || t.name.toLowerCase().includes(q.toLowerCase());
    const matchesG = group === "all" || t.group === group;
    return matchesQ && matchesG;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Tooth Anatomy", subtitle: "Reference library for all FDI teeth" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search FDI or tooth name…", className: "w-full rounded-2xl bg-card border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-5", children: ["all", "anterior", "premolar", "molar"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setGroup(g), className: `flex-1 capitalize text-xs py-2 rounded-xl border transition-all ${group === g ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"}`, children: g }, g)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "rounded-2xl bg-card border border-border p-4 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-mint flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-mint-foreground", children: t.fdi }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Roots", value: t.roots }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Canals", value: t.canals }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Access", value: t.accessShape }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "WL", value: t.workingLength })
          ] })
        ] })
      ] }) }, t.fdi)),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground py-12", children: "No teeth match your search." })
    ] })
  ] });
}
function Info({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
      label,
      ": "
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: value })
  ] });
}
export {
  AnatomyPage as component
};
