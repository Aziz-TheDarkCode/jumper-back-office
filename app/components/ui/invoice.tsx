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
import { Badge } from "@/components/ui/badge";
import { translatePaymentStatus } from "@/lib/utils";
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
                  <div>
                  <img
                    alt="Your Company"
                    src="/jumper.png"
                    className="h-8 w-auto"
                  />
                  <div className="mt-4">
                    <p className="text-sm">Jumper Logistiques</p>
                      <p className="text-sm">Cité Magistrat, Dakar 10200</p>
                      <p className="text-sm">Dakar, Senegal</p>
                      <p className="text-sm">Fixe : +221 338563091</p>
                      <p className="text-sm">Téléphone : +221 774721258</p>
                  </div>
                  </div>
                  <div className="flex items-center justif-center flex-col">
                  <QRCodeSVG
                    value={`https://jumper-logistiques.vercel.app/services/tracking/?id=${shipment.trackingNumber}`}
                    size={64}
                  />
                  <small className="text-xs">
                  Scanner pour suivre votre colis
                  </small>
                  <p className="text-sm">
                  ID du colis : <span className="font-bold"> {shipment.trackingNumber}</span>
                  </p>
                  </div>
                </div>

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
                <p>Numéro de suivi : {shipment.trackingNumber}</p>

                <p>
                  Destination : {shipment.origin} → {shipment.destination}
                </p>
                <p>
                  Date d&apos;envoi :{" "}
                  {new Date(shipment.createdAt).toLocaleDateString()}
                </p>
                <p>Valeur estimé du colis : {shipment.estimatedValue} FCFA</p>
                <p>Status : <Badge>{translatePaymentStatus(shipment.paymentStatus)}</Badge> </p>
                <p>Tarif Transport  : {shipment.price} FCFA  </p>
                <p>Tarif Postal  : {shipment.postalServiceFee ?? 0} FCFA  </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  Total a payer : {shipment.price + (shipment.postalServiceFee ?? 0) } FCFA
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
