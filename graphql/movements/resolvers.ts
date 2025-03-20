import prisma from "@/lib/prisma";
import { CreateMovement } from "@/types";
import { Context } from "@apollo/client";
import { ApolloError } from "apollo-server-micro";

const Movement = {
  Query: {
    movements: async (
      _: any,
      { type, skip = 0, take = 10 }: { type?: string; skip: number; take: number }, context: Context
    ) => {

      if (!context.session) throw new ApolloError("Unauthorized", "UNAUTHORIZED");

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

    movementsCount: async (_: any, { type }: { type?: string }, context: Context) => {
      if (!context.session) throw new ApolloError("Unauthorized", "UNAUTHORIZED");

      const filter = context.session.user.role === "ADMIN" ? {} : { userId: context.session.user.id };

      return await prisma.movement.count({
        where: { ...filter, ...(type ? { type } : {}) },
      });
    },
  },

  Mutation: {
    addMovement: async (_: any, { concept, amount, type, userId }: CreateMovement, context: Context) => {
      if (!context.session || context.session.user.role !== "ADMIN") {
        throw new ApolloError("Forbidden", "FORBIDDEN");
      }

      return await prisma.movement.create({
        data: { concept, amount, type, userId },
      });
    },
  },
};

export { Movement };
