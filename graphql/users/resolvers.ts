import { requireAdmin } from "@/lib/authMiddleware";
import prisma from "@/lib/prisma";
import { UserUpdateInput } from "@/types";
import { Context } from "@apollo/client";

const User = {
  Query: {
    users: async (_: any, __: any, context: Context) => {
      //Only administators can see all users
      requireAdmin(context);
      return await prisma.user.findMany();
    },
  },

  Mutation: {
    updateUser: async (_: any, { input }: { input: UserUpdateInput }, context: Context) => {
      requireAdmin(context);
  
      return await prisma.user.update({
        where: { id: input.id }, 
        data: { name: input.name, role: input.role },
      });
    },
  },
};

export { User }