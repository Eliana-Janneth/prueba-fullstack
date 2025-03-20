import { useSession } from "next-auth/react";
import { DefaultUser } from "next-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
interface SessionUser extends DefaultUser {
  id: string;
  role: string;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user as SessionUser | null | undefined;
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  return {
    session,
    isLoading: status === "loading",
    isAdmin: user?.role === "ADMIN",
    isUser: user?.role === "USER",
    userId: user?.id || ""
  };
}
