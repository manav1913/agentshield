const authExample = `curl -X POST https://agentshield-one.vercel.app/api/intercept \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: as_live_xxxxxxxxxxxxx" \\
  -d '{
    "input": "Hello",
    "output": "Hi there!"
  }'`

const envExample = `# .env file
AGENTSHIELD_API_KEY=as_live_xxxxxxxxxxxxx`

const jsEnv = `// JavaScript/Node.js
const apiKey = process.env.AGENTSHIELD_API_KEY`

const pythonEnv = `# Python
import os
apiKey = os.environ["AGENTSHIELD_API_KEY"]`

const goEnv = `// Go
apiKey := os.Getenv("AGENTSHIELD_API_KEY")`

const AuthenticationPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Authentication</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        How to authenticate your requests to the AgentShield API.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">API Key</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          All requests to the AgentShield API require an API key. You can create API keys from the dashboard.
        </p>
        
        <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-6 dark:border-violet-900 dark:bg-violet-950/30">
          <h3 className="font-semibold text-violet-900 dark:text-violet-100">Create an API Key</h3>
          <p className="mt-2 text-sm text-violet-800 dark:text-violet-200">
            Navigate to the <a href="/api-keys" className="underline hover:text-violet-600">API Keys</a> page in your dashboard to create a new key. Each key is unique to your workspace.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Using the API Key</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Include your API key in the <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">x-api-key</code> header:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{authExample}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Environment Variables</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Store your API key in an environment variable for security:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{envExample}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Accessing in Code</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Examples of accessing the environment variable in different languages:
        </p>
        
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">JavaScript/Node.js</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
              <code>{jsEnv}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold">Python</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
              <code>{pythonEnv}</code>
            </pre>
          </div>

          <div>
            <h3 className="font-semibold">Go</h3>
            <pre className="custom-scrollbar mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
              <code>{goEnv}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <h3 className="font-semibold text-red-900 dark:text-red-100">Security Best Practices</h3>
        <ul className="mt-2 space-y-2 text-sm text-red-800 dark:text-red-200">
          <li>• Never commit API keys to version control</li>
          <li>• Use different keys for development and production</li>
          <li>• Rotate keys regularly</li>
          <li>• Revoke keys that are no longer needed</li>
        </ul>
      </section>
    </div>
  )
}

export default AuthenticationPage
