const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "For side projects and testing",
    features: [
      "10K requests/month",
      "3 active rules",
      "7 day log history",
      "Community support",
    ],
    cta: "Get started free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    desc: "For production AI agents",
    features: [
      "500K requests/month",
      "Unlimited rules",
      "90 day log history",
      "Slack alerts",
      "Human-in-the-loop",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For compliance-heavy teams",
    features: [
      "Unlimited requests",
      "HIPAA/GDPR reports",
      "SSO + audit logs",
      "SLA guarantee",
      "Dedicated support",
    ],
    cta: "Contact us",
    featured: false,
  },
]

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-24 px-6 border-t border-gray-100 dark:border-gray-900"
    >

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-75 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Eyebrow */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 dark:border-violet-900 bg-violet-50 dark:bg-violet-950/40">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
              Pricing
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-5">
          Simple pricing.
          <br />
          <span className="text-violet-600">
            No hidden surprises.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Start free, scale when your AI product grows,
          and pay only when you need advanced protection.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.featured
                  ? "bg-violet-600 border-violet-500 shadow-2xl shadow-violet-500/30 scale-[1.03]"
                  : "bg-white/80 dark:bg-gray-900/80 backdrop-blur border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-800 hover:shadow-2xl hover:shadow-violet-200/20 dark:hover:shadow-violet-950/20"
              }`}
            >

              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Most popular
                </div>
              )}

              {/* Glow */}
              {plan.featured && (
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
              )}

              {/* Plan */}
              <p
                className={`text-sm font-semibold mb-4 ${
                  plan.featured
                    ? "text-violet-200"
                    : "text-violet-600"
                }`}
              >
                {plan.name}
              </p>

              {/* Price */}
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
                      plan.featured
                        ? "text-violet-200"
                        : "text-gray-400"
                    }`}
                  >
                    /month
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className={`text-sm leading-7 mb-8 ${
                  plan.featured
                    ? "text-violet-100"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {plan.desc}
              </p>

              {/* Divider */}
              <div
                className={`h-px w-full mb-8 ${
                  plan.featured
                    ? "bg-violet-500"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
              />

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-3 text-sm ${
                      plan.featured
                        ? "text-violet-100"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <span
                      className={`mt-0.5 ${
                        plan.featured
                          ? "text-white"
                          : "text-violet-600"
                      }`}
                    >
                      ✓
                    </span>

                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  plan.featured
                    ? "bg-white text-violet-600 hover:bg-violet-50 hover:scale-[1.02]"
                    : "border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/30"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing