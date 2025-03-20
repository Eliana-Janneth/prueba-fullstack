import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface SessionUser {
  role: string;
}
export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user as SessionUser | undefined;

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  return {
    session,
    isLoading: status === "loading",
    isAdmin: user?.role === "ADMIN",
    isUser: user?.role === "USER",
  };
}
