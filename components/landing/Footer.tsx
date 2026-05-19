const Footer = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-900 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white text-sm shadow-md">
            🛡
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              AgentShield
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Protecting AI agents in real time.
            </p>
          </div>
        </div>

        {/* Center links */}
        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <a
            href="#features"
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            How it works
          </a>

          <a
            href="#pricing"
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* Right */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} AgentShield. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer