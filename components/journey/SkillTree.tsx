"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { JAVA_TASKS, JavaTask } from "@/data/java-tasks";
import { useJourneyStore } from "@/store/journey-store";

function difficultyBadgeClasses(difficulty: JavaTask["difficulty"]) {
  if (difficulty === "beginner") return "bg-green-100 text-green-800";
  if (difficulty === "intermediate") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

function nodeClasses(opts: { isCompleted: boolean; isActive: boolean; isUnlocked: boolean }) {
  const base = "w-40 h-24 rounded-xl shadow-md border flex flex-col items-start justify-between p-3 text-left";
  if (!opts.isUnlocked && !opts.isCompleted) return `${base} bg-gray-100 border-gray-200 opacity-40 cursor-not-allowed`;
  if (opts.isCompleted) return `${base} bg-green-50 border-green-400`;
  if (opts.isActive) return `${base} bg-blue-50 border-blue-400`;
  return `${base} bg-white border-gray-300`;
}

export function buildLevels(tasks: JavaTask[]): JavaTask[][] {
  const byId = new Map(tasks.map((t) => [t.id, t]));

  const levels: JavaTask[][] = [];
  const remaining = new Map(tasks.map((t) => [t.id, t]));

  const assignedLevel = new Map<string, number>();

  // Level 0: no parents
  const level0: JavaTask[] = [];
  for (const task of remaining.values()) {
    if (!task.parentIds.length) {
      level0.push(task);
    }
  }
  level0.sort((a, b) => a.id.localeCompare(b.id));
  levels.push(level0);
  for (const t of level0) {
    assignedLevel.set(t.id, 0);
    remaining.delete(t.id);
  }

  // Next levels: parents must already be assigned
  let guard = 0;
  while (remaining.size && guard < 1000) {
    guard++;
    const level: JavaTask[] = [];
    for (const task of remaining.values()) {
      const parentsKnown = task.parentIds.every((pid) => byId.has(pid));
      if (!parentsKnown) continue;
      const allParentsAssigned = task.parentIds.every((pid) => assignedLevel.has(pid));
      if (allParentsAssigned) level.push(task);
    }
    if (!level.length) break;
    level.sort((a, b) => a.id.localeCompare(b.id));
    levels.push(level);
    for (const t of level) {
      assignedLevel.set(t.id, levels.length - 1);
      remaining.delete(t.id);
    }
  }

  // Fallback: if something is cyclic/missing, push the rest to the end
  if (remaining.size) {
    const rest = Array.from(remaining.values()).sort((a, b) => a.id.localeCompare(b.id));
    levels.push(rest);
  }

  return levels;
}

type Line = { x1: number; y1: number; x2: number; y2: number };

export default function SkillTree() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [lines, setLines] = useState<Line[]>([]);

  const { loadProgress, setActiveTask, isUnlocked, isCompleted, activeTaskId } = useJourneyStore();

  useEffect(() => {
    void loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const levels = useMemo(() => buildLevels(JAVA_TASKS), []);

  const recomputeLines = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const nextLines: Line[] = [];

    for (const task of JAVA_TASKS) {
      if (!task.parentIds.length) continue;
      const childEl = nodeRefs.current[task.id];
      if (!childEl) continue;
      const childRect = childEl.getBoundingClientRect();
      const childX = childRect.left - containerRect.left + childRect.width / 2 + container.scrollLeft;
      const childY = childRect.top - containerRect.top + container.scrollTop;

      for (const pid of task.parentIds) {
        const parentEl = nodeRefs.current[pid];
        if (!parentEl) continue;
        const parentRect = parentEl.getBoundingClientRect();
        const parentX =
          parentRect.left - containerRect.left + parentRect.width / 2 + container.scrollLeft;
        const parentY =
          parentRect.top - containerRect.top + parentRect.height + container.scrollTop;

        nextLines.push({
          x1: parentX,
          y1: parentY,
          x2: childX,
          y2: childY,
        });
      }
    }

    setLines(nextLines);
  };

  useEffect(() => {
    recomputeLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levels, activeTaskId]);

  useEffect(() => {
    const onResize = () => recomputeLines();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-auto overflow-y-auto min-h-[500px]"
      onScroll={() => recomputeLines()}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {lines.map((l, idx) => (
          <line
            key={idx}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="rgb(148 163 184)"
            strokeWidth={2}
          />
        ))}
      </svg>

      <div className="relative flex flex-col gap-10 py-6">
        {levels.map((level, levelIdx) => (
          <div key={levelIdx} className="flex flex-row justify-center gap-6 px-6">
            {level.map((task) => {
              const completed = isCompleted(task.id);
              const unlocked = isUnlocked(task);
              const active = activeTaskId === task.id;

              const statusIcon = completed ? "✓" : unlocked ? "○" : "🔒";
              const disabled = !unlocked && !completed;

              return (
                <div key={task.id} className="relative group">
                  <button
                    ref={(el) => {
                      nodeRefs.current[task.id] = el;
                    }}
                    className={`${nodeClasses({
                      isCompleted: completed,
                      isActive: active,
                      isUnlocked: unlocked,
                    })} ${active ? "ring-2 ring-blue-500" : ""}`}
                    disabled={disabled}
                    onClick={() => setActiveTask(task.id)}
                    type="button"
                  >
                    <div className="w-full flex items-start justify-between gap-2">
                      <div className="font-medium leading-tight">{task.title}</div>
                      <div className="text-sm">{statusIcon}</div>
                    </div>

                    <div className="w-full flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${difficultyBadgeClasses(
                          task.difficulty,
                        )}`}
                      >
                        {task.difficulty}
                      </span>
                    </div>
                  </button>

                  <div className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 z-40 hidden group-hover:block">
                    <div className="w-52 rounded-lg border bg-background p-3 shadow-md">
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        Erwartete Konzepte
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {task.expectedConcepts.map((c) => (
                          <span
                            key={c}
                            className="text-[11px] rounded-full bg-muted px-2 py-1 text-muted-foreground"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

