const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";
const DEFAULT_OPENAI_BASE_URL = "https://api.openai.com/v1";

export interface LlmRuntimeConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
  baseUrl: string;
}

export function getLlmRuntimeConfig(): LlmRuntimeConfig {
  const enabled = process.env.OPENAI_ENABLED !== "false";
  const apiKey = process.env.OPENAI_API_KEY ?? "";
  const model = process.env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL;
  const baseUrl = (process.env.OPENAI_BASE_URL ?? DEFAULT_OPENAI_BASE_URL).replace(/\/$/, "");

  return {
    enabled,
    apiKey,
    model,
    baseUrl,
  };
}
