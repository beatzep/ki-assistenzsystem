"use server";

import { revalidatePath } from "next/cache";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { qualificationProfileFormSchema } from "@/lib/profile/schema";
import { setOnboardingIncomplete, upsertLearnerProfile } from "@/lib/profile/queries";

export async function saveQualificationProfile(raw: unknown) {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase ist nicht konfiguriert." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nicht angemeldet." };
  }

  const parsed = qualificationProfileFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe" };
  }

  try {
    await upsertLearnerProfile(user.id, parsed.data);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Speichern fehlgeschlagen." };
  }

  revalidatePath("/settings");
  revalidatePath("/onboarding");
  revalidatePath("/workspace");

  return { ok: true as const };
}

export async function restartOnboarding() {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase ist nicht konfiguriert." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nicht angemeldet." };
  }

  try {
    await setOnboardingIncomplete(user.id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Zurücksetzen fehlgeschlagen." };
  }

  revalidatePath("/", "layout");
  return { ok: true as const };
}
