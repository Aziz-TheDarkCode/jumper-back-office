import { prisma } from "@/lib/prisma";
import { Customer } from "./getCustomers";

const getCustomers = async (): Promise<
  (Customer & { transactionCount: number })[]
> => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        type: "SENDER",
      },
      include: {
        _count: {
          select: {
            sender: true,
          },
        },
      },
    });

    return customers.map((customer: any) => ({
      ...customer,
      transactionCount: customer._count.sender,
    }));
  } catch (error) {
    console.log("[GET_CUSTOMERS]", error);
    return [];
  }
};

export default getCustomers;
