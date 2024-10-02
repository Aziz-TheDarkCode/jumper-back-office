import getCustomers from "@/actions/getCustomersWithTransactions";
import Header from "@/components/header";
import React from "react";
import CustomerTable from "../_components/CustomerTable";

async function Page() {
  const customers = await getCustomers();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <CustomerTable customers={customers} />
      </main>
    </div>
  );
}

export default Page;
