import {
  BellRing,
  Brain,
  Eye,
  PlugZap,
  ShieldAlert,
  UserCheck,
} from "lucide-react"

const features = [
  {
    Icon: ShieldAlert,
    title: "PII detection",
    desc: "Blocks emails, phone numbers, credit cards, and sensitive personal data before they leak.",
  },
  {
    Icon: Eye,
    title: "Policy visibility",
    desc: "Every allowed or blocked event includes logs, matched rules, and a clear audit trail.",
  },
  {
    Icon: Brain,
    title: "Hallucination guard",
    desc: "Flags fabricated claims, fake discounts, and unverified responses before users see them.",
  },
  {
    Icon: UserCheck,
    title: "Human-in-the-loop",
    desc: "High-risk actions pause for manual approval before refunds, deletions, or account changes execute.",
  },
  {
    Icon: BellRing,
    title: "Live dashboard",
    desc: "Monitor AI interactions with real-time logs, alerts, and full request visibility.",
  },
  {
    Icon: PlugZap,
    title: "Works with any LLM",
    desc: "OpenAI, Anthropic, Gemini, Groq, or Ollama. Integrate once without vendor lock-in.",
  },
]

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-gray-100 bg-gray-50 px-6 py-24 dark:border-gray-900 dark:bg-gray-950"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-75 w-175 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/40">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              Features
            </span>
          </div>
        </div>

        <h2 className="mb-5 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Everything users need to
          <br />
          <span className="text-violet-600">believe your agent is safe.</span>
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          Built for developers shipping AI products fast without risking
          security, compliance, or user trust.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-200/20 dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-violet-800 dark:hover:shadow-violet-950/20"
            >
              <div className="absolute inset-0 bg-linear-to-br from-violet-500/0 via-violet-500/0 to-violet-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition-transform duration-300 group-hover:scale-105 dark:bg-violet-950 dark:text-violet-400">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>

                <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                  {desc}
                </p>

                <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-violet-300 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-violet-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
