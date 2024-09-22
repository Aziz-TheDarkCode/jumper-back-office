import React, { ReactElement } from "react";

// Define a union type for all possible icon components
type IconComponent =
  | { type: 'GlobeIcon' }
  | { type: 'TruckIcon' }
  | { type: 'DownloadIcon' }
  | { type: 'CheckCircleIcon' };

interface StatCardProps {
  value: number;
  label: string;
  icon: ReactElement<IconComponent>;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="bg-white shadow-sm">
      <div className="p-6 flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{label}</p>
        </div>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center bg-opacity-20"
          style={{ backgroundColor: getIconColor(icon) }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function getIconColor(icon: ReactElement<IconComponent>): string {
  switch (icon.type) {
    case "GlobeIcon":
      return "rgba(255, 166, 0, 0.2)"; // Orange
    case "TruckIcon":
      return "rgba(147, 112, 219, 0.2)"; // Purple
    case "DownloadIcon":
      return "rgba(135, 206, 250, 0.2)"; // Light Blue
    case "CheckCircleIcon":
      return "rgba(144, 238, 144, 0.2)"; // Light Green
    default:
      return "rgba(200, 200, 200, 0.2)"; // Light Gray
  }
}