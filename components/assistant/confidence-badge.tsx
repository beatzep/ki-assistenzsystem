import { AlertTriangle, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { ConfidenceLevel } from "@/types/analysis";

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  hallucinationWarning: boolean;
}

const confidenceToValue: Record<ConfidenceLevel, number> = {
  low: 35,
  medium: 65,
  high: 90,
};

export function ConfidenceBadge({ level, hallucinationWarning }: ConfidenceBadgeProps) {
  return (
    <div className="space-y-3 rounded-xl border bg-card p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Confidence Meter</p>
        <Badge variant="secondary" className="capitalize">
          {level}
        </Badge>
      </div>
      <Progress value={confidenceToValue[level]} />
      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        {hallucinationWarning ? (
          <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
        ) : (
          <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
        )}
        <p>
          {hallucinationWarning
            ? "Möglicherweise unsicher. Bitte Code testen und mit eigener Logik prüfen."
            : "Relativ konsistente Analyse. Trotzdem vor Ausführung validieren."}
        </p>
      </div>
    </div>
  );
}
