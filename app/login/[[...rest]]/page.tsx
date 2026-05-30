"use client"

import Link from "next/link"
import { SignIn } from "@clerk/nextjs"

const LoginPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute left-1/2 top-20 h-130 w-190 -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-lg shadow-white/25">
            🛡
          </div>
          <span className="text-lg font-bold tracking-tight text-white">AgentShield</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden h-11 items-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold shadow-sm hover:bg-white/10 sm:flex text-white"
          >
            Home
          </Link>

          <Link
            href="/signup"
            className="flex h-11 items-center rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-white/25 hover:bg-gray-200"
          >
            Sign up
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1fr_560px] lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-sm">
            <span className="h-2 w-2 rounded-full bg-white" />
            Secure access
          </div>

          <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Welcome back to{" "}
            <span className="text-gray-400">AgentShield.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400 sm:text-xl">
            Sign in to continue protecting your AI agents and managing every
            safeguard from one secure dashboard.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-140 items-center justify-center rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-white/10 backdrop-blur-xl sm:p-8">
          <SignIn
            routing="path"
            path="/login"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              variables: {
                colorPrimary: "#ffffff",
                colorText: "#ffffff",
                colorTextSecondary: "#9ca3af",
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
                  "h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white",

                formFieldInput:
                  "h-11 rounded-xl border border-white/10 bg-white/5 text-white",

                formButtonPrimary:
                  "h-11 rounded-xl bg-white text-black shadow-lg shadow-white/25 transition-all hover:bg-gray-200",

                dividerLine: "bg-white/10",
                dividerText: "text-xs text-gray-400",
              },
            }}
          />
        </div>
      </section>
    </main>
  )
}

export default LoginPage