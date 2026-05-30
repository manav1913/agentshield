import { ShieldCheck } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 py-8 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              AgentShield
            </p>

            <p className="text-xs text-gray-400">
              Protecting AI agents in real time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a
            href="#features"
            className="transition-colors hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition-colors hover:text-white"
          >
            How it works
          </a>

          <a
            href="#pricing"
            className="transition-colors hover:text-white"
          >
            Pricing
          </a>

          <a
            href="/docs"
            className="transition-colors hover:text-white"
          >
            Docs
          </a>

          <a
            href="/contact"
            className="transition-colors hover:text-white"
          >
            Contact
          </a>

          <a
            href="/privacy"
            className="transition-colors hover:text-white"
          >
            Privacy
          </a>

          <a
            href="/terms"
            className="transition-colors hover:text-white"
          >
            Terms
          </a>
        </div>

        <p className="text-xs text-gray-500">
          Copyright {new Date().getFullYear()} AgentShield. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
