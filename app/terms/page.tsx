import Link from "next/link"
import { AlertTriangle, CheckCircle2, FileText, LifeBuoy } from "lucide-react"

const terms = [
  {
    title: "You control your rules and data",
    body: "You decide which prompts, outputs, and rules you send to AgentShield. You are responsible for making sure your use of the product matches your own policies and user obligations.",
  },
  {
    title: "AgentShield is a safety layer, not a guarantee",
    body: "The product can help detect and block risky text, but no automated guardrail can promise perfect protection. Keep human review for high-risk actions.",
  },
  {
    title: "Keep API keys private",
    body: "API keys allow requests to be logged under your workspace. Do not expose them in public repositories, client-side code, screenshots, or support chats.",
  },
  {
    title: "Early access can change",
    body: "AgentShield is still improving. Features, limits, and pricing may change as the product matures, and we will aim to communicate important changes clearly.",
  },
]

const TermsPage = () => {
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
              <FileText size={16} />
              Plain-English terms
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-white">
              Use AgentShield to reduce AI risk, not to ignore it.
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              These terms explain the practical expectations for using
              AgentShield during early access. They are written to be readable
              because trust should not hide behind dense legal copy.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Last updated: May 28, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-2">
            {terms.map((term) => (
              <div
                key={term.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <h2 className="mt-4 text-xl font-semibold text-white">{term.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {term.body}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-10 rounded-3xl border border-red-900 bg-red-950/30 p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-300" />
              <h2 className="text-xl font-semibold text-red-100">
                Do not use AgentShield as the only approval system for dangerous actions
              </h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-red-200">
              For refunds, account deletion, medical, legal, financial, or other
              high-impact decisions, keep a human approval step and your own
              application-level controls.
            </p>
          </section>

          <section className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-white">Questions before production?</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                We can help you think through a safe rollout path.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-white/20 hover:bg-gray-200 hover:shadow-white/40 transition-all"
            >
              Contact us
            </Link>
          </section>
        </div>
      </section>
    </main>
  )
}

export default TermsPage
