"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
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
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx"; // Import clsx for conditional class names
import { Loader2 } from "lucide-react";
import { Customer } from "@prisma/client";
import { useRouter } from "next/navigation";

// Zod Schema for Shipment Input Validation
const shipmentSchema = z.object({
  sender_name: z.string().min(1, "Le nom complet est requis"),
  sender_phone_number: z
    .string()
    .regex(
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
      "Veuillez entrer un numéro correct. Préciser l'indicatif du pays"
    ),
  sender_email: z.string().email("Email invalide").optional(),
  sender_adress: z.string().min(1, "Adresse est requise"),

  receiver_name: z.string().min(1, "Le nom complet est requis"),
  receiver_phone_number: z
    .string()
    .regex(
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
      "Veuillez entrer un numéro correct. Préciser l'indicatif du pays"
    ),
  receiver_email: z.string().email("Email invalide").optional(),
  receiver_adress: z.string().min(1, "Adresse est requise"),
  description: z.string().min(1, "Description requise"),
  weight: z.number().min(0.1, "Le poids est requis"),
  price: z.number().min(1, "Le prix est requis"),
  estimatedValue: z.number().min(1, "Valeur estimée requise"),
  type: z.enum(["FREIGHT", "GP", "EXPRESS"]),
  origin: z.string().min(1, "Origine requise"),
  destination: z.string().min(1, "Destination requise"),
});

