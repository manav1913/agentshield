"use client"

import { useEffect, useState } from "react"
import { Plus, ShieldCheck, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type RuleRecord = {
  id: string
  name: string
  type: string
  value: string | null
  enabled: boolean
  createdAt: string
}

const ruleOptions = [
  {
    label: "Keyword block",
    value: "keyword",
    placeholder: "Block this keyword",
  },
  {
    label: "Phrase block",
    value: "phrase",
    placeholder: "Block this phrase",
  },
]

const RulesPage = () => {
  const [rules, setRules] = useState<RuleRecord[]>([])
  const [name, setName] = useState("")
  const [type, setType] = useState("keyword")
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRules = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/rules")

      if (!res.ok) {
        throw new Error("Unable to load rules")
      }

      const json = await res.json()
      setRules(json.rules ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fetch error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRules()
  }, [])

  const createRule = async () => {
    if (!name.trim() || !value.trim()) {
      setError("Please provide both a rule name and a value.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), type, value: value.trim() }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body?.error || "Unable to create rule")
      }

      const json = await res.json()
      setRules((current) => [json.rule, ...current])
      setName("")
      setValue("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create rule")
    } finally {
      setLoading(false)
    }
  }

  const toggleRuleEnabled = async (id: string, enabled: boolean) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/rules", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, enabled }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body?.error || "Unable to update rule")
      }

      const json = await res.json()

      setRules((current) =>
        current.map((rule) => (rule.id === id ? json.rule : rule))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update rule")
    } finally {
      setLoading(false)
    }
  }

  const deleteRule = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/rules", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body?.error || "Unable to delete rule")
      }

      setRules((current) => current.filter((rule) => rule.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete rule")
    } finally {
      setLoading(false)
    }
  }

  const selectedRule = ruleOptions.find((option) => option.value === type)

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
            <ShieldCheck size={14} />
            Rules
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
            Guardrail rules
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Add lightweight rules that block unsafe outputs, sensitive data, or
            forbidden phrases before they reach users.
          </p>
        </div>

        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300 shadow-sm">
          {rules.length} rule{rules.length === 1 ? "" : "s"}
        </span>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="rule-name"
                  className="text-sm font-semibold text-white"
                >
                  Rule name
                </label>

                <input
                  id="rule-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Block internal terms"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/10"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rule-type"
                  className="text-sm font-semibold text-white"
                >
                  Rule type
                </label>

                <select
                  id="rule-type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/10"
                >
                  {ruleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              onClick={createRule}
              disabled={loading}
              className="h-12 self-end rounded-2xl bg-white px-5 font-semibold shadow-lg shadow-white/20 hover:bg-gray-200 text-black"
            >
              <Plus size={16} />
              Add rule
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <label
              htmlFor="rule-value"
              className="text-sm font-semibold text-white"
            >
              Rule value
            </label>

            <input
              id="rule-value"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={selectedRule?.placeholder}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10 focus:ring-4 focus:ring-white/10"
            />
          </div>

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
              Active rules
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              These guardrails are applied to intercepted agent outputs.
            </p>
          </div>
        </div>

        <div className="p-3">
          {loading && rules.length === 0 ? (
            <div className="rounded-2xl bg-white/5 px-4 py-10 text-center text-sm text-gray-400">
              Loading rules...
            </div>
          ) : rules.length === 0 ? (
            <div className="rounded-2xl bg-white/5 px-4 py-10 text-center">
              <p className="font-medium text-white">
                No rules yet
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Create your first rule to start filtering risky outputs.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex flex-col gap-4 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold text-white">
                        {rule.name}
                      </p>

                      <span
                        className={
                          rule.enabled
                            ? "rounded-full border border-emerald-900 bg-emerald-950/50 px-2.5 py-1 text-xs font-semibold text-emerald-300"
                            : "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-gray-400"
                        }
                      >
                        {rule.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-400">
                      {rule.type} · {rule.value}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRuleEnabled(rule.id, !rule.enabled)}
                      disabled={loading}
                      className="rounded-xl"
                    >
                      {rule.enabled ? "Disable" : "Enable"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRule(rule.id)}
                      disabled={loading}
                      className="rounded-xl border-red-900 text-red-300 hover:bg-red-950"
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default RulesPage