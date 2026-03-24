import type { SupportedLanguage } from "@/types/analysis";

export const languageLabels: Record<SupportedLanguage, string> = {
  java: "Java",
  python: "Python",
  javascript: "JavaScript",
  assembly: "Assembly",
};

/** Monaco „language“ prop; Assembly hat keinen dedizierten Modus. */
export function monacoLanguageFor(supported: SupportedLanguage): string {
  if (supported === "assembly") {
    return "plaintext";
  }
  return supported;
}
