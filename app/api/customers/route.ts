import { prisma } from "@/lib/prisma"; // Adjust the path as needed
import { NextResponse } from "next/server";
export async function GET() {
  const customers = await prisma.customer.findMany({
    where: {
      type: "SENDER",
    },
  });
  return NextResponse.json(customers);
}
