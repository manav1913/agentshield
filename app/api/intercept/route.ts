import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PII patterns
const PII_PATTERNS = [
  { type: "email", regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
  { type: "phone", regex: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g },
  { type: "credit-card", regex: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g },
  { type: "ssn", regex: /\b\d{3}-\d{2}-\d{4}\b/g },
]

// Default keyword blocklist
const BLOCKED_KEYWORDS = [
  "schema", "database", "password", "secret", "api_key",
  "internal", "confidential", "SELECT *", "DROP TABLE"
]

// Hallucination patterns
const HALLUCINATION_PATTERNS = [
  /\d+% off/gi,
  /free for (life|ever|always)/gi,
  /guaranteed (refund|money back)/gi,
  /I can give you/gi,
]

function scanText(text: string, keywords: string[]) {
  // Check PII
  for (const pattern of PII_PATTERNS) {
    if (pattern.regex.test(text)) {
      return { blocked: true, type: "pii", reason: `PII detected — ${pattern.type}` }
    }
  }

  // Check keywords
  for (const keyword of keywords) {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      return { blocked: true, type: "keyword", reason: `Blocked keyword — ${keyword}` }
    }
  }

  // Check hallucinations
  for (const pattern of HALLUCINATION_PATTERNS) {
    if (pattern.test(text)) {
      return { blocked: true, type: "hallucination", reason: "Potential hallucination detected" }
    }
  }

  return { blocked: false, type: null, reason: null }
}

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

    // Get user rules
    const rules = await prisma.rule.findMany({
      where: { userId: key.userId, enabled: true }
    })

    const customKeywords = rules
      .filter(r => r.type === "keyword" && r.value)
      .map(r => r.value!)

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