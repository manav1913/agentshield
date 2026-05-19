"use client"

import Link from "next/link"
import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <div className="pointer-events-none absolute left-1/2 top-20 h-130 w-190 -translate-x-1/2 rounded-full bg-violet-200/50 blur-[120px]" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-500/25">
            🛡
          </div>
          <span className="text-lg font-bold tracking-tight">AgentShield</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden h-11 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold shadow-sm hover:bg-slate-50 sm:flex"
          >
            Home
          </Link>

          <Link
            href="/login"
            className="flex h-11 items-center rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1fr_560px] lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            Start protected
          </div>

          <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Create your{" "}
            <span className="text-violet-600">AgentShield</span> account.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500 sm:text-xl">
            Start protecting AI agent requests, blocking risky outputs, and
            managing safeguards from one secure dashboard.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-140 items-center justify-center rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-xl sm:p-8">
          <SignUp
            routing="path"
            path="/signup"
            signInUrl="/login"
            appearance={{
              variables: {
                colorPrimary: "#7c3aed",
                colorText: "#111827",
                colorTextSecondary: "#64748b",
                borderRadius: "0.75rem",
              },
              elements: {
                rootBox: "mx-auto flex w-full justify-center",

                cardBox:
                  "mx-auto w-full max-w-[440px] border-0 bg-transparent shadow-none",

                card:
                  "mx-auto w-full max-w-[440px] border-0 bg-transparent p-0 shadow-none",

                header: "hidden",
                headerTitle: "hidden",
                headerSubtitle: "hidden",

                socialButtonsBlock: "w-full",
                socialButtonsBlockButton:
                  "h-11 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors",

                formFieldInput:
                  "h-11 rounded-xl border border-slate-200 bg-white text-slate-950",

                formButtonPrimary:
                  "h-11 rounded-xl bg-violet-600 shadow-lg shadow-violet-500/25 transition-all hover:bg-violet-700",

                dividerLine: "bg-slate-200",
                dividerText: "text-xs text-slate-400",
              },
            }}
          />
        </div>
      </section>
    </main>
  )
}

export default SignUpPage