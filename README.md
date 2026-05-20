# AgentShield

AgentShield is a Next.js App Router application for protecting AI agents with real-time guardrails, request logging, API key management, and rule-based output filtering.

It gives teams a dashboard for creating integration keys, defining safety rules, reviewing intercepted traffic, and routing AI requests through a protected proxy before responses reach users.

## Features

- Landing page with AgentShield product positioning and pricing sections
- Clerk-powered authentication with custom login and signup pages
- Protected dashboard shell with sidebar navigation and topbar
- API key creation, one-time key reveal, and revocation
- Rule management for keyword and phrase blocking
- Request logs for clean and blocked agent activity
- Protected AI proxy endpoint with Groq support and OpenAI fallback
- Interceptor endpoint for validating external agent input/output pairs
- Light and dark theme support
- Prisma models for logs, rules, API keys, and future human review workflows

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Clerk authentication
- Prisma 7
- PostgreSQL / Supabase
- Groq SDK
- OpenAI API fallback
- Vercel deployment

## Project Structure

```txt
app/
+-- (dashboard)/
|   +-- layout.tsx
|   +-- dashboard/page.tsx
|   +-- rules/page.tsx
|   +-- logs/page.tsx
|   +-- api-keys/page.tsx
+-- api/
|   +-- agent/route.ts
|   +-- api-keys/route.ts
|   +-- intercept/route.ts
|   +-- logs/route.ts
|   +-- rules/route.ts
+-- login/[[...rest]]/page.tsx
+-- signup/[[...rest]]/page.tsx
+-- layout.tsx
+-- page.tsx

components/
+-- dashboard/
+-- landing/
+-- ui/

lib/
+-- interceptor.ts
+-- prisma.ts
+-- theme.ts
+-- utils.ts

prisma/
+-- schema.prisma
```

## Core Flow

1. A user signs up or signs in with Clerk.
2. The user creates an API key from the dashboard.
3. The user adds guardrail rules, such as blocked keywords or phrases.
4. An AI agent sends traffic through AgentShield using the API key.
5. AgentShield scans input and output for policy violations.
6. Clean and blocked events are stored as logs.
7. The dashboard shows request volume, blocked events, clean rate, and recent activity.

## API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/api-keys` | `GET` | List the signed-in user's API keys |
| `/api/api-keys` | `POST` | Generate a new API key |
| `/api/api-keys` | `DELETE` | Revoke an API key |
| `/api/rules` | `GET` | List guardrail rules |
| `/api/rules` | `POST` | Create a new rule |
| `/api/rules` | `PATCH` | Toggle or update a rule |
| `/api/rules` | `DELETE` | Delete a rule |
| `/api/logs` | `GET` | Fetch filtered request logs |
| `/api/intercept` | `POST` | Validate an existing input/output pair |
| `/api/agent` | `POST` | Run a protected AI request through AgentShield |

## Environment Variables

Create a `.env` file for local development:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/postgres?sslmode=require"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/login"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/signup"
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/dashboard"
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL="/"

GROQ_API_KEY="gsk_..."
OPENAI_API_KEY="sk-..."
```

For Vercel with Supabase, prefer the Supabase transaction pooler connection string:

```env
DATABASE_URL="postgresql://postgres.PROJECT_ID:PASSWORD@POOLER_HOST:6543/postgres?sslmode=require&uselibpqcompat=true"
```

`OPENAI_API_KEY` is optional if `GROQ_API_KEY` is configured. The `/api/agent` route uses Groq when available and falls back to OpenAI otherwise.

## Local Development

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Sync the schema to your database when needed:

```bash
npx prisma db push
```

Start the dev server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

The build script runs `prisma generate` before `next build` so Prisma Client is available in deployment environments.

## Deployment

The app is designed for Vercel deployment.

Before deploying, configure these environment variables in Vercel:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL`
- `GROQ_API_KEY`
- `OPENAI_API_KEY` if using OpenAI fallback

For production Clerk deployments, use live Clerk keys (`pk_live_...` and `sk_live_...`) instead of development keys.

## Database Models

The Prisma schema currently includes:

- `Log` - stores clean and blocked request activity
- `Rule` - stores enabled/disabled guardrail rules
- `ApiKey` - stores user-owned integration keys
- `HumanQueue` - reserved for future human review workflows

## Current Status

Implemented:

- Landing page
- Authentication pages
- Dashboard layout
- API key management
- Rule management
- Log viewing and filtering
- Guardrail scanning
- AI proxy and intercept APIs
- Vercel-compatible Prisma generation

In progress:

- Subscription and billing flow
- Human review queue UI and API
- Deeper analytics for logs and violations
- Production hardening for RLS policies and monitoring

## Security Notes

- API keys should be treated as secrets and shown only once after creation.
- Supabase Row Level Security should be enabled before broad production use.
- Production deployments should use Clerk live keys.
- Rotate database credentials if they are ever exposed in chat, screenshots, logs, or commits.

## License

This project is currently private and does not define an open-source license.
