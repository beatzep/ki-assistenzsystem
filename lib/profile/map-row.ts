import type { FocusLanguage, LearnerProfileRow, QualificationProfile, SkillLevel } from "@/types/qualification-profile";

export function rowToQualificationProfile(row: LearnerProfileRow): QualificationProfile {
  return {
    userId: row.id,
    knownLanguages: row.known_languages as FocusLanguage[],
    targetLanguage: row.target_language as FocusLanguage,
    skillLevel: row.skill_level as SkillLevel,
    knownConcepts: row.known_concepts ?? [],
    goalTags: row.goal_tags ?? [],
    goalsFreeText: row.goals_free_text ?? "",
    onboardingCompleted: row.onboarding_completed,
    updatedAt: row.updated_at,
  };
}
