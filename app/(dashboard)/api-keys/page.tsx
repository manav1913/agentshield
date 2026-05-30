"use client"

import { useEffect, useState } from "react"
import { Check, Copy, KeyRound, Plus, Trash2 } from "lucide-react"
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
  const [copied, setCopied] = useState(false)
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
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
            <KeyRound size={14} />
            API Keys
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
            Manage integration keys
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Generate keys for SDK clients and AI agents. Revoke keys when an
            integration is rotated, compromised, or no longer active.
          </p>
        </div>

        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300 shadow-sm">
          {keys.length} active key{keys.length === 1 ? "" : "s"}
        </span>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-2">
              <label
                htmlFor="api-key-name"
                className="text-sm font-semibold text-white"
              >
                New key name
              </label>

              <input
                id="api-key-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Production agent"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/10"
              />
            </div>

            <Button
              onClick={createKey}
              disabled={loading}
              className="h-12 cursor-pointer rounded-2xl bg-white px-5 font-semibold shadow-lg shadow-white/20 hover:bg-gray-200 text-black"
            >
              <Plus size={16} />
              Generate key
            </Button>
          </div>

          {createdKey ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">
                    API key generated
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Copy it now. You will not be able to see this key again.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <code className="min-w-0 flex-1 overflow-x-auto rounded-2xl border border-white/10 bg-black px-4 py-3 text-xs font-medium text-white shadow-sm">
                  {createdKey}
                </code>

                <Button
                  onClick={() => copyToClipboard(createdKey)}
                  variant="outline"
                  className="h-11 rounded-2xl"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="mt-6 rounded-2xl border border-red-900 bg-red-950/50 px-4 py-3 text-sm font-medium text-red-300">
              {error}
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-white/10 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Your API keys
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Active keys that can authenticate AgentShield requests.
            </p>
          </div>
        </div>

        <div className="p-3">
          {loading && keys.length === 0 ? (
            <div className="rounded-2xl bg-white/5 px-4 py-10 text-center text-sm text-gray-400">
              Loading keys...
            </div>
          ) : keys.length === 0 ? (
            <div className="rounded-2xl bg-white/5 px-4 py-10 text-center">
              <p className="font-medium text-white">
                No API keys yet
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Generate your first key to connect an agent or SDK client.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {keys.map((key) => (
                <div
                  key={key.id}
                  className="flex flex-col gap-4 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">
                      {key.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Created {new Date(key.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => revokeKey(key.id)}
                    disabled={loading}
                    className="w-full rounded-xl border-red-900 text-red-300 hover:bg-red-950 sm:w-auto"
                  >
                    <Trash2 size={14} />
                    Revoke
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ApiKeysPage