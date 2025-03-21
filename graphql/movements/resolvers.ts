import prisma from "@/lib/prisma";
import { MovementInput } from "@/types";
import { Context } from "@apollo/client";
import { requireAuth, requireAdmin } from "@/lib/authMiddleware";
import { MovementType } from "@prisma/client";

const Movement = {
  Query: {
    movements: async (
      _: any,
      { type, skip = 0, take = 10 }: { type?: MovementType; skip: number; take: number }, context: Context
    ) => {

      requireAuth(context);

      return await prisma.movement.findMany({
        where: type ? { type } : {}, 
        skip,
        take,
        include: { user: true },
        orderBy: { date: "desc" },
      });
    },

    allMovements: async (_: any, __: any, context: Context) => {
      requireAuth(context);
      const filter =
        context.session.user.role === "ADMIN"
          ? {}
          : { userId: context.session.user.id };
    
      return await prisma.movement.findMany({
        where: filter,
        include: { user: true },
        orderBy: { date: "asc" },
      });
    },

    movementsCount: async (_: any, { type }: { type?: MovementType }, context: Context) => {
      requireAuth(context);

      const filter = context.session.user.role === "ADMIN" ? {} : { userId: context.session.user.id };

      return await prisma.movement.count({
        where: { ...filter, ...(type ? { type } : {}) },
      });
    },

    balanceTotal: async (_: any, __: any, context: Context) => {
      requireAuth(context);

      const ingresos = await prisma.movement.aggregate({
        where: { type: "INCOME" },
        _sum: { amount: true },
      });

      const egresos = await prisma.movement.aggregate({
        where: { type: "EXPENSE" },
        _sum: { amount: true },
      });

      const totalIngresos = ingresos._sum.amount || 0;
      const totalEgresos = egresos._sum.amount || 0;

      return {
        ingresos: totalIngresos,
        egresos: totalEgresos,
        balance: Number(totalIngresos) - Number(totalEgresos),
      };
    },
  },

  Mutation: {
    addMovement: async (_: any, { input }: { input: MovementInput }, context: Context) => {
      requireAdmin(context);

      return await prisma.movement.create({
        data: {
          concept: input.concept,
          amount: input.amount,
          type: input.type as MovementType, 
          user: { connect: { id: input.userId } },
          date: input.date ? new Date(input.date) : new Date(), 
        },
        include: { user: true },
      });
    },
  },
};

export { Movement };
