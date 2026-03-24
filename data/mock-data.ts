import type { AnalysisResult } from "@/types/analysis";
import type { ConceptEntry, HistoryEntry, LearningTask, StarterSnippet } from "@/types/education";

export const starterSnippets: StarterSnippet[] = [
  {
    id: "java-npe",
    title: "Java: NullPointerException verstehen",
    language: "java",
    errorMessage: 'Exception in thread "main" java.lang.NullPointerException',
    code: `public class StudentPrinter {
  public static void main(String[] args) {
    String studentName = null;
    System.out.println(studentName.toUpperCase());
  }
}`,
  },
  {
    id: "python-index",
    title: "Python: IndexError bei Listen",
    language: "python",
    errorMessage: "IndexError: list index out of range",
    code: `scores = [12, 15, 19]
for i in range(len(scores) + 1):
    print("Score:", scores[i])`,
  },
  {
    id: "js-scope",
    title: "JavaScript: Scope in Schleifen",
    language: "javascript",
    errorMessage: "Unexpected output caused by shared loop variable",
    code: `const callbacks = [];

for (var i = 0; i < 3; i++) {
  callbacks.push(() => console.log(i));
}

callbacks[0]();
callbacks[1]();
callbacks[2]();`,
  },
];

export const conceptLibrary: ConceptEntry[] = [
  {
    id: "npe",
    title: "NullPointerException",
    shortDescription: "Ein Objekt ist null, aber eine Methode wird darauf aufgerufen.",
    practicalTip: "Vor Methodenzugriffen Null-Checks einbauen oder sichere Defaults setzen.",
  },
  {
    id: "loops",
    title: "Schleifen",
    shortDescription: "Wiederholen Code, bis eine Abbruchbedingung erreicht wird.",
    practicalTip: "Immer prüfen, ob Start, Ende und Schrittweite zusammenpassen.",
  },
  {
    id: "conditions",
    title: "Bedingungen",
    shortDescription: "if/else steuert, welcher Codepfad ausgeführt wird.",
    practicalTip: "Grenzfälle explizit testen, nicht nur den Happy Path.",
  },
  {
    id: "scope",
    title: "Variablen-Scope",
    shortDescription: "Bestimmt, wo eine Variable sichtbar und veränderbar ist.",
    practicalTip: "Kleine Scopes bevorzugen, um Nebeneffekte zu vermeiden.",
  },
  {
    id: "methods",
    title: "Methodenaufrufe",
    shortDescription: "Methoden kapseln Logik und benötigen korrekte Parameter.",
    practicalTip: "Signatur lesen und Rückgabewert immer validieren.",
  },
  {
    id: "arrays",
    title: "Listen / Arrays",
    shortDescription: "Speichern mehrere Werte unter Indizes.",
    practicalTip: "Indexzugriffe immer gegen Länge absichern.",
  },
];

export const learningTasks: LearningTask[] = [
  {
    id: "task-1",
    title: "Null-sicherer Namensdruck",
    difficulty: "leicht",
    language: "java",
    conceptTags: ["NullPointerException", "Bedingungen"],
    prompt: "Passe den Code so an, dass kein Laufzeitfehler entsteht und ein sinnvoller Fallback ausgegeben wird.",
    starterCode: `String studentName = null;
System.out.println(studentName.toUpperCase());`,
    successCriteria: "Programm läuft ohne Exception und behandelt null sauber.",
  },
  {
    id: "task-2",
    title: "Sichere Schleifengrenzen",
    difficulty: "mittel",
    language: "python",
    conceptTags: ["Schleifen", "Listen / Arrays"],
    prompt: "Repariere die Schleife so, dass alle Elemente ausgegeben werden, aber kein IndexError entsteht.",
    starterCode: `scores = [12, 15, 19]
for i in range(len(scores) + 1):
    print(scores[i])`,
    successCriteria: "Alle Werte werden ausgegeben, kein out-of-range Zugriff.",
  },
  {
    id: "task-3",
    title: "Scope bei Callbacks",
    difficulty: "fortgeschritten",
    language: "javascript",
    conceptTags: ["Variablen-Scope", "Methodenaufrufe"],
    prompt: "Sorge dafür, dass jeder Callback den erwarteten Schleifenwert ausgibt.",
    starterCode: `const callbacks = [];
for (var i = 0; i < 3; i++) {
  callbacks.push(() => console.log(i));
}`,
    successCriteria: "Die Ausgabe zeigt 0, 1 und 2 statt dreimal denselben Wert.",
  },
];

export const historyEntries: HistoryEntry[] = [
  {
    id: "hist-1",
    createdAt: "Heute, 10:24",
    language: "java",
    title: "NullPointerException in StudentPrinter",
    summary: "Ursache isoliert: Aufruf auf null-Referenz.",
    confidenceLevel: "high",
  },
  {
    id: "hist-2",
    createdAt: "Gestern, 19:11",
    language: "python",
    title: "IndexError in Notenliste",
    summary: "Schleifenende war um +1 verschoben.",
    confidenceLevel: "medium",
  },
];

export const fallbackAnalysis: AnalysisResult = {
  detectedIssue: "Die Eingabe zeigt ein typisches Einsteigerproblem mit Kontrollfluss und Wertevalidierung.",
  explanationSimple: "Es sieht so aus, als ob an mindestens einer Stelle ein Wert anders ist als erwartet. Dadurch bricht der Ablauf ab oder liefert ein falsches Ergebnis.",
  likelyConcepts: ["Bedingungen", "Schleifen", "Variablen-Scope"],
  reflectionQuestions: [
    "Welche Variable hat kurz vor dem Fehler einen unerwarteten Wert?",
    "An welcher Stelle im Ablauf ändert sich der Zustand?",
    "Welcher kleine Testfall zeigt das Problem am schnellsten?",
  ],
  hints: [
    {
      level: 1,
      title: "Hinweis 1 - Verhalten beobachten",
      content: "Füge gezielte Ausgaben vor der Problemstelle ein und prüfe, ob alle Werte plausibel sind.",
    },
    {
      level: 2,
      title: "Hinweis 2 - Ursache eingrenzen",
      content: "Überprüfe die Bedingung, die den kritischen Zweig auslöst. Oft liegt der Fehler in einem Grenzfall.",
    },
    {
      level: 3,
      title: "Hinweis 3 - Fast konkrete Richtung",
      content: "Baue vor dem Zugriff einen Guard ein und passe die Schleifen- oder Bedingungslogik so an, dass der Grenzfall abgedeckt ist.",
    },
  ],
  confidenceLevel: "medium",
  hallucinationWarning: true,
  relevanceNote: "Das Problem ist relevant, weil ähnliche Fehler in fast allen Programmiersprachen auftreten.",
  conceptFocus: "Defensive Programmierung und sauberes Debugging",
};
