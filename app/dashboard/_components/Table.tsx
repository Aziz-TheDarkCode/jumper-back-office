"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import StatusTag from "./Badge";

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  type: string;
  status: string;
  trackingNumber: string;
  price: number;
  createdAt: string;
  sender: {
    fullName: string;
    address: string;
    phoneNumber: string;
  };
  receiver: {
    fullName: string;
    address: string;
    phoneNumber: string;
  };
  user: {
    name: string;
  };
}

export default function ShipmentTable() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRow, setLoadingRow] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [trackingFilter, setTrackingFilter] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get("/api/shipments");
        setShipments(response.data);
        setFilteredShipments(response.data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors du chargement des expéditions",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  useEffect(() => {
    const filtered = shipments.filter(
      (shipment) =>
        (shipment.sender.fullName
          .toLowerCase()
          .includes(nameFilter.toLowerCase()) ||
          shipment.receiver.fullName
            .toLowerCase()
            .includes(nameFilter.toLowerCase())) &&
        shipment.trackingNumber
          .toLowerCase()
          .includes(trackingFilter.toLowerCase())
    );
    setFilteredShipments(filtered);
  }, [nameFilter, trackingFilter, shipments]);

  const handleChangeStatus = async (id: string, newStatus: string) => {
    try {
      setLoadingRow(true);
      await axios.patch(`/api/shipments/${id}`, { status: newStatus });
      setShipments((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id === id ? { ...shipment, status: newStatus } : shipment
        )
      );
      toast({
        title: "Succès",
        description: "Statut mis à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du statut",
      });
    } finally {
      setLoadingRow(false);
    }
  };

  if (loading) return <p>Chargement...</p>;

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
          placeholder="Filtrer par numéro de suivi"
          value={trackingFilter}
          onChange={(e) => setTrackingFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origine</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Numéro de suivi</TableHead>
              <TableHead>Nom de l'expéditeur</TableHead>
              <TableHead>Nom du destinataire</TableHead>
              <TableHead>Créer par</TableHead>
              <TableHead>Prix a payer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Changer le status </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.type}</TableCell>
                <TableCell>
                  <StatusTag status={shipment.status} />
                </TableCell>
                <TableCell>{shipment.trackingNumber}</TableCell>
                <TableCell>{shipment.sender.fullName}</TableCell>
                <TableCell>{shipment.receiver.fullName}</TableCell>
                <TableCell>{shipment.user.name}</TableCell>
                <TableCell>{shipment.price} FCFA</TableCell>
                <TableCell>
                  {new Date(shipment.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    disabled={loadingRow}
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
                      <SelectItem value="DELIVERED">Livré</SelectItem>
                      <SelectItem value="CANCELLED">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
