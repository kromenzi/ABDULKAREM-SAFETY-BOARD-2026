import http from 'node:http';

const HOST = process.env.LOCAL_AI_HOST || '127.0.0.1';
const PORT = Number(process.env.LOCAL_AI_PORT || 8787);
const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
const MODEL = process.env.LOCAL_AI_MODEL || 'qwen3:8b';
const TOKEN = process.env.LOCAL_AI_TOKEN || '';
const MAX_TOKENS = Number(process.env.LOCAL_AI_MAX_TOKENS || 2048);
const TEMPERATURE = Number(process.env.LOCAL_AI_TEMPERATURE || 0.2);

const SYSTEM_PROMPT = `You are ABDULKAREM SAFETY BOARD Local AI.
You run on an organization-controlled local model runtime.
Do not claim to have accessed external websites, external APIs, cloud AI providers, or live data.
For safety topics, distinguish facts from assumptions and recommend verification against the site's approved procedures and applicable requirements.
Prefer concise professional HSE language. Support Arabic and English.`;

function json(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
}

function authorized(req) {
  if (!TOKEN) return true;
  return req.headers.authorization === `Bearer ${TOKEN}`;
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

async function ollama(path, init) {
  const response = await fetch(`${OLLAMA_BASE_URL}${path}`, init);
  const text = await response.text();
  return { response, text };
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      });
      return res.end();
    }

    if (!authorized(req)) return json(res, 401, { error: 'LOCAL_AI_UNAUTHORIZED' });

    if (req.method === 'GET' && req.url === '/health') {
      const { response } = await ollama('/api/tags');
      return json(res, response.ok ? 200 : 503, {
        ok: response.ok,
        runtime: 'ollama-local',
        model: MODEL,
      });
    }

    if (req.method === 'POST' && req.url === '/v1/chat/completions') {
      const body = JSON.parse(await readBody(req));
      const incomingMessages = Array.isArray(body.messages) ? body.messages : [];
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...incomingMessages.filter((message) => message && message.role !== 'system'),
      ];

      const { response, text } = await ollama('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          messages,
          stream: false,
          options: {
            temperature: TEMPERATURE,
            num_predict: Math.min(Number(body.max_tokens || MAX_TOKENS), MAX_TOKENS),
          },
        }),
      });

      if (!response.ok) {
        return json(res, 502, { error: 'LOCAL_AI_RUNTIME_ERROR', details: text.slice(0, 2000) });
      }

      const result = JSON.parse(text);
      return json(res, 200, {
        id: `local-${Date.now()}`,
        object: 'chat.completion',
        model: MODEL,
        choices: [{
          index: 0,
          message: { role: 'assistant', content: result.message?.content || '' },
          finish_reason: 'stop',
        }],
        usage: {
          prompt_tokens: result.prompt_eval_count || 0,
          completion_tokens: result.eval_count || 0,
          total_tokens: (result.prompt_eval_count || 0) + (result.eval_count || 0),
        },
      });
    }

    return json(res, 404, { error: 'NOT_FOUND' });
  } catch (error) {
    return json(res, 500, {
      error: 'LOCAL_AI_GATEWAY_ERROR',
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`ABDULKAREM Local AI Gateway listening on ${HOST}:${PORT}`);
  console.log(`Runtime: ${OLLAMA_BASE_URL} | Model: ${MODEL}`);
});
