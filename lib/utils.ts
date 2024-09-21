import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isAdmin(role: string): boolean {
  return role === "admin";
}
export function translateStatus(status: string): string {
  switch (status) {
    case "PENDING":
      return "En préparation";
    case "IN_TRANSIT":
      return "Expédié";
    case "ARRIVED":
      return "Arrivé";
    case "DELIVERED":
      return "Délivré";
    case "CANCELLED":
      return "Annulé";
    default:
      return "Statut inconnu"; // In case of an unknown status
  }
}
