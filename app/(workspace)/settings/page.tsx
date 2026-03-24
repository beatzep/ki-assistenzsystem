import { AppShell } from "@/components/layout/app-shell";
import { SettingsPanels } from "@/components/settings/settings-panels";
import { getLearnerProfileByUserId } from "@/lib/profile/queries";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = user ? await getLearnerProfileByUserId(user.id) : null;

  return (
    <AppShell
      title="Einstellungen"
      subtitle="Lernprofil, sicherer Lernmodus und optional erneutes Onboarding."
    >
      <SettingsPanels initialProfile={profile} />
    </AppShell>
  );
}
