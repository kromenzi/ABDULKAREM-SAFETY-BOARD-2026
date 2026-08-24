export const AI_EXTERNAL_PROVIDER_BLOCKLIST = [
  'api.openai.com',
  'generativelanguage.googleapis.com',
  'api.anthropic.com',
  'api.groq.com',
  'api.mistral.ai',
  'api.cohere.com',
  'api-inference.huggingface.co',
  'api.together.xyz',
] as const;

export function assertNoExternalAIUrl(value: string): void {
  const normalized = value.trim().toLowerCase();
  if (AI_EXTERNAL_PROVIDER_BLOCKLIST.some((host) => normalized.includes(host))) {
    throw new Error('External AI provider connections are disabled in ABDULKAREM SAFETY BOARD.');
  }
}

export const LOCAL_AI_POLICY = {
  mode: 'local-only',
  allowProviderApis: false,
  allowExternalAiKeys: false,
  allowInternalRag: true,
  allowAgentLoops: true,
  allowAgentGraph: true,
} as const;
