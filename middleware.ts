import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login", 
  },
});

export const config = {
  matcher: [
    "/((?!api/register|api/auth/.*|auth/register|_next/.*|logo.svg).*)",
  ],
};