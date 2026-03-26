import { AppShell } from "@/components/layout/app-shell";
import { WorkspaceView } from "@/components/workspace/workspace-view";
import { getLearnerProfileByUserId } from "@/lib/profile/queries";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function WorkspacePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = user ? await getLearnerProfileByUserId(user.id) : null;

  return (
    <AppShell
      title="Learning Workspace"
      subtitle="Didaktische Analyse für Fehlerdiagnose, Konzepte und reflektiertes Debugging."
    >
      <WorkspaceView profileTargetLanguage={profile?.targetLanguage} />
      <div className="px-6 pb-6">
        <Link
          href="/journey"
          className="text-sm text-muted-foreground underline hover:text-foreground"
        >
          Zur Java Learning Journey →
        </Link>
      </div>
    </AppShell>
  );
}
