import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"

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

  const keys = await prisma.apiKey.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ keys })
}

export async function POST(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const name = typeof body.name === "string" ? body.name.trim() : ""

  const keyValue = randomBytes(24).toString("hex")

  const newKey = await prisma.apiKey.create({
    data: {
      userId,
      name: name || "Unnamed API key",
      key: keyValue,
    },
    select: {
      id: true,
      name: true,
      key: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ key: newKey })
}

export async function DELETE(req: NextRequest) {
  const userId = await requireUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const id = typeof body.id === "string" ? body.id : ""
  if (!id) {
    return NextResponse.json({ error: "Missing API key id" }, { status: 400 })
  }

  const existing = await prisma.apiKey.findUnique({
    where: { id },
  })

  if (!existing || existing.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.apiKey.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
