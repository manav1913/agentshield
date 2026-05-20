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
  clean: "✓ Clean",
  blocked: "✗ Blocked",
  flagged: "⚠ Flagged",
  pending: "⏳ Pending",
}

const LiveFeed = ({ logs }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Live request feed</h2>
      </div>

      {logs.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-gray-400">No requests yet — integrate AgentShield to start monitoring</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {logs.map((log) => (
            <div key={log.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{log.input}</p>
                {log.violationType && (
                  <p className="text-xs text-gray-400 mt-0.5">{log.violationType}</p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statusStyles[log.status] ?? statusStyles.clean}`}>
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
