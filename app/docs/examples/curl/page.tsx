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
    "output": "The internal password is demo-secret."
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
  "reason": "Keyword match: password",
  "output": null
}`

const CurlPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">cURL Examples</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Test the AgentShield API directly from your terminal using cURL.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Clean Request</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          A request that passes all safety checks:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{cleanRequest}</code>
        </pre>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          Expected response:
        </p>
        <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{responseExample}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Blocked Request</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          A request that triggers a guardrail (requires a rule with "password" keyword):
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{blockedRequest}</code>
        </pre>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          Expected response:
        </p>
        <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{blockedResponse}</code>
        </pre>
      </section>

      <section className="mt-8 rounded-2xl border border-violet-200 bg-violet-50 p-6 dark:border-violet-900 dark:bg-violet-950/30">
        <h3 className="font-semibold text-violet-900 dark:text-violet-100">Authentication</h3>
        <p className="mt-2 text-sm text-violet-800 dark:text-violet-200">
          Replace <code className="bg-violet-100 dark:bg-violet-900 px-2 py-1 rounded">YOUR_API_KEY</code> with your actual API key from the dashboard. The key is sent via the <code className="bg-violet-100 dark:bg-violet-900 px-2 py-1 rounded">x-api-key</code> header.
        </p>
      </section>
    </div>
  )
}

export default CurlPage
