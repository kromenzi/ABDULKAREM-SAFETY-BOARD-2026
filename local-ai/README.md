# ABDULKAREM SAFETY BOARD — Self-Hosted Local AI

This runtime keeps inference inside infrastructure controlled by the organization.

## Architecture

Browser / Safety Board UI → Local AI Gateway → Ollama → Local model

No OpenAI, Gemini, Claude, or other hosted AI API is used by the runtime.

## Requirements

- Linux server, Windows machine with Docker, or another Docker-compatible host.
- Recommended: NVIDIA GPU for practical 8B-model performance. CPU mode works but is slower.
- Docker Engine + Docker Compose.

## Start

1. Copy `.env.example` to `.env` and set a strong `LOCAL_AI_TOKEN`.
2. Start the runtime:

```bash
docker compose --env-file .env up -d --build
```

3. Download the model once into the local Ollama volume:

```bash
docker exec abdulkarem-safety-ollama ollama pull qwen3:8b
```

The model is then stored in the local `ollama_data` volume and inference runs locally.

## Health check

The gateway is bound to `127.0.0.1:8787` by default. From the host:

```bash
curl -H "Authorization: Bearer YOUR_LOCAL_AI_TOKEN" http://127.0.0.1:8787/health
```

## Chat API

The gateway exposes an OpenAI-compatible *shape* for the application, but it does not contact OpenAI.

```text
POST http://127.0.0.1:8787/v1/chat/completions
Authorization: Bearer YOUR_LOCAL_AI_TOKEN
Content-Type: application/json
```

Example body:

```json
{
  "messages": [
    {"role": "user", "content": "Analyze this HSE observation..."}
  ],
  "max_tokens": 1200
}
```

## Production isolation

For a fully self-contained deployment, run the Safety Board frontend and this runtime on the same organization-controlled server or private network. Do not expose Ollama port `11434` publicly. Only the gateway should be reachable by the application.

If the UI is hosted on Vercel, the local runtime remains self-hosted, but the browser still needs a network route to the gateway. For strict private-network operation, host the UI on the same private infrastructure or through your organization's VPN/reverse proxy.
