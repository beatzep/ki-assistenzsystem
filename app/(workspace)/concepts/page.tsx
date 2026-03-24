import { conceptLibrary } from "@/data/mock-data";
import { AppShell } from "@/components/layout/app-shell";
import { ConceptCard } from "@/components/assistant/concept-card";
import { Card, CardContent } from "@/components/ui/card";

export default function ConceptsPage() {
  return (
    <AppShell
      title="Konzepte"
      subtitle="Kernkonzepte der Programmierausbildung mit praxisnahen Merkregeln."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {conceptLibrary.map((concept) => (
          <div key={concept.id} className="space-y-3">
            <ConceptCard title={concept.title} description={concept.shortDescription} />
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">Praktischer Tipp</p>
                <p className="mt-1 text-sm text-muted-foreground">{concept.practicalTip}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
