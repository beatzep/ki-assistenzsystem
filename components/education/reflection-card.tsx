import { Brain } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReflectionCardProps {
  questions: string[];
}

export function ReflectionCard({ questions }: ReflectionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Brain className="h-4 w-4 text-violet-600" />
          Reflexionskarte
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {questions.map((question) => (
          <p key={question} className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
            {question}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
