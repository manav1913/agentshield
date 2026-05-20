import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { scanText, getEnabledUserKeywords, BLOCKED_KEYWORDS } from "@/lib/interceptor"

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key")
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401 })
    }

    // Validate API key
    const key = await prisma.apiKey.findUnique({ where: { key: apiKey } })
    if (!key) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    }

    const { input, output } = await req.json()
    if (!input || !output) {
      return NextResponse.json({ error: "Missing input or output" }, { status: 400 })
    }

    const customKeywords = await getEnabledUserKeywords(key.userId)
    const allKeywords = [...BLOCKED_KEYWORDS, ...customKeywords]

    // Scan input
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
        }
      })
      return NextResponse.json({
        blocked: true,
        reason: inputScan.reason,
        safe: false
      })
    }

    // Scan output
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
        }
      })
      return NextResponse.json({
        blocked: true,
        reason: outputScan.reason,
        safe: false
      })
    }

    // All clean
    await prisma.log.create({
      data: {
        userId: key.userId,
        input,
        output,
        status: "clean",
      }
    })

    return NextResponse.json({
      blocked: false,
      safe: true,
      output
    })

  } catch (error) {
    console.error("Interceptor error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}