import { analysisResultSchema, analyzeApiInputSchema } from "@/lib/analysis/schema";
import { llmClient } from "@/lib/llm/client";
import { runMockAnalysis } from "@/lib/mock/mock-analyzer";
import type { AnalyzePayload, AnalysisResult } from "@/types/analysis";

function looksLanguageInconsistent(payload: AnalyzePayload, result: AnalysisResult): boolean {
  const issue = result.detectedIssue.toLowerCase();
  const explanation = result.explanationSimple.toLowerCase();
  const combined = `${issue} ${explanation}`;

  if (payload.language === "python" && combined.includes("nullpointerexception")) {
    return true;
  }

  if (payload.language === "javascript" && combined.includes("nullpointerexception")) {
    return true;
  }

  if (payload.language === "java" && combined.includes("zerodivisionerror")) {
    return true;
  }

  return false;
}

export async function analyzeCode(input: AnalyzePayload): Promise<AnalysisResult> {
  const { qualificationProfile, ...rest } = input;
  const payload = analyzeApiInputSchema.parse(rest);
  const full: AnalyzePayload = { ...payload, qualificationProfile };
  const llmResponse = await llmClient.analyzeDidactically(full);

  if (llmResponse) {
    const parsedLlm = analysisResultSchema.parse(llmResponse);
    if (!looksLanguageInconsistent(full, parsedLlm)) {
      return parsedLlm;
    }
  }

  const mockResult = await runMockAnalysis(full);
  return analysisResultSchema.parse(mockResult);
}
