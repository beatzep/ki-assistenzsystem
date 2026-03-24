"use client";

import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { FlaskConical, PlayCircle } from "lucide-react";

import { starterSnippets } from "@/data/mock-data";
import { languageLabels } from "@/lib/utils/language";
import { useWorkspaceStore } from "@/store/workspace-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeader } from "@/components/layout/section-header";

export function EditorPanel() {
  const {
    language,
    code,
    errorMessage,
    isAnalyzing,
    setLanguage,
    setCode,
    setErrorMessage,
    applyStarterSnippet,
    safeLearningMode,
    setIsAnalyzing,
    setAnalysis,
  } = useWorkspaceStore();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          errorMessage,
          avoidDirectSolution: safeLearningMode,
        }),
      });

      const data = await response.json();
      if (response.ok && data.result) {
        setAnalysis(data.result);
      } else {
        setAnalysis(null);
      }
    } catch {
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      <Card className="rounded-2xl">
        <CardHeader className="space-y-4">
          <SectionHeader
            title="Code Studio"
            description="Analysiere deinen Code schrittweise statt nur fertige Antworten zu konsumieren."
          />
          <div className="grid gap-3 md:grid-cols-3">
            <Select
              value={language}
              onValueChange={(value) => {
                if (value) {
                  setLanguage(value as typeof language);
                }
              }}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Sprache waehlen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => {
                if (value) {
                  applyStarterSnippet(value as string);
                }
              }}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Starter Snippet laden" />
              </SelectTrigger>
              <SelectContent>
                {starterSnippets.map((snippet) => (
                  <SelectItem key={snippet.id} value={snippet.id}>
                    {snippet.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="rounded-xl" onClick={handleAnalyze} disabled={isAnalyzing}>
              <PlayCircle className="h-4 w-4" />
              {isAnalyzing ? "Analysiere..." : "Analysieren"}
            </Button>
          </div>

          <Input
            value={errorMessage}
            onChange={(event) => setErrorMessage(event.target.value)}
            placeholder="Optionale Fehlermeldung einfuegen"
            className="rounded-xl"
          />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">
            <FlaskConical className="h-4 w-4 text-primary" />
            Aktive Sprache: {languageLabels[language]} - Demo laeuft mit didaktischer Mock-Analyse.
          </div>
          <div className="overflow-hidden rounded-xl border">
            <Editor
              height="420px"
              language={language}
              value={code}
              onChange={(value) => setCode(value ?? "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
