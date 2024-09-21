// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | null; // Add id property
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}
