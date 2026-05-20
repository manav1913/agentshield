"use client"

import { useEffect, useState } from "react"
import { Copy, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type ApiKeyRecord = {
  id: string
  name: string
  createdAt: string
}

type NewKeyResponse = {
  key: string
  id: string
  name: string
  createdAt: string
}

const ApiKeysPage = () => {
  const [keys, setKeys] = useState<ApiKeyRecord[]>([])
  const [name, setName] = useState("")
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchKeys = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/api-keys")
      if (!res.ok) {
        throw new Error("Unable to load API keys")
      }

      const json = await res.json()
      setKeys(json.keys ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fetch error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKeys()
  }, [])

  const createKey = async () => {
    if (!name.trim()) {
      setError("Give this key a name before generating it.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/api-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body?.error || "Unable to create API key")
      }

      const json = (await res.json()) as { key: NewKeyResponse }
      const newKey = json.key

      setCreatedKey(newKey.key)
      setKeys((current) => [
        {
          id: newKey.id,
          name: newKey.name,
          createdAt: newKey.createdAt,
        },
        ...current,
      ])
      setName("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create key")
    } finally {
      setLoading(false)
    }
  }

  const revokeKey = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/api-keys", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body?.error || "Unable to revoke API key")
      }

      setKeys((current) => current.filter((key) => key.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to revoke key")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value)
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-violet-600">API Keys</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Manage your integration keys
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Generate API keys for clients and agents, then revoke any key that is no longer used.
        </p>
      </div>

      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="space-y-2">
            <label htmlFor="api-key-name" className="text-sm font-medium text-slate-700 dark:text-slate-100">
              API key name
            </label>
            <input
              id="api-key-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Agent integration"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400 dark:focus:ring-violet-900"
            />
          </div>

          <Button onClick={createKey} disabled={loading} className="w-full sm:w-auto">
            <Plus size={16} />
            Generate key
          </Button>
        </div>

        {createdKey ? (
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-slate-900 dark:border-violet-900 dark:bg-violet-950 dark:text-white">
            <p className="font-semibold">API key generated</p>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Copy the key now — it will only be shown once.
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-white px-4 py-3 text-xs font-medium text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100">
                {createdKey}
              </div>
              <Button onClick={() => copyToClipboard(createdKey)} variant="outline">
                <Copy size={16} /> Copy
              </Button>
            </div>
          </div>
        ) : null}

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
            {error}
          </p>
        ) : null}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Your API keys</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Revoke any key that you no longer want to allow for interception requests.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            {keys.length} key{keys.length === 1 ? "" : "s"}
          </span>
        </div>

        {loading && keys.length === 0 ? (
          <p className="text-sm text-slate-500">Loading keys…</p>
        ) : keys.length === 0 ? (
          <p className="text-sm text-slate-500">No API keys created yet.</p>
        ) : (
          <div className="space-y-4">
            {keys.map((key) => (
              <div key={key.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white">{key.name}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Created {new Date(key.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => revokeKey(key.id)} disabled={loading}>
                    <Trash2 size={14} /> Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApiKeysPage
