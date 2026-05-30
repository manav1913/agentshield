import { BadgeDollarSign, DatabaseZap, Scale } from "lucide-react"

const problems = [
  {
    Icon: BadgeDollarSign,
    title: "Hallucinated discounts",
    desc: '"Yes, I can give you 90% off." Your AI agent just created a costly promise your business never approved.',
  },
  {
    Icon: DatabaseZap,
    title: "Data leaks",
    desc: "Agents can expose internal schemas, API keys, or customer PII when a prompt finds the wrong gap.",
  },
  {
    Icon: Scale,
    title: "Compliance violations",
    desc: "Unfiltered AI responses can create privacy, policy, and audit risk in seconds.",
  },
]

const Problem = () => {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-75 w-150 -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-900 bg-red-950/40 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
              The problem
            </span>
          </div>
        </div>

        <h2 className="mx-auto mb-5 max-w-3xl text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          One bad AI response can become a{" "}
          <span className="text-red-500">business disaster.</span>
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-gray-400">
          Users sign up when they believe you understand the risk. AgentShield
          makes those risks visible, testable, and controllable.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {problems.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-red-900 bg-white/5 p-7 shadow-lg shadow-red-950/10 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-950/30"
            >
              <div className="absolute inset-0 bg-linear-to-br from-red-500/0 via-red-500/0 to-red-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-red-900 bg-red-950/50 text-red-400 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>

                <p className="text-sm leading-7 text-gray-400">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problem
