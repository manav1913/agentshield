"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  Clock,
  Filter,
  ListChecks,
  Search,
  ShieldAlert,
} from "lucide-react"

const statusStyles: Record<string, string> = {
  blocked:
    "rounded-full border border-red-900 bg-red-950/50 px-2.5 py-1 text-xs font-semibold text-red-300",
  clean:
    "rounded-full border border-emerald-900 bg-emerald-950/50 px-2.5 py-1 text-xs font-semibold text-emerald-300",
  review:
    "rounded-full border border-amber-900 bg-amber-950/50 px-2.5 py-1 text-xs font-semibold text-amber-300",
}

type LogRecord = {
  id: string
  status: string
  input: string
  output: string
  violationType: string | null
  ruleTriggered: string | null
  createdAt: string
}

type Counts = {
  total: number
  blocked: number
  clean: number
}

const LogsPage = () => {
  const [logs, setLogs] = useState<LogRecord[]>([])
  const [counts, setCounts] = useState<Counts>({ total: 0, blocked: 0, clean: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")
  const [expandedLog, setExpandedLog] = useState<string | null>(null)

  const buildUrl = () => {
    const params = new URLSearchParams()
    if (filter) params.set("status", filter)
    if (search.trim()) params.set("search", search.trim())
    return `/api/logs?${params.toString()}`
  }

  const fetchLogs = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(buildUrl())
      if (!res.ok) {
        throw new Error("Unable to load logs")
      }

      const json = await res.json()
      setLogs(json.logs ?? [])
      setCounts(json.counts ?? { total: 0, blocked: 0, clean: 0 })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fetch error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const applyFilters = () => {
    fetchLogs()
  }

  const toggleExpanded = (id: string) => {
    setExpandedLog((current) => (current === id ? null : id))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
            <Activity size={14} />
            Logs
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
            Audit trail
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Review intercepted requests, blocked responses, and rule-triggered activity from your agents.
          </p>
        </div>

        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300 shadow-sm">
          {loading ? "Loading…" : `${counts.total} logs`}
        </span>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl border border-red-900/50 bg-linear-to-br from-red-950/30 to-transparent p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">🛡️</div>
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950 text-red-400">
              <ShieldAlert size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Blocked events</p>
            <p className="mt-2 text-4xl font-bold text-white">{counts.blocked}</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/50 bg-linear-to-br from-emerald-950/30 to-transparent p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">✓</div>
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-400">
              <ListChecks size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Clean requests</p>
            <p className="mt-2 text-4xl font-bold text-white">{counts.clean}</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">📊</div>
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gray-400">
              <Clock size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Total events</p>
            <p className="mt-2 text-4xl font-bold text-white">{counts.total}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-white/10 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Event history</h2>
            <p className="mt-1 text-sm text-gray-400">Recent log activity from the interceptor.</p>
          </div>
          <div className="grid gap-3 sm:grid-flow-col sm:auto-cols-max sm:items-center">
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 text-sm text-gray-400">
              <Search size={16} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search rule, type, input..."
                className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="h-11 rounded-2xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
            >
              <option value="">All statuses</option>
              <option value="blocked">Blocked</option>
              <option value="clean">Clean</option>
            </select>
            <button
              onClick={applyFilters}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white shadow-sm"
            >
              <Filter size={16} />
              Apply
            </button>
          </div>
        </div>

        {error ? (
          <div className="p-6 text-sm text-red-300">{error}</div>
        ) : null}

        <div className="p-3">
          <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
            {loading ? (
              <div className="p-6 text-sm text-gray-400">Loading logs…</div>
            ) : logs.length === 0 ? (
              <div className="p-6 text-sm text-gray-400">No logs yet. Generate traffic through the interceptor to populate this view.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="border-b border-white/10 last:border-none">
                  <button
                    onClick={() => toggleExpanded(log.id)}
                    className="flex w-full items-center justify-between gap-4 bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={statusStyles[log.status.toLowerCase()] ?? statusStyles.review}>
                          {log.status}
                        </span>
                        <p className="font-semibold text-white">
                          {log.violationType ? `${log.violationType} event` : "Clean response"}
                        </p>
                      </div>
                      <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        {log.ruleTriggered ?? "No rule triggered."}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </button>
                  {expandedLog === log.id ? (
                    <div className="bg-black px-4 py-4 text-sm text-gray-300">
                      <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="font-semibold text-white">Input</p>
                        <pre className="whitespace-pre-wrap wrap-break-word text-sm text-gray-400">{log.input}</pre>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="font-semibold text-white">Output</p>
                        <pre className="whitespace-pre-wrap wrap-break-word text-sm text-gray-400">{log.output}</pre>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LogsPage
