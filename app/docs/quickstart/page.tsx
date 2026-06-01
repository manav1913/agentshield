import Link from "next/link"
import { ArrowRight } from "lucide-react"

const nodeExample = `import { createClient } from "agentshield-ai-sdk"

const agentshield = createClient({
  apiKey: process.env.AGENTSHIELD_API_KEY!,
})

export async function chat(userMessage: string) {
  const aiResponse = await yourLlm.generate(userMessage)

  const result = await agentshield.intercept({
    input: userMessage,
    output: aiResponse,
  })

  if (result.blocked) {
    throw new Error(result.reason ?? "Blocked by guardrails")
  }

  return result.output ?? aiResponse
}`

const curlExample = `curl -X POST https://agentshield-one.vercel.app/api/intercept \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "input": "What are strong password combinations?",
    "output": "Use 12+ characters with mixed case and a password manager."
  }'`

const webhookVerify = `import { createHmac, timingSafeEqual } from "crypto"

export function verifyAgentShieldSignature(
  rawBody: string,
  signature: string | null,
  secret: string
) {
  if (!signature) return false
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex")
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}`

export default function QuickstartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">
        5-minute developer quickstart
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-gray-400">
        AgentShield sits between your agent and your users. You keep your LLM —
        we scan the final reply for leaks, PII, and your custom rules.
      </p>

      <ol className="mt-10 space-y-10">
        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold text-emerald-400">Step 1</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Create an API key</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign up, open the dashboard, and generate a key. Treat it like a password.
          </p>
          <Link
            href="/api-keys"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
          >
            Go to API keys <ArrowRight size={14} />
          </Link>
        </li>

        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold text-emerald-400">Step 2</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Call /api/intercept</h2>
          <p className="mt-2 text-sm text-gray-400">
            Send the user message and model output. If <code className="rounded bg-white/10 px-1">blocked</code> is true, do not show the reply to the user.
          </p>
          <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
            <code>{curlExample}</code>
          </pre>
        </li>

        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold text-emerald-400">Step 3</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Use the SDK (optional)</h2>
          <p className="mt-2 text-sm text-gray-400">
            <code className="rounded bg-white/10 px-1">npm install agentshield-ai-sdk</code>
          </p>
          <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
            <code>{nodeExample}</code>
          </pre>
        </li>

        <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold text-emerald-400">Step 4</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Add rules & webhooks</h2>
          <p className="mt-2 text-sm text-gray-400">
            Block company-specific terms in the dashboard. Optional webhooks fire on every block with HMAC signatures.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/rules" className="text-sm font-semibold text-white hover:underline">
              Rules →
            </Link>
            <Link href="/webhooks" className="text-sm font-semibold text-white hover:underline">
              Webhooks →
            </Link>
          </div>
          <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
            <code>{webhookVerify}</code>
          </pre>
        </li>
      </ol>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Health check</h2>
        <p className="mt-2 text-sm text-gray-400">
          <code className="rounded bg-white/10 px-1">GET /api/health</code> — no API key required.
        </p>
      </section>
    </div>
  )
}
