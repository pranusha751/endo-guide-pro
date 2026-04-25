import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { f as cn } from "./card-XkZdbdiT.js";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const STORAGE_KEY = "endo_made_easy_user";
function persist(user) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}
async function signInWithPassword(email, password) {
  await new Promise((r) => setTimeout(r, 400));
  if (!email || !password) {
    return { user: null, error: "Email and password are required." };
  }
  if (password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters." };
  }
  const user = { id: crypto.randomUUID(), email };
  persist(user);
  return { user, error: null };
}
async function signUpWithPassword(fullName, email, password) {
  await new Promise((r) => setTimeout(r, 400));
  if (!fullName || !email || !password) {
    return { user: null, error: "All fields are required." };
  }
  if (password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters." };
  }
  const user = { id: crypto.randomUUID(), email, fullName };
  persist(user);
  return { user, error: null };
}
export {
  Input as I,
  signInWithPassword as a,
  signUpWithPassword as s
};
