import { AppShell } from "@/components/layout/app-shell";
import { QualificationProfileForm } from "@/components/profile/qualification-profile-form";
import { getLearnerProfileByUserId } from "@/lib/profile/queries";
import { createClient } from "@/lib/supabase/server";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = user ? await getLearnerProfileByUserId(user.id) : null;

  return (
    <AppShell
      title="Dein Lernprofil"
      subtitle="Wir nutzen diese Daten als Kontext für Erklärungen — ohne direkte Komplettlösungen zu erzwingen."
    >
      <QualificationProfileForm mode="onboarding" initial={profile} />
    </AppShell>
  );
}
