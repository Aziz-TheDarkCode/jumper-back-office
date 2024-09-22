import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { customAlphabet } from "nanoid";
import { authOptions } from "@/lib/auth";
import { DefaultSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const shipments = await prisma.shipment.findMany({
    include: {
      sender: true,
      receiver: true,
      user: true, // Assuming this is the user who created the shipment
    },
  });
  return NextResponse.json(shipments);
}
export async function POST(request: Request) {
  const nanoid = customAlphabet("1234567890", 4);

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const shipment = await prisma.shipment.create({
      data: {
        description: body.description,
        weight: body.weight,
        origin: body.origin,
        destination: body.destination,
        price: body.price,
        estimatedValue: body.estimatedValue,
        sender: {
          connectOrCreate: {
            where: {
              phoneNumber: body.sender_phone_number,
            },
            create: {
              fullName: body.sender_name,
              phoneNumber: body.sender_phone_number,
              email: body.sender_email,
              address: body.sender_adress,
              type: "SENDER",
            },
          },
        },
        receiver: {
          connectOrCreate: {
            where: {
              phoneNumber: body.receiver_phone_number,
            },
            create: {
              fullName: body.receiver_name,
              phoneNumber: body.receiver_phone_number,
              email: body.receiver_email,
              address: body.receiver_adress,
              type: "RECEIVER",
            },
          },
        },
        type: body.type,
        status: "PENDING",
        trackingNumber: nanoid(),
        user: { connect: { id: session.user?.id as string } },
      },
    });

    return NextResponse.json(shipment, { status: 201 });
  } catch (error) {
    console.error("Error creating shipment:", error);
    return NextResponse.json(
      { error: "Failed to create shipment" },
      { status: 500 }
    );
  }
}
