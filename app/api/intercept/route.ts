import { after } from "next/server"
import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { scanText, getEnabledUserKeywords } from "@/lib/interceptor"
import {
  authenticatePublicApiKey,
  publicApiJson,
  publicApiOptions,
} from "@/lib/public-api"
import { dispatchBlockWebhooks } from "@/lib/webhooks"

export function OPTIONS() {
  return publicApiOptions()
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authenticatePublicApiKey(req)
    if (!auth.ok) return auth.response

    const { apiKey, rateHeaders } = auth
    const { input, output } = await req.json()

    if (!input || !output) {
      return publicApiJson({ error: "Missing input or output" }, 400, rateHeaders)
    }

    const customKeywords = await getEnabledUserKeywords(apiKey.userId)
    const outputScan = scanText(output, customKeywords, { source: "output" })

    if (outputScan.blocked) {
      const log = await prisma.log.create({
        data: {
          userId: apiKey.userId,
          input,
          output,
          status: "blocked",
          violationType: outputScan.type,
          ruleTriggered: outputScan.reason,
        },
      })

      after(() =>
        dispatchBlockWebhooks(apiKey.userId, {
          event: "guardrail.blocked",
          timestamp: new Date().toISOString(),
          data: {
            endpoint: "intercept",
            input,
            output,
            reason: outputScan.reason,
            violationType: outputScan.type,
            logId: log.id,
          },
        })
      )

      return publicApiJson(
        {
          blocked: true,
          safe: false,
          reason: outputScan.reason,
          violationType: outputScan.type,
        },
        200,
        rateHeaders
      )
    }

    await prisma.log.create({
      data: {
        userId: apiKey.userId,
        input,
        output,
        status: "clean",
      },
    })

    return publicApiJson(
      {
        blocked: false,
        safe: true,
        output,
      },
      200,
      rateHeaders
    )
  } catch (error) {
    console.error("Interceptor error:", error)
    return publicApiJson({ error: "Internal server error" }, 500)
  }
}
