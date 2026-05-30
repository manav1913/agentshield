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
    <main className="min-h-screen bg-white text-slate-950 dark:bg-gray-950 dark:text-white">
      <nav className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.png" alt="AgentShield" className="h-8 w-8" />
            <span className="font-bold text-slate-950 dark:text-white">AgentShield</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Back to Home
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300">
              <LockKeyhole size={16} />
              Privacy-first product notes
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight">
              Privacy should be clear before a user connects an AI agent.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-500 dark:text-slate-400">
              AgentShield exists to help teams inspect risky AI behavior. This
              page explains what the app needs to store, why it stores it, and
              what users should avoid sending.
            </p>

            <p className="mt-4 text-sm text-slate-400">
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
                className="relative overflow-hidden rounded-3xl border border-violet-100 bg-linear-to-br from-violet-50 to-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-violet-900/50 dark:from-violet-950/30 dark:to-slate-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300">
                  <Icon size={22} />
                </div>
                <h2 className="mt-5 text-lg font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-2xl font-bold tracking-tight">
              What AgentShield stores
            </h2>

            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {dataRows.map(([label, body]) => (
                <div
                  key={label}
                  className="grid gap-2 bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 sm:grid-cols-[180px_1fr]"
                >
                  <p className="font-semibold text-slate-950 dark:text-white">
                    {label}
                  </p>
                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
            <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
              Avoid sending secrets in test prompts
            </h2>
            <p className="mt-2 text-sm leading-7 text-amber-800 dark:text-amber-200">
              Use realistic examples, but do not paste live credentials, private
              customer records, or production secrets while testing. If you need
              help with a sensitive setup, contact us first.
            </p>
          </section>

          <section className="mt-8 flex flex-col gap-4 rounded-3xl border border-violet-200 bg-linear-to-br from-violet-50 to-white p-6 sm:flex-row sm:items-center sm:justify-between dark:border-violet-900/50 dark:from-violet-950/30 dark:to-slate-950">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Privacy questions?</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Ask before connecting a production agent or sensitive workflow.
              </p>
            </div>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700 hover:shadow-violet-500/40 transition-all"
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
