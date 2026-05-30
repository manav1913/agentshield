import type { Log } from "@prisma/client"

type Props = {
  logs: Log[]
}

const statusStyles: Record<string, string> = {
  clean: "bg-emerald-100/50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  blocked: "bg-red-100/50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  flagged: "bg-yellow-100/50 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
  pending: "bg-blue-100/50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
}

const statusLabel: Record<string, string> = {
  clean: "Clean",
  blocked: "Blocked",
  flagged: "Flagged",
  pending: "Pending",
}

const LiveFeed = ({ logs }: Props) => {
  return (
    <div className="rounded-2xl border border-gray-200/50 bg-linear-to-br from-white to-gray-50/50 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950/50 shadow-sm">
      <div className="border-b border-gray-200/50 px-6 py-5 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Live request feed
          </h2>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/50">
            <span className="text-2xl">📡</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No requests yet. Send your first test request to start monitoring.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100/50 dark:divide-gray-800/50">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                  {log.input}
                </p>
                {log.violationType ? (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {log.violationType}
                  </p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${
                    statusStyles[log.status] ?? statusStyles.clean
                  }`}
                >
                  {statusLabel[log.status] ?? log.status}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {new Date(log.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LiveFeed
