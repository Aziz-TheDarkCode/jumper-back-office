import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the path as needed
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json(
      {
        error:
          "Unauthorized. Seul les admins peuvent effectuer cette opération.",
      },
      { status: 401 }
    );
  }
  try {
    const id = params.id;
    const { status } = await request.json();

    // Validate the status
    const validStatuses = [
      "PENDING",
      "IN_TRANSIT",
      "DELIVERED",
      "CANCELLED",
      "ARRIVED",
    ];
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: {
        id: params.id,
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
