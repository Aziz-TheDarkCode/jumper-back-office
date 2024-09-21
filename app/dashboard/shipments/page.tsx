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

import ShipmentTable from "../_components/Table";
import getShipments from "@/actions/getShipments";
import { getAnalytics } from "@/actions/getAnalytics";
import getCustomers from "@/actions/getCustomers";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { isAdmin, isManager } from "@/lib/utils";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const shipments = await getShipments(null);
  const customers = await getCustomers();


  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-wrap gap-2 justify-end mb-6">
            {!isManager(session?.user.role as string) && (
              <ShipmentModal customers={customers} />
            )}
            {isAdmin(session?.user.role as string) && <NewUserModal />}
            
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Liste des transactions
            </h2>
            <ShipmentTable shipments={shipments} />
            <div className="max-w-xl mt-4 flex justify-center items-center mx-auto"></div>
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
  value: string | number;
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
