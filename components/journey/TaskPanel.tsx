"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useMemo, useState } from "react";

import { JAVA_TASKS } from "@/data/java-tasks";
import { useJourneyStore } from "@/store/journey-store";
import { Button } from "@/components/ui/button";

function difficultyBadgeClasses(difficulty: (typeof JAVA_TASKS)[number]["difficulty"]) {
  if (difficulty === "beginner") return "bg-green-100 text-green-800";
  if (difficulty === "intermediate") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

export default function TaskPanel() {
  const {
    activeTaskId,
    completeActiveTask,
    isCompleted,
    submitForReview,
    reviewResult,
    isReviewing,
  } = useJourneyStore();

  const task = useMemo(
    () => (activeTaskId ? JAVA_TASKS.find((t) => t.id === activeTaskId) : null),
    [activeTaskId],
  );

  const [currentCode, setCurrentCode] = useState("");

  useEffect(() => {
    setCurrentCode(task?.starterCode ?? "");
  }, [task?.starterCode]);

  if (!activeTaskId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Wähle eine Aufgabe im Skillbaum aus
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Wähle eine Aufgabe im Skillbaum aus
        </div>
      </div>
    );
  }

  const alreadyCompleted = isCompleted(activeTaskId);
  const passed = reviewResult?.passed === true || alreadyCompleted;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="text-lg font-semibold">{task.title}</div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${difficultyBadgeClasses(task.difficulty)}`}
        >
          {task.difficulty}
        </span>
      </div>

      <div className="text-sm text-muted-foreground">{task.description}</div>

      <Editor
        key={activeTaskId}
        height="300px"
        defaultLanguage="java"
        value={currentCode}
        onChange={(value) => setCurrentCode(value ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />

      <div className="flex gap-2">
        <Button
          variant="default"
          disabled={isReviewing}
          onClick={() => void submitForReview(currentCode)}
        >
          {isReviewing ? (
            <span className="inline-flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              Wird bewertet...
            </span>
          ) : (
            "Code einreichen"
          )}
        </Button>

        {!passed ? (
          <Button
            variant="outline"
            onClick={() => {
              const ok = window.confirm(
                "Aufgabe wirklich überspringen? Du lernst mehr wenn du es selbst versuchst.",
              );
              if (!ok) return;
              void completeActiveTask();
            }}
          >
            Aufgabe überspringen
          </Button>
        ) : null}
      </div>

      {reviewResult ? (
        <div className="border-t pt-4">
          {reviewResult.passed ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-3">
              ✓ Gut gemacht! Aufgabe abgeschlossen
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3">
              Fast! Überarbeite deinen Code
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-3">{reviewResult.feedback}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {reviewResult.conceptsFound.map((c) => (
              <span key={`found-${c}`} className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                ✓ {c}
              </span>
            ))}
            {reviewResult.conceptsMissing.map((c) => (
              <span key={`missing-${c}`} className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                ✗ {c}
              </span>
            ))}
          </div>

          {!reviewResult.passed && reviewResult.hints.length > 0 ? (
            <div>
              <p className="text-sm font-medium mt-4">💡 Denk darüber nach:</p>
              <ul className="mt-2 list-disc pl-4">
                {reviewResult.hints.map((h, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

