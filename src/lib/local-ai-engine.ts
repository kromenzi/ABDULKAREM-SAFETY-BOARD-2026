import type { SupabaseClient } from '@supabase/supabase-js';

export type LocalAgentKey =
  | 'safety-orchestrator'
  | 'risk-agent'
  | 'incident-agent'
  | 'ncr-agent'
  | 'vision-agent';

export type AgentContext = Record<string, unknown>;

export interface AgentRunResult {
  runId: string;
  status: string;
  steps: number;
  result: unknown;
}

/**
 * Local AI orchestration layer.
 *
 * This layer deliberately has no provider SDKs, provider API keys, or external
 * AI endpoints. The model/inference implementation is injected by the host
 * application so the Safety Board can use an internal/self-hosted runtime.
 */
export interface LocalInference {
  embed(input: string): Promise<number[]>;
  generate(input: string, options?: { system?: string; temperature?: number; maxTokens?: number }): Promise<string>;
}

export class LocalAIEngine {
  constructor(
    private readonly supabase: SupabaseClient,
    private readonly inference: LocalInference,
  ) {}

  async run(agentKey: LocalAgentKey, input: string, context: AgentContext = {}): Promise<AgentRunResult> {
    const { data: agent, error: agentError } = await this.supabase
      .from('ai_agent_configs')
      .select('*')
      .eq('agent_key', agentKey)
      .eq('enabled', true)
      .single();

    if (agentError) throw agentError;

    const { data: run, error: runError } = await this.supabase
      .from('ai_agent_runs')
      .insert({ agent_key: agentKey, input_text: input, context, status: 'running', started_at: new Date().toISOString() })
      .select('id')
      .single();

    if (runError) throw runError;

    let currentInput = input;
    let finalResult: unknown = null;
    let completedSteps = 0;

    try {
      // Step 1: context assembly from the internal knowledge base.
      completedSteps++;
      await this.supabase.from('ai_agent_steps').insert({
        run_id: run.id,
        step_no: completedSteps,
        step_type: 'context',
        input: { input, context },
        status: 'completed',
      });

      // Step 2: internal embedding + RAG retrieval when supported.
      const embedding = await this.inference.embed(currentInput);
      const { data: matches } = await this.supabase.rpc('match_ai_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.72,
        match_count: 8,
      });
      completedSteps++;
      await this.supabase.from('ai_agent_steps').insert({
        run_id: run.id,
        step_no: completedSteps,
        step_type: 'retrieval',
        input: { query: currentInput },
        output: { matches: matches ?? [] },
        status: 'completed',
      });

      // Step 3+: controlled generation/review loop.
      const maxSteps = Math.max(1, Math.min(Number(agent.max_steps ?? 6), 10));
      let answer = await this.inference.generate(currentInput, {
        system: String(agent.system_prompt ?? ''),
        temperature: Number(agent.temperature ?? 0.2),
        maxTokens: 1800,
      });

      completedSteps++;
      await this.supabase.from('ai_agent_steps').insert({
        run_id: run.id,
        step_no: completedSteps,
        step_type: 'generate',
        input: { prompt: currentInput, knowledge: matches ?? [] },
        output: { answer },
        status: 'completed',
      });

      // Deterministic review loop. No external calls are made here.
      while (completedSteps < maxSteps) {
        const reviewPrompt = [
          'Review the previous safety answer for completeness, evidence alignment, and unsupported claims.',
          'Return the improved answer only.',
          `Previous answer:\n${answer}`,
          `Internal context:\n${JSON.stringify(context)}`,
          `Internal knowledge:\n${JSON.stringify(matches ?? [])}`,
        ].join('\n\n');

        const reviewed = await this.inference.generate(reviewPrompt, {
          system: String(agent.system_prompt ?? ''),
          temperature: 0.1,
          maxTokens: 1800,
        });

        completedSteps++;
        answer = reviewed;
        await this.supabase.from('ai_agent_steps').insert({
          run_id: run.id,
          step_no: completedSteps,
          step_type: 'review',
          input: { previous: finalResult ?? null },
          output: { answer },
          status: 'completed',
        });

        if (completedSteps >= Math.min(maxSteps, 4)) break;
      }

      finalResult = { answer };

      await this.supabase
        .from('ai_agent_runs')
        .update({
          status: 'completed',
          step_count: completedSteps,
          result: finalResult,
          completed_at: new Date().toISOString(),
        })
        .eq('id', run.id);

      return { runId: run.id, status: 'completed', steps: completedSteps, result: finalResult };
    } catch (error) {
      await this.supabase
        .from('ai_agent_runs')
        .update({
          status: 'failed',
          step_count: completedSteps,
          error: error instanceof Error ? error.message : String(error),
          completed_at: new Date().toISOString(),
        })
        .eq('id', run.id);
      throw error;
    }
  }
}
