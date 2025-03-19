import prisma from "@/lib/prisma";

const Movement = {
    Query: {
      movements: async (
        _: any,
        { type, skip = 0, take = 10 }: { type?: string; skip: number; take: number }
      ) => {
        return await prisma.movement.findMany({
          where: type ? { type } : undefined,
          skip,
          take,
          include: { user: true },
          orderBy: { date: "desc" },
        });
      },
  
      movementsCount: async (_: any, { type }: { type?: string }) => {
        return await prisma.movement.count({
          where: type ? { type } : undefined,
        });
      },
    },
  

  Mutation: {
    addMovement: async (_: any, { concept, amount, type, userId }: any) => {
      return await prisma.movement.create({
        data: { concept, amount, type, userId },
      });
    },
  },
};

export { Movement };
