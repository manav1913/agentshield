import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { generateWebhookSecret } from "@/lib/webhooks"

async function requireUserId() {
  const { userId } = await auth()
  return userId
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

export async function GET() {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const webhooks = await prisma.webhook.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      url: true,
      enabled: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ webhooks })
}

export async function POST(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const url = typeof body.url === "string" ? body.url.trim() : ""

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Valid https URL required" }, { status: 400 })
  }

  const secret = generateWebhookSecret()

  const webhook = await prisma.webhook.create({
    data: {
      userId,
      url,
      secret,
      enabled: true,
    },
    select: {
      id: true,
      url: true,
      enabled: true,
      createdAt: true,
    },
  })

  return NextResponse.json({
    webhook,
    secret,
    message: "Store the signing secret now. It will not be shown again.",
  })
}

export async function PATCH(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const id = typeof body.id === "string" ? body.id : ""
  const enabled = typeof body.enabled === "boolean" ? body.enabled : undefined

  if (!id || enabled === undefined) {
    return NextResponse.json({ error: "Invalid update payload" }, { status: 400 })
  }

  const existing = await prisma.webhook.findUnique({ where: { id } })
  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const webhook = await prisma.webhook.update({
    where: { id },
    data: { enabled },
    select: { id: true, url: true, enabled: true, createdAt: true },
  })

  return NextResponse.json({ webhook })
}

export async function DELETE(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const id = typeof body.id === "string" ? body.id : ""

  if (!id) {
    return NextResponse.json({ error: "Missing webhook id" }, { status: 400 })
  }

  const existing = await prisma.webhook.findUnique({ where: { id } })
  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.webhook.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
