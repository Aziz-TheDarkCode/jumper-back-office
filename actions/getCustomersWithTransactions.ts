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
            sender: true, // Count the number of shipments where the customer is the sender
          },
        },
      },
    });

    // Map through the result to include the transaction count
    return customers.map((customer) => ({
      ...customer,
      transactionCount: customer._count.sender, // Add the number of transactions
    }));
  } catch (error) {
    console.log("[GET_CUSTOMERS]", error);
    return [];
  }
};

export default getCustomers;
