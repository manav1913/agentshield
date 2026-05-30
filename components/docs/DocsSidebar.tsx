"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Book,
  Braces,
  Code2,
  FileText,
  Layers,
  Lock,
  Server,
  Settings,
} from "lucide-react"

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Quick Start", href: "/docs", icon: Book },
      { label: "API Reference", href: "/docs/api", icon: FileText },
      { label: "Authentication", href: "/docs/authentication", icon: Lock },
    ],
  },
  {
    title: "SDKs",
    items: [
      { label: "JavaScript / TypeScript", href: "/docs/sdk/javascript", icon: Braces },
    ],
  },
  {
    title: "Examples",
    items: [
      { label: "Python (Direct API)", href: "/docs/examples/python", icon: Code2 },
      { label: "Go (Direct API)", href: "/docs/examples/go", icon: Server },
      { label: "cURL Examples", href: "/docs/examples/curl", icon: FileText },
    ],
  },
]

const DocsSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-black lg:flex flex-col pt-16">
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default DocsSidebar
