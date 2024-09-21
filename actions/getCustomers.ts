import { Customer } from "@prisma/client";

const getCustomers = async (): Promise<Customer[]> => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        type: "SENDER",
      },
    });
    return customers;
  } catch (error) {
    console.log("[GET_CUSTOMERS]", error);
    return [];
  }
};

export default getCustomers;
