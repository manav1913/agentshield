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
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm font-semibold text-violet-600">
            AgentShield
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
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
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700"
              >
                Email {siteConfig.contactEmail}
                <ArrowRight size={16} />
              </a>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5 text-violet-600" />
                  <p className="font-semibold">Include this in your message</p>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  What your agent does, what you are worried it might leak or
                  say, and whether you are testing locally or preparing for
                  production.
                </p>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
                <ShieldQuestion className="h-7 w-7 text-violet-300" />
                <h2 className="mt-4 text-xl font-semibold">Good reasons to reach out</h2>
                <div className="mt-5 space-y-3">
                  {reasons.map((reason) => (
                    <div key={reason} className="flex gap-3">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
                      <p className="text-sm leading-6 text-slate-300">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <Clock className="h-6 w-6 text-emerald-500" />
                <h2 className="mt-4 text-lg font-semibold">What to expect</h2>
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
