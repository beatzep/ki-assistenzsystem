import type { AnalysisResult, SupportedLanguage } from "@/types/analysis";

export interface StarterSnippet {
  id: string;
  title: string;
  language: SupportedLanguage;
  code: string;
  errorMessage: string;
}

export interface LearningTask {
  id: string;
  title: string;
  difficulty: "leicht" | "mittel" | "fortgeschritten";
  language: SupportedLanguage;
  conceptTags: string[];
  prompt: string;
  starterCode: string;
  successCriteria: string;
}

export interface ConceptEntry {
  id: string;
  title: string;
  shortDescription: string;
  practicalTip: string;
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  language: SupportedLanguage;
  title: string;
  summary: string;
  confidenceLevel: AnalysisResult["confidenceLevel"];
}
