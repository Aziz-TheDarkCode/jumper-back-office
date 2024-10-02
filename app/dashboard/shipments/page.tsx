import Header from "@/components/header";

import React from "react";
import NewUserModal from "../_components/NewUserModal";
import ShipmentModal from "../_components/ShipmentModal";

import getCustomers from "@/actions/getCustomers";
import getShipments from "@/actions/getShipments";
import { authOptions } from "@/lib/auth";
import { isAdmin, isManager } from "@/lib/utils";
import { getServerSession } from "next-auth";
import ShipmentTable from "../_components/Table";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

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
