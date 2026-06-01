"use client"

import { useEffect, useState } from "react"
import { Check, Copy, Plus, Trash2, Webhook } from "lucide-react"
import { Button } from "@/components/ui/button"

type WebhookRecord = {
  id: string
  url: string
  enabled: boolean
  createdAt: string
}

const WebhooksPage = () => {
  const [webhooks, setWebhooks] = useState<WebhookRecord[]>([])
  const [url, setUrl] = useState("")
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWebhooks = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/webhooks")
      if (!res.ok) throw new Error("Unable to load webhooks")
      const json = await res.json()
      setWebhooks(json.webhooks ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fetch error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWebhooks()
  }, [])

  const createWebhook = async () => {
    if (!url.trim()) {
      setError("Enter an HTTPS endpoint URL.")
      return
    }

    setLoading(true)
    setError(null)
    setCreatedSecret(null)

    try {
      const res = await fetch("/api/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Unable to create webhook")

      setWebhooks((current) => [json.webhook, ...current])
      setCreatedSecret(json.secret)
      setUrl("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed")
    } finally {
      setLoading(false)
    }
  }

  const toggleWebhook = async (id: string, enabled: boolean) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/webhooks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, enabled }),
      })

      if (!res.ok) throw new Error("Unable to update webhook")

      const json = await res.json()
      setWebhooks((current) =>
        current.map((hook) => (hook.id === id ? json.webhook : hook))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setLoading(false)
    }
  }

  const deleteWebhook = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/webhooks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) throw new Error("Unable to delete webhook")

      setWebhooks((current) => current.filter((hook) => hook.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setLoading(false)
    }
  }

  const copySecret = async () => {
    if (!createdSecret) return
    await navigator.clipboard.writeText(createdSecret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
          <Webhook size={14} />
          Webhooks
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
          Block notifications
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
          Receive a signed POST request when AgentShield blocks traffic. Use this
          to alert Slack, PagerDuty, or your own review queue.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Add endpoint</h2>
        <p className="mt-1 text-sm text-gray-400">
          Must be a public HTTPS (or local HTTP) URL that accepts POST JSON.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-app.com/webhooks/agentshield"
            className="h-11 flex-1 rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none focus:border-white/30"
          />
          <Button
            onClick={createWebhook}
            disabled={loading}
            className="h-11 gap-2 bg-white text-black hover:bg-gray-200"
          >
            <Plus size={16} />
            Add webhook
          </Button>
        </div>

        {createdSecret && (
          <div className="mt-4 rounded-2xl border border-amber-900/50 bg-amber-950/20 p-4">
            <p className="text-sm font-semibold text-amber-200">Signing secret (copy now)</p>
            <p className="mt-1 text-xs text-gray-400">
              Verify header <code className="text-amber-100">X-AgentShield-Signature</code>{" "}
              (HMAC-SHA256 of raw body).
            </p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 overflow-x-auto rounded-lg bg-black px-3 py-2 text-xs text-gray-200">
                {createdSecret}
              </code>
              <button
                type="button"
                onClick={copySecret}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:bg-white/10"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Your endpoints</h2>

        {loading && webhooks.length === 0 ? (
          <p className="text-sm text-gray-400">Loading…</p>
        ) : webhooks.length === 0 ? (
          <p className="text-sm text-gray-400">No webhooks yet.</p>
        ) : (
          webhooks.map((hook) => (
            <div
              key={hook.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{hook.url}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Added {new Date(hook.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleWebhook(hook.id, !hook.enabled)}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                    hook.enabled
                      ? "bg-emerald-950/50 text-emerald-300 border border-emerald-900"
                      : "bg-white/5 text-gray-400 border border-white/10"
                  }`}
                >
                  {hook.enabled ? "Enabled" : "Disabled"}
                </button>
                <button
                  type="button"
                  onClick={() => deleteWebhook(hook.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-900/50 text-red-400 hover:bg-red-950/30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default WebhooksPage
