import { z } from "zod";

export const focusLanguageSchema = z.enum(["java", "python", "javascript", "assembly"]);
export const skillLevelSchema = z.enum(["beginner", "basic", "intermediate", "advanced"]);

export const qualificationProfileFormSchema = z.object({
  knownLanguages: z.array(focusLanguageSchema).min(1, "Mindestens eine bekannte Sprache wählen."),
  targetLanguage: focusLanguageSchema,
  skillLevel: skillLevelSchema,
  knownConcepts: z.array(z.string()).default([]),
  goalTags: z.array(z.string()).default([]),
  goalsFreeText: z.string().max(2000).optional().default(""),
  onboardingCompleted: z.boolean().optional().default(true),
});

export type QualificationProfileFormInput = z.infer<typeof qualificationProfileFormSchema>;
