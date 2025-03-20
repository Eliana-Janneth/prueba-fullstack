import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, createAuth0User, getAuth0UserByEmail } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // 🔹 Obtener el token de acceso para Auth0
    const accessToken = await getAccessToken();

    // 🔹 Verificar si el usuario ya existe en Auth0
    let auth0User = await getAuth0UserByEmail(accessToken, email);

    if (!auth0User) {
      // 🔹 Crear usuario en Auth0 si no existe
      auth0User = await createAuth0User(accessToken, {
        email,
        password,
        name,
        connection: "Username-Password-Authentication",
      });
    }

    // 🔹 Verificar si el usuario ya está en Prisma (Base de Datos)
    let dbUser = await prisma.user.findUnique({ where: { email } });

    if (!dbUser) {
      // 🔹 Hashear la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // 🔹 Guardar el usuario en la BD
      dbUser = await prisma.user.create({
        data: {
          email,
          name,
          phone: phone || null,
          password: hashedPassword, 
          role: Role.USER,  
        },
      });
    }

    return res.status(201).json({ message: "Usuario registrado con éxito", user: dbUser });
  } catch (error: any) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
