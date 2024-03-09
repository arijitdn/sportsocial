import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config.js";
import { db } from "./lib/db.js";
import { getUserById } from "./data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  update,
  auth,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      return true;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
