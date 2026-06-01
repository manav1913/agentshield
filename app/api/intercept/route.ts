import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { scanText, getEnabledUserKeywords } from "@/lib/interceptor"

export async function POST(req: NextRequest) {
  // Add CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
  }

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders })
  }

  try {
    const apiKey = req.headers.get("x-api-key")
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 401, headers: corsHeaders })
    }

    // Validate API key
    const key = await prisma.apiKey.findUnique({ where: { key: apiKey } })
    if (!key) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401, headers: corsHeaders })
    }

    const { input, output } = await req.json()
    if (!input || !output) {
      return NextResponse.json({ error: "Missing input or output" }, { status: 400, headers: corsHeaders })
    }

    const customKeywords = await getEnabledUserKeywords(key.userId)

    // Only scan output (not input) to avoid false positives on user prompts
    const outputScan = scanText(output, customKeywords, { source: "output" })
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
      }, { headers: corsHeaders })
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
    }, { headers: corsHeaders })

  } catch (error) {
    console.error("Interceptor error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}