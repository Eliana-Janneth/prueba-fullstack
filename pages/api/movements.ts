import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const movements = await prisma.movement.findMany({
      include: { user: true },
    });
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movements", details: error });
  }
}
