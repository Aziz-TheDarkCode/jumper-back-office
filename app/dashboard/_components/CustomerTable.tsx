"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/app/components/ui/button";
//
type Customer = {
  id: string;
  fullName: string;
  email: string | null;
  phoneNumber: string;
  address: string;
  city: string | null;
  type: "SENDER" | "RECEIVER";
};
export default function CustomerTable({
  customers,
}: {
  customers: (Customer & { transactionCount: number })[];
}) {
  const [filteredCustomers, setFilteredCustomers] = useState<
    (Customer & { transactionCount: number })[]
  >([]);
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");

  const resetFilters = () => {
    setNameFilter("");
    setEmailFilter("");
    setPhoneFilter("");
  };

  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.fullName.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (customer.email?.toLowerCase().includes(emailFilter.toLowerCase()) ?? true) &&
        customer.phoneNumber.toLowerCase().includes(phoneFilter.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [nameFilter, emailFilter, phoneFilter, customers]);

  if (customers.length === 0) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="Filtrer par nom"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filtrer par email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filtrer par téléphone"
          value={phoneFilter}
          onChange={(e) => setPhoneFilter(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={resetFilters}>Réinitialiser</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Nbres de transaction(s)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.fullName}</TableCell>
                <TableCell>{customer.email || "N/A"}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.city || "N/A"}</TableCell>
                <TableCell>{customer.transactionCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
