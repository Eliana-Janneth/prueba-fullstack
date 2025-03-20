import { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "@lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, password, name, phone } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const user = await registerUser(email, password, name, phone);

    return res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error: any) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
