"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, X, Sparkles, Shield, Coins, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site"

type PlanType = {
  name: string
  price: string
  desc: string
  features: string[]
  cta: string
  href: string
  featured: boolean
}

const plans: PlanType[] = [
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
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)

  const handlePlanClick = (plan: PlanType, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedPlan(plan)
  }

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

                <button
                  onClick={(e) => handlePlanClick(plan, e)}
                  className={`flex w-full cursor-pointer items-center justify-center rounded-2xl py-3 text-sm font-semibold transition-all duration-300 ${
                    plan.featured
                      ? "bg-white text-violet-600 hover:bg-violet-50"
                      : "border border-gray-200 text-gray-900 hover:border-violet-300 hover:bg-violet-50 dark:border-gray-700 dark:text-white dark:hover:border-violet-700 dark:hover:bg-violet-950/30"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="relative w-full max-w-md scale-100 overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 animate-in fade-in-0 zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute right-6 top-6 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon decoration */}
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
              {selectedPlan.name === "Free" ? (
                <Sparkles className="h-6 w-6" />
              ) : selectedPlan.name === "Pro" ? (
                <Shield className="h-6 w-6" />
              ) : (
                <Coins className="h-6 w-6" />
              )}
            </div>

            {/* Content */}
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {selectedPlan.name === "Free"
                ? "Start Protecting for Free"
                : selectedPlan.name === "Pro"
                ? "Pro Features: Early Preview"
                : "Enterprise Pilot Access"}
            </h3>

            <div className="mb-8 text-sm leading-relaxed text-gray-500 dark:text-gray-400 space-y-4">
              {selectedPlan.name === "Free" && (
                <p>
                  AgentShield is currently in <strong>early preview</strong>! Our Free tier is fully functional, letting you test out guardrails, proxy calls, and review intercepted logs. 
                  No credit card required.
                </p>
              )}
              {selectedPlan.name === "Pro" && (
                <p>
                  Paid subscriptions are not yet active during our <strong>early preview phase</strong>. 
                  However, the good news is that <strong>all Pro features</strong> (including custom keywords, full proxy routing, and detailed logs) are currently available to all preview users <strong>completely free</strong>!
                </p>
              )}
              {selectedPlan.name === "Enterprise" && (
                <p>
                  We are setting up pilot programs for custom integrations and compliance controls. 
                  In the meantime, you can explore the platform immediately with our free preview dashboard or contact us at <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-violet-600 hover:underline dark:text-violet-400">{siteConfig.contactEmail}</a> for custom requirements.
                </p>
              )}
              <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                We'd love to hear your feedback on the platform as we prepare for our general release.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                href="/signup"
                onClick={() => setSelectedPlan(null)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3.5 text-sm font-semibold text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98] transition-all duration-200"
              >
                <span>Get Started with Preview</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-full rounded-2xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Pricing
