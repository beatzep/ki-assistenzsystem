export const DIDACTIC_SYSTEM_PROMPT = `
Du bist ein didaktischer Coding-Assistent für Einsteiger.
Ziele:
- Erkläre Fehler in einfacher Sprache.
- Stelle sokratische Fragen.
- Gib abgestufte Hinweise statt direkter Komplettlösungen.
- Nenne Unsicherheit transparent.
- Erfinde keine Fehlertypen.
- Nutze nur Fehlertypen, die zur Sprache passen (z. B. kein NullPointerException für Python).
- Wenn im Code kein klarer Fehler erkennbar ist, sage das explizit.
- Wenn ein Lernkontext (Nutzerprofil) mitgeliefert wird, passe Tiefe und Vokabular daran an, ohne die JSON-Struktur zu ändern.

Ausgabeformat JSON:
{
  "detectedIssue": "...",
  "explanationSimple": "...",
  "likelyConcepts": ["...", "..."],
  "reflectionQuestions": ["...", "..."],
  "hints": [
    { "level": 1, "title": "...", "content": "..." },
    { "level": 2, "title": "...", "content": "..." },
    { "level": 3, "title": "...", "content": "..." }
  ],
  "confidenceLevel": "low|medium|high",
  "hallucinationWarning": false,
  "relevanceNote": "...",
  "conceptFocus": "..."
}
`.trim();

export function buildLearnerContextBlock(
  profile: import("@/types/qualification-profile").QualificationProfile | null | undefined,
) {
  if (!profile) {
    return "";
  }

  return `
Lernkontext (Nutzerprofil, für Tonfall und Schwierigkeitsgrad berücksichtigen):
- bekannte Sprachen: ${profile.knownLanguages.join(", ")}
- aktuelle Fokussprache / Unterstützung: ${profile.targetLanguage}
- Selbsteinschätzung: ${profile.skillLevel}
- bekannte Konzepte: ${profile.knownConcepts.length ? profile.knownConcepts.join(", ") : "keine Angabe"}
- Lernziele (Schlagworte): ${profile.goalTags.length ? profile.goalTags.join(", ") : "keine Angabe"}
- Freitext-Lernziele: ${profile.goalsFreeText?.trim() || "keine"}
`.trim();
}

export function buildDidacticUserPrompt(input: {
  language: string;
  code: string;
  errorMessage?: string;
  avoidDirectSolution?: boolean;
  qualificationProfile?: import("@/types/qualification-profile").QualificationProfile | null;
}) {
  const learnerBlock = buildLearnerContextBlock(input.qualificationProfile);

  return `
Sprache: ${input.language}
Direktlösung vermeiden: ${input.avoidDirectSolution ? "ja" : "nein"}
Fehlermeldung: ${input.errorMessage ?? "keine"}
${learnerBlock ? `\n${learnerBlock}\n` : ""}
Code:
${input.code}
`.trim();
}
