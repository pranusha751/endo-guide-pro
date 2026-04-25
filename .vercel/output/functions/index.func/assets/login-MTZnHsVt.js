import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { B as Button } from "./button-Db1c3JUm.js";
import { I as Input, a as signInWithPassword } from "./auth-stub-BaMquqIn.js";
import { L as Label } from "./label-3j8ZWv3L.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-XkZdbdiT.js";
import { HeartPulse, Loader2 } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function RouteComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const {
      user,
      error: authError
    } = await signInWithPassword(email, password);
    setLoading(false);
    if (authError || !user) {
      setError(authError ?? "Unable to sign in.");
      return;
    }
    navigate({
      to: "/workflow"
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center justify-center p-6 overflow-y-auto", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm rounded-2xl shadow-sm border-0 sm:border", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-2 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-2 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(HeartPulse, { className: "h-6 w-6 text-primary" }) }) }),
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-bold", children: "Welcome back" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Sign in to continue your endodontic workflow" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(Input, { id: "email", type: "email", placeholder: "you@clinic.com", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), disabled: loading })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-sm font-medium text-primary hover:underline", children: "Forgot password?" })
        ] }),
        /* @__PURE__ */ jsx(Input, { id: "password", type: "password", autoComplete: "current-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), disabled: loading })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
        loading && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
        loading ? "Signing in..." : "Login"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/signup", className: "font-medium text-primary hover:underline", children: "Sign up" })
    ] }) })
  ] }) });
}
export {
  RouteComponent as component
};
