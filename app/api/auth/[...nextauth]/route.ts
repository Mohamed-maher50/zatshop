import { AUTH_LINKS_ENUM } from "@/constants/Links";
import { Login } from "@/features/auth/api";
import { loginSchema } from "@/lib/zod/authSchema";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const NextAuthOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = loginSchema.parse(credentials);
        const { data } = await Login(result);
        const user = data.data;
        if (!["user"].includes(user.role))
          throw new Error(`you can't access this page `);
        return {
          role: user.role,
          email: user.email,
          name: user.name,
          id: user._id,
          accessToken: data.token,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: AUTH_LINKS_ENUM.SIGNIN_PAGE,
  },
};
const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
