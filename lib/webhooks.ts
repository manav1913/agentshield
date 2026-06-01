import { createHmac, randomBytes } from "crypto"
import { prisma } from "@/lib/prisma"

export type BlockWebhookPayload = {
  event: "guardrail.blocked"
  timestamp: string
  data: {
    endpoint: "intercept" | "agent"
    input: string
    output: string
    reason: string | null
    violationType: string | null
    logId?: string
  }
}

export function generateWebhookSecret(): string {
  return randomBytes(24).toString("hex")
}

function signPayload(secret: string, body: string): string {
  return createHmac("sha256", secret).update(body).digest("hex")
}

export async function dispatchBlockWebhooks(
  userId: string,
  payload: BlockWebhookPayload
): Promise<void> {
  const hooks = await prisma.webhook.findMany({
    where: { userId, enabled: true },
  })

  if (hooks.length === 0) return

  const body = JSON.stringify(payload)

  await Promise.allSettled(
    hooks.map(async (hook) => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "AgentShield-Webhooks/1.0",
        "X-AgentShield-Event": payload.event,
      }

      if (hook.secret) {
        headers["X-AgentShield-Signature"] = signPayload(hook.secret, body)
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)

      try {
        const res = await fetch(hook.url, {
          method: "POST",
          headers,
          body,
          signal: controller.signal,
        })

        if (!res.ok) {
          console.warn(`Webhook ${hook.id} returned ${res.status}`)
        }
      } catch (error) {
        console.warn(`Webhook ${hook.id} failed:`, error)
      } finally {
        clearTimeout(timeout)
      }
    })
  )
}
