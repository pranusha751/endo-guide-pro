import { T as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, P as PageHeader, L as Link } from "./router-BviRwo8l.js";
import { S as Shield } from "./shield-BevQOY0s.js";
import { C as ChevronRight } from "./chevron-right-D28kg-Us.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const __iconNode$1 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Standalone Tools", subtitle: "Quick-access clinical utilities" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: TOOLS.map((t) => {
      const Icon = t.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: t.to, className: "block rounded-2xl bg-card border border-border p-4 shadow-card active:scale-[0.99] transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-2xl bg-${t.color} flex items-center justify-center flex-shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-6 h-6 text-${t.color}-foreground` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: t.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: t.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
      ] }) }, t.title);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl bg-mint/40 border border-mint p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-mint-foreground", children: "Pro tip" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-mint-foreground/80 mt-1", children: "Run the full guided workflow for best results — it auto-configures every tool based on your tooth selection and diagnosis." })
    ] })
  ] });
}
export {
  ToolsPage as component
};
