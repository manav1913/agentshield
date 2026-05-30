"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-black/80 shadow-lg backdrop-blur-xl"
          : "border-transparent bg-black"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300"
        >
          <img src="/icon.svg" alt="AgentShield" className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />

          <span className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-gray-300">
            AgentShield
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {[
            ["Playground", "#playground"],
            ["Features", "#features"],
            ["How it works", "#how-it-works"],
            ["Pricing", "#pricing"],
            ["Docs", "/docs"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="relative rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition-all duration-300 after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:bg-white/5 hover:text-white hover:after:w-[calc(100%-32px)]"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
className="hidden items-center rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 active:scale-95 sm:flex"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
className="group relative overflow-hidden rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-white/20 transition-all duration-300 hover:bg-gray-200 hover:shadow-white/30 active:scale-95"
          >
            <span className="relative z-10">Run free test</span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
