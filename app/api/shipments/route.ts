import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const shipments = await prisma.shipment.findMany({
    include: { sender: true, receiver: true },
  });
  return NextResponse.json(shipments);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  const shipment = await prisma.shipment.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });
  return NextResponse.json(shipment);
}
