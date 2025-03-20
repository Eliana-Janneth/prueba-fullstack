import prisma from "@/lib/prisma";
import { UpdateUser } from "@/types";
import { Context } from "@apollo/client";
import { ApolloError } from "apollo-server-micro";

const User = {
  Query: {
    users: async (_: any, __: any, context: Context) => {

      //Only administators can see all users
      if (!context.session || context.session.user.role !== "ADMIN") {
        throw new ApolloError("Forbidden", "FORBIDDEN");
      }

      return await prisma.user.findMany();
    },
  },

   Mutation: {
    updateUser: async (_: any, { input }: UpdateUser, context: Context) => {
      const { name, role, id } = input;

      if (!context.session || context.session.user.role !== "ADMIN") {
        throw new ApolloError("Forbidden", "FORBIDDEN");
      }

      if (!["ADMIN", "USER"].includes(role)) {
        throw new ApolloError("Invalid role", "BAD_REQUEST");
      }

      return await prisma.user.update({
        where: { id },
        data: { name, role },
      });
    },
  },
};

export { User }