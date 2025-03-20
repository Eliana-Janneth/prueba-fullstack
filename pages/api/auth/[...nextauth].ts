import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client"; 
import bcrypt from "bcrypt";


if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET || !process.env.AUTH0_ISSUER || !process.env.NEXTAUTH_SECRET) {
  throw new Error("⚠️ Falta configurar AUTH0 en el archivo .env");
}


export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      wellKnown: `https://${process.env.AUTH0_ISSUER}/`,
      authorization: `https://${process.env.AUTH0_ISSUER}/authorize?response_type=code&prompt=login`,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Correo y contraseña son obligatorios.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Usuario no encontrado.");

        if (!user.password) throw new Error("Contraseña no configurada.");
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) throw new Error("Contraseña incorrecta.");

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { role: true },
        });

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name ?? "Nuevo Usuario",
              role: Role.USER,
            },
          });
        }

        token.role = dbUser.role;
      }
      return token;
    },

    /**
     * Adds the user's role from JWT into the session object.
     */
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
