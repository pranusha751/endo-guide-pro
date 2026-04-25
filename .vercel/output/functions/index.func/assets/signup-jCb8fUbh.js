import { r as reactExports, T as jsxRuntimeExports } from "../server.js";
import { u as useNavigate, d as PhoneFrame, L as Link } from "./router-kFOIupVK.js";
import { B as Button } from "./button-2iViTmHw.js";
import { H as HeartPulse, I as Input, L as LoaderCircle, s as signUpWithPassword } from "./auth-stub-Cb9EC9xW.js";
import { L as Label } from "./label-Cn9s6EuX.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-CPypLJbI.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-fpruKui8.js";
function RouteComponent() {
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const {
      user,
      error: authError
    } = await signUpWithPassword(name, email, password);
    setLoading(false);
    if (authError || !user) {
      setError(authError ?? "Unable to create account.");
      return;
    }
    navigate({
      to: "/workflow"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneFrame, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center p-6 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-sm rounded-2xl shadow-sm border-0 sm:border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "h-6 w-6 text-primary" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-bold", children: "Create an account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Join Endo Made Easy to manage your cases" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSignup, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", type: "text", placeholder: "Dr. Jane Doe", autoComplete: "name", required: true, value: name, onChange: (e) => setName(e.target.value), disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "you@clinic.com", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), disabled: loading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", autoComplete: "new-password", placeholder: "At least 6 characters", required: true, value: password, onChange: (e) => setPassword(e.target.value), disabled: loading })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", disabled: loading, children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        loading ? "Creating account..." : "Sign Up"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-medium text-primary hover:underline", children: "Login" })
    ] }) })
  ] }) }) });
}
export {
  RouteComponent as component
};
