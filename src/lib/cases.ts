import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import prisma from "./db";
import jwt from "jsonwebtoken";

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

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-endo-guide";

const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
};

export const getCases = createServerFn({ method: "GET" }).handler(
  async (): Promise<CaseRecord[]> => {
    const token = getCookie("auth_token");
    if (!token) return [];

    const userId = getUserIdFromToken(token);
    if (!userId) return [];

    try {
      const cases = await prisma.case.findMany({
        where: { userId },
        orderBy: { timestamp: "desc" },
      });
      return cases as unknown as CaseRecord[];
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

    const userId = getUserIdFromToken(token);
    if (!userId) return undefined;

    try {
      const caseRecord = await prisma.case.findFirst({
        where: { id, userId },
      });
      if (caseRecord) {
        return caseRecord as unknown as CaseRecord;
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

    const userId = getUserIdFromToken(token);
    if (!userId) return null;

    const dateObj = new Date();
    const dateStr = dateObj.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    try {
      const newCase = await prisma.case.create({
        data: {
          userId,
          patientName: data.patientName || null,
          patientAge: data.patientAge || null,
          patientGender: data.patientGender || null,
          tooth: data.tooth,
          dx: data.dx,
          date: dateStr,
          timestamp: dateObj.getTime(),
          status: data.status,
          fileSystem: data.fileSystem || null,
        },
      });

      return newCase as unknown as CaseRecord;
    } catch (error) {
      console.error("Failed to save case:", error);
    }
    return null;
  });
