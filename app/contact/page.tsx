import Link from "next/link"
import { ArrowRight, Clock, Mail, MessageSquareText, ShieldQuestion } from "lucide-react"
import { siteConfig } from "@/lib/site"

const reasons = [
  "You want help connecting your first agent.",
  "You are not sure what rules to create.",
  "You need to understand what data will be logged.",
  "You found a signup, API key, or redirect issue.",
]

const ContactPage = () => {
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
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-linear-to-br from-violet-50 to-white p-8 shadow-sm hover:shadow-md transition-all duration-300 dark:border-violet-900/50 dark:from-violet-950/30 dark:to-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300">
                <Mail size={22} />
              </div>

              <h1 className="mt-6 max-w-2xl text-5xl font-bold leading-tight tracking-tight">
                Talk to us before AI safety becomes guesswork.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
                If AgentShield looks useful but you are unsure how to start,
                send your use case. We can help you choose a first rule, test a
                request, or understand whether the product fits your workflow.
              </p>

              <a
                href={`mailto:${siteConfig.contactEmail}?subject=AgentShield setup help`}
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700 hover:shadow-violet-500/40 transition-all"
              >
                Email {siteConfig.contactEmail}
                <ArrowRight size={16} />
              </a>

              <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50 p-5 dark:border-violet-900 dark:bg-violet-950/30">
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <p className="font-semibold text-slate-950 dark:text-white">Include this in your message</p>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  What your agent does, what you are worried it might leak or
                  say, and whether you are testing locally or preparing for
                  production.
                </p>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-linear-to-br from-violet-50 to-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-violet-900/50 dark:from-violet-950/30 dark:to-slate-950">
                <ShieldQuestion className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                <h2 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Good reasons to reach out</h2>
                <div className="mt-5 space-y-3">
                  {reasons.map((reason) => (
                    <div key={reason} className="flex gap-3">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600 dark:bg-violet-400" />
                      <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-linear-to-br from-violet-50 to-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-violet-900/50 dark:from-violet-950/30 dark:to-slate-950">
                <Clock className="h-6 w-6 text-emerald-500" />
                <h2 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">What to expect</h2>
                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  A practical reply focused on setup, not a sales maze. For now,
                  email is the support channel.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
