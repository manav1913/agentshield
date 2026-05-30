type Props = {
  total: number
  violations: number
  cleanRate: string
}

const StatCards = ({ total, violations, cleanRate }: Props) => {
  const stats = [
    {
      label: "Total requests",
      value: total,
      color: "text-gray-900 dark:text-white",
      bg: "bg-linear-to-br from-violet-50 to-white dark:from-violet-950/30 dark:to-gray-900",
      border: "border-violet-100 dark:border-violet-900/50",
      icon: "📊"
    },
    {
      label: "Violations blocked",
      value: violations,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-linear-to-br from-red-50 to-white dark:from-red-950/30 dark:to-gray-900",
      border: "border-red-100 dark:border-red-900/50",
      icon: "🛡️"
    },
    {
      label: "Clean rate",
      value: `${cleanRate}%`,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-linear-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-900",
      border: "border-emerald-100 dark:border-emerald-900/50",
      icon: "✓"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`relative overflow-hidden rounded-2xl border ${s.border} ${s.bg} p-6 shadow-sm hover:shadow-md transition-all duration-300`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">
            {s.icon}
          </div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {s.label}
          </p>
          <p className={`text-4xl font-bold tracking-tight ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}

export default StatCards