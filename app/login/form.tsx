"use client";

import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define the form schema
const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(2, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Set up react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        toast({
          title: "Erreur d'authentification",
          description:
            "Identifiants incorrects. Veuillez vérifier votre email et mot de passe.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    }
  };

  const input_style =
    "form-control block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Image width={100} height={100} src="/jumper.png" alt="ddjfuffu" />
      <section>
        <h1 className="text-xl font-bold sm:text-2xl">
          Bienvenue sur Jumper Back Office
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
          Connectez-vous pour accéder à vos outils de gestion, suivre vos
          commandes, et gérer facilement toutes les opérations liées à votre
          entreprise.
        </p>
      </section>

      <div className="mb-6">
        <input
          {...register("email")}
          type="email"
          placeholder="Email address"
          className={`${input_style} ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-6 relative">
        <input
          {...register("password")}
          type={isHidden ? "password" : "text"}
          placeholder="Password"
          className={`${input_style} ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
        <button
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="absolute right-2 cursor-pointer top-3"
        >
          {isHidden ? (
            <Eye className="w-5 h-5 text-gray-500" />
          ) : (
            <EyeOff className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
      <Button
        type="submit"
        variant={"secondary"}
        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm leading-snug uppercase rounded shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "loading..." : "Connexion"}
      </Button>
    </form>
  );
};
