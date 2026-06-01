import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {
  checkRateLimit,
  DEFAULT_RATE_LIMIT_PER_MINUTE,
  rateLimitHeaders,
} from "@/lib/rate-limit"

export const PUBLIC_API_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key",
} as const

export function publicApiOptions(): NextResponse {
  return new NextResponse(null, { headers: PUBLIC_API_CORS_HEADERS })
}

export function publicApiJson(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: { ...PUBLIC_API_CORS_HEADERS, ...extraHeaders },
  })
}

type ApiKeyRecord = {
  id: string
  userId: string
  key: string
  name: string
  rateLimitPerMinute: number
}

type AuthSuccess = {
  ok: true
  apiKey: ApiKeyRecord
  rateHeaders: Record<string, string>
}

type AuthFailure = {
  ok: false
  response: NextResponse
}

export async function authenticatePublicApiKey(
  req: NextRequest
): Promise<AuthSuccess | AuthFailure> {
  const headerKey = req.headers.get("x-api-key")

  if (!headerKey) {
    return {
      ok: false,
      response: publicApiJson({ error: "Missing API key" }, 401),
    }
  }

  const apiKey = await prisma.apiKey.findUnique({
    where: { key: headerKey },
  })

  if (!apiKey) {
    return {
      ok: false,
      response: publicApiJson({ error: "Invalid API key" }, 401),
    }
  }

  const limit = apiKey.rateLimitPerMinute ?? DEFAULT_RATE_LIMIT_PER_MINUTE
  const rate = await checkRateLimit(apiKey.id, limit)
  const headers = rateLimitHeaders(rate)

  if (!rate.allowed) {
    return {
      ok: false,
      response: publicApiJson(
        {
          error: "Rate limit exceeded",
          limit: rate.limit,
          resetAt: rate.resetAt.toISOString(),
        },
        429,
        headers
      ),
    }
  }

  return {
    ok: true,
    apiKey: apiKey as ApiKeyRecord,
    rateHeaders: headers,
  }
}
