"use client"

import Link from "next/link"
import { Moon, ShieldCheck, Sun } from "lucide-react"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [dark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDark(!dark)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", !dark ? "dark" : "light")
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/80"
          : "border-transparent bg-white dark:bg-gray-950"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md transition-transform duration-300 group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <span className="text-lg font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
            AgentShield
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {[
            ["Features", "#features"],
            ["How it works", "#how-it-works"],
            ["Pricing", "#pricing"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="relative rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-0 after:bg-violet-600 after:transition-all after:duration-300 hover:bg-gray-100 hover:text-gray-900 hover:after:w-[calc(100%-32px)] dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:border-violet-300 hover:text-violet-600 active:scale-95 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:border-violet-700 dark:hover:text-violet-400"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/login"
            className="hidden items-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 transition-all duration-300 hover:border-violet-300 hover:bg-gray-100 active:scale-95 dark:border-gray-800 dark:text-white dark:hover:border-violet-700 dark:hover:bg-gray-900 sm:flex"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="group relative overflow-hidden rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:bg-violet-700 hover:shadow-violet-600/40 active:scale-95"
          >
            <span className="relative z-10">Run free test</span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
