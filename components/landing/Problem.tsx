const problems = [
  {
    icon: "💸",
    title: "Hallucinated discounts",
    desc: '"Yes I can give you 90% off!" — your AI agent just cost you thousands in refunds.',
  },
  {
    icon: "🔓",
    title: "Data leaks",
    desc: "Agents leak internal DB schemas, API keys, or customer PII to anyone who asks the right question.",
  },
  {
    icon: "⚖️",
    title: "Compliance violations",
    desc: "GDPR and HIPAA violations from unfiltered AI responses create massive legal and financial risk.",
  },
]

const Problem = () => {
  return (
    <section className="relative overflow-hidden border-t border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-gray-950 py-24 px-6">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Eyebrow */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-red-600 dark:text-red-400">
              The problem
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-gray-900 dark:text-white max-w-3xl mx-auto leading-tight mb-5">
          One bad AI response can become a{" "}
          <span className="text-red-500">
            business disaster.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          AI agents are powerful — but without guardrails they can leak data,
          violate compliance, and damage customer trust in seconds.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-3xl border border-red-100 dark:border-red-950 bg-white/80 dark:bg-gray-900/80 backdrop-blur p-7 shadow-lg shadow-red-100/30 dark:shadow-red-950/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-200/30 dark:hover:shadow-red-950/30 transition-all duration-500"
            >

              {/* Glow on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-red-500/0 via-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900 text-2xl group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                {p.desc}
              </p>

              {/* Bottom line */}
              <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-red-300 dark:via-red-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problem