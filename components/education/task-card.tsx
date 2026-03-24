import { ArrowRight, Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { LearningTask } from "@/types/education";

interface TaskCardProps {
  task: LearningTask;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{task.title}</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{task.language}</Badge>
          <Badge variant="outline">{task.difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>{task.prompt}</p>
        <div className="rounded-lg bg-muted/70 p-3">
          <p className="mb-1 flex items-center gap-2 font-medium text-foreground">
            <Target className="h-4 w-4 text-emerald-600" />
            Erfolgskriterium
          </p>
          <p>{task.successCriteria}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {task.conceptTags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full justify-between rounded-xl" variant="secondary">
          Aufgabe starten
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
