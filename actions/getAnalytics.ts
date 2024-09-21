// Ensure this path is correct for your project structure

import { Shipment } from "./getShipments";

interface ShipmentAnalytics {
  totalShipments: number;
  totalClients: number;
  ongoingShipments: number;
  successfullyDeliveredShipments: number;
}

export function getAnalytics(shipments: Shipment[]): ShipmentAnalytics {
  const analytics: ShipmentAnalytics = {
    totalShipments: shipments.length,
    totalClients: new Set(shipments.map((s) => s.sender.fullName)).size,
    ongoingShipments: shipments.filter((s) => s.status === "IN_TRANSIT").length,
    successfullyDeliveredShipments: shipments.filter(
      (s) => s.status === "DELIVERED"
    ).length,
  };

  return analytics;
}
