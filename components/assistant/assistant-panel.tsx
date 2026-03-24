"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Compass, ShieldAlert } from "lucide-react";

import { ConceptCard } from "@/components/assistant/concept-card";
import { ConfidenceBadge } from "@/components/assistant/confidence-badge";
import { HintCard } from "@/components/assistant/hint-card";
import { EmptyState } from "@/components/layout/empty-state";
import { LoadingState } from "@/components/layout/loading-state";
import { SectionHeader } from "@/components/layout/section-header";
import { ReflectionCard } from "@/components/education/reflection-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceStore } from "@/store/workspace-store";

export function AssistantPanel() {
  const { analysis, isAnalyzing, activeHintLevel, setActiveHintLevel, revealNextHint } = useWorkspaceStore();

  if (isAnalyzing) {
    return <LoadingState text="Didaktische Analyse wird vorbereitet..." />;
  }

  if (!analysis) {
    return (
      <EmptyState
        title="Noch keine Analyse vorhanden"
        description="Klicke auf Analysieren, um Diagnose, Leitfragen und gestufte Hilfen zu erhalten."
      />
    );
  }

  const activeHint = analysis.hints.find((hint) => hint.level === activeHintLevel) ?? analysis.hints[0];
  const progressValue = activeHintLevel === 1 ? 35 : activeHintLevel === 2 ? 68 : 100;

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="space-y-4">
      <Card className="rounded-2xl">
        <CardHeader className="space-y-4 pb-2">
          <SectionHeader
            title="Assistance Panel"
            description="Diagnose, Konzept und Guided Hints statt direkter Komplettloesung."
          />
          <ConfidenceBadge level={analysis.confidenceLevel} hallucinationWarning={analysis.hallucinationWarning} />
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="bg-muted/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Fehlerdiagnose-Karte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{analysis.detectedIssue}</p>
              <p>{analysis.explanationSimple}</p>
            </CardContent>
          </Card>

          <div className="space-y-3 rounded-xl border p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Fragestrecke / Guided Hints</p>
              <Button size="sm" variant="secondary" onClick={revealNextHint}>
                Naechsten Hinweis
              </Button>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((level) => (
                <Button
                  key={level}
                  size="sm"
                  variant={activeHintLevel === level ? "default" : "outline"}
                  onClick={() => setActiveHintLevel(level as 1 | 2 | 3)}
                >
                  Hinweis {level}
                </Button>
              ))}
            </div>
            <HintCard hint={activeHint} isActive />
          </div>

          <ReflectionCard questions={analysis.reflectionQuestions} />
          <ConceptCard title="Welches Konzept steckt dahinter?" description={analysis.conceptFocus} />
          <ConceptCard title="Warum ist das relevant?" description={analysis.relevanceNote} />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Fortschritt der Selbstableitung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={progressValue} />
              <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                <p className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Problem erkannt
                </p>
                <p className="flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5 text-blue-600" />
                  Konzept verstanden
                </p>
                <p className="flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5 text-violet-600" />
                  Loesung selbst hergeleitet
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="rounded-xl border border-amber-300/70 bg-amber-50/70 p-3 text-xs text-amber-900">
            <p className="mb-1 flex items-center gap-2 font-medium">
              <AlertTriangle className="h-4 w-4" />
              Vertrauenshinweis
            </p>
            <p>
              Moeglicherweise unsicher. Bitte Code testen, Randfaelle pruefen und Annahmen hinterfragen. Antwort basiert
              auf Heuristik und Modellannahmen.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
