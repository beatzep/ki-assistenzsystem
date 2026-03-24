import { z } from "zod";

export const supportedLanguageSchema = z.enum(["java", "python", "javascript", "assembly"]);

/** Nur Client-/API-Body — ohne Profil (Profil kommt serverseitig aus Supabase). */
export const analyzeApiInputSchema = z.object({
  code: z.string().min(3, "Bitte gib etwas Code ein."),
  language: supportedLanguageSchema,
  errorMessage: z.string().max(500).optional(),
  avoidDirectSolution: z.boolean().optional().default(true),
});

export const analyzePayloadSchema = analyzeApiInputSchema;

export const hintSchema = z.object({
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  title: z.string(),
  content: z.string(),
});

export const analysisResultSchema = z.object({
  detectedIssue: z.string(),
  explanationSimple: z.string(),
  likelyConcepts: z.array(z.string()),
  reflectionQuestions: z.array(z.string()),
  hints: z.array(hintSchema).length(3),
  confidenceLevel: z.enum(["low", "medium", "high"]),
  hallucinationWarning: z.boolean(),
  relevanceNote: z.string(),
  conceptFocus: z.string(),
});
