import { learningTasks } from "@/data/mock-data";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeader } from "@/components/layout/section-header";
import { TaskCard } from "@/components/education/task-card";

export default function TasksPage() {
  return (
    <AppShell
      title="Aufgaben- und Uebungsmodus"
      subtitle="Waehle eine Aufgabe und arbeite mit Lernbegleitung statt Loesungsausgabe."
    >
      <div className="space-y-4">
        <SectionHeader
          title="Kleine Programmieraufgaben"
          description="Jede Aufgabe trainiert ein Kernkonzept mit sokratischen Impulsen."
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {learningTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
