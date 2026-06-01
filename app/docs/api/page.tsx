const endpointInfo = `POST https://agentshield-one.vercel.app/api/intercept`

const headers = `{
  "Content-Type": "application/json",
  "x-api-key": "your_api_key_here"
}`

const requestBody = `{
  "input": "User's original message",
  "output": "AI agent's response"
}`

const successResponse = `{
  "blocked": false,
  "safe": true,
  "reason": null,
  "output": "The original AI response"
}`

const blockedResponse = `{
  "blocked": true,
  "safe": false,
  "reason": "Credential leak detected — password disclosure",
  "violationType": "credential-leak"
}`

const errorResponse = `{
  "error": "Invalid API key"
}`

const ApiPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">API Reference</h1>
      <p className="mt-4 text-lg text-gray-400">
        Complete reference for the AgentShield REST API.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Intercept Endpoint</h2>
        <p className="mt-2 text-gray-400">
          Scan AI output for safety violations before returning it to users.
        </p>
        
        <div className="mt-4 rounded-2xl border border-white/10 bg-black p-4">
          <code className="text-emerald-400">{endpointInfo}</code>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Headers</h2>
        <p className="mt-2 text-gray-400">
          Required headers for authentication and content type:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{headers}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Request Body</h2>
        <p className="mt-2 text-gray-400">
          JSON payload with the user input and AI output:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{requestBody}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Response Format</h2>
        <p className="mt-2 text-gray-400">
          The API returns a JSON object with the following fields:
        </p>
        
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold text-white">Success Response (Clean)</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
              <code>{successResponse}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-white">Blocked Response</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
              <code>{blockedResponse}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-white">Error Response</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
              <code>{errorResponse}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold text-white">Response Fields</h3>
        <ul className="mt-2 space-y-2 text-sm text-gray-300">
          <li><code className="bg-white/10 px-2 py-1 rounded">blocked</code>: Boolean indicating if the response was blocked</li>
          <li><code className="bg-white/10 px-2 py-1 rounded">safe</code>: Boolean indicating if it is safe to proceed</li>
          <li><code className="bg-white/10 px-2 py-1 rounded">reason</code>: String explaining why it was blocked (null if clean)</li>
          <li><code className="bg-white/10 px-2 py-1 rounded">output</code>: The original AI response (when clean)</li>
          <li><code className="bg-white/10 px-2 py-1 rounded">violationType</code>: Category such as <code className="bg-white/10 px-1">credential-leak</code>, <code className="bg-white/10 px-1">pii</code>, or <code className="bg-white/10 px-1">keyword</code></li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold text-white">Rate limits</h3>
        <p className="mt-2 text-sm text-gray-300">
          Default <strong>120 requests/minute</strong> per API key. Response headers:{" "}
          <code className="bg-white/10 px-1">X-RateLimit-Limit</code>,{" "}
          <code className="bg-white/10 px-1">X-RateLimit-Remaining</code>,{" "}
          <code className="bg-white/10 px-1">X-RateLimit-Reset</code>. HTTP <code className="bg-white/10 px-1">429</code> when exceeded.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold text-white">Health</h3>
        <p className="mt-2 text-sm text-gray-300">
          <code className="bg-white/10 px-1">GET /api/health</code> — no authentication required.
        </p>
      </section>
    </div>
  )
}

export default ApiPage
