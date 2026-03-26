// /app/(workspace)/journey/page.tsx
import SkillTree from "@/components/journey/SkillTree";
import TaskPanel from "@/components/journey/TaskPanel";

export default function JourneyPage() {
  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <div>
        <h1 className="text-2xl font-bold">Java Learning Journey</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Schließe Aufgaben ab, um neue Themen freizuschalten.
        </p>
      </div>

      {/* Skillbaum oben, Task-Panel unten */}
      <div className="flex flex-col gap-6 flex-1 overflow-hidden">
        <div
          className="rounded-xl border bg-card p-4 overflow-auto flex-shrink-0"
          style={{ maxHeight: "420px" }}
        >
          <SkillTree />
        </div>
        <div className="rounded-xl border bg-card p-4 flex-1 overflow-auto">
          <TaskPanel />
        </div>
      </div>
    </div>
  );
}

