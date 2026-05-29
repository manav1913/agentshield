import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
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

const sdkExample = `import { shield } from "agentshield-ai-sdk"

const result = await shield({
  apiKey: process.env.AGENTSHIELD_API_KEY,
  input: userMessage,
  output: aiResponse
})

if (result.blocked) {
  console.log("Blocked:", result.reason)
  // Handle violation
} else {
  console.log("Safe to proceed")
}`

const setupSteps = [
  {
    Icon: KeyRound,
    title: "Create an API key",
    body: "API keys identify your workspace when an agent sends traffic to AgentShield. Create one key per environment so you can rotate access cleanly later.",
    href: "/signup",
    cta: "Sign up to create key",
  },
  {
    Icon: ShieldCheck,
    title: "Add your first guardrail",
    body: "Start with a phrase your agent must never reveal, such as an internal codename, private policy, secret, or unsupported promise.",
    href: "/signup",
    cta: "Sign up to add rule",
  },
  {
    Icon: Send,
    title: "Send one test request",
    body: "Call the interceptor with the original user input and the model output. AgentShield records whether the event was clean or blocked.",
    href: "/signup",
    cta: "Sign up to view logs",
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
    <main className="min-h-screen bg-white text-slate-950 dark:bg-gray-950 dark:text-white">
      <section className="border-b border-slate-200 px-6 py-16 dark:border-slate-800">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-sm font-semibold text-violet-600">
            AgentShield
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                <ClipboardCheck size={16} />
                Quickstart in under 5 minutes
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight">
                Protect one AI response, then decide if AgentShield belongs in
                your stack.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
                This guide takes you from signup to your first audit log. You
                will create an API key, add one guardrail, send a clean request,
                and send a blocked request so you can see the product working.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700"
                >
                  Start free
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  Ask a setup question
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-violet-500/10">
              <p className="text-sm font-semibold text-violet-300">
                What you will prove
              </p>
              <div className="mt-5 space-y-4">
                {[
                  "Your API key authenticates real traffic.",
                  "Your custom rules can block risky output.",
                  "The dashboard records a readable audit trail.",
                  "You can test AgentShield before changing production code.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {setupSteps.map(({ Icon, ...step }) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
                  <Icon size={22} />
                </div>
                <h2 className="mt-5 text-xl font-semibold">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {step.body}
                </p>
                <Link
                  href={step.href}
                  className="mt-5 inline-flex h-10 items-center rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  {step.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <h2 className="text-xl font-semibold">Install the SDK</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                The easiest way to integrate AgentShield into your project.
              </p>
              <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs leading-6 text-slate-200">
                <code>npm install agentshield-ai-sdk</code>
              </pre>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <h2 className="text-xl font-semibold">Use the SDK</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                One-line integration with TypeScript support.
              </p>
              <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs leading-6 text-slate-200">
                <code>{sdkExample}</code>
              </pre>
            </section>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <h2 className="text-xl font-semibold">Clean request example</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Use this first to confirm authentication and logging work.
              </p>
              <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs leading-6 text-slate-200">
                <code>{cleanRequest}</code>
              </pre>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <h2 className="text-xl font-semibold">Blocked request example</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Use this after adding a rule such as `password` or `secret`.
              </p>
              <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs leading-6 text-slate-200">
                <code>{blockedRequest}</code>
              </pre>
            </section>
          </div>

          <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center gap-3">
              <ListChecks className="h-6 w-6 text-violet-600" />
              <h2 className="text-2xl font-bold tracking-tight">
                Understanding the response
              </h2>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {responseFields.map((field) => (
                <div
                  key={field}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                  {field}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default DocsPage
