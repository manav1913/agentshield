"use client"

import Link from "next/link"
import { SignUp } from "@clerk/nextjs"
import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react"

const signupBenefits = [
  "Run your first AI safety test in minutes",
  "See blocked prompts, risky replies, and matched rules",
  "No credit card required for the free tier",
]

const trustCards = [
  {
    title: "Clear proof",
    desc: "Your dashboard shows exactly why AgentShield allowed or blocked each event.",
  },
  {
    title: "Low commitment",
    desc: "Start on the free plan and upgrade only when your agent needs production controls.",
  },
]

const SignUpPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      <div className="pointer-events-none absolute left-1/2 top-20 h-130 w-190 -translate-x-1/2 rounded-full bg-violet-200/50 blur-[120px]" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-500/25">
            <ShieldCheck className="h-5 w-5" />
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
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Free safety test included
          </div>

          <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Start with proof,
            <span className="text-violet-600"> not promises.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500 sm:text-xl">
            Create an AgentShield account to test your AI agent, inspect the
            safety logs, and understand what needs fixing before users see it.
          </p>

          <div className="mt-8 space-y-4">
            {signupBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                <span className="text-base font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            {trustCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm"
              >
                <p className="font-semibold text-slate-950">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-violet-700">
            <LockKeyhole className="h-4 w-4 shrink-0" />
            We only ask for the account details needed to create your dashboard.
          </div>
        </div>

        <div className="mx-auto w-full max-w-140 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-violet-500/10 backdrop-blur-xl sm:p-8">
          <div className="mb-6 text-center">
            <p className="text-2xl font-bold tracking-tight text-slate-950">
              Create your free account
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your dashboard opens right after signup so you can run the first
              scan immediately.
            </p>
          </div>

          <SignUp
            routing="path"
            path="/signup"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
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

                headerTitle: "text-2xl font-bold text-slate-950",
                headerSubtitle: "text-sm text-slate-500",

                socialButtonsBlock: "w-full",
                socialButtonsBlockButton:
                  "h-11 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors",

                formFieldInput:
                  "h-11 rounded-xl border border-slate-200 bg-white text-slate-950",

                formButtonPrimary:
                  "h-11 rounded-xl bg-violet-600 shadow-lg shadow-violet-500/25 transition-all hover:bg-violet-700",

                footerActionLink: "text-violet-600 hover:text-violet-700",
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
