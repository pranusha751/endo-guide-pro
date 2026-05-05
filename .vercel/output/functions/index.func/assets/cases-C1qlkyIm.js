import { g as getCurrentUser } from "./router-BuawVOqo.js";
const CASES_KEY = "endo_made_easy_cases";
function getCases() {
  if (typeof window === "undefined") return [];
  const user = getCurrentUser();
  if (!user) return [];
  const raw = localStorage.getItem(CASES_KEY);
  if (!raw) return [];
  try {
    const allCases = JSON.parse(raw);
    return allCases.filter((c) => c.userId === user.email || c.userId === user.id).sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}
function saveCase(caseData) {
  if (typeof window === "undefined") return null;
  const user = getCurrentUser();
  if (!user) return null;
  const raw = localStorage.getItem(CASES_KEY);
  let allCases = [];
  if (raw) {
    try {
      allCases = JSON.parse(raw);
    } catch {
    }
  }
  const dateObj = /* @__PURE__ */ new Date();
  const dateStr = dateObj.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const newCase = {
    ...caseData,
    id: `C-${Math.floor(Math.random() * 900) + 100}`,
    userId: user.email,
    date: dateStr,
    timestamp: dateObj.getTime()
  };
  allCases.push(newCase);
  localStorage.setItem(CASES_KEY, JSON.stringify(allCases));
  return newCase;
}
export {
  getCases as g,
  saveCase as s
};
