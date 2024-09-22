import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: {
        trackingNumber: params.id,
      },
      include: {
        sender: true,
        receiver: true,
        user: true, // Assuming this is the user who created the shipment
      },
    });
    if (!shipment) throw new Error("Shipment not found");
    return NextResponse.json(shipment);
  } catch (error) {
    console.error("Failed to get shipment:", error);
    return NextResponse.json(
      { error: "Error updating shipment" },
      { status: 500 }
    );
  }
}
