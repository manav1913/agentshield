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
    highlight: true,
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
    highlight: true,
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
    highlight: true,
  },
]

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-75 w-175 -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-white" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Features
            </span>
          </div>
        </div>

        <h2 className="mb-5 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Everything users need to
          <br />
          <span className="text-gray-400">believe your agent is safe.</span>
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-gray-400">
          Built for developers shipping AI products fast without risking
          security, compliance, or user trust.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, desc, highlight }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-3xl border p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                highlight
                  ? "border-white/20 bg-linear-to-br from-white/10 to-transparent shadow-white/20 hover:border-white/30 hover:shadow-white/30"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:shadow-white/10"
              }`}
            >
              {highlight && (
                <div className="absolute top-0 right-0 h-24 w-24 bg-linear-to-br from-white/10 to-transparent opacity-50" />
              )}

              <div className="relative">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
                  highlight
                    ? "bg-white text-black shadow-lg shadow-white/30"
                    : "bg-white/10 text-white"
                }`}>
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-white">
                  {title}
                </h3>

                <p className="text-sm leading-7 text-gray-400">
                  {desc}
                </p>

                {highlight && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    Popular
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
