import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import { prisma } from "@/lib/prisma"
import { getEnabledUserKeywords, scanText, BLOCKED_KEYWORDS } from "@/lib/interceptor"

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

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key")
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401 })
    }

    const key = await prisma.apiKey.findUnique({ where: { key: apiKey } })
    if (!key) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    }

    const body = await req.json()
    const input = typeof body.input === "string" ? body.input.trim() : ""
    const useGroq = Boolean(process.env.GROQ_API_KEY)
    const model = typeof body.model === "string" && body.model.trim() !== ""
      ? body.model.trim()
      : useGroq
      ? DEFAULT_GROQ_MODEL
      : DEFAULT_OPENAI_MODEL
    const systemPrompt = typeof body.systemPrompt === "string" && body.systemPrompt.trim() !== ""
      ? body.systemPrompt.trim()
      : "You are a helpful assistant."

    if (!input) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 })
    }

    const customKeywords = await getEnabledUserKeywords(key.userId)
    const allKeywords = [...BLOCKED_KEYWORDS, ...customKeywords]

    const inputScan = scanText(input, allKeywords)
    if (inputScan.blocked) {
      await prisma.log.create({
        data: {
          userId: key.userId,
          input,
          output: "",
          status: "blocked",
          violationType: inputScan.type,
          ruleTriggered: inputScan.reason,
        },
      })

      return NextResponse.json({ blocked: true, safe: false, reason: inputScan.reason })
    }

    const output = useGroq
      ? await callGroq(input, model, systemPrompt)
      : await callOpenAI(input, model, systemPrompt)
    const outputScan = scanText(output, allKeywords)

    if (outputScan.blocked) {
      await prisma.log.create({
        data: {
          userId: key.userId,
          input,
          output,
          status: "blocked",
          violationType: outputScan.type,
          ruleTriggered: outputScan.reason,
        },
      })

      return NextResponse.json({ blocked: true, safe: false, reason: outputScan.reason })
    }

    await prisma.log.create({
      data: {
        userId: key.userId,
        input,
        output,
        status: "clean",
      },
    })

    return NextResponse.json({ blocked: false, safe: true, output })
  } catch (error) {
    console.error("Agent proxy error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}
