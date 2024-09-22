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
import { PlusIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Zod Schema for User Input Validation
const userSchema = z.object({
  fullName: z.string().min(1, "Le nom complet est requis"),
  phoneNumber: z
    .string()
    .regex(
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
      "Veuillez entrer un numéro correct. Préciser l'indicatif du pays"
    ),
  email: z.string().min(1, "Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(["SHIPPING_AGENT", "ADMIN", "USER"]),
});

export default function NewUserModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: any) => {
      try {
        const response = await axios.post("/api/users", data);
      setLoading(true);
      toast({
        title: "Succès",
        description: "L'utilisateur a été créé avec succès",

      });
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de l'utilisateur",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Ajouter un nouveau utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl h-[500px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="mb-2">
            Ajout d'un nouveau utilisateur
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Input
                {...register("fullName")}
                placeholder="Nom Complet"
                className={clsx(
                  "border",
                  errors.fullName ? "border-pink-600" : "border-gray-300"
                )}
              />
              {errors.fullName && (
                <small className="text-pink-600">
                  {errors.fullName.message as string}
                </small>
              )}
            </div>
            <div>
              <Input
                {...register("phoneNumber")}
                placeholder="Numéro de téléphone"
                className={clsx(
                  "border",
                  errors.phoneNumber ? "border-pink-600" : "border-gray-300"
                )}
              />
              {errors.phoneNumber && (
                <small className="text-pink-600">
                  {errors.phoneNumber.message as string}
                </small>
              )}
            </div>
            <div>
              <Input
                {...register("email")}
                placeholder="Email"
                className={clsx(
                  "border",
                  errors.email ? "border-pink-600" : "border-gray-300"
                )}
              />
              {errors.email && (
                <small className="text-pink-600">
                  {errors.email.message as string}
                </small>
              )}
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Mot de passe"
                className={clsx(
                  "border",
                  errors.password ? "border-pink-600" : "border-gray-300"
                )}
              />
              {errors.password && (
                <small className="text-pink-600">
                  {errors.password.message as string}
                </small>
              )}
            </div>
            <div>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={clsx(
                        "border",
                        errors.role ? "border-pink-600" : "border-gray-300"
                      )}
                    >
                      <SelectValue placeholder="Choisir le rôle de l'utilisateur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SHIPPING_AGENT">Agent</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="USER">Gestionnaire</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <small className="text-pink-600">
                  {errors.role.message as string}
                </small>
              )}
            </div>
          </div>
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
                "Ajouter"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
