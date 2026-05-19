const steps = [
  {
    icon: "💬",
    title: "User input",
    desc: "Prompt sent to your AI agent",
  },
  {
    icon: "🛡",
    title: "AgentShield",
    desc: "Scans input against your rules",
    accent: true,
  },
  {
    icon: "🤖",
    title: "LLM",
    desc: "Only clean prompts reach your model",
  },
  {
    icon: "🛡",
    title: "AgentShield",
    desc: "Scans output before it reaches user",
    accent: true,
  },
  {
    icon: "✅",
    title: "Safe response",
    desc: "User gets clean, compliant replies",
  },
]

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24 px-6 border-t border-gray-100 dark:border-gray-900"
    >

      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-150 h-75 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Eyebrow */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 dark:border-violet-900 bg-violet-50 dark:bg-violet-950/40">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              How it works
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-5">
          One line of code.
          <br />
          <span className="text-violet-600">
            Full AI protection.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-20 leading-relaxed">
          AgentShield wraps your existing LLM calls and filters both
          prompts and responses in real time without changing your infrastructure.
        </p>

        {/* Flow */}
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-6">

          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center"
            >

              {/* Card */}
              <div className="group relative w-42.5">

                <div
                  className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                    step.accent
                      ? "bg-violet-600 border-violet-500 text-white shadow-violet-500/20"
                      : "bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                  }`}
                >

                  {/* Glow */}
                  {step.accent && (
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                  )}

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${
                      step.accent
                        ? "bg-white/10"
                        : "bg-violet-50 dark:bg-violet-950"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-sm font-semibold mb-2 ${
                      step.accent
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Desc */}
                  <p
                    className={`text-xs leading-6 ${
                      step.accent
                        ? "text-violet-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-12">
                  <div className="h-0.5 w-full bg-linear-to-r from-violet-200 via-violet-400 to-violet-200 dark:from-violet-950 dark:via-violet-700 dark:to-violet-950 relative">

                    {/* Animated dot */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks