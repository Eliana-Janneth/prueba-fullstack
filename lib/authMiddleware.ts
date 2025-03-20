import { ApolloError } from "apollo-server-micro";

export function requireAuth(context: any) {
  if (!context.session || !context.session.user) {
    throw new ApolloError("Unauthorized", "UNAUTHORIZED");
  }
}

export function requireAdmin(context: any) {
  requireAuth(context);
  if (context.session.user.role !== "ADMIN") {
    throw new ApolloError("Forbidden", "FORBIDDEN");
  }
}
