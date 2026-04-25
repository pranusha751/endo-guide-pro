import { T as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, P as PageHeader } from "./router-BviRwo8l.js";
import { C as Calendar } from "./calendar-CuzadvLl.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
      key: "1dfntj"
    }
  ],
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5", key: "6s6qgf" }]
];
const StickyNote = createLucideIcon("sticky-note", __iconNode);
const CASES = [{
  id: "C-104",
  tooth: "16",
  dx: "Irreversible Pulpitis",
  date: "2 days ago",
  status: "Follow-up due"
}, {
  id: "C-103",
  tooth: "26",
  dx: "Pulp Necrosis",
  date: "5 days ago",
  status: "Completed"
}, {
  id: "C-102",
  tooth: "36",
  dx: "Apical Periodontitis",
  date: "1 wk ago",
  status: "Completed"
}, {
  id: "C-101",
  tooth: "11",
  dx: "Reversible Pulpitis",
  date: "2 wk ago",
  status: "Monitoring"
}];
function ProfilePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Profile", subtitle: "Dr. A. Patel · GP Endodontist" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-mint p-5 mb-5 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-card flex items-center justify-center text-xl font-bold text-mint-foreground", children: "AP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-mint-foreground", children: "12 cases this month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-mint-foreground/80", children: "3 follow-ups scheduled" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: FileText, value: "47", label: "Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Calendar, value: "3", label: "Follow-up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: StickyNote, value: "9", label: "Notes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Recent Cases" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: CASES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "rounded-2xl bg-card border border-border p-4 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-peach flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-peach-foreground", children: c.tooth }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm truncate", children: c.dx }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            " ",
            c.date,
            " · ",
            c.id
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full flex-shrink-0 ${c.status === "Follow-up due" ? "bg-warning/40 text-warning-foreground" : c.status === "Completed" ? "bg-mint text-mint-foreground" : "bg-peach text-peach-foreground"}`, children: c.status })
    ] }) }, c.id)) })
  ] });
}
function Stat({
  icon: Icon,
  value,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-4 text-center shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 mx-auto text-muted-foreground mb-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wide text-muted-foreground", children: label })
  ] });
}
export {
  ProfilePage as component
};
