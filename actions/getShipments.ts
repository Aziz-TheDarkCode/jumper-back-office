import { prisma } from "@/lib/prisma";

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  type: string;
  description: string;
  estimatedValue: number;
  status: string;
  trackingNumber: string;
  price: number;
  createdAt: Date;
  sender: {
    fullName: string;
    address: string;
    phoneNumber: string;
  } | null;
  receiver: {
    fullName: string;
    address: string;
    phoneNumber: string;
  } | null;
  user: {
    name: string | null;
  }| null;
}
const getShipments = async (limit: number | null): Promise<Shipment[]> => {
  try {
    const shipments = await prisma.shipment.findMany({
      ...(limit && { take: limit }), // Add limit if provided
      include: {
        sender: true,
        receiver: true,
        user: true, // Assuming this is the user who created the shipment
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return shipments;
  } catch (error) {
    console.log("[GET_SHIPMENTS]", error);
    return [];
  }
};

export default getShipments;
