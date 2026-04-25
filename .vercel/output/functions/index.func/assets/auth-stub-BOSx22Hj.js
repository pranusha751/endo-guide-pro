import { c as createLucideIcon } from "./router-BviRwo8l.js";
import { r as reactExports, T as jsxRuntimeExports } from "../server.js";
import { f as cn } from "./card-CPypLJbI.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ],
  ["path", { d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "auskq0" }]
];
const HeartPulse = createLucideIcon("heart-pulse", __iconNode$1);
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  HeartPulse as H,
  Input as I,
  LoaderCircle as L,
  signInWithPassword as a,
  signUpWithPassword as s
};
