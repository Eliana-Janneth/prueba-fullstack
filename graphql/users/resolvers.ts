import prisma from "@/lib/prisma";

const User = {
  Query: {
    users: async () => {
      const users = await prisma.user.findMany();
      return users;
    },
    user: async (_: any, { email }: any) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    }
  },
  Mutation: {
    updateUser: async (_: any, { input }: any) => {
      const { name, role, id } = input;
      if (role !== "ADMIN" || role !== "USER") {
        throw new Error("Invalid role");
      }
      const user = await prisma.user.update({
        where: { id },
        data: { name, role },
      });
      return user;
    }
  }

}

export { User }