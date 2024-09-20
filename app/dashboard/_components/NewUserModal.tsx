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

export default function NewUserModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Ajouter une nouveau utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl h-[500px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="mb-2">
            Ajout d'un nouveau utilisateur
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <div>
            <Input className="mb-4" placeholder="Nom Complet" />
            <Input className="mb-4" placeholder="Numéro de téléphone" />
            <Input className="mb-4" placeholder="Adresse Domicile" />
            <Input
              type="password"
              className="mb-4"
              placeholder="Mot de passe"
            />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choisir le role de l'utilisateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHIPPING_AGENT">Agent</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">Gestionnaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
