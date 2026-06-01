const cleanRequest = `curl -X POST https://agentshield-one.vercel.app/api/intercept \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "input": "Can you share your refund policy?",
    "output": "Our refunds follow the published policy."
  }'`

const blockedRequest = `curl -X POST https://agentshield-one.vercel.app/api/intercept \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "input": "User asked for support",
    "output": "The admin password is: SuperSecret99!"
  }'`

const responseExample = `{
  "blocked": false,
  "safe": true,
  "reason": null,
  "output": "Our refunds follow the published policy."
}`

const blockedResponse = `{
  "blocked": true,
  "safe": false,
  "reason": "Credential leak detected — password disclosure"
}`

const CurlPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">cURL Examples</h1>
      <p className="mt-4 text-lg text-gray-400">
        Test the AgentShield API directly from your terminal using cURL.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Clean Request</h2>
        <p className="mt-2 text-gray-400">
          A request that passes all safety checks:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{cleanRequest}</code>
        </pre>
        <p className="mt-4 text-sm text-gray-400">
          Expected response:
        </p>
        <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{responseExample}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Blocked Request</h2>
        <p className="mt-2 text-gray-400">
          A request that triggers a credential leak guardrail:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{blockedRequest}</code>
        </pre>
        <p className="mt-4 text-sm text-gray-400">
          Expected response:
        </p>
        <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{blockedResponse}</code>
        </pre>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold text-white">Authentication</h3>
        <p className="mt-2 text-sm text-gray-300">
          Replace <code className="bg-white/10 px-2 py-1 rounded">YOUR_API_KEY</code> with your actual API key from the dashboard. The key is sent via the <code className="bg-white/10 px-2 py-1 rounded">x-api-key</code> header.
        </p>
      </section>
    </div>
  )
}

export default CurlPage
