import Link from "next/link"

const DocsTopbar = () => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-black/85 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/icon.svg" alt="AgentShield" className="h-8 w-8" />
          <span className="font-bold text-white">AgentShield</span>
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium text-gray-400">Documentation</span>
      </div>

      <Link
        href="/signup"
        className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-black hover:bg-gray-200"
      >
        Get API Key
      </Link>
    </header>
  )
}

export default DocsTopbar
