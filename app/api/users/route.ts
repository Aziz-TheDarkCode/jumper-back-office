import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json(
      {
        error:
          "Unauthorized. Seul les admins peuvent effectuer cette opération.",
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // Hash the password
    const hashedPassword = await hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.fullName,
        phoneNumber: body.phoneNumber,
        password: hashedPassword,
        email: body.email,
        role: body.role,
      },
    });

    // Remove the password from the response
    const { ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
