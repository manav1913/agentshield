"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { X } from "lucide-react"
import {
  FileText,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Shield,
  SlidersHorizontal,
  User,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Rules", href: "/rules", icon: SlidersHorizontal },
  { label: "Logs", href: "/logs", icon: FileText },
  { label: "API Keys", href: "/api-keys", icon: KeyRound },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 w-72 overflow-y-auto bg-white dark:bg-gray-950 shadow-xl">
        <div className="flex h-20 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6">
          <div className="flex items-center gap-3">
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
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2"
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <nav className="space-y-1 px-4 py-5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
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
            onClick={onClose}
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
      </div>
    </div>
  )
}

export default MobileMenu
