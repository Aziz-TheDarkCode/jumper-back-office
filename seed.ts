const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.createMany({
      data: [
        {
          name: "Aziz Ndiaye",
          email: "abdouaziznjay@gmail.com",
          password: "23",
          phoneNumber: "+221783596489",
          role: "SHIPPING_AGENT",
        },
        {
          name: "Salimata Gueye",
          email: "sali@gmail.com",
          password: "23",
          phoneNumber: "+221777843872",
          role: "SHIPPING_AGENT",
        },
      ],
    });

    console.log("successfully seeded categories");
  } catch (error) {
    console.error("Error seeding the categories: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
