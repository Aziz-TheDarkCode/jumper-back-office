"use client";

import { Shipment } from "@/actions/getShipments";
import { Button } from "@/app/components/ui/button";
import Invoice from "@/app/components/ui/invoice";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn, isManager, translatePaymentStatus } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StatusTag from "./Badge";
import { Badge } from "@/components/ui/badge";

export default function ShipmentTable({
  shipments,
}: {
  shipments: Shipment[];
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);
  const [loadingRow, setLoadingRow] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [trackingFilter, setTrackingFilter] = useState("");
  const [originFilter, setOriginFilter] = useState(""); // New state for filtering by origin
  const [destinationFilter, setDestinationFilter] = useState(""); // New state for filtering by destination
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const { toast } = useToast();

  const resetFilters = () => {
    setNameFilter("");
    setTrackingFilter("");
    setOriginFilter("");
    setDestinationFilter("");
  };

  useEffect(() => {
    const filtered = shipments.filter(
      (shipment) =>
        (shipment?.sender?.fullName
          .toLowerCase()
          .includes(nameFilter.toLowerCase()) ||
          shipment?.receiver?.fullName
            .toLowerCase()
            .includes(nameFilter.toLowerCase())) &&
        shipment.trackingNumber
          .toLowerCase()
          .includes(trackingFilter.toLowerCase()) &&
        shipment.origin.toLowerCase().includes(originFilter.toLowerCase()) && // Apply origin filter
        shipment.destination
          .toLowerCase()
          .includes(destinationFilter.toLowerCase()) // Apply destination filter
    );
    setFilteredShipments(filtered);
  }, [
    nameFilter,
    trackingFilter,
    originFilter, // Include origin filter in the dependency array
    destinationFilter, // Include destination filter in the dependency array
    shipments,
  ]);
  const handleChangeStatus = async (id: string, newStatus: string) => {
    try {
      setLoadingRow(true);
      await axios.patch(`/api/shipments/${id}`, { status: newStatus });
      toast({
        title: "Succès",
        description: "Statut mis à jour avec succès",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du statut",
        variant: "destructive",
      });
    } finally {
      setLoadingRow(false);
    }
  };
  const handleChangePaymentStatus = async (id: string, newStatus: string) => {
    try {
      setLoadingRow(true);
      await axios.patch(`/api/shipments/${id}`, { paymentStatus: newStatus });
      toast({
        title: "Succès",
        description: "Statut de paiement mis à jour avec succès",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du statut de paiement",
        variant: "destructive",
      });
    } finally {
      setLoadingRow(false);
    }
  };
  const [selectedShipment, setselectedShipment] = useState<Shipment | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = async (shipment: Shipment) => {
    setIsModalOpen(true);
    setselectedShipment(shipment);
  };
  const handleShowInvoice = (shipment: Shipment) => {
    setselectedShipment(shipment);
    setIsInvoiceOpen(true);
  };
  if (shipments.length === 0) return <p>Pas d'expéditions trouvées</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        <Input
          placeholder="Filtrer par nom"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filtrer par numéro de suivi"
          value={trackingFilter}
          onChange={(e) => setTrackingFilter(e.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filtrer par origine"
          value={originFilter}
          onChange={(e) => setOriginFilter(e.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filtrer par destination"
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={resetFilters}>Réinitialiser</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origine</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Statut de paiement</TableHead>
              <TableHead>Numéro de suivi</TableHead>
              <TableHead>Nom de l&apos;expéditeur</TableHead>
              <TableHead>Nom du destinataire</TableHead>
              <TableHead>Créer par</TableHead>
              <TableHead>Prix a payer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Changer le status</TableHead>
              <TableHead>Statut de paiement</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.map((shipment) => (
              <TableRow
                onClick={() => handleRowClick(shipment)} // Set the click handler
                key={shipment.id}
                className="cursor-pointer"
              >
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.type}</TableCell>
                <TableCell>
                  <StatusTag status={shipment.status} />
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "text-xs",
                      shipment.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-800 hover:bg-blue-100"
                        : "",
                      shipment.paymentStatus === "UNPAID"
                        ? "bg-red-100 text-red-800 text-[9px] hover:bg-blue-100"
                        : ""
                    )}
                  >
                    {translatePaymentStatus(shipment.paymentStatus)}
                  </Badge>
                </TableCell>
                <TableCell>{shipment.trackingNumber}</TableCell>
                <TableCell>{shipment?.sender?.fullName}</TableCell>
                <TableCell>{shipment?.receiver?.fullName}</TableCell>
                <TableCell>{shipment?.user?.name}</TableCell>
                <TableCell>{shipment.price} FCFA</TableCell>
                <TableCell>
                  {new Date(shipment.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    disabled={
                      loadingRow || isManager(session?.user.role as string)
                    }
                    defaultValue={shipment.status}
                    onValueChange={(value) =>
                      handleChangeStatus(shipment.id, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choisir statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">En attente</SelectItem>
                      <SelectItem value="IN_TRANSIT">En transit</SelectItem>
                      <SelectItem value="ARRIVED">Arrivé</SelectItem>
                      <SelectItem value="DELIVERED">Livré</SelectItem>
                      <SelectItem value="CANCELLED">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    disabled={
                      loadingRow || isManager(session?.user.role as string)
                    }
                    defaultValue={shipment.paymentStatus}
                    onValueChange={(value) =>
                      handleChangePaymentStatus(shipment.id, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choisir statut de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PAID">Payé</SelectItem>
                      <SelectItem value="UNPAID">Non payé</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowInvoice(shipment);
                    }}
                    className="bg-[#32cd99] hover:bg-[#31cc988f]"
                  >
                    Afficher la facture
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="h-[500px] overflow-scroll">
          {selectedShipment ? (
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Détails de l&apos;expédition
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Détails du colis et de l&apos;expéditeur.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Nature du colis
                    </dt>
                    <dd className="mt-1 flex items-center gap-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment.description}{" "}
                      <StatusTag status={selectedShipment.status} />
                      <span>{selectedShipment.weight}KG</span>
                      <span>
                        {selectedShipment.origin} →{" "}
                        {selectedShipment.destination}
                      </span>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Numéro de suivi
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment.trackingNumber}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Nom de l&apos;expéditeur
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment?.sender?.fullName}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Numéro de l&apos;éxpéditeur
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment?.sender?.phoneNumber}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Adresse de l&apos;éxpéditeur
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment?.sender?.address}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Nom du destinataire
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment?.receiver?.fullName}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Numéro du destinataire
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment?.receiver?.phoneNumber}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Adresse du destinataire
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment?.receiver?.address}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Prix
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedShipment.price} FCFA
                    </dd>
                  </div>
                </dl>
              </div>
              <Button onClick={() => setIsModalOpen(false)}>Fermer</Button>
            </div>
          ) : (
            <p>Aucune information disponible</p>
          )}
        </DialogContent>
      </Dialog>
      <Invoice
        onClose={() => setIsInvoiceOpen(false)}
        shipment={selectedShipment as Shipment}
        isOpen={isInvoiceOpen}
      />
    </div>
  );
}
