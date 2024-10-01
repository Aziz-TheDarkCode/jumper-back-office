import { Button } from "@/app/components/ui/button";
import Header from "@/components/header";

import {
  CheckCircleIcon,
  PackageIcon,
  TruckIcon,
  UsersIcon
} from "lucide-react";


import { getAnalytics } from "@/actions/getAnalytics";
import getCustomers from "@/actions/getCustomers";
import getShipments from "@/actions/getShipments";
import NewUserModal from "./dashboard/_components/NewUserModal";
import ShipmentModal from "./dashboard/_components/ShipmentModal";

import { authOptions } from "@/lib/auth";
import { isAdmin, isManager } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";
import StatCard from "./dashboard/_components/StatsCard";
import ShipmentTable from "./dashboard/_components/Table";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const shipments = await getShipments(1);
  const customers = await getCustomers();
  const analytics = getAnalytics(shipments);
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<PackageIcon className="h-8 w-8 text-orange-500" />}
              label="Nombres total d'envoi"
              value={analytics.totalShipments}
            />
            <StatCard
              icon={<UsersIcon className="h-8 w-8 text-purple-500" />}
              label="Nombres de clients"
              value={analytics.totalClients}
            />
            <StatCard
              icon={<TruckIcon className="h-8 w-8 text-blue-500" />}
              label="Nombres envoi en cours"
              value={analytics.ongoingShipments}
            />
            <StatCard
              icon={<CheckCircleIcon className="h-8 w-8 text-green-500" />}
              label="Colis livrés avec succès"
              value={analytics.successfullyDeliveredShipments}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Liste dernières transactions
            </h2>
            <ShipmentTable shipments={shipments} />
            <div className="max-w-xl mt-4 flex justify-center items-center mx-auto">
              <Link href="/dashboard/shipments">
                <Button>Voir toutes transactions</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
