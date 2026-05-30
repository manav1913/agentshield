const pythonExample = `import requests
import os

# Make a request to AgentShield API
response = requests.post(
    "https://agentshield-one.vercel.app/api/intercept",
    headers={
        "Content-Type": "application/json",
        "x-api-key": os.environ["AGENTSHIELD_API_KEY"]
    },
    json={
        "input": "Can you share your refund policy?",
        "output": "Our refunds follow the published policy."
    }
)

result = response.json()

if result["blocked"]:
    print(f"Blocked: {result['reason']}")
    # Handle violation
else:
    print("Safe to proceed")
    print(f"Output: {result['output']}")`

const pythonFastAPI = `from fastapi import FastAPI, HTTPException
import requests
import os

app = FastAPI()

@app.post("/chat")
async def chat(message: str):
    # Get AI response from your LLM
    ai_response = await llm.generate(message)
    
    # Scan with AgentShield API
    response = requests.post(
        "https://agentshield-one.vercel.app/api/intercept",
        headers={
            "Content-Type": "application/json",
            "x-api-key": os.environ["AGENTSHIELD_API_KEY"]
        },
        json={
            "input": message,
            "output": ai_response
        }
    )
    
    result = response.json()
    
    if result.get("blocked"):
        return {
            "message": "Response blocked for safety reasons.",
            "reason": result.get("reason")
        }
    
    return {"message": ai_response}`

const PythonPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">Python (Direct API)</h1>
      <p className="mt-4 text-lg text-gray-400">
        Use AgentShield with Python by making direct HTTP requests to our REST API.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">Basic Usage</h2>
        <p className="mt-2 text-gray-400">
          Use the <code className="bg-white/10 px-2 py-1 rounded">requests</code> library to call the API:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{pythonExample}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white">FastAPI Integration</h2>
        <p className="mt-2 text-gray-400">
          Integrate with FastAPI for automatic scanning:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm text-gray-200">
          <code>{pythonFastAPI}</code>
        </pre>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold text-white">No SDK Required</h3>
        <p className="mt-2 text-sm text-gray-300">
          The AgentShield API is a standard REST endpoint. You can use it from any language that can make HTTP requests. No SDK is required.
        </p>
      </section>
    </div>
  )
}

export default PythonPage
