// import { prisma } from "@/lib/prisma";
// import { Customer } from "@prisma/client";

// const getCustomers = async (): Promise<Customer[]> => {
//   try {
//     const customers = await prisma.customer.findMany({
//       where: {
//         type: "SENDER",
//       },
//     });
//     return customers;
//   } catch (error) {
//     console.log("[ET_CUSTOMERS]", error);
//     return [];
//   }
// };

// export default getCustomers;
