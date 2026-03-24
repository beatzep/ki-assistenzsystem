"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Lock, ShieldCheck } from "lucide-react";

import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { EditorPanel } from "@/components/workspace/editor-panel";
import { SyncProfileLanguage } from "@/components/workspace/sync-profile-language";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { SupportedLanguage } from "@/types/analysis";

export function WorkspaceView({ profileTargetLanguage }: { profileTargetLanguage?: SupportedLanguage }) {
  const safeLearningMode = useWorkspaceStore((state) => state.safeLearningMode);
  const setSafeLearningMode = useWorkspaceStore((state) => state.setSafeLearningMode);

  return (
    <div className="space-y-4">
      {profileTargetLanguage ? <SyncProfileLanguage target={profileTargetLanguage} /> : null}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <EditorPanel />
        <AssistantPanel />
      </motion.div>

      <Card className="rounded-2xl border-amber-300/70 bg-amber-50/70">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-amber-900">Vertrauens- und Sicherheitsbereich</p>
            <p className="text-xs text-amber-800">
              Möglicherweise unsicher – bitte vor Ausführung testen. Keine sensiblen Daten ohne Freigabe senden.
            </p>
            <p className="flex items-center gap-1 text-xs text-amber-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              Antwort basiert auf Heuristik / Modellannahme.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-background px-3 py-2">
            <Lock className="h-4 w-4 text-amber-700" />
            <div className="text-xs">
              <p className="font-medium text-foreground">Sichere Lernhilfe</p>
              <p className="text-muted-foreground">Direkte Lösung vermeiden</p>
            </div>
            <Switch checked={safeLearningMode} onCheckedChange={setSafeLearningMode} />
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            Bitte Code testen
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
