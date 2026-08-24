import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const LOCAL_ONLY = true

Deno.serve(async (req: Request) => {
  if (!LOCAL_ONLY) return Response.json({ error: 'disabled' }, { status: 503 })

  if (req.method !== 'POST') {
    return Response.json({ error: 'POST required' }, { status: 405 })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body.input !== 'string') {
    return Response.json({ error: 'input is required' }, { status: 400 })
  }

  // No external provider is contacted here.
  // The inference runtime is intentionally injected at deployment level.
  return Response.json({
    mode: 'local-only',
    providerApis: false,
    agent: body.agent ?? 'safety-orchestrator',
    input: body.input,
    status: 'accepted-for-local-inference',
  })
})
