import { getCurrentUser } from "./auth-stub";

export type CaseRecord = {
  id: string;
  userId: string;
  patientName?: string;
  patientAge?: string;
  patientGender?: string;
  tooth: string;
  dx: string;
  date: string;
  timestamp: number;
  status: string;
  fileSystem?: string;
};

const CASES_KEY = "endo_made_easy_cases";

export function getCases(): CaseRecord[] {
  if (typeof window === "undefined") return [];
  const user = getCurrentUser();
  if (!user) return [];

  const raw = localStorage.getItem(CASES_KEY);
  if (!raw) return [];
  try {
    const allCases: CaseRecord[] = JSON.parse(raw);
    return allCases
      .filter((c) => c.userId === user.email || c.userId === user.id)
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

export function getCaseById(id: string): CaseRecord | undefined {
  const allCases = getCases();
  return allCases.find((c) => c.id === id);
}

export function saveCase(
  caseData: Omit<CaseRecord, "id" | "userId" | "date" | "timestamp">,
): CaseRecord | null {
  if (typeof window === "undefined") return null;
  const user = getCurrentUser();
  if (!user) return null;

  const raw = localStorage.getItem(CASES_KEY);
  let allCases: CaseRecord[] = [];
  if (raw) {
    try {
      allCases = JSON.parse(raw);
    } catch {
      // Ignore parse error
    }
  }

  const dateObj = new Date();
  const dateStr = dateObj.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const newCase: CaseRecord = {
    ...caseData,
    id: `C-${Math.floor(Math.random() * 900) + 100}`,
    userId: user.email,
    date: dateStr,
    timestamp: dateObj.getTime(),
  };

  allCases.push(newCase);
  localStorage.setItem(CASES_KEY, JSON.stringify(allCases));
  return newCase;
}
