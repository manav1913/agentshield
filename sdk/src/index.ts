export interface ShieldOptions {
  apiKey: string
  apiUrl?: string
  input: string
  output: string
}

export interface ShieldResult {
  blocked: boolean
  safe: boolean
  reason?: string
  violationType?: string
  output?: string
}

interface ApiResponse {
  blocked?: boolean
  safe?: boolean
  reason?: string
  violationType?: string
  output?: string
  error?: string
}

export class AgentShieldError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'AgentShieldError'
  }
}

/**
 * Scan input and output through AgentShield
 * @param options - Shield options including API key, input, and output
 * @returns Scan result with blocked status and reason
 */
export async function shield(options: ShieldOptions): Promise<ShieldResult> {
  const { apiKey, apiUrl = 'https://agentshield-one.vercel.app/api/intercept', input, output } = options

  if (!apiKey) {
    throw new AgentShieldError('API key is required', 'MISSING_API_KEY')
  }

  if (!input || !output) {
    throw new AgentShieldError('Input and output are required', 'MISSING_DATA')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ input, output }),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new AgentShieldError('Invalid API key', 'INVALID_API_KEY')
      }
      if (response.status === 400) {
        throw new AgentShieldError('Invalid request data', 'INVALID_REQUEST')
      }
      throw new AgentShieldError(`API error: ${response.status} ${response.statusText}`, 'API_ERROR')
    }

    const result = await response.json() as ApiResponse

    return {
      blocked: result.blocked || false,
      safe: result.safe !== false,
      reason: result.reason,
      violationType: result.violationType,
      output: result.output || output,
    }
  } catch (error) {
    if (error instanceof AgentShieldError) {
      throw error
    }
    throw new AgentShieldError(`Network error: ${error instanceof Error ? error.message : 'Unknown'}`, 'NETWORK_ERROR')
  }
}

export default shield
