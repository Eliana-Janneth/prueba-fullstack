import { signIn, useSession } from "next-auth/react";

interface SessionUser {
  role: string;
}
export function useAuth() {
  const { data: session, status } = useSession();

  const user = session?.user as SessionUser | undefined;

  if (status === "unauthenticated") {
    signIn("auth0");
  }
  
  return {
    session,
    isLoading: status === "loading",
    isAdmin: user?.role === "ADMIN",
    isUser: user?.role === "USER",
  };
}
