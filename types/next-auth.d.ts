import NextAuth, { DefaultUser, DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    role: UserRole;
  }

  interface Session {
    token: { role: UserRole };
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}
