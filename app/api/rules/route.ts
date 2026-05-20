import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

const VALID_RULE_TYPES = ["keyword", "phrase"] as const

type RuleType = (typeof VALID_RULE_TYPES)[number]

async function requireUserId() {
  const { userId } = await auth()
  if (!userId) {
    return null
  }
  return userId
}

export async function GET() {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const rules = await prisma.rule.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ rules })
}

export async function POST(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const name = typeof body.name === "string" ? body.name.trim() : ""
  const type = typeof body.type === "string" ? body.type.trim() : ""
  const value = typeof body.value === "string" ? body.value.trim() : ""

  if (!name || !VALID_RULE_TYPES.includes(type as RuleType) || !value) {
    return NextResponse.json(
      { error: "Invalid rule payload" },
      { status: 400 }
    )
  }

  const rule = await prisma.rule.create({
    data: {
      userId,
      name,
      type,
      value,
      enabled: true,
    },
  })

  return NextResponse.json({ rule })
}

export async function PATCH(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const id = typeof body.id === "string" ? body.id : ""
  const enabled = typeof body.enabled === "boolean" ? body.enabled : undefined
  const name = typeof body.name === "string" ? body.name.trim() : undefined
  const value = typeof body.value === "string" ? body.value.trim() : undefined

  if (!id || enabled === undefined && name === undefined && value === undefined) {
    return NextResponse.json(
      { error: "Invalid update payload" },
      { status: 400 }
    )
  }

  const existing = await prisma.rule.findUnique({ where: { id } })
  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const updateData: { enabled?: boolean; name?: string; value?: string } = {}
  if (enabled !== undefined) updateData.enabled = enabled
  if (name !== undefined) updateData.name = name
  if (value !== undefined) updateData.value = value

  const rule = await prisma.rule.update({
    where: { id },
    data: updateData,
  })

  return NextResponse.json({ rule })
}

export async function DELETE(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const id = typeof body.id === "string" ? body.id : ""
  if (!id) {
    return NextResponse.json({ error: "Missing rule id" }, { status: 400 })
  }

  const rule = await prisma.rule.findUnique({ where: { id } })
  if (!rule || rule.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.rule.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
