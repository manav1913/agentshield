import { prisma } from "@/lib/prisma"

export type ScanResult = {
  blocked: boolean
  type: string | null
  reason: string | null
}

export const PII_PATTERNS = [
  { type: "email", regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ },
  { type: "phone", regex: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/ },
  { type: "credit-card", regex: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/ },
  { type: "ssn", regex: /\b\d{3}-\d{2}-\d{4}\b/ },
  
]

export const BLOCKED_KEYWORDS = [
  "schema",
  "database",
  "password",
  "secret",
  "api_key",
  "internal",
  "confidential",
  "SELECT *",
  "DROP TABLE",
]

export const HALLUCINATION_PATTERNS = [
  /\d+% off/gi,
  /free for (life|ever|always)/gi,
  /guaranteed (refund|money back)/gi,
  /I can give you/gi,
]

export function scanText(text: string, keywords: string[]): ScanResult {
  for (const pattern of PII_PATTERNS) {
    const regex = new RegExp(pattern.regex)
    if (regex.test(text)) {
      return {
        blocked: true,
        type: "pii",
        reason: `PII detected — ${pattern.type}`,
      }
    }
  }

  for (const keyword of keywords) {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      return {
        blocked: true,
        type: "keyword",
        reason: `Blocked keyword — ${keyword}`,
      }
    }
  }

  for (const pattern of HALLUCINATION_PATTERNS) {
    const regex = new RegExp(pattern)
    if (regex.test(text)) {
      return {
        blocked: true,
        type: "hallucination",
        reason: "Potential hallucination detected",
      }
    }
  }

  return {
    blocked: false,
    type: null,
    reason: null,
  }
}

export async function getEnabledUserKeywords(userId: string) {
  const rules = await prisma.rule.findMany({
    where: { userId, enabled: true, type: "keyword" },
  })

  return rules.map((rule) => rule.value ?? "").filter(Boolean)
}

