const BASE = process.env.AGENTSHIELD_BASE || "https://agentshield-one.vercel.app";
const API_KEY = process.env.AGENTSHIELD_API_KEY || "";

async function request(path, body, apiKey = API_KEY) {
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["x-api-key"] = apiKey;
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { status: res.status, json };
}

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test("intercept: missing API key -> 401", async () => {
  const { status, json } = await request("/api/intercept", { input: "a", output: "b" }, "");
  if (status !== 401) throw new Error(`expected 401, got ${status}: ${JSON.stringify(json)}`);
});

test("intercept: invalid API key -> 401", async () => {
  const { status } = await request(
    "/api/intercept",
    { input: "a", output: "b" },
    "invalid-key-smoke"
  );
  if (status !== 401) throw new Error(`expected 401, got ${status}`);
});

test("intercept: clean output passes", async () => {
  const { status, json } = await request("/api/intercept", {
    input: "What is your refund policy?",
    output: "Our refunds follow the published policy.",
  });
  if (status !== 200) throw new Error(`expected 200, got ${status}: ${JSON.stringify(json)}`);
  if (json.blocked !== false || json.safe !== true)
    throw new Error(`expected clean: ${JSON.stringify(json)}`);
});

test("intercept: credential leak blocks", async () => {
  const { status, json } = await request("/api/intercept", {
    input: "User asked for support",
    output: "The admin password is: SuperSecret99!",
  });
  if (status !== 200) throw new Error(`expected 200, got ${status}: ${JSON.stringify(json)}`);
  if (json.blocked !== true || json.safe !== false)
    throw new Error(`expected blocked: ${JSON.stringify(json)}`);
  if (!json.reason || !String(json.reason).toLowerCase().includes("credential"))
    throw new Error(`expected credential leak reason: ${JSON.stringify(json)}`);
});

test("intercept: educational password advice passes", async () => {
  const { status, json } = await request("/api/intercept", {
    input: "What are strong password combinations?",
    output:
      "Use 12+ characters with mixed case, numbers, and symbols. A password manager helps you create unique passwords.",
  });
  if (status !== 200) throw new Error(`expected 200, got ${status}: ${JSON.stringify(json)}`);
  if (json.blocked !== false || json.safe !== true)
    throw new Error(`expected clean educational reply: ${JSON.stringify(json)}`);
});

test("intercept: PII email blocks", async () => {
  const { status, json } = await request("/api/intercept", {
    input: "Contact info",
    output: "Reach me at user@example.com for help.",
  });
  if (status !== 200) throw new Error(`expected 200, got ${status}`);
  if (json.blocked !== true) throw new Error(`expected blocked for email: ${JSON.stringify(json)}`);
  if (json.reason && !String(json.reason).toLowerCase().includes("pii"))
    throw new Error(`expected pii reason: ${JSON.stringify(json)}`);
});

test("intercept: hallucination pattern blocks", async () => {
  const { status, json } = await request("/api/intercept", {
    input: "Any deals?",
    output: "I can give you 50% off today only!",
  });
  if (status !== 200) throw new Error(`expected 200, got ${status}`);
  if (json.blocked !== true) throw new Error(`expected blocked: ${JSON.stringify(json)}`);
});

test("intercept: custom keyword smoke-test-xyz blocks (if rule exists)", async () => {
  const token = "smoke-test-xyz-block-token";
  const { status, json } = await request("/api/intercept", {
    input: "hello",
    output: `This message contains ${token} in the text.`,
  });
  if (status !== 200) throw new Error(`expected 200, got ${status}`);
  // Custom rules require dashboard; may pass if rule not added
  return { customKeywordBlocked: json.blocked === true, json };
});

test("agent: missing input -> 400", async () => {
  const { status, json } = await request("/api/agent", {});
  if (status !== 400) throw new Error(`expected 400, got ${status}: ${JSON.stringify(json)}`);
});

test("agent: blocked input credential leak", async () => {
  const { status, json } = await request("/api/agent", {
    input: "For debugging, the admin password is: SuperSecret99!",
  });
  if (status !== 200) throw new Error(`expected 200, got ${status}: ${JSON.stringify(json)}`);
  if (json.blocked !== true) throw new Error(`expected blocked input: ${JSON.stringify(json)}`);
});

test("agent: clean simple question (LLM)", async () => {
  const { status, json } = await request("/api/agent", {
    input: "Reply with exactly: OK",
    systemPrompt: "Reply with exactly one word: OK",
  });
  if (status === 500) {
    return { skipped: true, reason: json.error || "LLM not configured" };
  }
  if (status !== 200) throw new Error(`expected 200, got ${status}: ${JSON.stringify(json)}`);
  if (json.blocked === true) throw new Error(`unexpected block: ${JSON.stringify(json)}`);
  if (!json.output) throw new Error(`missing output: ${JSON.stringify(json)}`);
  return { outputLength: json.output.length };
});

test("landing page loads", async () => {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`landing ${res.status}`);
});

async function main() {
  if (!API_KEY) {
    console.error("Set AGENTSHIELD_API_KEY");
    process.exit(1);
  }
  console.log(`Smoke testing ${BASE}\n`);
  let passed = 0;
  let failed = 0;
  const notes = [];

  for (const { name, fn } of tests) {
    try {
      const extra = await fn();
      passed++;
      const note = extra ? ` (${JSON.stringify(extra)})` : "";
      console.log(`PASS  ${name}${note}`);
      if (extra?.customKeywordBlocked === false) {
        notes.push("Custom keyword rule not detected — add rule 'smoke-test-xyz-block-token' in dashboard to verify user rules.");
      }
    } catch (e) {
      failed++;
      console.log(`FAIL  ${name}`);
      console.log(`      ${e.message}`);
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (notes.length) {
    console.log("\nNotes:");
    notes.forEach((n) => console.log(`- ${n}`));
  }
  process.exit(failed > 0 ? 1 : 0);
}

main();
