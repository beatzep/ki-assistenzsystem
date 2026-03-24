import { rowToQualificationProfile } from "@/lib/profile/map-row";
import type { QualificationProfileFormInput } from "@/lib/profile/schema";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { LearnerProfileRow, QualificationProfile } from "@/types/qualification-profile";

export async function getLearnerProfileByUserId(userId: string): Promise<QualificationProfile | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("learner_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return rowToQualificationProfile(data as LearnerProfileRow);
}

export async function upsertLearnerProfile(userId: string, input: QualificationProfileFormInput): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase ist nicht konfiguriert.");
  }

  const supabase = await createClient();

  const payload = {
    id: userId,
    known_languages: input.knownLanguages,
    target_language: input.targetLanguage,
    skill_level: input.skillLevel,
    known_concepts: input.knownConcepts,
    goal_tags: input.goalTags,
    goals_free_text: input.goalsFreeText?.trim() || null,
    onboarding_completed: input.onboardingCompleted ?? true,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("learner_profiles").upsert(payload, { onConflict: "id" });

  if (error) {
    throw new Error(error.message);
  }
}

export async function setOnboardingIncomplete(userId: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase ist nicht konfiguriert.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("learner_profiles")
    .update({ onboarding_completed: false, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
