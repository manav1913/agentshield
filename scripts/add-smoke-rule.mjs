import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const apiKeyValue = process.env.AGENTSHIELD_API_KEY;
const keyword = process.env.SMOKE_KEYWORD || "smoke-test-xyz-block-token";

if (!apiKeyValue) {
  console.error("Set AGENTSHIELD_API_KEY");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const key = await prisma.apiKey.findUnique({ where: { key: apiKeyValue } });
if (!key) {
  console.error("API key not found in database");
  process.exit(1);
}

const existing = await prisma.rule.findFirst({
  where: { userId: key.userId, type: "keyword", value: keyword },
});

if (existing) {
  if (!existing.enabled) {
    await prisma.rule.update({ where: { id: existing.id }, data: { enabled: true } });
    console.log(`Re-enabled rule: ${keyword}`);
  } else {
    console.log(`Rule already exists: ${keyword}`);
  }
} else {
  await prisma.rule.create({
    data: {
      userId: key.userId,
      name: "Smoke test block",
      type: "keyword",
      value: keyword,
      enabled: true,
    },
  });
  console.log(`Created keyword rule: ${keyword}`);
}

await prisma.$disconnect();
