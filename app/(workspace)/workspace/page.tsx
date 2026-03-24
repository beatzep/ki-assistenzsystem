import { AppShell } from "@/components/layout/app-shell";
import { WorkspaceView } from "@/components/workspace/workspace-view";

export default function WorkspacePage() {
  return (
    <AppShell
      title="Learning Workspace"
      subtitle="Didaktische Analyse fuer Fehlerdiagnose, Konzepte und reflektiertes Debugging."
    >
      <WorkspaceView />
    </AppShell>
  );
}
