import type { AnalyzePayload, AnalysisResult } from "@/types/analysis";
import { getLlmRuntimeConfig } from "@/lib/llm/config";
import { buildDidacticUserPrompt, DIDACTIC_SYSTEM_PROMPT } from "@/lib/llm/prompts";

export interface LlmClient {
  analyzeDidactically: (payload: AnalyzePayload) => Promise<AnalysisResult | null>;
}

class MockableLlmClient implements LlmClient {
  async analyzeDidactically(payload: AnalyzePayload): Promise<AnalysisResult | null> {
    const config = getLlmRuntimeConfig();
    if (!config.enabled || !config.apiKey) {
      return null;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          temperature: 0.2,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: DIDACTIC_SYSTEM_PROMPT },
            { role: "user", content: buildDidacticUserPrompt(payload) },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;

      if (typeof content !== "string") {
        return null;
      }

      return JSON.parse(content) as AnalysisResult;
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export const llmClient: LlmClient = new MockableLlmClient();
