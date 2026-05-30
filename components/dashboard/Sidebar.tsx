"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import {
  FileText,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Shield,
  SlidersHorizontal,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Rules", href: "/rules", icon: SlidersHorizontal },
  { label: "Logs", href: "/logs", icon: FileText },
  { label: "API Keys", href: "/api-keys", icon: KeyRound },
]

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 lg:flex flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-gray-200 dark:border-gray-800 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-500/25">
          <Shield size={20} />
        </div>
        <div>
          <Link href="/" className="text-lg font-bold leading-none text-gray-900 dark:text-white">
            AgentShield
          </Link>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Control center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-5">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-1">
        <Link
          href="/docs"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FileText size={18} />
          Documentation
        </Link>

        <SignOutButton>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <LogOut size={18} />
            Sign out
          </button>
        </SignOutButton>
      </div>
    </aside>
  )
}

export default Sidebar