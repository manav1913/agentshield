import Link from "next/link"
import { Database, EyeOff, KeyRound, LockKeyhole, Mail } from "lucide-react"
import { siteConfig } from "@/lib/site"

const principles = [
  {
    Icon: EyeOff,
    title: "We keep the product understandable",
    body: "The dashboard shows what was blocked, why it was blocked, and when it happened. We avoid hiding safety decisions behind vague labels.",
  },
  {
    Icon: Database,
    title: "We store only what the product needs",
    body: "AgentShield stores account, rule, API key metadata, and interceptor logs so you can debug and audit your AI agent behavior.",
  },
  {
    Icon: KeyRound,
    title: "API keys are sensitive",
    body: "Treat generated keys like passwords. If a key is exposed, revoke it from the dashboard and create a fresh one.",
  },
]

const dataRows = [
  ["Account data", "Used for login, ownership, and dashboard access."],
  ["API keys", "Used to authenticate requests sent to the interceptor."],
  ["Rules", "Used to decide whether an input or output should be blocked."],
  ["Logs", "Used to show clean/blocked events, matched rules, and timestamps."],
]

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.svg" alt="AgentShield" className="h-8 w-8" />
            <span className="font-bold text-white">AgentShield</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-gray-400 hover:text-white"
            >
              Back to Home
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center rounded-lg bg-white px-4 text-sm font-semibold text-black hover:bg-gray-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
              <LockKeyhole size={16} />
              Privacy-first product notes
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-white">
              Privacy should be clear before a user connects an AI agent.
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              AgentShield exists to help teams inspect risky AI behavior. This
              page explains what the app needs to store, why it stores it, and
              what users should avoid sending.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Last updated: May 28, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gray-400">
                  <Icon size={22} />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              What AgentShield stores
            </h2>

            <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {dataRows.map(([label, body]) => (
                <div
                  key={label}
                  className="grid gap-2 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:grid-cols-[180px_1fr]"
                >
                  <p className="font-semibold text-white">
                    {label}
                  </p>
                  <p className="text-sm leading-6 text-gray-400">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-amber-900 bg-amber-950/30 p-6">
            <h2 className="text-xl font-semibold text-amber-100">
              Avoid sending secrets in test prompts
            </h2>
            <p className="mt-2 text-sm leading-7 text-amber-200">
              Use realistic examples, but do not paste live credentials, private
              customer records, or production secrets while testing. If you need
              help with a sensitive setup, contact us first.
            </p>
          </section>

          <section className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-white">Privacy questions?</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Ask before connecting a production agent or sensitive workflow.
              </p>
            </div>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-white/20 hover:bg-gray-200 hover:shadow-white/40 transition-all"
            >
              {siteConfig.contactEmail}
            </a>
          </section>
        </div>
      </section>
    </main>
  )
}

export default PrivacyPage
