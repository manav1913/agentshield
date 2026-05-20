"use client"

import Link from "next/link"
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
  localStorage.setItem('theme', !dark ? 'dark' : 'light')
}

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-sm"
          : "border-transparent bg-white dark:bg-gray-950"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300"
        >
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white text-sm shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            🛡
          </div>

          <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
            AgentShield
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-2">
          {[
            ["Features", "#features"],
            ["How it works", "#how-it-works"],
            ["Pricing", "#pricing"],
            // ["Docs", "#docs"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-lg hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 after:absolute after:left-4 after:bottom-1 after:h-0.5 after:w-0 after:bg-violet-600 after:transition-all after:duration-300 hover:after:w-[calc(100%-32px)]"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
          >
            <span className="text-base">
              {dark ? "☀️" : "🌙"}
            </span>
          </button>

          {/* Sign in */}
          <Link
            href="/login"
            className="hidden sm:flex items-center text-sm font-medium text-gray-900 dark:text-white px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-gray-100 dark:hover:bg-gray-900 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Sign in
          </Link>

          {/* Get started */}
          <Link
            href="/signup"
            className="group relative overflow-hidden text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="relative z-10">Get started free</span>

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar