import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

async function requireUserId() {
  const { userId } = await auth()
  if (!userId) {
    return null
  }
  return userId
}

export async function GET(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const statusFilter = url.searchParams.get("status")
  const search = url.searchParams.get("search")?.trim()
  const take = Number(url.searchParams.get("take") ?? 20)

  const where: any = { userId }

  if (statusFilter) {
    where.status = statusFilter
  }

  if (search) {
    where.OR = [
      { input: { contains: search, mode: "insensitive" } },
      { output: { contains: search, mode: "insensitive" } },
      { violationType: { contains: search, mode: "insensitive" } },
      { ruleTriggered: { contains: search, mode: "insensitive" } },
    ]
  }

  const [logs, total, blocked, clean] = await Promise.all([
    prisma.log.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: Math.min(Math.max(take, 1), 100),
    }),
    prisma.log.count({ where: { userId } }),
    prisma.log.count({ where: { userId, status: "blocked" } }),
    prisma.log.count({ where: { userId, status: "clean" } }),
  ])

  return NextResponse.json({
    logs,
    counts: {
      total,
      blocked,
      clean,
    },
  })
}
