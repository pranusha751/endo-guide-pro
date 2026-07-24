import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
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
  notes?: string;
};

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-endo-guide";

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";
  return createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

// ─── Get Cases ────────────────────────────────────────────────────────────────

export const getCases = createServerFn({ method: "GET" }).handler(
  async (): Promise<CaseRecord[]> => {
    const token = getCookie("auth_token");
    if (!token) return [];

    const userId = getUserIdFromToken(token);
    if (!userId) return [];

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("Case")
        .select("*")
        .eq("userId", userId)
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Failed to fetch cases:", error.message);
        return [];
      }

      return (data ?? []) as unknown as CaseRecord[];
    } catch (err) {
      console.error("Failed to fetch cases:", err);
      return [];
    }
  },
);

// ─── Get Case By ID ───────────────────────────────────────────────────────────

export const getCaseById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<CaseRecord | undefined> => {
    const token = getCookie("auth_token");
    if (!token) return undefined;

    const userId = getUserIdFromToken(token);
    if (!userId) return undefined;

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("Case")
        .select("*")
        .eq("id", id)
        .eq("userId", userId)
        .single();

      if (error || !data) return undefined;
      return data as unknown as CaseRecord;
    } catch (err) {
      console.error("Failed to fetch case:", err);
      return undefined;
    }
  });

// ─── Save Case ────────────────────────────────────────────────────────────────

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
      const supabase = getSupabaseClient();
      const now = new Date().toISOString();
      const { data: newCase, error } = await supabase
        .from("Case")
        .insert({
          id: crypto.randomUUID(),
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
          createdAt: now,
          updatedAt: now,
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to save case:", error.message);
        return null;
      }

      return newCase as unknown as CaseRecord;
    } catch (err) {
      console.error("Failed to save case:", err);
      return null;
    }
  });

export const updateCase = createServerFn({ method: "POST" })
  .inputValidator((caseData: { id: string; status?: string; notes?: string }) => caseData)
  .handler(async ({ data }): Promise<CaseRecord | null> => {
    const token = getCookie("auth_token");
    if (!token) return null;

    const userId = getUserIdFromToken(token);
    if (!userId) return null;

    try {
      const supabase = getSupabaseClient();
      const now = new Date().toISOString();
      
      const updateData: Record<string, any> = {
        updatedAt: now,
      };
      if (data.status !== undefined) updateData.status = data.status;
      if (data.notes !== undefined) updateData.notes = data.notes;

      const { data: updatedCase, error } = await supabase
        .from("Case")
        .update(updateData)
        .eq("id", data.id)
        .eq("userId", userId)
        .select()
        .single();

      if (error) {
        console.error("Failed to update case:", error.message);
        return null;
      }

      return updatedCase as unknown as CaseRecord;
    } catch (err) {
      console.error("Failed to update case:", err);
      return null;
    }
  });

