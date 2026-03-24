import { CalendarClock, ChevronRight } from "lucide-react";

import { historyEntries } from "@/data/mock-data";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryPage() {
  return (
    <AppShell
      title="Verlauf"
      subtitle="Vergangene Analysen mit Sprache, Zusammenfassung und Vertrauensindikator."
    >
      <div className="grid gap-4">
        {historyEntries.map((entry) => (
          <Card key={entry.id} className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base">
                <span>{entry.title}</span>
                <Badge variant="secondary" className="capitalize">
                  {entry.confidenceLevel}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p>{entry.summary}</p>
                <p className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" />
                  {entry.createdAt} - {entry.language}
                </p>
              </div>
              <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Analyse öffnen
                <ChevronRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
