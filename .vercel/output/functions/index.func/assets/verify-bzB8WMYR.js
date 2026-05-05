import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { c as Route } from "./router-BuawVOqo.js";
import "zod";
function VerifyRoute() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [verifying, setVerifying] = useState(true);
  useEffect(() => {
    const email = search.email;
    setTimeout(() => {
      if (email) {
        const user = {
          id: crypto.randomUUID(),
          email,
          fullName: `Dr. ${email.split("@")[0]}`
        };
        localStorage.setItem("endo_made_easy_user", JSON.stringify(user));
      }
      setVerifying(false);
      setTimeout(() => navigate({
        to: "/workflow"
      }), 1500);
    }, 1500);
  }, [search, navigate]);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center justify-center p-6 min-h-screen bg-background", children: /* @__PURE__ */ jsx("div", { className: "text-center space-y-4", children: verifying ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Loader2, { className: "mx-auto h-8 w-8 animate-spin text-primary" }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Verifying Magic Link..." }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Please wait while we log you in." })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-6 w-6 text-mint-foreground" }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Verification Successful!" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Redirecting to the app..." })
  ] }) }) });
}
export {
  VerifyRoute as component
};
