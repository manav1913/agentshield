import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  LockKeyhole,
  ShieldCheck,
  XCircle,
} from "lucide-react"

const proofPoints = [
  "No credit card required",
  "Free safety scan included",
  "Dashboard ready in minutes",
  "Enterprise-grade security",
]

const trustMetrics = [
  { label: "Risk checks", value: "12+" },
  { label: "Setup time", value: "<5 min" },
  { label: "Log visibility", value: "100%" },
]

const Hero = () => {
  return (
    <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 overflow-hidden px-6 py-20 lg:grid-cols-2">
      <div className="pointer-events-none absolute -top-30 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-500/15 blur-[120px]" />

      <div className="relative z-10">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
            Free agent safety test before signup friction
          </span>
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
          Prove your AI agent is safe
          <br />
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            before users trust it.
          </span>
        </h1>

        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xl">
          AgentShield gives teams a clear safety layer for AI agents: scan prompts,
          block risky replies, and show exactly what happened before customers see
          the output.
        </p>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/signup"
            className="group relative overflow-hidden rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition-all duration-300 hover:bg-violet-700 hover:shadow-violet-500/40 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Run a free safety test
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </Link>

          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-violet-300 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:border-violet-700"
          >
            <Eye className="h-4 w-4 text-violet-600" />
            See how it protects
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
          {proofPoints.map((point) => (
            <span key={point} className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              {point}
            </span>
          ))}
        </div>

        <div className="mt-10 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-gray-200 bg-white/70 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
          {trustMetrics.map((metric) => (
            <div
              key={metric.label}
              className="border-r border-gray-200 px-4 py-4 last:border-r-0 dark:border-gray-800"
            >
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 scale-90 rounded-full bg-violet-500/20 opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-70" />

        <div className="relative overflow-hidden rounded-3xl border border-violet-200 shadow-2xl shadow-violet-200/40 transition-transform duration-500 hover:-translate-y-2 dark:border-violet-900 dark:shadow-violet-950/40">
          <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-5 py-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-auto font-mono text-xs text-gray-500">
              agentshield.ts
            </span>
          </div>

          <div className="bg-gray-950 p-7 font-mono text-sm leading-8">
            <p className="text-gray-600">{"// wrap your existing LLM call"}</p>

            <p>
              <span className="text-indigo-400">import</span>
              <span className="text-white"> {"{ shield }"} </span>
              <span className="text-indigo-400">from</span>
              <span className="text-emerald-400">
                {" \"agentshield-ai-sdk\""}
              </span>
            </p>

            <br />

            <p>
              <span className="text-indigo-400">const</span>
              <span className="text-white"> response </span>
              <span className="text-indigo-400">= await</span>
              <span className="text-violet-400"> shield</span>
              <span className="text-white">{"({"}</span>
            </p>

            <p className="text-white">
              &nbsp;&nbsp;
              <span className="text-violet-300">apiKey</span>:{" "}
              <span className="text-emerald-400">{"\"as_live_xxxx\""}</span>,
            </p>

            <p className="text-white">
              &nbsp;&nbsp;
              <span className="text-violet-300">input</span>:{" "}
              <span className="text-white">userMessage</span>,
            </p>

            <p className="text-white">
              &nbsp;&nbsp;
              <span className="text-violet-300">handler</span>:{" "}
              <span className="text-indigo-400">async</span>
              {" (safe) => "}
              <span className="text-violet-400">llm</span>.
              <span className="text-violet-400">chat</span>(safe)
            </p>

            <p className="text-white">{"});"}</p>

            <div className="mt-6 space-y-3 rounded-2xl border border-gray-800 bg-gray-900/80 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-950 px-2 py-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  CLEAN
                </span>
                <span className="text-xs text-gray-500">
                  What are your business hours?
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-lg bg-red-950 px-2 py-1 text-xs font-semibold text-red-400">
                  <XCircle className="h-3 w-3" />
                  BLOCKED
                </span>
                <span className="text-xs text-gray-500">
                  PII detected: email address
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-lg bg-red-950 px-2 py-1 text-xs font-semibold text-red-400">
                  <XCircle className="h-3 w-3" />
                  BLOCKED
                </span>
                <span className="text-xs text-gray-500">
                  Hallucination: fake discount claim
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-4">
                <LockKeyhole className="mb-2 h-4 w-4 text-emerald-400" />
                <p className="font-semibold text-white">Private by design</p>
                <p className="mt-1 text-gray-500">
                  Only safety events go to the dashboard.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-4">
                <ShieldCheck className="mb-2 h-4 w-4 text-violet-400" />
                <p className="font-semibold text-white">Policy evidence</p>
                <p className="mt-1 text-gray-500">
                  Every block includes the matched rule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
