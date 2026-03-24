import { Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Hint } from "@/types/analysis";

interface HintCardProps {
  hint: Hint;
  isActive?: boolean;
}

export function HintCard({ hint, isActive = false }: HintCardProps) {
  return (
    <Card className={isActive ? "border-primary/60 shadow-sm" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            {hint.title}
          </span>
          <Badge variant={isActive ? "default" : "secondary"}>Level {hint.level}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{hint.content}</p>
      </CardContent>
    </Card>
  );
}
