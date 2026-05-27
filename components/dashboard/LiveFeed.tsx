import type { Log } from "@prisma/client"

type Props = {
  logs: Log[]
}

const statusStyles: Record<string, string> = {
  clean: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600",
  blocked: "bg-red-50 dark:bg-red-950 text-red-500",
  flagged: "bg-yellow-50 dark:bg-yellow-950 text-yellow-600",
  pending: "bg-blue-50 dark:bg-blue-950 text-blue-500",
}

const statusLabel: Record<string, string> = {
  clean: "Clean",
  blocked: "Blocked",
  flagged: "Flagged",
  pending: "Pending",
}

const LiveFeed = ({ logs }: Props) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-800">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Live request feed
        </h2>
      </div>

      {logs.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-gray-400">
            No requests yet. Send your first test request to start monitoring.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-gray-700 dark:text-gray-300">
                  {log.input}
                </p>
                {log.violationType ? (
                  <p className="mt-0.5 text-xs text-gray-400">
                    {log.violationType}
                  </p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                    statusStyles[log.status] ?? statusStyles.clean
                  }`}
                >
                  {statusLabel[log.status] ?? log.status}
                </span>
                <span className="text-xs text-gray-400">
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
