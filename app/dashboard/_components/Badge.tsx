import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusTagProps {
  status: string;
}

const statusConfig: Record<
  string,
  {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
  }
> = {
  PENDING: { variant: "secondary", label: "Attente" },
  IN_TRANSIT: { variant: "default", label: "Expédié" },
  ARRIVED: { variant: "outline", label: "Arrivé" },
  DELIVERED: { variant: "outline", label: "Livré" },
  CANCELLED: { variant: "destructive", label: "Annulé" },
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    variant: "secondary",
    label: status,
  };

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "text-xs",
        status === "ARRIVED" || status === "DELIVERED"
          ? "bg-green-100 text-green-800 hover:bg-green-100"
          : "",
        status === "IN_TRANSIT"
          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
          : "",
        status === "PENDING"
          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          : ""
      )}
    >
      {config.label}
    </Badge>
  );
};

export default StatusTag;
