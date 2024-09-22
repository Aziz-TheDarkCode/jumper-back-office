import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "./button";
import { Shipment } from "@/actions/getShipments";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
export default function Invoice({
  shipment,
  isOpen,
  onClose,
}: {
  shipment: Shipment;
  isOpen: boolean;
  onClose: () => void;
}) {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {isOpen && shipment && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl h-[500px] overflow-scroll">
            <DialogTitle>Facture</DialogTitle>
            <div className="p-6 bg-white" ref={componentRef}>
              <div className="border-b-4 border-[#148aab] pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <img
                    alt="Your Company"
                    src="/jumper.png"
                    className="h-8 w-auto"
                  />
                  <QRCodeSVG
                    value={`https://jumper-logistiques.vercel.app/services/tracking/?id=${shipment.trackingNumber}`}
                    size={64}
                  />
                </div>
                <p className="text-sm">Jumper Logistiques</p>
                <p className="text-sm">Cité Magistrat, Dakar 10200</p>
                <p className="text-sm">Dakar, Senegal</p>
                <p className="text-sm">+918660876889</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <h2 className="font-semibold text-[#148aab]">Expéditeur:</h2>
                  <p>{shipment?.sender?.fullName}</p>
                  <p>{shipment?.sender?.address}</p>
                  <p>{shipment?.sender?.phoneNumber}</p>
                </div>
                <div className="space-y-1">
                  <h2 className="font-semibold text-[#148aab]">
                    Destinataire:
                  </h2>
                  <p>{shipment?.receiver?.fullName}</p>
                  <p>{shipment?.receiver?.address}</p>
                  <p>{shipment?.receiver?.phoneNumber}</p>
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <h2 className="font-semibold text-[#148aab]">
                  Information sur le colis
                </h2>
                <p>Nature du colis : {shipment.description}</p>
                <p>
                  Destination : {shipment.origin} → {shipment.destination}
                </p>
                <p>
                  Date d&apos;envoi :{" "}
                  {new Date(shipment.createdAt).toLocaleDateString()}
                </p>
                <p>Valeur estimé du colis : {shipment.estimatedValue} FCFA</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  Total a payer : {shipment.price} FCFA
                </p>
              </div>
            </div>
            <DialogFooter></DialogFooter>
            <Button onClick={() => handlePrint()}>Imprimer</Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
