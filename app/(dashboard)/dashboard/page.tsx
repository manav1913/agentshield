import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StatCards from "@/components/dashboard/StatCards"
import LiveFeed from "@/components/dashboard/LiveFeed"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  const [totalLogs, violations, clean, recentLogs] = await Promise.all([
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
  ])

  const cleanRate =
    totalLogs > 0 ? ((clean / totalLogs) * 100).toFixed(1) : "100"

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-violet-600">Overview</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor your AI agent activity, blocked responses, and clean traffic
          in real time.
        </p>
      </div>

      <StatCards
        total={totalLogs}
        violations={violations}
        cleanRate={cleanRate}
      />

      <LiveFeed logs={recentLogs} />
    </div>
  )
}