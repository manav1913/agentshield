import { prisma } from "@/lib/prisma"

export const DEFAULT_RATE_LIMIT_PER_MINUTE = 120

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: Date
}

function currentMinuteKey(): string {
  const d = new Date()
  d.setSeconds(0, 0)
  return d.toISOString()
}

function nextMinuteReset(): Date {
  const d = new Date()
  d.setSeconds(0, 0)
  d.setMinutes(d.getMinutes() + 1)
  return d
}

export async function checkRateLimit(
  apiKeyId: string,
  limit: number = DEFAULT_RATE_LIMIT_PER_MINUTE
): Promise<RateLimitResult> {
  const minuteKey = currentMinuteKey()
  const resetAt = nextMinuteReset()

  const counter = await prisma.rateLimitCounter.upsert({
    where: {
      apiKeyId_minuteKey: { apiKeyId, minuteKey },
    },
    create: {
      apiKeyId,
      minuteKey,
      count: 1,
    },
    update: {
      count: { increment: 1 },
    },
  })

  const remaining = Math.max(0, limit - counter.count)

  return {
    allowed: counter.count <= limit,
    limit,
    remaining,
    resetAt,
  }
}

export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.floor(result.resetAt.getTime() / 1000)),
  }
}
