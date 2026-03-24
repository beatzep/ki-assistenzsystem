import { redirect } from "next/navigation";

import { WorkspaceSessionProvider } from "@/components/auth/workspace-session-context";
import { WorkspaceGate } from "@/components/layout/workspace-gate";
import { getLearnerProfileByUserId } from "@/lib/profile/queries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function WorkspaceRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
        <h1 className="text-lg font-semibold">Supabase-Konfiguration fehlt</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Lege <code className="rounded bg-muted px-1">NEXT_PUBLIC_SUPABASE_URL</code> und{" "}
          <code className="rounded bg-muted px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
          <code className="rounded bg-muted px-1">.env.local</code> an und führe das SQL aus{" "}
          <code className="rounded bg-muted px-1">docs/supabase-schema.md</code> aus.
        </p>
      </div>
    );
  }

  let user;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    redirect("/login?error=config");
  }

  if (!user) {
    redirect("/login");
  }

  const profile = await getLearnerProfileByUserId(user.id);
  const onboardingCompleted = profile?.onboardingCompleted ?? false;

  return (
    <WorkspaceSessionProvider email={user.email ?? ""} userId={user.id}>
      <WorkspaceGate onboardingCompleted={onboardingCompleted}>{children}</WorkspaceGate>
    </WorkspaceSessionProvider>
  );
}
