import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'


export type Customer = {
  id: string;
  fullName: string;
  email: string | null;
  phoneNumber: string;
  address: string;
  city: string | null;
  type: "SENDER" | "RECEIVER";
};


const getCustomers = async (): Promise<Customer[]> => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        type: "SENDER",
      },
    });
    return customers;
  } catch (error) {
    console.log("[ET_CUSTOMERS]", error);
    return [];
  }
};

export default getCustomers;
