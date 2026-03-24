"use client";

import { LockKeyhole, ShieldAlert } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useWorkspaceStore } from "@/store/workspace-store";

export default function SettingsPage() {
  const safeLearningMode = useWorkspaceStore((state) => state.safeLearningMode);
  const setSafeLearningMode = useWorkspaceStore((state) => state.setSafeLearningMode);

  return (
    <AppShell title="Einstellungen" subtitle="Sicherheitsprofil, didaktischer Modus und Datenschutzhinweise.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <LockKeyhole className="h-4 w-4 text-emerald-600" />
              Sichere Lernhilfe
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4 text-sm">
            <p className="text-muted-foreground">Direkte Loesungen vermeiden und Hinweise stufenweise priorisieren.</p>
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
            <p>Antworten sind modellbasiert und koennen unvollstaendig sein.</p>
            <p>Code vor Ausfuehrung pruefen, testen und mit Dokumentation abgleichen.</p>
            <p>Keine sensiblen Daten in Lernanalysen teilen.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
