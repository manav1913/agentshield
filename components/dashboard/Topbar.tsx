import { UserButton } from "@clerk/nextjs"
import ThemeToggle from "./ThemeProvider"

const Topbar = () => {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-950/85 px-6 backdrop-blur-xl lg:px-8">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Workspace</p>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          AgentShield Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 sm:block">
          Production
        </button>
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  )
}

export default Topbar