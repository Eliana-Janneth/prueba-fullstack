import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") return <p>Cargando...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (isLogin) {
      // 🔹 Iniciar sesión con credenciales
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) setError("Credenciales incorrectas");
      else router.push("/");
    } else {
      // 🔹 Registrar usuario (llamada a API)
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Error en el registro");

        await signIn("credentials", { email, password });
      } catch (err) {
        setError("Error en el registro, intenta con otro email.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
      <h1 className="text-2xl font-bold">{isLogin ? "Iniciar Sesión" : "Registrarse"}</h1>
      <p className="mt-2 text-gray-600 text-center">
        {isLogin ? "Accede con tu cuenta" : "Crea una nueva cuenta"}
      </p>

      {/* Botón de Inicio con Auth0 */}
      <button
        onClick={() => signIn("auth0")}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        {isLogin ? "Iniciar sesión con Auth0" : "Registrarse con Auth0"}
      </button>

      <div className="w-full max-w-sm mt-6 bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Email */}
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Contraseña */}
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Botón para enviar el formulario */}
          <Button type="submit">{isLogin ? "Iniciar Sesión" : "Registrar"}</Button>
        </form>

        {/* Alternar entre Login y Registro */}
        <p className="mt-4 text-sm text-center">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button
            className="text-blue-600 ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
