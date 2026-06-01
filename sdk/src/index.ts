const DEFAULT_BASE_URL = "https://agentshield-one.vercel.app"

export type AgentShieldClientOptions = {
  apiKey: string
  baseUrl?: string
}

export type InterceptOptions = {
  input: string
  output: string
}

export type AgentOptions = {
  input: string
  model?: string
  systemPrompt?: string
}

export type ShieldResult = {
  blocked: boolean
  safe: boolean
  reason?: string | null
  violationType?: string | null
  output?: string
}

export type AgentResult = ShieldResult & {
  output?: string
}

type ApiErrorBody = {
  error?: string
  limit?: number
  resetAt?: string
}

export class AgentShieldError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message)
    this.name = "AgentShieldError"
  }
}

export class AgentShieldClient {
  private apiKey: string
  private baseUrl: string

  constructor(options: AgentShieldClientOptions) {
    if (!options.apiKey?.trim()) {
      throw new AgentShieldError("API key is required", "MISSING_API_KEY")
    }
    this.apiKey = options.apiKey.trim()
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "")
  }

  private async request<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    })

    const result = (await response.json().catch(() => ({}))) as T & ApiErrorBody

    if (response.status === 401) {
      throw new AgentShieldError("Invalid API key", "INVALID_API_KEY", 401)
    }

    if (response.status === 429) {
      throw new AgentShieldError(
        result.error ?? "Rate limit exceeded",
        "RATE_LIMIT",
        429
      )
    }

    if (!response.ok) {
      throw new AgentShieldError(
        result.error ?? `API error: ${response.status}`,
        "API_ERROR",
        response.status
      )
    }

    return result
  }

  /** Scan an existing user input + model output pair (recommended integration). */
  async intercept(options: InterceptOptions): Promise<ShieldResult> {
    if (!options.input?.trim() || !options.output?.trim()) {
      throw new AgentShieldError("Input and output are required", "MISSING_DATA")
    }

    const result = await this.request<ShieldResult>("/api/intercept", {
      input: options.input,
      output: options.output,
    })

    return {
      blocked: Boolean(result.blocked),
      safe: result.safe !== false,
      reason: result.reason,
      violationType: result.violationType,
      output: result.output ?? options.output,
    }
  }

  /** Run a guarded completion through the AgentShield proxy (requires server LLM keys). */
  async agent(options: AgentOptions): Promise<AgentResult> {
    if (!options.input?.trim()) {
      throw new AgentShieldError("Input is required", "MISSING_DATA")
    }

    const result = await this.request<AgentResult>("/api/agent", {
      input: options.input,
      model: options.model,
      systemPrompt: options.systemPrompt,
    })

    return {
      blocked: Boolean(result.blocked),
      safe: result.safe !== false,
      reason: result.reason,
      violationType: result.violationType,
      output: result.output,
    }
  }

  /** Health check — no API key required when using default public base URL. */
  async health(): Promise<{ status: string }> {
    const response = await fetch(`${this.baseUrl}/api/health`)
    if (!response.ok) {
      throw new AgentShieldError("Health check failed", "HEALTH_ERROR", response.status)
    }
    const data = (await response.json()) as { status: string }
    return data
  }
}

export function createClient(options: AgentShieldClientOptions): AgentShieldClient {
  return new AgentShieldClient(options)
}

/** @deprecated Use `createClient().intercept()` instead */
export type ShieldOptions = InterceptOptions & { apiKey: string; apiUrl?: string }

/** @deprecated Use `createClient().intercept()` instead */
export async function shield(options: ShieldOptions): Promise<ShieldResult> {
  const client = createClient({
    apiKey: options.apiKey,
    baseUrl: options.apiUrl?.replace(/\/api\/intercept$/, ""),
  })
  return client.intercept({ input: options.input, output: options.output })
}

export default shield
