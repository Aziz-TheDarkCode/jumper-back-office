"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@prisma/client";
// import { Customer } from "@prisma/client"; // Assuming Customer type is imported here

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


  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.fullName.toLowerCase().includes(nameFilter.toLowerCase()) &&
        customer.email?.toLowerCase().includes(emailFilter.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [nameFilter, emailFilter, customers]);

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
