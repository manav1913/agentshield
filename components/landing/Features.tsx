const features = [
  {
    icon: "🛡",
    title: "PII detection",
    desc: "Automatically blocks emails, phone numbers, credit cards and sensitive personal data before they leak.",
  },
  {
    icon: "🚫",
    title: "Keyword blocklist",
    desc: "Block dangerous prompts and phrases like schema dumps, passwords, secrets, or internal APIs.",
  },
  {
    icon: "🧠",
    title: "Hallucination guard",
    desc: "Detects fabricated claims, fake discounts, and unverified responses in real time.",
  },
  {
    icon: "👤",
    title: "Human-in-the-loop",
    desc: "High-risk actions pause for manual approval before refunds, deletions, or account changes execute.",
  },
  {
    icon: "📊",
    title: "Live dashboard",
    desc: "Monitor every AI interaction with real-time logs, alerts, and full request visibility.",
  },
  {
    icon: "🔌",
    title: "Works with any LLM",
    desc: "OpenAI, Anthropic, Gemini, Groq, Ollama — integrate once without vendor lock-in.",
  },
]

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 px-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
    >

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-75 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Eyebrow */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 dark:border-violet-900 bg-violet-50 dark:bg-violet-950/40">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              Features
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-5">
          Everything you need to
          <br />
          <span className="text-violet-600">
            ship AI safely.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Built for developers shipping AI products fast 
          without risking security, compliance, or trust.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur p-7 hover:-translate-y-2 hover:border-violet-300 dark:hover:border-violet-800 hover:shadow-2xl hover:shadow-violet-200/20 dark:hover:shadow-violet-950/20 transition-all duration-500"
            >

              {/* Hover glow */}
              <div className="absolute inset-0 bg-linear-to-br from-violet-500/0 via-violet-500/0 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                {f.desc}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-violet-300 dark:via-violet-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features