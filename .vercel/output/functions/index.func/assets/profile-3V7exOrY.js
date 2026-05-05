import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation, Link } from "@tanstack/react-router";
import { g as getCurrentUser, P as PageHeader } from "./router-BuawVOqo.js";
import { FileText, Calendar, StickyNote, Clock } from "lucide-react";
import { g as getCases } from "./cases-C1qlkyIm.js";
import { useState, useEffect } from "react";
import "zod";
function ProfilePage() {
  const location = useLocation();
  const user = getCurrentUser();
  const [cases, setCases] = useState([]);
  useEffect(() => {
    setCases(getCases());
  }, [location.pathname]);
  let displayName = "Doctor";
  let initials = "DR";
  if (user) {
    const nameStr = user.fullName || user.email.split("@")[0];
    const hasDrPrefix = /^dr\.?\s/i.test(nameStr);
    displayName = hasDrPrefix ? nameStr : `Dr. ${nameStr}`;
    const parts = nameStr.replace(/^dr\.?\s+/i, "").split(/[-_.\s]+/);
    if (parts.length >= 2 && parts[0] && parts[1]) {
      initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts[0] && parts[0].length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Profile", subtitle: `${displayName} · GP Endodontist` }),
    /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-mint p-5 mb-5 shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-card flex items-center justify-center text-xl font-bold text-mint-foreground", children: initials }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "font-semibold text-mint-foreground", children: [
          cases.length,
          " cases total"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-mint-foreground/80", children: [
          cases.filter((c) => c.status === "Follow-up due").length,
          " follow-ups scheduled"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
      /* @__PURE__ */ jsx(Stat, { icon: FileText, value: cases.length.toString(), label: "Total" }),
      /* @__PURE__ */ jsx(Stat, { icon: Calendar, value: cases.filter((c) => c.status === "Follow-up due").length.toString(), label: "Follow-up" }),
      /* @__PURE__ */ jsx(Stat, { icon: StickyNote, value: "0", label: "Notes" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Recent Cases" }),
      cases.length > 0 && /* @__PURE__ */ jsx(Link, { to: "/workflow", className: "text-xs font-semibold text-primary hover:underline", children: "+ Add Case" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: cases.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8 bg-card rounded-2xl border border-dashed border-border/60 shadow-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "No cases yet." }),
      /* @__PURE__ */ jsx(Link, { to: "/workflow", className: "inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-semibold shadow-soft", children: "Start New Case" })
    ] }) : cases.map((c) => /* @__PURE__ */ jsx("article", { className: "rounded-2xl bg-card border border-border p-4 shadow-card", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
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
