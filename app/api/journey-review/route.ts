import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

import { JAVA_TASKS } from "@/data/java-tasks";
import { getLlmRuntimeConfig } from "@/lib/llm/config";

const journeyReviewInputSchema = z.object({
  code: z.string().min(1),
  taskId: z.string().min(1),
  expectedConcepts: z.array(z.string().min(1)).default([]),
});

const journeyReviewOutputSchema = z.object({
  passed: z.boolean(),
  feedback: z.string(),
  hints: z.array(z.string()),
  conceptsFound: z.array(z.string()),
  conceptsMissing: z.array(z.string()),
});

const SYSTEM_PROMPT = `Du bist ein didaktischer Java-Tutor. Analysiere den eingereichten Java-Code eines 
Lernenden.

Du bekommst:
- Den Code des Lernenden
- Die erwarteten Konzepte die demonstriert werden sollen
- Den Aufgabentitel

Antworte NUR als JSON-Objekt ohne Markdown-Backticks in diesem exakten Format:
{
  "passed": boolean,
  "feedback": string (max 3 Sätze, ermutigend und konstruktiv, KEINE fertige Lösung),
  "hints": string[] (1-3 sokratische Hinweise als Fragen formuliert, z.B. "Was passiert wenn...?"),
  "conceptsFound": string[] (welche expectedConcepts wurden korrekt verwendet),
  "conceptsMissing": string[] (welche expectedConcepts fehlen noch)
}

passed = true nur wenn alle expectedConcepts korrekt verwendet wurden UND der Code 
syntaktisch sinnvoll ist.
Gib NIEMALS die fertige Lösung aus. Stelle stattdessen Gegenfragen.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = journeyReviewInputSchema.parse(body);

    const taskTitle = JAVA_TASKS.find((t) => t.id === input.taskId)?.title ?? input.taskId;

    const config = getLlmRuntimeConfig();
    if (!config.enabled || !config.apiKey) {
      return NextResponse.json(
        {
          passed: false,
          feedback:
            "LLM ist aktuell nicht konfiguriert. Bitte richte die API-Konfiguration ein und versuche es erneut.",
          hints: [],
          conceptsFound: [],
          conceptsMissing: input.expectedConcepts,
        },
        { status: 503 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          temperature: 0.2,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: [
                `Aufgabe: ${taskTitle}`,
                `TaskId: ${input.taskId}`,
                `ExpectedConcepts: ${JSON.stringify(input.expectedConcepts)}`,
                "",
                "Code:",
                input.code,
              ].join("\n"),
            },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        return NextResponse.json(
          { message: "Journey-Review fehlgeschlagen" },
          { status: 500 },
        );
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (typeof content !== "string") {
        return NextResponse.json(
          { message: "Journey-Review fehlgeschlagen" },
          { status: 500 },
        );
      }

      const parsed = journeyReviewOutputSchema.parse(JSON.parse(content));
      return NextResponse.json(parsed);
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Ungültige Eingabe",
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Journey-Review fehlgeschlagen",
      },
      { status: 500 },
    );
  }
}

