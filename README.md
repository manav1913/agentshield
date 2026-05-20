# AgentShield

AgentShield is a Next.js App Router project for protecting AI agents with real-time guardrails, logs, and API key controls.

## What it does

- Protects AI requests with an authenticated interceptor
- Uses Groq as the default model provider
- Supports OpenAI fallback when `OPENAI_API_KEY` is configured
- Lets users create and revoke API keys from the dashboard
- Lets users define blocking rules for keywords and phrases
- Stores logs for blocked and clean agent responses

## Features

- Dashboard authentication with Clerk
- API key creation and revocation
- Rule creation, toggling, and deletion
- Interceptor logging for request/output reviews
- AI proxy endpoint at `/api/agent`
- Groq-based model proxy with feature guardrails

## Environment variables

Create a `.env` file with at least:

```env
DATABASE_URL=postgresql://user:password@host:port/database
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
GROQ_API_KEY=gsk_...
```

Optional fallback support:

```env
OPENAI_API_KEY=sk-...
```

## Local setup

```bash
npm install
npx prisma generate
# if you need to create or sync database schema:
npx prisma db push
npm run dev
```

Then open: `http://localhost:3000`

## Usage

- Sign up or log in
- Open the dashboard
- Generate an API key in `API Keys`
- Create guardrail rules in `Rules`
- Monitor activity in `Logs`
- Send requests through `/api/agent` with `x-api-key`

## API routes

- `GET /api/api-keys` — list API keys
- `POST /api/api-keys` — generate a new key
- `DELETE /api/api-keys` — revoke a key
- `GET /api/rules` — list guardrail rules
- `POST /api/rules` — add a rule
- `PATCH /api/rules` — update a rule
- `DELETE /api/rules` — remove a rule
- `GET /api/logs` — retrieve interceptor logs
- `POST /api/agent` — protected AI proxy endpoint
- `POST /api/intercept` — interceptor validation route

## Notes

- The project currently uses Groq by default and will use OpenAI as a fallback if configured.
- `HumanQueue` exists in Prisma schema for future review workflow, but the queue UI and API are not yet implemented.

## Deploy

This app is ready to deploy on Vercel or any platform that supports Next.js.

Make sure your environment variables are set before deployment.