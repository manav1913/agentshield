"use client"

import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import { useState } from "react"
import MobileMenu from "./MobileMenu"

const Topbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-black/85 px-6 backdrop-blur-xl lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-xl border border-white/10 bg-white/5 p-2 shadow-sm"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
          <div>
            <p className="text-sm font-medium text-gray-400">Workspace</p>
            <h1 className="text-xl font-bold tracking-tight text-white">
              AgentShield Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}

export default Topbar