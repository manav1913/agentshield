const jsInstall = `npm install agentshield-ai-sdk`

const jsUsage = `import { shield } from "agentshield-ai-sdk"

const result = await shield({
  apiKey: process.env.AGENTSHIELD_API_KEY,
  input: userMessage,
  output: aiResponse
})

if (result.blocked) {
  console.log("Blocked:", result.reason)
  // Handle violation - return safe message or block
  return "I cannot provide that information."
} else {
  console.log("Safe to proceed")
  return aiResponse
}`

const jsMiddleware = `import { shield } from "agentshield-ai-sdk"

// Express middleware example
app.post("/chat", async (req, res) => {
  const { message } = req.body
  
  // Get AI response
  const aiResponse = await llm.generate(message)
  
  // Scan with AgentShield
  const result = await shield({
    apiKey: process.env.AGENTSHIELD_API_KEY,
    input: message,
    output: aiResponse
  })
  
  if (result.blocked) {
    return res.json({
      message: "Response blocked for safety reasons.",
      reason: result.reason
    })
  }
  
  return res.json({ message: aiResponse })
})`

const JavaScriptPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">JavaScript / TypeScript SDK</h1>
      <p className="mt-4 text-lg text-gray-400">
        Official SDK for Node.js, browser, and edge environments with full TypeScript support.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Installation</h2>
        <p className="mt-2 text-gray-400">
          Install the package using npm or yarn:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{jsInstall}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Basic Usage</h2>
        <p className="mt-2 text-gray-400">
          Scan AI output before returning it to users:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{jsUsage}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Express Middleware</h2>
        <p className="mt-2 text-gray-400">
          Integrate with Express middleware for automatic scanning:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{jsMiddleware}</code>
        </pre>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold text-white">Next.js Integration</h3>
        <p className="mt-2 text-sm text-gray-300">
          Works seamlessly with Next.js API routes, Server Actions, and edge functions. The SDK is tree-shakeable and has zero dependencies.
        </p>
      </section>
    </div>
  )
}

export default JavaScriptPage
