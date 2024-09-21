import { Button } from "@/app/components/ui/button";
import Header from "@/components/header";
import {
  HomeIcon,
  UsersIcon,
  TruckIcon,
  PackageIcon,
  CheckCircleIcon,
  PlusIcon,
} from "lucide-react";

import React from "react";
import ShipmentModal from "../_components/ShipmentModal";
import NewUserModal from "../_components/NewUserModal";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ShipmentTable from "../_components/Table";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.role);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-wrap gap-2 justify-end mb-6">
            <ShipmentModal />
            <NewUserModal />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<PackageIcon className="h-8 w-8 text-orange-500" />}
              title="Nombres total d'envoi"
              value="25"
            />
            <StatCard
              icon={<UsersIcon className="h-8 w-8 text-purple-500" />}
              title="Nombres de clients"
              value="10"
            />
            <StatCard
              icon={<TruckIcon className="h-8 w-8 text-blue-500" />}
              title="Nombres envoi en cours"
              value="2"
            />
            <StatCard
              icon={<CheckCircleIcon className="h-8 w-8 text-green-500" />}
              title="Colis livrés avec succès"
              value="0"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Liste dernières transactions
            </h2>
            <ShipmentTable />
            {/* Add your transactions list component here */}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <article>
      <div className="flex border  shadow rounded-md items-center p-6">
        <div className="mr-4">{icon}</div>
        <div>
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
    </article>
  );
}
