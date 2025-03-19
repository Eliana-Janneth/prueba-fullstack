import prisma from "@/lib/prisma";

const Movement = {
  Query: {
    movements: async (_: any, { type }: { type?: string }) => {
      return await prisma.movement.findMany({
        where: type ? { type } : {},
        orderBy: { date: "asc" },
        include: { user: true },
      });
    }
  },
  Mutation: {
    addMovement: async (_: any, { concept, amount, type,userId }: any) => {
      return await prisma.movement.create({
        data: { concept, amount, type, userId },
      });
    },
  },
};

export { Movement }