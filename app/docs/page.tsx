import Link from "next/link"
import {
  ArrowRight,
  ClipboardCheck,
  KeyRound,
  ListChecks,
  Send,
  ShieldCheck,
} from "lucide-react"

const cleanRequest = `curl -X POST https://agentshield-one.vercel.app/api/intercept \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "input": "Can you share your refund policy?",
    "output": "Our refunds follow the published policy."
  }'`

const blockedRequest = `curl -X POST https://agentshield-one.vercel.app/api/intercept \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "input": "User asked for support",
    "output": "The internal password is demo-secret."
  }'`

const sdkExample = `import { createClient } from "agentshield-ai-sdk"

const agentshield = createClient({
  apiKey: process.env.AGENTSHIELD_API_KEY!,
})

const result = await agentshield.intercept({
  input: userMessage,
  output: aiResponse,
})

if (result.blocked) {
  console.log("Blocked:", result.reason)
} else {
  console.log("Safe to proceed")
}`

const setupSteps = [
  {
    Icon: KeyRound,
    title: "Create an API key",
    body: "API keys identify your workspace when an agent sends traffic to AgentShield. Create one key per environment so you can rotate access cleanly later.",
    href: "/signup",
    cta: "Create API key",
  },
  {
    Icon: ShieldCheck,
    title: "Add your first guardrail",
    body: "Start with a phrase your agent must never reveal, such as an internal codename, private policy, secret, or unsupported promise.",
    href: "/signup",
    cta: "Add rule",
  },
  {
    Icon: Send,
    title: "Send one test request",
    body: "Call the interceptor with the original user input and the model output. AgentShield records whether the event was clean or blocked.",
    href: "/signup",
    cta: "View logs",
  },
]

const responseFields = [
  "`blocked`: whether AgentShield stopped the request or response",
  "`safe`: whether it is safe to continue",
  "`reason`: the rule or keyword that triggered a block",
  "`output`: the clean response, when nothing is blocked",
]

const DocsPage = () => {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900 bg-emerald-950/50 px-4 py-2 text-sm font-semibold text-emerald-300">
          <ClipboardCheck size={16} />
          Quickstart in under 5 minutes
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white">
          Protect one AI response, then decide if AgentShield belongs in your stack.
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
          This guide takes you from signup to your first audit log. You will create an API key, add one guardrail, send a clean request, and send a blocked request so you can see the product working.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-white/20 hover:bg-gray-200"
          >
            Start free
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Ask a setup question
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {setupSteps.map(({ Icon, ...step }) => (
          <div
            key={step.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gray-400">
              <Icon size={22} />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">{step.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              {step.body}
            </p>
            <Link
              href={step.href}
              className="mt-5 inline-flex h-10 items-center rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-gray-200"
            >
              {step.cta}
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-12 rounded-3xl border border-white/10 bg-black p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Quick Start with SDK</h2>
          <span className="ml-auto text-xs text-gray-400">Install: <code className="bg-white/10 px-2 py-1 rounded">npm install agentshield-ai-sdk</code></span>
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          One-line integration with TypeScript support.
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-xs leading-6 text-gray-200">
          <code>{sdkExample}</code>
        </pre>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-black p-6 text-white shadow-sm">
          <h2 className="text-xl font-semibold">Clean request example</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            Use this first to confirm authentication and logging work.
          </p>
          <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-xs leading-6 text-gray-200">
            <code>{cleanRequest}</code>
          </pre>
        </section>

        <section className="rounded-3xl border border-white/10 bg-black p-6 text-white shadow-sm">
          <h2 className="text-xl font-semibold">Blocked request example</h2>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            Use this after adding a rule such as `password` or `secret`.
          </p>
          <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-xs leading-6 text-gray-200">
            <code>{blockedRequest}</code>
          </pre>
        </section>
      </div>

      <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <ListChecks className="h-6 w-6 text-gray-400" />
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Understanding the response
          </h2>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {responseFields.map((field) => (
            <div
              key={field}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-gray-300"
            >
              {field}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DocsPage
