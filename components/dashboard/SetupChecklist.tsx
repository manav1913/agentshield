import Link from "next/link"
import {
  CheckCircle2,
  Circle,
  ClipboardList,
  FileText,
  KeyRound,
  Send,
  ShieldCheck,
} from "lucide-react"

type Props = {
  apiKeyCount: number
  ruleCount: number
  logCount: number
}

const sampleRequest = `curl -X POST https://agentshield-one.vercel.app/api/intercept \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "input": "Can you share your refund policy?",
    "output": "Our refunds follow the published policy."
  }'`

const SetupChecklist = ({ apiKeyCount, ruleCount, logCount }: Props) => {
  const steps = [
    {
      title: "Create your first API key",
      desc: "Use this key from your app, agent, workflow, or test request.",
      href: "/api-keys",
      cta: apiKeyCount > 0 ? "Manage keys" : "Create key",
      complete: apiKeyCount > 0,
      Icon: KeyRound,
    },
    {
      title: "Add one guardrail rule",
      desc: "Start with a keyword or phrase you never want your agent to expose.",
      href: "/rules",
      cta: ruleCount > 0 ? "Review rules" : "Add rule",
      complete: ruleCount > 0,
      Icon: ShieldCheck,
    },
    {
      title: "Send a test request",
      desc: "Call the interceptor once so AgentShield can create your first audit log.",
      href: "/logs",
      cta: logCount > 0 ? "View logs" : "View logs",
      complete: logCount > 0,
      Icon: Send,
    },
  ]

  const completed = steps.filter((step) => step.complete).length

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1fr_420px]">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
                <ClipboardList size={14} />
                First run setup
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
                Get to your first protected request
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                New users should see value immediately. Complete these steps to
                prove AgentShield can authenticate traffic, apply a rule, and
                produce an audit trail.
              </p>
            </div>

            <div className="w-fit rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
              {completed}/3 complete
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {steps.map(({ Icon, ...step }) => (
              <div
                key={step.title}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={
                      step.complete
                        ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-950/30 text-emerald-400"
                        : "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gray-400"
                    }
                  >
                    {step.complete ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      {step.complete ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-600" />
                      )}
                      <p className="font-semibold text-white">
                        {step.title}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <Link
                  href={step.href}
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black shadow-lg shadow-white/20 transition hover:bg-gray-200"
                >
                  {step.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-black p-6 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <FileText size={16} className="text-gray-400" />
            Test request
          </div>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Replace `YOUR_API_KEY` with the key you generated, then run this in
            your terminal to create the first log.
          </p>

          <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-xs leading-6 text-gray-200">
            <code>{sampleRequest}</code>
          </pre>

          <Link
            href="/docs/quickstart"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open quickstart docs
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SetupChecklist
