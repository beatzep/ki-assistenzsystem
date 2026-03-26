// /store/journey-store.ts
import { create } from "zustand";

import { JAVA_TASKS, JavaTask } from "@/data/java-tasks";
import { getCompletedTaskIds, markTaskCompleted } from "@/lib/journey/progress";

type ReviewResult = {
  passed: boolean;
  feedback: string;
  hints: string[];
  conceptsFound: string[];
  conceptsMissing: string[];
};

type JourneyState = {
  completedIds: string[]; // Task-IDs die abgeschlossen sind
  activeTaskId: string | null; // aktuell geöffnete Task
  isLoading: boolean;
  reviewResult: ReviewResult | null;
  isReviewing: boolean;

  loadProgress: () => Promise<void>;
  setActiveTask: (id: string) => void;
  completeActiveTask: () => Promise<void>;
  submitForReview: (code: string) => Promise<void>;

  // Computed helpers (keine Zustand-Felder, inline berechnet)
  isUnlocked: (task: JavaTask) => boolean;
  isCompleted: (taskId: string) => boolean;
};

export const useJourneyStore = create<JourneyState>((set, get) => ({
  completedIds: [],
  activeTaskId: null,
  isLoading: false,
  reviewResult: null,
  isReviewing: false,

  loadProgress: async () => {
    set({ isLoading: true });
    const ids = await getCompletedTaskIds();
    set({ completedIds: ids, isLoading: false });
  },

  setActiveTask: (id) => set({ activeTaskId: id, reviewResult: null }),

  completeActiveTask: async () => {
    const { activeTaskId, completedIds } = get();
    if (!activeTaskId || completedIds.includes(activeTaskId)) return;
    await markTaskCompleted(activeTaskId);
    set({ completedIds: [...completedIds, activeTaskId] });
  },

  submitForReview: async (code) => {
    const { activeTaskId } = get();
    if (!activeTaskId) return;

    const task = JAVA_TASKS.find((t) => t.id === activeTaskId);
    if (!task) return;

    set({ isReviewing: true, reviewResult: null });
    try {
      const res = await fetch("/api/journey-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          taskId: task.id,
          expectedConcepts: task.expectedConcepts,
        }),
      });

      if (!res.ok) {
        set({
          reviewResult: {
            passed: false,
            feedback: "Bewertung fehlgeschlagen. Bitte versuche es erneut.",
            hints: [],
            conceptsFound: [],
            conceptsMissing: task.expectedConcepts,
          },
        });
        return;
      }

      const json = (await res.json()) as ReviewResult;
      set({ reviewResult: json });
      if (json.passed) {
        await get().completeActiveTask();
      }
    } finally {
      set({ isReviewing: false });
    }
  },

  isUnlocked: (task) => {
    const { completedIds } = get();
    return task.parentIds.every((pid) => completedIds.includes(pid));
  },

  isCompleted: (taskId) => get().completedIds.includes(taskId),
}));

