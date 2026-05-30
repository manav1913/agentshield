import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StatCards from "@/components/dashboard/StatCards"
import LiveFeed from "@/components/dashboard/LiveFeed"
import SetupChecklist from "@/components/dashboard/SetupChecklist"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  const [totalLogs, violations, clean, recentLogs, apiKeyCount, ruleCount] = await Promise.all([
    prisma.log.count({
      where: { userId },
    }),

    prisma.log.count({
      where: {
        userId,
        status: "blocked",
      },
    }),

    prisma.log.count({
      where: {
        userId,
        status: "clean",
      },
    }),

    prisma.log.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),

    prisma.apiKey.count({
      where: { userId },
    }),

    prisma.rule.count({
      where: { userId },
    }),
  ])

  const cleanRate =
    totalLogs > 0 ? ((clean / totalLogs) * 100).toFixed(1) : "100"

  // Check if setup is complete (has API key, rule, and at least one log)
  const isSetupComplete = apiKeyCount > 0 && ruleCount > 0 && totalLogs > 0

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">Overview</p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Monitor your AI agent activity, blocked responses, and clean traffic
            in real time.
          </p>
        </div>
      </div>

      <StatCards
        total={totalLogs}
        violations={violations}
        cleanRate={cleanRate}
      />

      {!isSetupComplete && (
        <SetupChecklist
          apiKeyCount={apiKeyCount}
          ruleCount={ruleCount}
          logCount={totalLogs}
        />
      )}

      <LiveFeed logs={recentLogs} />
    </div>
  )
}
