import { fallbackAnalysis } from "@/data/mock-data";
import type { AnalyzePayload, AnalysisResult } from "@/types/analysis";

function javaNullPointerAnalysis(): AnalysisResult {
  return {
    detectedIssue: "NullPointerException: Es wird eine Methode auf einer null-Referenz aufgerufen.",
    explanationSimple: "Die Variable `studentName` ist aktuell leer (null). Auf einer leeren Referenz kann `toUpperCase()` nicht ausgefuehrt werden.",
    likelyConcepts: ["NullPointerException", "Bedingungen", "Methodenaufrufe"],
    reflectionQuestions: [
      "Woher kommt der Wert von `studentName`?",
      "Welche Stelle sollte pruefen, ob der Wert null ist?",
      "Wie kannst du fuer den null-Fall eine sinnvolle Ausgabe definieren?",
    ],
    hints: [
      {
        level: 1,
        title: "Hinweis 1 - Ursache sichtbar machen",
        content: "Logge den Wert vor dem Methodenaufruf. Wenn `null` erscheint, ist der Zugriff unsicher.",
      },
      {
        level: 2,
        title: "Hinweis 2 - Schutzbedingung",
        content: "Fuege vor `toUpperCase()` eine Bedingung ein, die den null-Fall abfaengt.",
      },
      {
        level: 3,
        title: "Hinweis 3 - Fast Loesungsweg",
        content: "Nutze einen Guard: Wenn null, gib z. B. `'Unbekannt'` aus. Sonst rufe `toUpperCase()` auf.",
      },
    ],
    confidenceLevel: "high",
    hallucinationWarning: false,
    relevanceNote: "Null-Sicherheit ist ein Kernprinzip fuer robuste Java-Programme.",
    conceptFocus: "Defensive Checks vor Methodenaufrufen",
  };
}

function pythonIndexAnalysis(): AnalysisResult {
  return {
    detectedIssue: "IndexError: Die Schleife greift auf einen Index ausserhalb der Liste zu.",
    explanationSimple: "Die Liste hat 3 Elemente, aber `range(len(scores) + 1)` erzeugt 4 Indizes. Der letzte Zugriff ist ungueltig.",
    likelyConcepts: ["Schleifen", "Listen / Arrays", "Bedingungen"],
    reflectionQuestions: [
      "Welche Indizes sind bei einer Liste mit 3 Elementen erlaubt?",
      "Warum erzeugt `+ 1` hier einen zusaetzlichen Durchlauf?",
      "Wie koennte man die Schleife so schreiben, dass Grenzfaelle sicher sind?",
    ],
    hints: [
      {
        level: 1,
        title: "Hinweis 1 - Grenzen pruefen",
        content: "Vergleiche die laengste erzeugte Zahl aus `range(...)` mit dem letzten gueltigen Listenindex.",
      },
      {
        level: 2,
        title: "Hinweis 2 - Schleife vereinfachen",
        content: "Iteriere direkt ueber die Listenelemente statt ueber Indizes, wenn du den Index nicht brauchst.",
      },
      {
        level: 3,
        title: "Hinweis 3 - Fast Loesungsweg",
        content: "Entferne `+ 1` oder stelle auf `for score in scores` um.",
      },
    ],
    confidenceLevel: "high",
    hallucinationWarning: false,
    relevanceNote: "Off-by-one-Fehler sind einer der haeufigsten Bugs in der Programmierausbildung.",
    conceptFocus: "Indexgrenzen und Iterationsmuster",
  };
}

function jsScopeAnalysis(): AnalysisResult {
  return {
    detectedIssue: "Scope-Problem: `var` teilt sich eine Schleifenvariable ueber alle Callbacks.",
    explanationSimple: "Alle Funktionen greifen spaeter auf denselben Wert von `i` zu, nicht auf den Wert pro Iteration.",
    likelyConcepts: ["Variablen-Scope", "Schleifen", "Methodenaufrufe"],
    reflectionQuestions: [
      "Wann wird der Callback ausgefuehrt: waehrend oder nach der Schleife?",
      "Welche Unterschiede gibt es zwischen `var` und `let` im Scope?",
      "Wie koenntest du den Iterationswert pro Callback einfrieren?",
    ],
    hints: [
      {
        level: 1,
        title: "Hinweis 1 - Ausfuehrungszeitpunkt",
        content: "Pruefe zuerst, wann die Funktion den Wert von `i` wirklich liest.",
      },
      {
        level: 2,
        title: "Hinweis 2 - Scope-Ebene",
        content: "Nutze eine Variable mit Block-Scope innerhalb der Schleife.",
      },
      {
        level: 3,
        title: "Hinweis 3 - Fast Loesungsweg",
        content: "Ersetze `var` durch `let` oder nutze eine Funktion, die den aktuellen Wert als Parameter annimmt.",
      },
    ],
    confidenceLevel: "medium",
    hallucinationWarning: true,
    relevanceNote: "Scope-Verstaendnis ist zentral fuer asynchrones und callback-basiertes JavaScript.",
    conceptFocus: "Block-Scope und Closures",
  };
}

