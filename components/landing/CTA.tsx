import Link from "next/link"

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-28 px-6">
      
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-175 h-87.5 bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto">

        {/* Card */}
        <div className="relative overflow-hidden rounded-[40px] border border-violet-200 dark:border-violet-900 bg-violet-50/70 dark:bg-violet-950/20 backdrop-blur-xl px-8 py-20 text-center shadow-2xl shadow-violet-200/20 dark:shadow-violet-950/20">

          {/* Soft gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-violet-500/5 dark:from-white/5" />

          {/* Content */}
          <div className="relative z-10">

            {/* Heading */}
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight mb-6">
              Ship your AI agent
              <br />
              <span className="text-violet-600">
                with confidence
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Add AgentShield in one line. No infrastructure changes,
              vendor lock-in, or complicated setup required.
            </p>

            {/* CTA */}
            <Link href="/signup" className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-xl shadow-violet-500/30 hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
              
              <span className="relative z-10 flex items-center gap-2">
                Get started free
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
            </Link>

            {/* Small text */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-sm text-gray-400 dark:text-gray-500">
              <span>No credit card required</span>

              <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />

              <span>Free tier forever</span>

              <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />

              <span>Open source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection