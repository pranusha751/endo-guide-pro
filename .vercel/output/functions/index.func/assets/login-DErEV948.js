import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { B as Button } from "./button-Db1c3JUm.js";
import { I as Input } from "./input-DBQLBqJY.js";
import { L as Label } from "./label-3j8ZWv3L.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-XkZdbdiT.js";
import { HeartPulse, Loader2 } from "lucide-react";
import { e as signInWithPassword, d as sendMagicLink } from "./router-BuawVOqo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
import "zod";
function RouteComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
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
  const handleGoogleLogin = async () => {
    if (!email) {
      setError("Please enter your email first to sign in with Google.");
      return;
    }
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    const {
      error: authError
    } = await sendMagicLink(email);
    setLoading(false);
    if (authError) {
      setError(authError);
    } else {
      setSuccessMsg("Verification sent! Check your browser console for the simulated email link.");
    }
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
      successMsg && /* @__PURE__ */ jsx("p", { className: "rounded-md bg-mint/20 px-3 py-2 text-sm text-mint-foreground", children: successMsg }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
        loading ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
        "Login with Password"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative my-4", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "w-full border-t" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-card px-2 text-muted-foreground", children: "Or continue with" }) })
      ] }),
      /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full bg-card", onClick: handleGoogleLogin, disabled: loading, children: [
        /* @__PURE__ */ jsxs("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
          /* @__PURE__ */ jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
          /* @__PURE__ */ jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
          /* @__PURE__ */ jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }),
          /* @__PURE__ */ jsx("path", { d: "M1 1h22v22H1z", fill: "none" })
        ] }),
        "Sign in with Google"
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
