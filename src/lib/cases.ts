import { createServerFn } from "@tanstack/react-start";

import { getSupabaseServerClient } from "./auth";

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

// ─── Get Cases ────────────────────────────────────────────────────────────────

export const getCases = createServerFn({ method: "GET" }).handler(
  async (): Promise<CaseRecord[]> => {
    try {
      const supabase = await getSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("Case")
        .select("*")
        .eq("userId", user.id)
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
    try {
      const supabase = await getSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return undefined;

      const { data, error } = await supabase
        .from("Case")
        .select("*")
        .eq("id", id)
        .eq("userId", user.id)
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
    try {
      const supabase = await getSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const dateObj = new Date();
      const dateStr = dateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const now = new Date().toISOString();

      // Workaround for legacy foreign key constraint on Case_userId_fkey
      await supabase.from('User').upsert({
        id: user.id,
        email: user.email || 'migrated@example.com',
        fullName: 'Migrated User',
        passwordHash: 'migrated',
        isEmailVerified: true,
        updatedAt: now
      }, { onConflict: 'id' });

      const { data: newCase, error } = await supabase
        .from("Case")
        .insert({
          id: globalThis.crypto.randomUUID(),
          userId: user.id,
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

// ─── Update Case ──────────────────────────────────────────────────────────────

export const updateCase = createServerFn({ method: "POST" })
  .inputValidator((caseData: { id: string; status?: string; notes?: string }) => caseData)
  .handler(async ({ data }): Promise<CaseRecord | null> => {
    try {
      const supabase = await getSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const now = new Date().toISOString();
      const updateData: Record<string, any> = { updatedAt: now };
      
      if (data.status !== undefined) updateData.status = data.status;
      if (data.notes !== undefined) updateData.notes = data.notes;

      const { data: updatedCase, error } = await supabase
        .from("Case")
        .update(updateData)
        .eq("id", data.id)
        .eq("userId", user.id)
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
