import { AUTH_LINKS_ENUM } from "@/constants/Links";
import { Login } from "@/features/auth/api";
import api from "@/lib/axios";
import { loginSchema } from "@/lib/zod/authSchema";
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const NextAuthOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
    redirect: async ({ url, baseUrl }) => {
      const isRelativeUrl = url.startsWith("/");
      if (isRelativeUrl) {
        return `${baseUrl}${url}`;
      }

      const isSameOriginUrl = new URL(url).origin === baseUrl;
      const alreadyRedirected = url.includes("callbackUrl=");
      if (isSameOriginUrl && alreadyRedirected) {
        const originalCallbackUrl = decodeURIComponent(
          url.split("callbackUrl=")[1]
        );

        return originalCallbackUrl;
      }

      if (isSameOriginUrl) {
        return url;
      }

      return baseUrl;
    },
    jwt({ token, user }) {
      console.log(user);
      console.log(token);
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
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        const { data: dbUser } = await api.post("/auth/google", {
          id_token: account.id_token,
        });
        if (!dbUser) return false;
        const { data, token } = dbUser;
        if (user) {
          user.id = data._id;
          user.role = data.role;
          user.accessToken = token;
          return true;
        }
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: AUTH_LINKS_ENUM.SIGNIN_PAGE,
  },
  debug: true,
};
const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
