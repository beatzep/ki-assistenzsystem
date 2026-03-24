"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LockKeyhole, RotateCcw, ShieldAlert } from "lucide-react";

import { restartOnboarding } from "@/app/actions/profile";
import { QualificationProfileForm } from "@/components/profile/qualification-profile-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { QualificationProfile } from "@/types/qualification-profile";

interface SettingsPanelsProps {
  initialProfile: QualificationProfile | null;
}

export function SettingsPanels({ initialProfile }: SettingsPanelsProps) {
  const router = useRouter();
  const safeLearningMode = useWorkspaceStore((s) => s.safeLearningMode);
  const setSafeLearningMode = useWorkspaceStore((s) => s.setSafeLearningMode);
  const [pending, startTransition] = useTransition();
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <QualificationProfileForm mode="settings" initial={initialProfile} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <LockKeyhole className="h-4 w-4 text-emerald-600" />
              Sichere Lernhilfe
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4 text-sm">
            <p className="text-muted-foreground">
              Direkte Lösungen vermeiden und Hinweise stufenweise priorisieren.
            </p>
            <Switch checked={safeLearningMode} onCheckedChange={setSafeLearningMode} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-amber-300/70 bg-amber-50/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-amber-900">
              <ShieldAlert className="h-4 w-4" />
              Halluzinationsschutz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-amber-900/90">
            <p>Antworten sind modellbasiert und können unvollständig sein.</p>
            <p>Code vor Ausführung prüfen, testen und mit Dokumentation abgleichen.</p>
            <p>Keine sensiblen Daten in Lernanalysen teilen.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <RotateCcw className="h-4 w-4" />
            Profil zurücksetzen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Onboarding erneut starten: <code className="rounded bg-muted px-1">onboarding_completed</code> wird
            deaktiviert, du wirst zum Profil-Assistenten geleitet.
          </p>
          {resetMessage ? <p className="text-destructive">{resetMessage}</p> : null}
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            disabled={pending}
            onClick={() => {
              setResetMessage(null);
              startTransition(async () => {
                const res = await restartOnboarding();
                if (res.error) {
                  setResetMessage(res.error);
                  return;
                }
                router.push("/onboarding");
                router.refresh();
              });
            }}
          >
            Onboarding erneut durchlaufen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
