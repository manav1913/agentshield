import {
  Activity,
  Clock,
  Filter,
  ListChecks,
  Search,
  ShieldAlert,
} from "lucide-react"

const previewLogs = [
  {
    id: "1",
    status: "Blocked",
    title: "PII detected in response",
    detail: "Email address matched sensitive-data policy",
    time: "2 min ago",
  },
  {
    id: "2",
    status: "Clean",
    title: "Agent response approved",
    detail: "No active rules were triggered",
    time: "8 min ago",
  },
  {
    id: "3",
    status: "Review",
    title: "Human review requested",
    detail: "High-confidence hallucination signal",
    time: "14 min ago",
  },
]

const LogsPage = () => {
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
            Review intercepted requests, blocked responses, compliance events,
            and rule-triggered activity across your AI agents.
          </p>
        </div>

        <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          Coming soon
        </span>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
            <ShieldAlert size={18} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Blocked events
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            0
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            <ListChecks size={18} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Clean requests
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            0
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
            <Clock size={18} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Pending review
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            0
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              Event history
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Search and filter log events once traffic starts flowing.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900">
              <Search size={16} />
              <span>Search logs</span>
            </div>

            <button className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        <div className="p-3">
          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {previewLogs.map((log) => (
              <div
                key={log.id}
                className="flex flex-col gap-3 bg-white p-4 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={
                        log.status === "Blocked"
                          ? "rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-950 dark:text-red-300"
                          : log.status === "Clean"
                          ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }
                    >
                      {log.status}
                    </span>

                    <p className="font-semibold text-slate-950 dark:text-white">
                      {log.title}
                    </p>
                  </div>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {log.detail}
                  </p>
                </div>

                <p className="text-sm text-slate-400">{log.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LogsPage