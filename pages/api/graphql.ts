import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import prisma from "@/lib/prisma";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    role: String!
  }

  type Movement {
    id: ID!
    concept: String!
    amount: Float!
    date: String!
    user: User!
  }

  type Query {
    users: [User]
    movements: [Movement]
  }

  type Mutation {
    addMovement(concept: String!, amount: Float!, userId: String!): Movement
  }
`;

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    movements: async () => await prisma.movement.findMany({ include: { user: true } }),
  },
  Mutation: {
    addMovement: async (_: any, { concept, amount, userId }: any) => {
      return await prisma.movement.create({
        data: { concept, amount, userId },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);
