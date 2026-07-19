import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

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

const BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:4000";

export const getCases = createServerFn({ method: "GET" }).handler(
  async (): Promise<CaseRecord[]> => {
    const token = getCookie("auth_token");
    if (!token) return [];

    try {
      const res = await fetch(`${BACKEND_URL}/api/cases`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        return (await res.json()) as CaseRecord[];
      }
    } catch (error) {
      console.error("Failed to fetch cases:", error);
    }
    return [];
  },
);

export const getCaseById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<CaseRecord | undefined> => {
    const token = getCookie("auth_token");
    if (!token) return undefined;

    try {
      const res = await fetch(`${BACKEND_URL}/api/cases/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        return (await res.json()) as CaseRecord;
      }
    } catch (error) {
      console.error("Failed to fetch case:", error);
    }
    return undefined;
  });

export const saveCase = createServerFn({ method: "POST" })
  .inputValidator((caseData: Omit<CaseRecord, "id" | "userId" | "date" | "timestamp">) => caseData)
  .handler(async ({ data }): Promise<CaseRecord | null> => {
    const token = getCookie("auth_token");
    if (!token) return null;

    const dateObj = new Date();
    const dateStr = dateObj.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const payload = {
      ...data,
      date: dateStr,
      timestamp: dateObj.getTime(),
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return (await res.json()) as CaseRecord;
      }
    } catch (error) {
      console.error("Failed to save case:", error);
    }
    return null;
  });
