const LOCAL_AI_URL = (import.meta.env.VITE_LOCAL_AI_URL || 'http://127.0.0.1:8787').replace(/\/$/, '');
const LOCAL_AI_TOKEN = import.meta.env.VITE_LOCAL_AI_TOKEN || '';

function headers() {
  const result: Record<string, string> = { 'Content-Type': 'application/json' };
  if (LOCAL_AI_TOKEN) result.Authorization = `Bearer ${LOCAL_AI_TOKEN}`;
  return result;
}

export async function getLocalAIHealth() {
  const response = await fetch(`${LOCAL_AI_URL}/health`, {
    method: 'GET',
    headers: headers(),
  });

  if (!response.ok) throw new Error(`Local AI runtime unavailable (${response.status})`);
  return response.json() as Promise<{ ok: boolean; runtime: string; model: string }>;
}

export async function localAIChat(messages: Array<{ role: 'user' | 'assistant'; content: string }>) {
  const response = await fetch(`${LOCAL_AI_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ messages, max_tokens: 2048 }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Local AI request failed (${response.status})`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}
