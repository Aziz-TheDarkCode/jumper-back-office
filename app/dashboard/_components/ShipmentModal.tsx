"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function ShipmentModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
          <PlusIcon className="mr-2 h-4 w-4" /> Créer une nouvelle expédition
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[500px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="mb-6">
            Création d'un nouveau envoi
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Informations sur l'expéditeur
            </h2>
            <Input className="mb-4" placeholder="Rechercher un expéditeur" />
            <Input className="mb-4" placeholder="Nom Complet" />
            <Input className="mb-4" placeholder="Numéro de téléphone" />
            <Input className="mb-4" placeholder="Adresse Domicile" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Informations sur le destinataire
            </h2>
            <Input className="mb-4" placeholder="Nom Complet" />
            <Input className="mb-4" placeholder="Numéro de téléphone" />
            <Input className="mb-4" placeholder="Adresse Domicile" />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">
            Details de l'expédition
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choisir type d'envoi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="express">Express</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Nature du colis" />
            <Input placeholder="Poids(en KG)" />
            <Input placeholder="Prix a payer" />
            <Input placeholder="Valeur estimée du colis" />
            <div className="flex items-center">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Provenance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
              <ArrowRightIcon className="mx-2" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            Créer l'expedition
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
