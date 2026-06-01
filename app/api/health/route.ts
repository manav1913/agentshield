import { publicApiJson } from "@/lib/public-api"

export async function GET() {
  return publicApiJson({
    status: "ok",
    service: "agentshield",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  })
}
