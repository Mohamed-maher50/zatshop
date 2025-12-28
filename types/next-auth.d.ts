import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken?: string;
    role: "user" | "admin" | "manager";
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "admin" | "manager";
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "user" | "admin" | "manager";
    accessToken: string;
  }
}
