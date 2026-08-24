import React, { useMemo, useState } from 'react';
import { SAFETY_AGENT_EDGES, SAFETY_AGENT_GRAPH } from '@/lib/ai-agent-graph';
import { getLocalAIHealth, localAIChat } from '@/lib/local-ai-client';

const stages = [
  ['1', 'Prompt Engineering', 'Structured internal instructions and task contracts.'],
  ['2', 'Context Engineering', 'Internal reports, NCRs, inspections, documents and site context.'],
  ['3', 'Harness Engineering', 'Local tools, permissions, validation and safety boundaries.'],
  ['4', 'Loop Engineering', 'Execute → review → improve with bounded local steps.'],
  ['5', 'Graph Engineering', 'Multiple specialized safety agents working together.'],
] as const;

export default function AdminAIEngine() {
  const [active, setActive] = useState('safety-orchestrator');
  const [runtime, setRuntime] = useState<{ ok: boolean; runtime: string; model: string } | null>(null);
  const [runtimeError, setRuntimeError] = useState('');
  const [testing, setTesting] = useState(false);
  const [testReply, setTestReply] = useState('');
  const node = useMemo(() => SAFETY_AGENT_GRAPH.find((item) => item.key === active), [active]);

  async function checkRuntime() {
    setRuntimeError('');
    try {
      setRuntime(await getLocalAIHealth());
    } catch (error) {
      setRuntime(null);
      setRuntimeError(error instanceof Error ? error.message : 'Local AI runtime unavailable');
    }
  }

  async function testModel() {
    setTesting(true);
    setTestReply('');
    setRuntimeError('');
    try {
      const reply = await localAIChat([
        { role: 'user', content: 'Reply only: ABDULKAREM SAFETY BOARD local model is operational.' },
      ]);
      setTestReply(reply);
      await checkRuntime();
    } catch (error) {
      setRuntimeError(error instanceof Error ? error.message : 'Local model test failed');
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Local AI Engineering</h1>
        <p className="text-sm text-muted-foreground">
          AI orchestration designed for ABDULKAREM SAFETY BOARD with external AI provider connections disabled.
        </p>
      </div>

      <section className="rounded-2xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Self-Hosted Model Runtime</h2>
            <p className="text-sm text-muted-foreground">
              Ollama + local model. Inference stays on your controlled infrastructure.
            </p>
          </div>
          <span className="rounded-full border px-3 py-1 text-xs font-medium">NO EXTERNAL AI API</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={checkRuntime} className="rounded-lg border px-4 py-2 text-sm font-medium hover:shadow-sm">
            Check Runtime
          </button>
          <button type="button" onClick={testModel} disabled={testing} className="rounded-lg border px-4 py-2 text-sm font-medium hover:shadow-sm disabled:opacity-50">
            {testing ? 'Testing Model…' : 'Test Local Model'}
          </button>
        </div>

        {runtime && (
          <div className="mt-4 rounded-xl bg-muted/40 p-4 text-sm">
            <div className="font-medium">Runtime: {runtime.runtime}</div>
            <div className="mt-1">Model: {runtime.model}</div>
            <div className="mt-1">Status: {runtime.ok ? 'Operational' : 'Unavailable'}</div>
          </div>
        )}

        {testReply && <div className="mt-4 rounded-xl border p-4 text-sm">{testReply}</div>}
        {runtimeError && <div className="mt-4 rounded-xl border p-4 text-sm text-destructive">{runtimeError}</div>}
      </section>

      <div className="grid gap-4 md:grid-cols-5">
        {stages.map(([n, title, description]) => (
          <button
            key={n}
            type="button"
            onClick={() => setActive(n === '5' ? 'safety-orchestrator' : active)}
            className="rounded-xl border p-4 text-left transition hover:shadow-sm"
          >
            <div className="text-xs font-bold opacity-60">{n}</div>
            <div className="mt-1 font-semibold">{title}</div>
            <div className="mt-2 text-xs text-muted-foreground">{description}</div>
          </button>
        ))}
      </div>

      <section className="rounded-2xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Internal Safety Agent Graph</h2>
            <p className="text-sm text-muted-foreground">All orchestration state is stored in the Safety Board database.</p>
          </div>
          <span className="rounded-full border px-3 py-1 text-xs font-medium">LOCAL-ONLY</span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SAFETY_AGENT_GRAPH.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              className={`rounded-xl border p-4 text-left ${active === item.key ? 'ring-2' : ''}`}
            >
              <div className="font-medium">{item.key}</div>
              <div className="mt-1 text-xs opacity-70">{item.role}</div>
              <div className="mt-2 text-sm text-muted-foreground">{item.description}</div>
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-muted/40 p-4 text-sm">
          <div className="font-medium">Selected agent</div>
          <div className="mt-1">{node?.key}</div>
          <div className="text-muted-foreground">{node?.description}</div>
          <div className="mt-3 text-xs text-muted-foreground">Edges: {SAFETY_AGENT_EDGES.map(([a, b]) => `${a} → ${b}`).join(' · ')}</div>
        </div>
      </section>
    </div>
  );
}
