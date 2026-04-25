import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./router-5bitkNwX.js";
import { FileText, Calendar, StickyNote, Clock } from "lucide-react";
import "@tanstack/react-router";
import "zod";
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
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Profile", subtitle: "Dr. A. Patel · GP Endodontist" }),
    /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-mint p-5 mb-5 shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-card flex items-center justify-center text-xl font-bold text-mint-foreground", children: "AP" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold text-mint-foreground", children: "12 cases this month" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-mint-foreground/80", children: "3 follow-ups scheduled" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
      /* @__PURE__ */ jsx(Stat, { icon: FileText, value: "47", label: "Total" }),
      /* @__PURE__ */ jsx(Stat, { icon: Calendar, value: "3", label: "Follow-up" }),
      /* @__PURE__ */ jsx(Stat, { icon: StickyNote, value: "9", label: "Notes" })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Recent Cases" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: CASES.map((c) => /* @__PURE__ */ jsx("article", { className: "rounded-2xl bg-card border border-border p-4 shadow-card", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-peach flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-peach-foreground", children: c.tooth }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-sm truncate", children: c.dx }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
            " ",
            c.date,
            " · ",
            c.id
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: `text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full flex-shrink-0 ${c.status === "Follow-up due" ? "bg-warning/40 text-warning-foreground" : c.status === "Completed" ? "bg-mint text-mint-foreground" : "bg-peach text-peach-foreground"}`, children: c.status })
    ] }) }, c.id)) })
  ] });
}
function Stat({
  icon: Icon,
  value,
  label
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-4 text-center shadow-card", children: [
    /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 mx-auto text-muted-foreground mb-1" }),
    /* @__PURE__ */ jsx("div", { className: "text-xl font-bold", children: value }),
    /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wide text-muted-foreground", children: label })
  ] });
}
export {
  ProfilePage as component
};
