export type FocusLanguage = "java" | "python" | "javascript" | "assembly";

export type SkillLevel = "beginner" | "basic" | "intermediate" | "advanced";

/** Vollständiges Lernprofil — Grundlage für Prompt-Personalisierung und spätere Journey. */
export interface QualificationProfile {
  userId: string;
  knownLanguages: FocusLanguage[];
  targetLanguage: FocusLanguage;
  skillLevel: SkillLevel;
  knownConcepts: string[];
  goalTags: string[];
  goalsFreeText: string;
  onboardingCompleted: boolean;
  updatedAt: string;
}

/** Zeile in Supabase `learner_profiles` (snake_case). */
export interface LearnerProfileRow {
  id: string;
  known_languages: string[];
  target_language: string;
  skill_level: string;
  known_concepts: string[];
  goal_tags: string[];
  goals_free_text: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}
