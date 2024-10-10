import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isAdmin(role: string): boolean {
  return role === "ADMIN";
}
export function isManager(role: string): boolean {
  return role === "USER";
}
export function translatePaymentStatus(status: string): string {
  switch (status) {
    case "UNPAID":
      return "Non payé";
    case "PAID":
      return "Payé";
    default:
      return "Statut inconnu"; // In case of an unknown status
  }
}
