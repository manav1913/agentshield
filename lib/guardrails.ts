export type ScanSource = "input" | "output"

export type ScanOptions = {
  source?: ScanSource
}

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

/** High-signal SQL patterns (substring / phrase match). */
export const BLOCKED_KEYWORDS = ["SELECT * FROM", "DROP TABLE", "DELETE FROM"]

/** Phrases that suggest internal data exposure (output scanning). */
export const BLOCKED_PHRASES = [
  "internal only",
  "confidential information",
  "do not share this",
]

/**
 * Credential leak patterns — kept up to date for password/API key style disclosures.
 * Does not match general security advice (see EDUCATIONAL_PASSWORD_PATTERNS).
 */
export const CREDENTIAL_LEAK_PATTERNS: Array<{
  type: string
  label: string
  regex: RegExp
}> = [
  {
    type: "credential-leak",
    label: "password assignment",
    regex: /\b(password|passwd|pwd)\s*[:=]\s*['"]?[A-Za-z0-9!@#$%^&*._-]{6,}['"]?/i,
  },
  {
    type: "credential-leak",
    label: "password disclosure",
    regex:
      /\b(your|the|admin|root|default|system|database)\s+password\s+is\s+['"]?[A-Za-z0-9!@#$%^&*._-]{6,}['"]?/i,
  },
  {
    type: "credential-leak",
    label: "quoted password value",
    regex: /\bpassword\s+is\s+['"][^'"]{4,}['"]/i,
  },
  {
    type: "credential-leak",
    label: "api key leak",
    regex: /\b(api[_-]?key|apikey)\s*[:=]\s*['"]?[A-Za-z0-9_-]{8,}/i,
  },
  {
    type: "credential-leak",
    label: "secret or token leak",
    regex: /\b(client[_-]?secret|access[_-]?token)\s*[:=]\s*['"]?[A-Za-z0-9_.-]{8,}/i,
  },
  { type: "credential-leak", label: "OpenAI API key", regex: /\bsk-[a-zA-Z0-9]{20,}\b/ },
  { type: "credential-leak", label: "Groq API key", regex: /\bgsk_[a-zA-Z0-9]+\b/ },
  {
    type: "credential-leak",
    label: "bearer token",
    regex: /\bBearer\s+[A-Za-z0-9._-]{10,}\b/i,
  },
  {
    type: "credential-leak",
    label: "database connection string",
    regex: /\bpostgresql:\/\/[^\s'"]+:[^\s'"]+@/i,
  },
]

export const SQL_INJECTION_PATTERNS = [
  { label: "SELECT * FROM", regex: /\bSELECT\s+\*\s+FROM\b/i },
  { label: "DROP TABLE", regex: /\bDROP\s+TABLE\b/i },
]

export const HALLUCINATION_PATTERNS = [
  /\d+% off/gi,
  /free for (life|ever|always)/gi,
  /guaranteed (refund|money back)/gi,
  /I can give you/gi,
]

/** Benign password/security education — allowed even when the word "password" appears. */
export const EDUCATIONAL_PASSWORD_PATTERNS = [
  /\b(strong|secure|good|safe)\s+password(s)?\b/i,
  /\bpassword\s+(combination|policy|manager|requirements|best\s+practices|tips|security|hygiene)\b/i,
  /\bhow\s+to\s+(create|choose|pick|make|build|set)\s+(a\s+)?(strong|secure)?\s*password/i,
  /\bwhat\s+(are|is)\s+(the\s+)?(strong|secure)\s+password/i,
  /\bpassword\s+should\s+(be|have|include|contain)\b/i,
  /\buse\s+(a\s+)?(long|unique|complex)\s+password/i,
  /\btwo[- ]factor\b/i,
  /\b2fa\b/i,
  /\bmulti[- ]factor\b/i,
]

export function isEducationalPasswordContext(text: string): boolean {
  return EDUCATIONAL_PASSWORD_PATTERNS.some((pattern) => pattern.test(text))
}

export function matchesKeyword(text: string, keyword: string): boolean {
  const trimmed = keyword.trim()
  if (!trimmed) return false

  if (trimmed.includes(" ")) {
    return text.toLowerCase().includes(trimmed.toLowerCase())
  }

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`\\b${escaped}\\b`, "i").test(text)
}

export function scanText(
  text: string,
  customKeywords: string[] = [],
  options: ScanOptions = {}
): ScanResult {
  const source = options.source ?? "output"
  const normalized = text.trim()

  if (!normalized) {
    return { blocked: false, type: null, reason: null }
  }

  const educationalPassword = isEducationalPasswordContext(normalized)
  const scanPii = source === "output"

  if (scanPii) {
    for (const pattern of PII_PATTERNS) {
      if (new RegExp(pattern.regex).test(normalized)) {
        return {
          blocked: true,
          type: "pii",
          reason: `PII detected — ${pattern.type}`,
        }
      }
    }
  }

  for (const pattern of CREDENTIAL_LEAK_PATTERNS) {
    if (!pattern.regex.test(normalized)) continue

    if (educationalPassword && /password/i.test(pattern.label)) {
      continue
    }

    return {
      blocked: true,
      type: pattern.type,
      reason: `Credential leak detected — ${pattern.label}`,
    }
  }

  for (const pattern of SQL_INJECTION_PATTERNS) {
    if (pattern.regex.test(normalized)) {
      return {
        blocked: true,
        type: "sql-injection",
        reason: `SQL injection pattern — ${pattern.label}`,
      }
    }
  }

  if (source === "output") {
    for (const phrase of BLOCKED_PHRASES) {
      if (matchesKeyword(normalized, phrase)) {
        return {
          blocked: true,
          type: "keyword",
          reason: `Blocked phrase — ${phrase}`,
        }
      }
    }
  }

  for (const keyword of BLOCKED_KEYWORDS) {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      return {
        blocked: true,
        type: "keyword",
        reason: `Blocked keyword — ${keyword}`,
      }
    }
  }

  for (const keyword of customKeywords) {
    if (!keyword) continue
    if (educationalPassword && /password/i.test(keyword)) continue

    if (matchesKeyword(normalized, keyword)) {
      return {
        blocked: true,
        type: "keyword",
        reason: `Blocked keyword — ${keyword}`,
      }
    }
  }

  if (source === "output") {
    for (const pattern of HALLUCINATION_PATTERNS) {
      if (new RegExp(pattern).test(normalized)) {
        return {
          blocked: true,
          type: "hallucination",
          reason: "Potential hallucination detected",
        }
      }
    }
  }

  return { blocked: false, type: null, reason: null }
}
