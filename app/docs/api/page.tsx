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
  "reason": "Keyword match: password",
  "output": null
}`

const errorResponse = `{
  "error": "Invalid API key"
}`

const ApiPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">API Reference</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Complete reference for the AgentShield REST API.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Intercept Endpoint</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Scan AI output for safety violations before returning it to users.
        </p>
        
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-950 p-4">
          <code className="text-emerald-400">{endpointInfo}</code>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Headers</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Required headers for authentication and content type:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{headers}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Request Body</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          JSON payload with the user input and AI output:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{requestBody}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Response Format</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          The API returns a JSON object with the following fields:
        </p>
        
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">Success Response (Clean)</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
              <code>{successResponse}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold">Blocked Response</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
              <code>{blockedResponse}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold">Error Response</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
              <code>{errorResponse}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-violet-200 bg-violet-50 p-6 dark:border-violet-900 dark:bg-violet-950/30">
        <h3 className="font-semibold text-violet-900 dark:text-violet-100">Response Fields</h3>
        <ul className="mt-2 space-y-2 text-sm text-violet-800 dark:text-violet-200">
          <li><code className="bg-violet-100 dark:bg-violet-900 px-2 py-1 rounded">blocked</code>: Boolean indicating if the response was blocked</li>
          <li><code className="bg-violet-100 dark:bg-violet-900 px-2 py-1 rounded">safe</code>: Boolean indicating if it's safe to proceed</li>
          <li><code className="bg-violet-100 dark:bg-violet-900 px-2 py-1 rounded">reason</code>: String explaining why it was blocked (null if clean)</li>
          <li><code className="bg-violet-100 dark:bg-violet-900 px-2 py-1 rounded">output</code>: The original AI response (null if blocked)</li>
        </ul>
      </section>
    </div>
  )
}

export default ApiPage
