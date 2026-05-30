import Link from "next/link"

const DocsTopbar = () => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-6 backdrop-blur-xl dark:border-slate-800 dark:bg-gray-950/85">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/icon.png" alt="AgentShield" className="h-8 w-8" />
          <span className="font-bold text-slate-950 dark:text-white">AgentShield</span>
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Documentation</span>
      </div>

      <Link
        href="/signup"
        className="inline-flex h-9 items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700"
      >
        Get API Key
      </Link>
    </header>
  )
}

export default DocsTopbar
