import type { FocusLanguage } from "@/types/qualification-profile";

export const FOCUS_LANGUAGES: { value: FocusLanguage; label: string }[] = [
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "assembly", label: "Assembly" },
];

export const CONCEPT_OPTIONS: { id: string; label: string }[] = [
  { id: "variables", label: "Variablen & Typen" },
  { id: "control-flow", label: "Kontrollfluss (if/else, Schleifen)" },
  { id: "functions", label: "Funktionen / Methoden" },
  { id: "collections", label: "Listen, Arrays, Maps" },
  { id: "memory-pointers", label: "Speicher / Pointer (z. B. bei C/Assembly)" },
  { id: "exceptions", label: "Exceptions & Fehlerbehandlung" },
  { id: "debugging", label: "Debugging & Tests" },
  { id: "algorithms", label: "Algorithmen & Komplexität" },
];

export const GOAL_TAG_OPTIONS: { id: string; label: string }[] = [
  { id: "exam-prep", label: "Prüfungsvorbereitung" },
  { id: "assignments", label: "Übungsblätter / Projekte" },
  { id: "debugging-habits", label: "Sauberes Debuggen lernen" },
  { id: "oop", label: "OOP / Klassendesign" },
  { id: "functional", label: "Funktionale Konzepte" },
  { id: "low-level", label: "Hardwarenahe Programmierung" },
];

export const SKILL_LEVEL_LABELS: Record<string, string> = {
  beginner: "Einsteiger",
  basic: "Grundlagen",
  intermediate: "Fortgeschritten",
  advanced: "Sehr erfahren",
};
