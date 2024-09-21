import { Shipment } from "./getShipments";
import { prisma } from "@/lib/prisma"; // Make sure to import your Prisma client

const getShipmentsByCustomer = async (
  senderId?: string
): Promise<Shipment[]> => {
  try {
    const shipments = await prisma.shipment.findMany({
      where: senderId
        ? {
            senderId: senderId,
          }
        : undefined,
      include: {
        sender: {
          select: {
            fullName: true,
            address: true,
            phoneNumber: true,
          },
        },
        receiver: {
          select: {
            fullName: true,
            address: true,
            phoneNumber: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
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

export default getShipmentsByCustomer;
