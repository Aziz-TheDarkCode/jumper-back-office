const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    const saltRounds = 10; // You can adjust this for stronger hashing

    const users = [
      {
        name: "admin",
        email: "admin@admin.com",
        password: "admin",
        phoneNumber: "+2210000000",
        role: "ADMIN",
      },
      {
        name: "Moussa Gueye",
        email: "admin@jumper.com",
        password: "jumper-admin",
        phoneNumber: "+2215996564",
        role: "ADMIN",
      },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      await prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
    }

    console.log("Successfully seeded users with hashed passwords");
  } catch (error) {
    console.error("Error seeding the users: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
