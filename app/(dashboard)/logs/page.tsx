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
    "rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-950 dark:text-red-300",
  clean:
    "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  review:
    "rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300",
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
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300">
            <Activity size={14} />
            Logs
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Audit trail
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Review intercepted requests, blocked responses, and rule-triggered activity from your agents.
          </p>
        </div>

        <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          {loading ? "Loading…" : `${counts.total} logs`}
        </span>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
            <ShieldAlert size={18} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Blocked events</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{counts.blocked}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            <ListChecks size={18} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Clean requests</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{counts.clean}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
            <Clock size={18} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Total events</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{counts.total}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Event history</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Recent log activity from the interceptor.</p>
          </div>
          <div className="grid gap-3 sm:grid-flow-col sm:auto-cols-max sm:items-center">
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900">
              <Search size={16} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search rule, type, input..."
                className="w-40 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            >
              <option value="">All statuses</option>
              <option value="blocked">Blocked</option>
              <option value="clean">Clean</option>
            </select>
            <button
              onClick={applyFilters}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <Filter size={16} />
              Apply
            </button>
          </div>
        </div>

        {error ? (
          <div className="p-6 text-sm text-red-700 dark:text-red-300">{error}</div>
        ) : null}

        <div className="p-3">
          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {loading ? (
              <div className="p-6 text-sm text-slate-500 dark:text-slate-400">Loading logs…</div>
            ) : logs.length === 0 ? (
              <div className="p-6 text-sm text-slate-500 dark:text-slate-400">No logs yet. Generate traffic through the interceptor to populate this view.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="border-b border-slate-200 last:border-none dark:border-slate-800">
                  <button
                    onClick={() => toggleExpanded(log.id)}
                    className="flex w-full items-center justify-between gap-4 bg-white p-4 text-left dark:bg-slate-950"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={statusStyles[log.status.toLowerCase()] ?? statusStyles.review}>
                          {log.status}
                        </span>
                        <p className="font-semibold text-slate-950 dark:text-white">
                          {log.violationType ? `${log.violationType} event` : "Clean response"}
                        </p>
                      </div>
                      <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                        {log.ruleTriggered ?? "No rule triggered."}
                      </p>
                    </div>
                    <div className="text-sm text-slate-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </button>
                  {expandedLog === log.id ? (
                    <div className="bg-slate-50 px-4 py-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      <div className="mb-3 rounded-2xl bg-white p-4 dark:bg-slate-950">
                        <p className="font-semibold text-slate-900 dark:text-white">Input</p>
                        <pre className="whitespace-pre-wrap wrap-break-word text-sm text-slate-600 dark:text-slate-300">{log.input}</pre>
                      </div>
                      <div className="rounded-2xl bg-white p-4 dark:bg-slate-950">
                        <p className="font-semibold text-slate-900 dark:text-white">Output</p>
                        <pre className="whitespace-pre-wrap wrap-break-word text-sm text-slate-600 dark:text-slate-300">{log.output}</pre>
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
