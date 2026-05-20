type Props = {
  total: number
  violations: number
  cleanRate: string
}

const StatCards = ({ total, violations, cleanRate }: Props) => {
  const stats = [
    { label: "Total requests", value: total, color: "text-gray-900 dark:text-white" },
    { label: "Violations blocked", value: violations, color: "text-red-500" },
    { label: "Clean rate", value: `${cleanRate}%`, color: "text-emerald-500" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{s.label}</p>
          <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}

export default StatCards