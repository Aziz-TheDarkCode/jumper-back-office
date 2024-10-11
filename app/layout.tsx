import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Manrope as Lexend_Deca } from "next/font/google";
import "./globals.css";
const inter = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jumper Logistique | Back office",
  description: "Dashboard pour la gestion des colis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={`${inter.className}`}>{children}</body>
        <Toaster />
      </html>
    </NextAuthProvider>
  );
}
