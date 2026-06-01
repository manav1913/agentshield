# AgentShield SDK

Official JavaScript/TypeScript client for the [AgentShield](https://agentshield-one.vercel.app/) guardrail API.

## Install

```bash
npm install agentshield-ai-sdk
```

## Quick start (recommended: intercept)

Use this when you already call your own LLM and want to scan the reply before showing it to users.

```typescript
import { createClient } from "agentshield-ai-sdk"

const agentshield = createClient({
  apiKey: process.env.AGENTSHIELD_API_KEY!,
})

const userMessage = "What are strong password combinations?"
const aiResponse = await yourLlm.chat(userMessage)

const result = await agentshield.intercept({
  input: userMessage,
  output: aiResponse,
})

if (result.blocked) {
  return "I cannot share that information."
}

return result.output ?? aiResponse
```

## Proxy mode (optional)

```typescript
const result = await agentshield.agent({
  input: "Summarize our refund policy in one sentence.",
  systemPrompt: "You are a helpful support agent.",
})

if (result.blocked) {
  console.log(result.reason)
} else {
  console.log(result.output)
}
```

## Webhooks

Configure HTTPS webhooks in the dashboard. On block, AgentShield sends:

```json
{
  "event": "guardrail.blocked",
  "timestamp": "2026-06-01T12:00:00.000Z",
  "data": {
    "endpoint": "intercept",
    "input": "...",
    "output": "...",
    "reason": "...",
    "violationType": "credential-leak"
  }
}
```

Verify `X-AgentShield-Signature` with your webhook signing secret (HMAC-SHA256 of the raw body).

## Rate limits

Default: **120 requests/minute** per API key. Response headers:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

## Local development

```bash
cd sdk
npm install
npm run build
```

Point at a local server:

```typescript
const agentshield = createClient({
  apiKey: "your-key",
  baseUrl: "http://localhost:3000",
})
```
