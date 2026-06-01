const jsInstall = `npm install agentshield-ai-sdk`

const jsUsage = `import { createClient } from "agentshield-ai-sdk"

const agentshield = createClient({
  apiKey: process.env.AGENTSHIELD_API_KEY!,
  // baseUrl: "http://localhost:3000", // optional for local dev
})

const result = await agentshield.intercept({
  input: userMessage,
  output: aiResponse,
})

if (result.blocked) {
  console.log("Blocked:", result.reason, result.violationType)
  return "I cannot provide that information."
}

return result.output ?? aiResponse`

const jsMiddleware = `import { createClient } from "agentshield-ai-sdk"

const agentshield = createClient({
  apiKey: process.env.AGENTSHIELD_API_KEY!,
})

app.post("/chat", async (req, res) => {
  const { message } = req.body
  const aiResponse = await llm.generate(message)

  try {
    const result = await agentshield.intercept({
      input: message,
      output: aiResponse,
    })

    if (result.blocked) {
      return res.status(200).json({
        message: "Response blocked for safety reasons.",
        reason: result.reason,
      })
    }

    return res.json({ message: result.output ?? aiResponse })
  } catch (error) {
    if (error.code === "RATE_LIMIT") {
      return res.status(429).json({ error: "Too many requests" })
    }
    throw error
  }
})`

const JavaScriptPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">JavaScript / TypeScript SDK</h1>
      <p className="mt-4 text-lg text-gray-400">
        Official SDK for Node.js, browsers, and edge runtimes. Use{" "}
        <code className="rounded bg-white/10 px-1">intercept()</code> with your existing LLM.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Installation</h2>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{jsInstall}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Recommended: intercept</h2>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{jsUsage}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Express example</h2>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{jsMiddleware}</code>
        </pre>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold text-white">Legacy API</h3>
        <p className="mt-2 text-sm text-gray-300">
          <code className="rounded bg-white/10 px-1">shield()</code> is still exported but deprecated. Prefer{" "}
          <code className="rounded bg-white/10 px-1">createClient()</code>.
        </p>
      </section>
    </div>
  )
}

export default JavaScriptPage
