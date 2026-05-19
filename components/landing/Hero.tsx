import Link from "next/link"

const Hero = () => {
  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* Background glow */}
      <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-125 h-125 bg-violet-500/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Left */}
      <div className="relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 mb-7 shadow-sm hover:scale-105 transition-transform duration-300">
          <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />

          <span className="text-xs font-semibold tracking-wide text-violet-700 dark:text-violet-400">
            Open source · Free to start
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-gray-900 dark:text-white mb-6">
          Your AI agent,
          <br />
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            under control.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
          AgentShield intercepts every LLM request and response in real time —
          blocking hallucinations, PII leaks, and compliance violations before
          they reach your users.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          
          {/* Primary CTA */}
          <Link
            href="/signup"
            className="group relative overflow-hidden px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get started free
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
          </Link>
       
        </div>
      </div>

      {/* Right — Terminal */}
      <div className="relative group">
        
        {/* Glow behind terminal */}
        <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full scale-90 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

        <div className="relative rounded-3xl overflow-hidden border border-violet-200 dark:border-violet-900 shadow-2xl shadow-violet-200/40 dark:shadow-violet-950/40 hover:-translate-y-2 transition-transform duration-500">

          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-5 py-4 bg-gray-900 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />

            <span className="ml-auto text-xs text-gray-500 font-mono">
              agentshield.ts
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-gray-950 p-7 font-mono text-sm leading-8">
            
            <p className="text-gray-600">
              {"// wrap your existing LLM call"}
            </p>

            <p>
              <span className="text-indigo-400">import</span>
              <span className="text-white"> {"{ shield }"} </span>
              <span className="text-indigo-400">from</span>
              <span className="text-emerald-400">
                {" "} '@agentshield/sdk'
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
              <span className="text-emerald-400">
                "as_live_xxxx"
              </span>,
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

            {/* Output */}
            <div className="mt-6 p-4 rounded-2xl bg-gray-900/80 border border-gray-800 backdrop-blur space-y-3">

              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-lg bg-emerald-950 text-emerald-400 font-semibold">
                  ✓ CLEAN
                </span>

                <span className="text-xs text-gray-500">
                  What are your business hours?
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-lg bg-red-950 text-red-400 font-semibold">
                  ✗ BLOCKED
                </span>

                <span className="text-xs text-gray-500">
                  PII detected — email address
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-lg bg-red-950 text-red-400 font-semibold">
                  ✗ BLOCKED
                </span>

                <span className="text-xs text-gray-500">
                  Hallucination — fake discount claim
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero