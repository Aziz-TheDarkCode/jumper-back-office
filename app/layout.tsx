import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import { Lexend_Deca } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
const inter = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
