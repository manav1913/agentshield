import { ImageResponse } from "@vercel/og"

export const runtime = "nodejs"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              backgroundColor: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "#0f172a",
            }}
          >
            AgentShield
          </div>
        </div>

        <div
          style={{
            fontSize: "28px",
            color: "#64748b",
            textAlign: "center",
            maxWidth: "900px",
            marginBottom: "40px",
          }}
        >
          AI agent protection with real-time guardrails, logs, and policy enforcement
        </div>

        <div
          style={{
            display: "flex",
            gap: "30px",
            fontSize: "20px",
            color: "#7c3aed",
            fontWeight: "500",
          }}
        >
          <div>Real-time Guardrails</div>
          <div>•</div>
          <div>Policy Enforcement</div>
          <div>•</div>
          <div>Audit Logs</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
