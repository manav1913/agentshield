import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { siteConfig } from "@/lib/site"

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "For trying AgentShield on a real AI workflow.",
    features: [
      "10K requests/month",
      "3 active rules",
      "7 day log history",
      "No credit card required",
    ],
    cta: "Start free scan",
    href: "/signup",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    desc: "For production AI agents that need daily protection.",
    features: [
      "500K requests/month",
      "Unlimited rules",
      "90 day log history",
      "Slack alerts",
      "Human-in-the-loop approvals",
    ],
    cta: "Protect production",
    href: "/signup",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For compliance-heavy teams with audit requirements.",
    features: [
      "Unlimited requests",
      "HIPAA/GDPR reports",
      "SSO and audit logs",
      "SLA guarantee",
      "Dedicated onboarding",
    ],
    cta: "Talk to us",
    href: `mailto:${siteConfig.contactEmail}`,
    featured: false,
  },
]

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-gray-100 px-6 py-24 dark:border-gray-900"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-75 w-175 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/40">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              Pricing
            </span>
          </div>
        </div>

        <h2 className="mb-5 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Let users try the value first.
          <br />
          <span className="text-violet-600">Upgrade when risk grows.</span>
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          Start with a free safety scan, see the risky events in your dashboard,
          and only pay when your AI agent needs production-grade controls.
        </p>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.featured
                  ? "scale-[1.03] border-violet-500 bg-violet-600 shadow-2xl shadow-violet-500/30"
                  : "border-gray-200 bg-white/80 backdrop-blur hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-200/20 dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-violet-800 dark:hover:shadow-violet-950/20"
              }`}
            >
              {plan.featured && (
                <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Most popular
                </div>
              )}

              {plan.featured && (
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
              )}

              <div className="relative">
                <p
                  className={`mb-4 text-sm font-semibold ${
                    plan.featured ? "text-violet-200" : "text-violet-600"
                  }`}
                >
                  {plan.name}
                </p>

                <div className="mb-3">
                  <span
                    className={`text-5xl font-bold tracking-tight ${
                      plan.featured
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.price}
                  </span>

                  {plan.price !== "Custom" && (
                    <span
                      className={`ml-1 text-sm ${
                        plan.featured ? "text-violet-200" : "text-gray-400"
                      }`}
                    >
                      /month
                    </span>
                  )}
                </div>

                <p
                  className={`mb-8 text-sm leading-7 ${
                    plan.featured
                      ? "text-violet-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {plan.desc}
                </p>

                <div
                  className={`mb-8 h-px w-full ${
                    plan.featured ? "bg-violet-500" : "bg-gray-200 dark:bg-gray-800"
                  }`}
                />

                <ul className="mb-10 space-y-4">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-3 text-sm ${
                        plan.featured
                          ? "text-violet-100"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.featured ? "text-white" : "text-violet-600"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`flex w-full items-center justify-center rounded-2xl py-3 text-sm font-semibold transition-all duration-300 ${
                    plan.featured
                      ? "bg-white text-violet-600 hover:bg-violet-50"
                      : "border border-gray-200 text-gray-900 hover:border-violet-300 hover:bg-violet-50 dark:border-gray-700 dark:text-white dark:hover:border-violet-700 dark:hover:bg-violet-950/30"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
