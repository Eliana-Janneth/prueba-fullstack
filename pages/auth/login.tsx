"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FormLogin from "@components/auth/LoginForm";
import { useAlertStore } from "@/hooks/useAlertStore";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setAlert } = useAlertStore();

  useEffect(() => {
    if (session) {
      setAlert("Sesión iniciada, redirigiendo...");
      router.push("/");
    }
  }, [session, router, setAlert]);

  if (status === "loading") return <p>Cargando...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
      <p className="mt-2 text-gray-600 text-center">Accede con tu cuenta</p>
      <FormLogin />
    </div>
  );
}
