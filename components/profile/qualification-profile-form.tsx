"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

import { saveQualificationProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CONCEPT_OPTIONS,
  FOCUS_LANGUAGES,
  GOAL_TAG_OPTIONS,
  SKILL_LEVEL_LABELS,
} from "@/lib/profile/constants";
import type { QualificationProfile } from "@/types/qualification-profile";
import type { FocusLanguage, SkillLevel } from "@/types/qualification-profile";

function toggleList<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface QualificationProfileFormProps {
  mode: "onboarding" | "settings";
  initial: QualificationProfile | null;
}

export function QualificationProfileForm({ mode, initial }: QualificationProfileFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [knownLanguages, setKnownLanguages] = useState<FocusLanguage[]>(
    initial?.knownLanguages?.length ? initial.knownLanguages : ["python"],
  );
  const [targetLanguage, setTargetLanguage] = useState<FocusLanguage>(initial?.targetLanguage ?? "python");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(initial?.skillLevel ?? "beginner");
  const [knownConcepts, setKnownConcepts] = useState<string[]>(initial?.knownConcepts ?? []);
  const [goalTags, setGoalTags] = useState<string[]>(initial?.goalTags ?? []);
  const [goalsFreeText, setGoalsFreeText] = useState(initial?.goalsFreeText ?? "");

  function submit() {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await saveQualificationProfile({
        knownLanguages,
        targetLanguage,
        skillLevel,
        knownConcepts,
        goalTags,
        goalsFreeText,
        onboardingCompleted: true,
      });
      if (res.error) {
        setError(res.error);
        return;
      }
      setSuccess(true);
      router.refresh();
      if (mode === "onboarding") {
        router.push("/workspace");
      }
    });
  }

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>{mode === "onboarding" ? "Qualifikationsprofil" : "Lernprofil bearbeiten"}</CardTitle>
        <CardDescription>
          Diese Angaben sind die Grundlage für später personalisierte Erklärungen und Aufgaben — sie werden bei
          „Analysieren“ dem Modell als Lernkontext mitgegeben.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="space-y-3">
          <p className="text-sm font-medium">Bekannte Programmiersprachen</p>
          <div className="flex flex-wrap gap-2">
            {FOCUS_LANGUAGES.map(({ value, label }) => {
              const active = knownLanguages.includes(value);
              return (
                <Button
                  key={value}
                  type="button"
                  size="sm"
                  variant={active ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setKnownLanguages(toggleList(knownLanguages, value))}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-medium">Unterstützung aktuell in</p>
            <Select value={targetLanguage} onValueChange={(v) => setTargetLanguage(v as FocusLanguage)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FOCUS_LANGUAGES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Selbsteinschätzung</p>
            <Select value={skillLevel} onValueChange={(v) => setSkillLevel(v as SkillLevel)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(SKILL_LEVEL_LABELS) as SkillLevel[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {SKILL_LEVEL_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-medium">Bereits bekannte Konzepte</p>
          <div className="flex flex-wrap gap-2">
            {CONCEPT_OPTIONS.map(({ id, label }) => {
              const active = knownConcepts.includes(id);
              return (
                <Button
                  key={id}
                  type="button"
                  size="sm"
                  variant={active ? "secondary" : "outline"}
                  className="rounded-full"
                  onClick={() => setKnownConcepts(toggleList(knownConcepts, id))}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-medium">Lernziele (Schlagworte)</p>
          <div className="flex flex-wrap gap-2">
            {GOAL_TAG_OPTIONS.map(({ id, label }) => {
              const active = goalTags.includes(id);
              return (
                <Button
                  key={id}
                  type="button"
                  size="sm"
                  variant={active ? "secondary" : "outline"}
                  className="rounded-full"
                  onClick={() => setGoalTags(toggleList(goalTags, id))}
                >
                  {label}
                </Button>
              );
            })}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Freitext (optional)</p>
            <Textarea
              value={goalsFreeText}
              onChange={(e) => setGoalsFreeText(e.target.value)}
              placeholder="z. B. Prüfung Algorithmen im Sommer, sichere Schleifen verstehen …"
              className={cn("min-h-[100px] rounded-xl")}
              maxLength={2000}
            />
          </div>
        </section>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {success && mode === "settings" ? (
          <p className="text-sm text-emerald-700">Profil gespeichert.</p>
        ) : null}

        <Button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl"
          onClick={submit}
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Speichern…
            </>
          ) : mode === "onboarding" ? (
            "Profil speichern und Studio öffnen"
          ) : (
            "Änderungen speichern"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
