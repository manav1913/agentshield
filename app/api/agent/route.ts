import { after } from "next/server"
import { NextRequest } from "next/server"
import Groq from "groq-sdk"
import { prisma } from "@/lib/prisma"
import { getEnabledUserKeywords, scanText } from "@/lib/interceptor"
import {
  authenticatePublicApiKey,
  publicApiJson,
  publicApiOptions,
} from "@/lib/public-api"
import { dispatchBlockWebhooks } from "@/lib/webhooks"

const DEFAULT_GROQ_MODEL = "openai/gpt-oss-20b"
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini"

async function callGroq(input: string, model: string, systemPrompt: string) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error("Groq API key not configured")
  }

  const client = new Groq({ apiKey })
  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ],
    temperature: 0.7,
  })

  const output = completion.choices?.[0]?.message?.content
  if (typeof output !== "string") {
    throw new Error("Groq returned an unexpected response format")
  }

  return output
}

async function callOpenAI(input: string, model: string, systemPrompt: string) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OpenAI API key not configured")
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(
      `OpenAI request failed: ${response.status} ${response.statusText} ${
        error?.error?.message ?? ""
      }`.trim()
    )
  }

  const result = await response.json()
  const output = result.choices?.[0]?.message?.content
  if (typeof output !== "string") {
    throw new Error("OpenAI returned an unexpected response format")
  }

  return output
}

async function recordBlock(
  userId: string,
  input: string,
  output: string,
  scan: { type: string | null; reason: string | null }
) {
  return prisma.log.create({
    data: {
      userId,
      input,
      output,
      status: "blocked",
      violationType: scan.type,
      ruleTriggered: scan.reason,
    },
  })
}

export function OPTIONS() {
  return publicApiOptions()
}

export async function POST(req: NextRequest) {
  try {
    const auth = await authenticatePublicApiKey(req)
    if (!auth.ok) return auth.response

    const { apiKey, rateHeaders } = auth
    const body = await req.json()
    const input = typeof body.input === "string" ? body.input.trim() : ""
    const useGroq = Boolean(process.env.GROQ_API_KEY)
    const model =
      typeof body.model === "string" && body.model.trim() !== ""
        ? body.model.trim()
        : useGroq
          ? DEFAULT_GROQ_MODEL
          : DEFAULT_OPENAI_MODEL
    const systemPrompt =
      typeof body.systemPrompt === "string" && body.systemPrompt.trim() !== ""
        ? body.systemPrompt.trim()
        : "You are a helpful assistant."

    if (!input) {
      return publicApiJson({ error: "Missing input" }, 400, rateHeaders)
    }

    const customKeywords = await getEnabledUserKeywords(apiKey.userId)

    const inputScan = scanText(input, customKeywords, { source: "input" })
    if (inputScan.blocked) {
      const log = await recordBlock(apiKey.userId, input, "", inputScan)

      after(() =>
        dispatchBlockWebhooks(apiKey.userId, {
          event: "guardrail.blocked",
          timestamp: new Date().toISOString(),
          data: {
            endpoint: "agent",
            input,
            output: "",
            reason: inputScan.reason,
            violationType: inputScan.type,
            logId: log.id,
          },
        })
      )

      return publicApiJson(
        {
          blocked: true,
          safe: false,
          reason: inputScan.reason,
          violationType: inputScan.type,
        },
        200,
        rateHeaders
      )
    }

    const output = useGroq
      ? await callGroq(input, model, systemPrompt)
      : await callOpenAI(input, model, systemPrompt)

    const outputScan = scanText(output, customKeywords, { source: "output" })

    if (outputScan.blocked) {
      const log = await recordBlock(apiKey.userId, input, output, outputScan)

      after(() =>
        dispatchBlockWebhooks(apiKey.userId, {
          event: "guardrail.blocked",
          timestamp: new Date().toISOString(),
          data: {
            endpoint: "agent",
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
      { blocked: false, safe: true, output },
      200,
      rateHeaders
    )
  } catch (error) {
    console.error("Agent proxy error:", error)
    return publicApiJson(
      { error: error instanceof Error ? error.message : "Internal server error" },
      500
    )
  }
}
