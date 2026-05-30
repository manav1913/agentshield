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
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300">
            <ShieldCheck size={14} />
            Rules
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Guardrail rules
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Add lightweight rules that block unsafe outputs, sensitive data, or
            forbidden phrases before they reach users.
          </p>
        </div>

        <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          {rules.length} rule{rules.length === 1 ? "" : "s"}
        </span>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-violet-100 bg-linear-to-br from-violet-50 to-white p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:border-violet-900/50 dark:from-violet-950/30 dark:to-slate-950">
        <div className="relative">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="rule-name"
                  className="text-sm font-semibold text-slate-800 dark:text-slate-100"
                >
                  Rule name
                </label>

                <input
                  id="rule-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Block internal terms"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400 dark:focus:bg-slate-950 dark:focus:ring-violet-950"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rule-type"
                  className="text-sm font-semibold text-slate-800 dark:text-slate-100"
                >
                  Rule type
                </label>

                <select
                  id="rule-type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400 dark:focus:bg-slate-950 dark:focus:ring-violet-950"
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
              className="h-12 self-end rounded-2xl bg-violet-600 px-5 font-semibold shadow-lg shadow-violet-500/20 hover:bg-violet-700"
            >
              <Plus size={16} />
              Add rule
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <label
              htmlFor="rule-value"
              className="text-sm font-semibold text-slate-800 dark:text-slate-100"
            >
              Rule value
            </label>

            <input
              id="rule-value"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={selectedRule?.placeholder}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400 dark:focus:bg-slate-950 dark:focus:ring-violet-950"
            />
          </div>

          {error ? (
            <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/50 bg-linear-to-br from-white to-slate-50/50 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:to-slate-950/50">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200/50 p-6 dark:border-slate-800 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              Active rules
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              These guardrails are applied to intercepted agent outputs.
            </p>
          </div>
        </div>

        <div className="p-3">
          {loading && rules.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              Loading rules...
            </div>
          ) : rules.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center dark:bg-slate-900">
              <p className="font-medium text-slate-950 dark:text-white">
                No rules yet
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Create your first rule to start filtering risky outputs.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100/50 overflow-hidden rounded-2xl border border-slate-200/50 dark:divide-slate-800/50 dark:border-slate-800">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex flex-col gap-4 bg-white p-4 transition-colors hover:bg-slate-50/50 dark:bg-slate-950 dark:hover:bg-slate-900/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold text-slate-950 dark:text-white">
                        {rule.name}
                      </p>

                      <span
                        className={
                          rule.enabled
                            ? "rounded-full border border-emerald-200 bg-emerald-50/50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : "rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                        }
                      >
                        {rule.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
                      className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950"
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