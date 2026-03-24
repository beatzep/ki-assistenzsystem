"use client";

import { create } from "zustand";

import { starterSnippets } from "@/data/mock-data";
import type { AnalysisResult, SupportedLanguage } from "@/types/analysis";

interface WorkspaceState {
  language: SupportedLanguage;
  code: string;
  errorMessage: string;
  analysis: AnalysisResult | null;
  isAnalyzing: boolean;
  activeHintLevel: 1 | 2 | 3;
  safeLearningMode: boolean;
  confidenceOverride: AnalysisResult["confidenceLevel"] | null;
  setLanguage: (language: SupportedLanguage) => void;
  setCode: (code: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setAnalysis: (analysis: AnalysisResult | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setActiveHintLevel: (level: 1 | 2 | 3) => void;
  revealNextHint: () => void;
  setSafeLearningMode: (safe: boolean) => void;
  applyStarterSnippet: (snippetId: string) => void;
  startNewSession: () => void;
}

const defaultSnippet = starterSnippets[0];

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  language: defaultSnippet.language,
  code: defaultSnippet.code,
  errorMessage: defaultSnippet.errorMessage,
  analysis: null,
  isAnalyzing: false,
  activeHintLevel: 1,
  safeLearningMode: true,
  confidenceOverride: null,
  setLanguage: (language) =>
    set({
      language,
      // Clear stale runtime errors when user switches language context.
      errorMessage: "",
      analysis: null,
      activeHintLevel: 1,
    }),
  setCode: (code) => set({ code, analysis: null, activeHintLevel: 1 }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setAnalysis: (analysis) => set({ analysis, activeHintLevel: 1 }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setActiveHintLevel: (activeHintLevel) => set({ activeHintLevel }),
  revealNextHint: () =>
    set((state) => ({
      activeHintLevel: state.activeHintLevel < 3 ? ((state.activeHintLevel + 1) as 1 | 2 | 3) : 3,
    })),
  setSafeLearningMode: (safeLearningMode) => set({ safeLearningMode }),
  applyStarterSnippet: (snippetId) => {
    const snippet = starterSnippets.find((entry) => entry.id === snippetId) ?? defaultSnippet;
    set({
      language: snippet.language,
      code: snippet.code,
      errorMessage: snippet.errorMessage,
      analysis: null,
      activeHintLevel: 1,
    });
  },
  startNewSession: () =>
    set({
      language: defaultSnippet.language,
      code: defaultSnippet.code,
      errorMessage: defaultSnippet.errorMessage,
      analysis: null,
      isAnalyzing: false,
      activeHintLevel: 1,
    }),
}));
