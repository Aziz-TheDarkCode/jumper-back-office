import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the path as needed

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { status } = await request.json();

    // Validate the status
    const validStatuses = ["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status provided" },
        { status: 400 }
      );
    }

    // Update the shipment
    const updatedShipment = await prisma.shipment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedShipment);
  } catch (error) {
    console.error("Error updating shipment:", error);
    return NextResponse.json(
      { error: "Error updating shipment" },
      { status: 500 }
    );
  }
}