export default function ShipmentModal({
  customers,
}: {
  customers: Customer[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [senderType, setSenderType] = useState<"new" | "existing">("new");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shipmentSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/shipments", data);
      toast({
        title: "Succès",
        description: "L'expédition a été créée avec succès",
      });
      router.refresh();
      setOpen(false); // Close the modal on success
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de l'expédition",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSenderSelect = (senderId: string) => {
    const selectedSender = customers.find((sender) => sender.id === senderId);
    if (selectedSender) {
      setValue("sender_name", selectedSender.fullName);
      setValue("sender_phone_number", selectedSender.phoneNumber);
      setValue("sender_email", selectedSender.email);
      setValue("sender_adress", selectedSender.address);
    }
  };
  const handleSenderTypeChange = (value: "new" | "existing") => {
    setSenderType(value);
    if (value === "new") {
      // Clear sender fields when switching to "new client"
      setValue("sender_name", "");
      setValue("sender_phone_number", "");
      setValue("sender_email", "");
      setValue("sender_adress", "");
      setValue("sender_id", ""); // Clear the selected sender id
    }
  };
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            {/* Sender Info */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Informations sur l'expéditeur
              </h2>
              <div className="mb-4">
                <Select onValueChange={handleSenderTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Qui envoie ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="existing">Ancien client</SelectItem>
                    <SelectItem value="new">Nouveau client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {senderType === "existing" ? (
                <div className="mb-4">
                  <Controller
                    name="sender_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleSenderSelect(value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un expéditeur" />
                        </SelectTrigger>
                        <SelectContent>
                          {customers.map((sender) => (
                            <SelectItem key={sender.id} value={sender.id}>
                              {sender.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              ) : null}

              <div className="mb-4">
                <Input
                  {...register("sender_name")}
                  placeholder="Nom Complet"
                  className={clsx(
                    "border",
                    errors.sender_name ? "border-pink-600" : "border-gray-300"
                  )}
                  disabled={senderType === "existing"}
                />
                {errors.sender_name && (
                  <small className="text-pink-600">
                    {errors.sender_name.message as string}
                  </small>
                )}
              </div>
              <div className="mb-2">
                <Input
                  {...register("sender_phone_number")}
                  placeholder="Numéro de téléphone"
                  className={clsx(
                    "border",
                    errors.sender_phone_number
                      ? "border-pink-600"
                      : "border-gray-300"
                  )}
                  disabled={senderType === "existing"}
                />
                {errors.sender_phone_number && (
                  <small className="text-pink-600">
                    {errors.sender_phone_number.message as string}
                  </small>
                )}
              </div>
              <div className="mb-2">
                <Input
                  {...register("sender_email")}
                  placeholder="Email"
                  className={clsx(
                    "border",
                    errors.sender_email ? "border-pink-600" : "border-gray-300"
                  )}
                  disabled={senderType === "existing"}
                />
                {errors.sender_email && (
                  <small className="text-pink-600">
                    {errors.sender_email.message as string}
                  </small>
                )}
              </div>
              <div className="mb-2">
                <Input
                  {...register("sender_adress")}
                  placeholder="Adresse Domicile"
                  className={clsx(
                    "border",
                    errors.sender_adress ? "border-pink-600" : "border-gray-300"
                  )}
                  disabled={senderType === "existing"}
                />
                {errors.sender_adress && (
                  <small className="text-pink-600">
                    {errors.sender_adress.message as string}
                  </small>
                )}
              </div>
            </div>

            {/* Receiver Info */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Informations sur le destinataire
              </h2>
              <div className="mb-2">
                <Input
                  {...register("receiver_name")}
                  placeholder="Nom Complet"
                  className={clsx(
                    "border",
                    errors.receiver_name ? "border-pink-600" : "border-gray-300"
                  )}
                />
                {errors.receiver_name && (
                  <small className="text-pink-600">
                    {errors.receiver_name.message as string}
                  </small>
                )}
              </div>
              <div className="mb-2">
                <Input
                  {...register("receiver_phone_number")}
                  placeholder="Numéro de téléphone"
                  className={clsx(
                    "border",
                    errors.receiver_phone_number
                      ? "border-pink-600"
                      : "border-gray-300"
                  )}
                />
                {errors.receiver_phone_number && (
                  <small className="text-pink-600">
                    {errors.receiver_phone_number.message as string}
                  </small>
                )}
              </div>
              <div className="mb-2">
                <Input
                  {...register("receiver_email")}
                  placeholder="Email"
                  className={clsx(
                    "border",
                    errors.receiver_email
                      ? "border-pink-600"
                      : "border-gray-300"
                  )}
                />
                {errors.receiver_email && (
                  <small className="text-pink-600">
                    {errors.receiver_email.message as string}
                  </small>
                )}
              </div>
              <div className="mb-2">
                <Input
                  {...register("receiver_adress")}
                  placeholder="Adresse Domicile"
                  className={clsx(
                    "border",
                    errors.receiver_adress
                      ? "border-pink-600"
                      : "border-gray-300"
                  )}
                />
                {errors.receiver_adress && (
                  <small className="text-pink-600">
                    {errors.receiver_adress.message as string}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">
              Détails de l'expédition
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir type d'envoi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EXPRESS">Express</SelectItem>
                        <SelectItem value="FREIGHT">Freight</SelectItem>
                        <SelectItem value="GP">GP</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <small className="text-pink-600">{errors.type.message}</small>
                )}
              </div>

              <div>
                <Input
                  {...register("description")}
                  placeholder="Description"
                  className={clsx(
                    "border",
                    errors.description ? "border-pink-600" : "border-gray-300"
                  )}
                />
                {errors.description && (
                  <small className="text-pink-600">
                    {errors.description.message as string}
                  </small>
                )}
              </div>
              <div>
                <Input
                  {...register("weight", { valueAsNumber: true })}
                  placeholder="Poids (kg)"
                  className={clsx(
                    "border",
                    errors.weight ? "border-pink-600" : "border-gray-300"
                  )}
                />
                {errors.weight && (
                  <small className="text-pink-600">
                    {errors.weight.message as string}
                  </small>
                )}
              </div>
              <div>
                <Input
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Prix de l'expedition"
                  className={clsx(
                    "border",
                    errors.price ? "border-pink-600" : "border-gray-300"
                  )}
                />
                {errors.price && (
                  <small className="text-pink-600">
                    {errors.price.message as string}
                  </small>
                )}
              </div>
              <div>
                <Input
                  {...register("estimatedValue", { valueAsNumber: true })}
                  placeholder="Valeur estimée du colis"
                  className={clsx(
                    "border",
                    errors.estimatedValue
                      ? "border-pink-600"
                      : "border-gray-300"
                  )}
                />
                {errors.estimatedValue && (
                  <small className="text-pink-600">
                    {errors.estimatedValue.message as string}
                  </small>
                )}
              </div>

              <div className="flex items-center">
                <div>
                  <Input
                    {...register("origin")}
                    placeholder="Provenance"
                    className={clsx(
                      "border",
                      errors.origin ? "border-pink-600" : "border-gray-300"
                    )}
                  />
                  {errors.origin && (
                    <small className="text-pink-600">
                      {errors.origin.message as string}
                    </small>
                  )}
                </div>
                <ArrowRightIcon className="mx-2" />
                <div>
                  <Input
                    {...register("destination")}
                    placeholder="Destination"
                    className={clsx(
                      "border",
                      errors.destination ? "border-pink-600" : "border-gray-300"
                    )}
                  />
                  {errors.destination && (
                    <small className="text-pink-600">
                      {errors.destination.message as string}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin text-secondary" />
              ) : (
                "Créer l'expedition"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
