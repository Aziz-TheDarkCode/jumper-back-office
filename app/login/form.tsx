"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Button } from "../components/ui/button";

export const LoginForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError(
          "Wrong credentials. Please check your username and password and try again."
        );
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control  block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Image width={100} height={100} src="/jumper.png" alt="ddjfuffu" />
      {error && (
        <p className="bg-pink-100 text-pink-500 p-3 text-sm  mb-6 rounded">
          {error}
        </p>
      )}
      <section>
        <h1 className="text-xl font-bold sm:text-2xl">
          Bienvenue sur Jumper Back Office
        </h1>
        <p className="mx-auto t mt-4 max-w-md text-sm  text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, dolor
          consequatur ullam officiis repudiandae fugit distinctio molestiae
        </p>
      </section>

      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>
      <Button
        type="submit"
        variant={"secondary"}
        // className=""
        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm leading-snug uppercase rounded shadow-md  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "loading..." : "Connexion"}
      </Button>
    </form>
  );
};
