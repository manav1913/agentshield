import { prisma } from "@/lib/prisma"

export {
  type ScanResult,
  type ScanOptions,
  type ScanSource,
  PII_PATTERNS,
  BLOCKED_KEYWORDS,
  BLOCKED_PHRASES,
  CREDENTIAL_LEAK_PATTERNS,
  EDUCATIONAL_PASSWORD_PATTERNS,
  HALLUCINATION_PATTERNS,
  isEducationalPasswordContext,
  matchesKeyword,
  scanText,
} from "@/lib/guardrails"

export async function getEnabledUserKeywords(userId: string) {
  const rules = await prisma.rule.findMany({
    where: { userId, enabled: true, type: "keyword" },
  })

  return rules.map((rule) => rule.value ?? "").filter(Boolean)
}
