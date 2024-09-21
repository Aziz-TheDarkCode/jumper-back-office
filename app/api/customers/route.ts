import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the path as needed
export async function GET() {
  const customers = await prisma.customer.findMany({
    where: {
      type: "SENDER",
    },
  });
  return NextResponse.json(customers);
}
