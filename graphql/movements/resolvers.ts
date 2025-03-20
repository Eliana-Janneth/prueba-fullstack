import prisma from "@/lib/prisma";
import { CreateMovement } from "@/types";
import { Context } from "@apollo/client";
import { ApolloError } from "apollo-server-micro";
import { requireAuth, requireAdmin } from "@/lib/authMiddleware";
import { MovementType } from "@prisma/client";

const Movement = {
  Query: {
    movements: async (
      _: any,
      { type, skip = 0, take = 10 }: { type?: MovementType; skip: number; take: number }, context: Context
    ) => {

      requireAuth(context);

      //if user is ADMIN return all movements, if not return only the movements of the user
      const filter = context.session.user.role === "ADMIN" ? {} : { userId: context.session.user.id };

      return await prisma.movement.findMany({
        where: { ...filter, ...(type ? { type } : {}) },
        skip,
        take,
        include: { user: true },
        orderBy: { date: "desc" },
      });
    },

    movementsCount: async (_: any, { type }: { type?: MovementType }, context: Context) => {
      requireAuth(context);

      const filter = context.session.user.role === "ADMIN" ? {} : { userId: context.session.user.id };

      return await prisma.movement.count({
        where: { ...filter, ...(type ? { type } : {}) },
      });
    },
  },

  Mutation: {
    addMovement: async (_: any, { concept, amount, type, userId }: CreateMovement, context: Context) => {
      requireAdmin(context);

      return await prisma.movement.create({
        data: {
          concept, amount, type, user: { connect: { id: userId } }, 
        },
        include: { user: true }, 
      });
    },
  },
};

export { Movement };
