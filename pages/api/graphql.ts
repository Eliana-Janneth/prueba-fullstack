import { ApolloServer } from "apollo-server-micro";
import { customTypes } from "@graphql/types";
import { customResolvers } from "@graphql/resolvers";
import { PrismaClient } from "@prisma/client";
import Cors from "micro-cors";
import prisma from "@lib/prisma";
import { IncomingMessage, ServerResponse } from "http";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

// Configuration of CORS for the API
const cors = Cors({
  allowMethods: ["POST", "OPTIONS", "GET", "HEAD"],
});

interface Context {
  prisma: PrismaClient;
}

// Apollo server instance
let apolloServer: ApolloServer | null = null;

// Disable body parsing for GraphQL requests 
export const config = {
  api: {
    bodyParser: false,
  },
};
async function createContext({ req, res }: { req: NextApiRequest; res: ServerResponse }) {
  const session = await getServerSession(req, res, authOptions);

  return {
    prisma, // Database connection
    session, // Authenticated user session
  };
}
/**
 * Handles GraphQL API requests using Apollo Server.
 * Ensures the server is only instantiated once.
 */
async function getApolloServer() {
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      context: ({ req, res }) => createContext({ req, res }),
      typeDefs: [...customTypes],
      resolvers: [...customResolvers],
      persistedQueries: false, // Disable persisted queries
      cache: "bounded", // Use bounded caching for performance
      introspection: process.env.NODE_ENV !== "production", //Enable introspection in development mode
    });

    await apolloServer.start();
  }
  return apolloServer;
}

// Handles API requests and routes them to Apollo Server.
export default cors(async function handler(req: MicroRequest, res: ServerResponse<IncomingMessage>) {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  const server = await getApolloServer();
  return server.createHandler({ path: "/api/graphql" })(req, res);
});
