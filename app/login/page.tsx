import { Suspense } from "react";
import { LoginForm } from "./form";
// import Header from "@/components/header.component";

export default function LoginPage() {
  return (
    <>
      {/* <Header /> */}
      <section className="bg-ct-blue-600  min-h-screen">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12  lg:w-5/12 bg-white rounded-sm shadow-sm border-[1.4px] px-8 py-10">
            <Suspense fallback={<>Loading...</>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
