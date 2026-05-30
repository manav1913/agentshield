import {
  Bot,
  CheckCircle2,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react"

const steps = [
  {
    id: "user-input",
    Icon: MessageSquareText,
    title: "User input",
    desc: "Prompt sent to your AI agent",
  },
  {
    id: "llm",
    Icon: Bot,
    title: "LLM",
    desc: "Your AI model processes the request",
  },
  {
    id: "output-scan",
    Icon: ShieldCheck,
    title: "AgentShield",
    desc: "Scans output against your rules",
    accent: true,
  },
  {
    id: "safe-response",
    Icon: CheckCircle2,
    title: "Safe response",
    desc: "Users get clean, compliant replies",
  },
]

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-gray-100 px-6 py-24 dark:border-gray-900"
    >
      <div className="pointer-events-none absolute left-1/2 top-20 h-75 w-150 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/40">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              How it works
            </span>
          </div>
        </div>

        <h2 className="mb-5 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          One line of code.
          <br />
          <span className="text-violet-600">Full AI protection.</span>
        </h2>

        <p className="mx-auto mb-20 max-w-2xl text-center text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          AgentShield wraps your existing LLM calls and filters prompts and
          responses in real time without changing your infrastructure.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 lg:flex-nowrap">
          {steps.map(({ Icon, ...step }, i) => (
            <div key={step.id} className="flex items-center">
              <div className="group relative w-42.5">
                <div
                  className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                    step.accent
                      ? "border-violet-500 bg-violet-600 text-white shadow-violet-500/20"
                      : "border-gray-200 bg-white/80 text-gray-900 dark:border-gray-800 dark:bg-gray-900/80 dark:text-white"
                  }`}
                >
                  {step.accent && (
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                  )}

                  <div className="relative">
                    <div
                      className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
                        step.accent ? "bg-white/10" : "bg-violet-50 dark:bg-violet-950"
                      }`}
                    >
                      <Icon
                        className={`h-7 w-7 ${
                          step.accent ? "text-white" : "text-violet-600"
                        }`}
                      />
                    </div>

                    <h3
                      className={`mb-2 text-sm font-semibold ${
                        step.accent ? "text-white" : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {step.title}
                    </h3>

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
              </div>

              {i < steps.length - 1 && (
                <div className="hidden w-12 items-center justify-center lg:flex">
                  <div className="relative h-0.5 w-full bg-linear-to-r from-violet-200 via-violet-400 to-violet-200 dark:from-violet-950 dark:via-violet-700 dark:to-violet-950">
                    <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-500" />
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
