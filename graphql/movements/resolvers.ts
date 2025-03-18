import prisma from "@/lib/prisma";

const Movement = {
  Query: {
    movements: async () =>
      await prisma.movement.findMany({ include: { user: true } }),
  },
  Mutation: {
    addMovement: async (_: any, { concept, amount, userId }: any) => {
      return await prisma.movement.create({
        data: { concept, amount, userId },
      });
    },
  },
};

export { Movement }