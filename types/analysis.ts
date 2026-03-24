import type { FocusLanguage } from "@/types/qualification-profile";

export type SupportedLanguage = FocusLanguage;

export type ConfidenceLevel = "low" | "medium" | "high";

export interface Hint {
  level: 1 | 2 | 3;
  title: string;
  content: string;
}

export interface AnalysisResult {
  detectedIssue: string;
  explanationSimple: string;
  likelyConcepts: string[];
  reflectionQuestions: string[];
  hints: Hint[];
  confidenceLevel: ConfidenceLevel;
  hallucinationWarning: boolean;
  relevanceNote: string;
  conceptFocus: string;
}

export interface AnalyzePayload {
  code: string;
  language: SupportedLanguage;
  errorMessage?: string;
  avoidDirectSolution?: boolean;
  /** Aus Supabase; für personalisierte Prompts (optional) */
  qualificationProfile?: import("@/types/qualification-profile").QualificationProfile | null;
}
