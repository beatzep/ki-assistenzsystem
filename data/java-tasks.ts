// /data/java-tasks.ts

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type JavaTask = {
  id: string; // eindeutiger slug, z.B. "java-variables"
  title: string;
  description: string; // 1–2 Sätze, was der Lernende hier übt
  difficulty: Difficulty;
  parentIds: string[]; // IDs der Knoten, die abgeschlossen sein müssen
  starterCode: string; // vorausgefüllter Java-Code im Monaco Editor
  expectedConcepts: string[]; // Begriffe die der Bot sokratisch abfragen soll
};

export const JAVA_TASKS: JavaTask[] = [
  // EBENE 0 – kein Elternknoten (immer entsperrt)
  {
    id: "java-hello-world",
    title: "Hello World",
    description:
      "Schreibe dein erstes Java-Programm und verstehe die main-Methode.",
    difficulty: "beginner",
    parentIds: [],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Dein Code hier\n    }\n}`,
    expectedConcepts: ["main-Methode", "System.out.println", "Klasse"],
  },

  // EBENE 1 – benötigt java-hello-world
  {
    id: "java-variables",
    title: "Variablen & Datentypen",
    description:
      "Lerne primitive Datentypen (int, double, boolean, char) und String.",
    difficulty: "beginner",
    parentIds: ["java-hello-world"],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        int age = 0;\n        // Ergänze weitere Variablen\n    }\n}`,
    expectedConcepts: ["int", "double", "boolean", "String", "Typdeklaration"],
  },
  {
    id: "java-input",
    title: "Nutzereingabe (Scanner)",
    description: "Lies Eingaben von der Konsole mit java.util.Scanner.",
    difficulty: "beginner",
    parentIds: ["java-hello-world"],
    starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Lies einen Namen ein und gib ihn aus\n    }\n}`,
    expectedConcepts: ["Scanner", "nextLine", "Import"],
  },

  // EBENE 2 – benötigt java-variables
  {
    id: "java-conditionals",
    title: "Bedingungen (if / else)",
    description: "Steuere den Programmfluss mit if, else if und else.",
    difficulty: "beginner",
    parentIds: ["java-variables"],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        int score = 75;\n        // Gib "bestanden" oder "nicht bestanden" aus\n    }\n}`,
    expectedConcepts: ["if", "else", "Vergleichsoperator", "boolean"],
  },
  {
    id: "java-loops",
    title: "Schleifen (for / while)",
    description: "Wiederhole Code-Blöcke mit for- und while-Schleifen.",
    difficulty: "beginner",
    parentIds: ["java-variables"],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Gib die Zahlen 1 bis 10 aus\n    }\n}`,
    expectedConcepts: ["for", "while", "Schleifenbedingung", "Inkrement"],
  },

  // EBENE 3 – benötigt java-conditionals UND java-loops
  {
    id: "java-arrays",
    title: "Arrays",
    description:
      "Speichere mehrere Werte in einem Array und iteriere darüber.",
    difficulty: "intermediate",
    parentIds: ["java-conditionals", "java-loops"],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] numbers = {3, 7, 2, 9, 1};\n        // Finde das Maximum\n    }\n}`,
    expectedConcepts: ["Array", "Index", "length", "for-Schleife"],
  },
  {
    id: "java-methods",
    title: "Methoden",
    description: "Lagere Logik in wiederverwendbare Methoden aus.",
    difficulty: "intermediate",
    parentIds: ["java-conditionals", "java-loops"],
    starterCode: `public class Main {\n    // Schreibe eine Methode "add" die zwei int-Werte addiert\n    public static void main(String[] args) {\n        \n    }\n}`,
    expectedConcepts: ["Rückgabetyp", "Parameter", "return", "static"],
  },

  // EBENE 4 – benötigt java-methods
  {
    id: "java-oop-classes",
    title: "Klassen & Objekte",
    description:
      "Modelliere reale Objekte mit eigenen Klassen, Feldern und Konstruktoren.",
    difficulty: "intermediate",
    parentIds: ["java-methods"],
    starterCode: `public class Car {\n    // Felder: brand (String), speed (int)\n    // Konstruktor\n    // Methode: accelerate(int amount)\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}`,
    expectedConcepts: ["Klasse", "Objekt", "Konstruktor", "Instanz", "this"],
  },

  // EBENE 5 – benötigt java-oop-classes
  {
    id: "java-inheritance",
    title: "Vererbung",
    description: "Erweitere Klassen mit extends und verstehe Polymorphismus.",
    difficulty: "advanced",
    parentIds: ["java-oop-classes"],
    starterCode: `public class Animal {\n    String name;\n    public void speak() { System.out.println(\"...\"); }\n}\n\n// Erstelle Dog und Cat die Animal erweitern\n`,
    expectedConcepts: ["extends", "super", "Override", "Polymorphismus"],
  },
  {
    id: "java-exceptions",
    title: "Exceptions",
    description:
      "Fange Laufzeitfehler mit try-catch ab und wirf eigene Exceptions.",
    difficulty: "advanced",
    parentIds: ["java-oop-classes"],
    starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Teile eine Zahl durch Nutzereingabe – behandle Division durch 0\n    }\n}`,
    expectedConcepts: ["try", "catch", "finally", "throw", "Exception"],
  },
  {
    id: "java-collections",
    title: "Collections (ArrayList, HashMap)",
    description: "Nutze dynamische Datenstrukturen aus java.util.",
    difficulty: "advanced",
    parentIds: ["java-arrays", "java-oop-classes"],
    starterCode: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> names = new ArrayList<>();\n        // Füge 3 Namen hinzu, sortiere und gib sie aus\n    }\n}`,
    expectedConcepts: [
      "ArrayList",
      "HashMap",
      "Generics",
      "Collections.sort",
    ],
  },
];

