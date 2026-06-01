# AgentShield

AgentShield is a Next.js App Router application for protecting AI agents with real-time guardrails, request logging, API key management, and rule-based output filtering.

Teams use the dashboard to create integration keys, define safety rules, review intercepted traffic, and route AI requests through a protected proxy before responses reach users.

**Live:** https://agentshield-one.vercel.app/

## Features

- Landing page with product positioning, pricing, and an interactive playground
- Clerk authentication with custom login and signup pages
- Protected dashboard with sidebar navigation
- API key creation, one-time key reveal, and revocation
- Keyword and phrase guardrail rules (per user)
- Request logs for clean and blocked agent activity
- Protected AI proxy (`/api/agent`) with Groq and OpenAI fallback
- Interceptor API (`/api/intercept`) for validating external agent input/output pairs
- Context-aware guardrails (credential leaks, PII, SQL, hallucinations)
- Per-API-key rate limiting (120 req/min default) with standard headers
- Signed webhooks on `guardrail.blocked` events
- Official JS/TS SDK (`agentshield-ai-sdk`) with `createClient().intercept()`
- Developer quickstart at `/docs/quickstart` and `GET /api/health`
- Light and dark theme support

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15.1 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript 5 |
| Auth | Clerk |
| Database | PostgreSQL (Supabase) via Prisma 7 |
| AI | Groq SDK (primary), OpenAI API (fallback) |
| Hosting | Vercel |

## Project Structure

```txt
app/
├── (dashboard)/          # Authenticated dashboard routes
│   ├── dashboard/
│   ├── rules/
│   ├── logs/
│   ├── api-keys/
│   └── webhooks/
├── api/                  # Public integration APIs (API key auth)
│   ├── agent/
│   ├── intercept/
│   ├── health/
│   ├── logs/
│   ├── rules/
│   ├── webhooks/
│   └── api-keys/
├── docs/                 # API documentation
├── login/
└── signup/

lib/
├── guardrails.ts         # Scanning logic
├── public-api.ts         # API key auth + CORS + rate limit helpers
├── webhooks.ts           # HMAC-signed webhook delivery
└── prisma.ts

sdk/                      # Published npm package (agentshield-ai-sdk)

prisma/
└── schema.prisma

scripts/
├── smoke-test.mjs        # Production smoke tests
└── add-smoke-rule.mjs    # Dev helper to seed a test keyword rule
```

## Core Flow

1. User signs up or signs in with Clerk.
2. User creates an API key from the dashboard.
3. User adds guardrail rules (keywords/phrases) or relies on built-in defaults.
4. An agent sends traffic through AgentShield with the `x-api-key` header.
5. AgentShield scans input and/or output for policy violations.
6. Clean and blocked events are stored as logs.
7. The dashboard shows volume, blocked events, clean rate, and recent activity.

## Guardrails

Scanning logic lives in `lib/guardrails.ts` and is designed to **block real leaks**, not every mention of sensitive words.

### What gets blocked

| Category | Examples | Notes |
| --- | --- | --- |
| **Credential leaks** | `password is: Secret99`, `api_key=sk-…`, connection strings | Pattern-based; updated for password/API key disclosure |
| **PII** | Email, phone, credit card, SSN | Output scanning on `/api/intercept` and `/api/agent` |
| **SQL injection** | `SELECT * FROM`, `DROP TABLE` | Input and output |
| **Hallucinations** | “50% off”, “free for life”, “I can give you…” | Output only |
| **Custom keywords** | Your dashboard rules | Word-boundary match; skipped in educational password context |

### What is allowed (false-positive safe)

Educational security content is **not** blocked just because it says “password”, for example:

- “What are strong password combinations?”
- “Use a password manager and 12+ characters”

### Scanning by endpoint

| Endpoint | Input scanned | Output scanned |
| --- | --- | --- |
| `/api/intercept` | No | Yes (PII, leaks, SQL, custom rules, hallucinations) |
| `/api/agent` | Yes (leaks, SQL, custom rules) | Yes (full output checks including PII) |

Custom keyword rules use **word boundaries** so `pass` does not match `password` in unrelated words.

## API Routes

