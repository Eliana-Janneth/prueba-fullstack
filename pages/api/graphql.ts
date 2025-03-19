import { ApolloServer } from 'apollo-server-micro';
import { customTypes } from "@graphql/types";
import { customResolvers } from "@graphql/resolvers";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { PrismaClient } from "@prisma/client";
import Cors from "micro-cors";
import { ServerResponse, IncomingMessage } from "http";
import prisma from "@lib/prisma";

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
});

interface Context {
  prisma: PrismaClient;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const functionHandler = async (req: MicroRequest, res: ServerResponse<IncomingMessage>) => {
  const apolloServer = new ApolloServer({
    context: (): Context => ({ prisma }),
    typeDefs: [...customTypes],
    resolvers: [...customResolvers],
    persistedQueries: false, // This disables persisted queries
    cache: 'bounded', // This sets up a bounded cache
    introspection: process.env.NODE_ENV !== 'production',
  });
  const startServer = apolloServer.start();
  await startServer;
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  return functionHandler(req, res);
});