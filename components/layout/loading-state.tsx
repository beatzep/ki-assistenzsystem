import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface LoadingStateProps {
  text?: string;
}

export function LoadingState({ text = "Analyse wird erstellt..." }: LoadingStateProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}