| Route | Method | Auth | Purpose |
| --- | --- | --- | --- |
| `/api/api-keys` | `GET` | Clerk session | List API keys |
| `/api/api-keys` | `POST` | Clerk session | Create API key |
| `/api/api-keys` | `DELETE` | Clerk session | Revoke API key |
| `/api/rules` | `GET` | Clerk session | List rules |
| `/api/rules` | `POST` | Clerk session | Create rule |
| `/api/rules` | `PATCH` | Clerk session | Update rule |
| `/api/rules` | `DELETE` | Clerk session | Delete rule |
| `/api/logs` | `GET` | Clerk session | Fetch logs |
| `/api/intercept` | `POST` | `x-api-key` | Validate input/output pair (recommended) |
| `/api/agent` | `POST` | `x-api-key` | Protected AI completion |
| `/api/health` | `GET` | None | Service health check |
| `/api/webhooks` | `*` | Clerk session | Manage block webhooks |

### Example: intercept (clean)

```bash
curl -X POST https://agentshield-one.vercel.app/api/intercept \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"input":"Refund policy?","output":"See our published refund policy."}'
```

### Example: intercept (blocked — credential leak)

```bash
curl -X POST https://agentshield-one.vercel.app/api/intercept \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"input":"Support","output":"The admin password is: SuperSecret99!"}'
```

Response:

```json
{
  "blocked": true,
  "safe": false,
  "reason": "Credential leak detected — password disclosure"
}
```

## Environment Variables

Copy `.env.example` to `.env` for local development:

```bash
cp .env.example .env
```

Required:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- Clerk redirect URLs (see `.env.example`)

For `/api/agent` (at least one):

- `GROQ_API_KEY` (recommended)
- `OPENAI_API_KEY` (fallback if Groq is not set)

For Vercel + Supabase, use the transaction pooler:

```env
DATABASE_URL="postgresql://postgres.PROJECT_ID:PASSWORD@POOLER_HOST:6543/postgres?sslmode=require&uselibpqcompat=true"
```

## Developer integration (5 minutes)

1. Create an API key in the dashboard.
2. Call `POST /api/intercept` with `{ input, output }` after your LLM responds.
3. If `blocked` is true, do not show the reply to the user.
4. Optional: `npm install agentshield-ai-sdk` and use `createClient().intercept()`.

Full guide: `/docs/quickstart` (or https://agentshield-one.vercel.app/docs/quickstart)

## Local Development

```bash
npm install
npx prisma generate
npx prisma db push   # required after pulling schema changes (webhooks, rate limits)
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client and production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (must pass before deploy) |
| `npm run smoke` | Run API smoke tests against production |

### Smoke tests

```bash
# PowerShell
$env:AGENTSHIELD_API_KEY="your-api-key"
npm run smoke

# Optional: test a different host
$env:AGENTSHIELD_BASE="http://localhost:3000"
npm run smoke
```

Smoke tests verify API key auth, clean/blocked intercept flows, PII and hallucination blocking, custom keyword rules (if configured), and the agent proxy.

## Deployment (Vercel)

### Pre-deploy checklist

1. Set all environment variables in the Vercel project (see `.env.example`).
2. Run `npx prisma db push` against the production database (or apply migrations).
3. Use Clerk **live** keys (`pk_live_...`, `sk_live_...`) in production.
4. Configure `GROQ_API_KEY` and/or `OPENAI_API_KEY`.
5. Locally verify:
   ```bash
   npm run lint
   npm run build
   ```
6. After deploy, run smoke tests with a production API key:
   ```bash
   npm run smoke
   ```

### Vercel environment variables

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL`
- `GROQ_API_KEY`
- `OPENAI_API_KEY` (optional if Groq is configured)

The `build` script runs `prisma generate` before `next build` so Prisma Client is available on Vercel.

## Database Models

| Model | Purpose |
| --- | --- |
| `Log` | Clean and blocked request activity |
| `Rule` | User guardrail rules (keyword/phrase) |
| `ApiKey` | Integration keys per user |
| `HumanQueue` | Reserved for future human review workflows |

## Security Notes

- Treat API keys as secrets; they are shown only once after creation.
- Rotate keys immediately if exposed in chat, logs, or commits.
- Enable Supabase Row Level Security for defense in depth.
- Use Clerk live keys in production.
- Never commit `.env` or real credentials.

## Roadmap

- Subscription and billing
- Human review queue UI and API
- Deeper analytics and alerting
- Optional Supabase RLS policies documented per table

## License

Private project — no open-source license defined.
