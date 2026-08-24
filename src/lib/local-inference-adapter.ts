import type { LocalInference } from './local-ai-engine';

/**
 * Default adapter boundary for an internal/self-hosted inference runtime.
 * The application intentionally does not contain provider API calls.
 * Wire this adapter to the organization's local model runtime (for example
 * Supabase AI runtime or a privately hosted Ollama/Llamafile service).
 */
export const createLocalInferenceAdapter = (runtime: {
  embed: (input: string) => Promise<number[]>;
  generate: (input: string, options?: { system?: string; temperature?: number; maxTokens?: number }) => Promise<string>;
}): LocalInference => ({
  embed: runtime.embed,
  generate: runtime.generate,
});
