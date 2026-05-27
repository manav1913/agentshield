import Link from "next/link"
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react"

const assurances = [
  "No credit card required",
  "Free tier forever",
  "Security logs included",
]

const CTASection = () => {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-87.5 w-175 rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-violet-200 bg-violet-50/70 px-8 py-16 text-center shadow-2xl shadow-violet-200/20 backdrop-blur-xl dark:border-violet-900 dark:bg-violet-950/20 dark:shadow-violet-950/20 sm:py-20">
          <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-violet-500/5 dark:from-white/5" />

          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm dark:bg-violet-950">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Give users a reason
              <br />
              <span className="text-violet-600">to trust your AI agent.</span>
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
              Create your account, run your first safety test, and show your team
              what AgentShield blocks before the next risky response reaches a user.
            </p>

            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-500/30 transition-all duration-300 hover:bg-violet-700 hover:shadow-violet-500/40 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Run your free safety test
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              {assurances.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mx-auto mt-8 inline-flex max-w-full items-center gap-2 rounded-2xl border border-violet-200 bg-white/70 px-4 py-3 text-sm font-medium text-gray-600 dark:border-violet-900 dark:bg-gray-950/50 dark:text-gray-300">
              <LockKeyhole className="h-4 w-4 shrink-0 text-violet-600" />
              Your first scan is designed to prove value before you commit.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