function pythonDivisionByZeroAnalysis(): AnalysisResult {
  return {
    detectedIssue: "ZeroDivisionError: Division durch 0 ist nicht erlaubt.",
    explanationSimple:
      "In Python darf nicht durch 0 geteilt werden. Das fuehrt zur Laufzeit direkt zu einem Abbruch.",
    likelyConcepts: ["Bedingungen", "Variablen-Scope", "Methodenaufrufe"],
    reflectionQuestions: [
      "Welche Variable sollte als Divisor dienen?",
      "Kann der Divisor in Randfaellen 0 sein?",
      "Wo solltest du vor der Division einen Guard einbauen?",
    ],
    hints: [
      {
        level: 1,
        title: "Hinweis 1 - Divisor identifizieren",
        content: "Pruefe, welcher Wert rechts vom `/` steht und ob er dynamisch ist.",
      },
      {
        level: 2,
        title: "Hinweis 2 - Vorbedingung",
        content: "Fuehre die Division nur aus, wenn der Divisor groesser als 0 ist.",
      },
      {
        level: 3,
        title: "Hinweis 3 - Fast Loesungsweg",
        content: "Nutze typischerweise `len(numbers)` als Divisor und behandle den leeren Listenfall separat.",
      },
    ],
    confidenceLevel: "high",
    hallucinationWarning: false,
    relevanceNote: "Divisionen sind haeufige Fehlerquellen, besonders bei leeren Datenmengen.",
    conceptFocus: "Defensive Guards vor kritischen Operationen",
  };
}

function noClearIssueAnalysis(language: AnalyzePayload["language"]): AnalysisResult {
  return {
    detectedIssue: `Kein eindeutiger Laufzeitfehler fuer ${language} erkannt.`,
    explanationSimple:
      "Der gezeigte Code wirkt plausibel. Es gibt aktuell kein klares Fehlersignal aus dem Snippet allein.",
    likelyConcepts: ["Debugging", "Tests", "Bedingungen"],
    reflectionQuestions: [
      "Welches erwartete Ergebnis hast du konkret?",
      "Gibt es einen Randfall, in dem die Logik trotzdem kippt?",
      "Welche kleine Testeingabe koennte die Annahme pruefen?",
    ],
    hints: [
      {
        level: 1,
        title: "Hinweis 1 - Erwartung festhalten",
        content: "Schreibe zuerst auf, welches Ergebnis du erwartest, bevor du weiter veraenderst.",
      },
      {
        level: 2,
        title: "Hinweis 2 - Mini-Tests",
        content: "Teste mit sehr kleinen Eingaben (leer, 1 Element, Grenzwerte).",
      },
      {
        level: 3,
        title: "Hinweis 3 - Naechster Debug-Schritt",
        content: "Fuege gezielte Assertions oder Prints an kritischen Stellen ein, um Annahmen zu validieren.",
      },
    ],
    confidenceLevel: "medium",
    hallucinationWarning: true,
    relevanceNote: "Auch ohne sichtbaren Bug hilft systematisches Testen beim sicheren Lernen.",
    conceptFocus: "Hypothesenbasiertes Debugging",
  };
}

export async function runMockAnalysis(payload: AnalyzePayload): Promise<AnalysisResult> {
  const normalizedCode = payload.code.toLowerCase();
  const normalizedError = payload.errorMessage?.toLowerCase() ?? "";

  if (
    payload.language === "java" &&
    (normalizedError.includes("nullpointerexception") || normalizedCode.includes("touppercase"))
  ) {
    return javaNullPointerAnalysis();
  }

  if (
    payload.language === "python" &&
    (normalizedError.includes("indexerror") || normalizedCode.includes("len(scores) + 1"))
  ) {
    return pythonIndexAnalysis();
  }

  if (
    payload.language === "python" &&
    (normalizedError.includes("zerodivisionerror") || normalizedCode.includes("/ 0"))
  ) {
    return pythonDivisionByZeroAnalysis();
  }

  if (payload.language === "javascript" && normalizedCode.includes("for (var i")) {
    return jsScopeAnalysis();
  }

  if (!payload.errorMessage?.trim()) {
    return noClearIssueAnalysis(payload.language);
  }

  return fallbackAnalysis;
}
