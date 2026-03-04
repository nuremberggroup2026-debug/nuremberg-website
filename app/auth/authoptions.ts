import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { login, register } from "../server/users/services";

interface User {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  password?: string;
  role: string;
  token: string;
}

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName?: string | null;
    email: string;
    password?: string;
    role: string;
    token: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    role: string;
    email: string;
    token: string;
  }
}

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 15, // 15 days
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        if (!email || !password) return null;

        const result = await login({ email, password });
        if (!result.success || !result.data) return null;

        return {
          id: result.data.id,
          firstName: result.data.first_name,
          lastName: result.data.last_name,
          email: result.data.email,
          role: result.data.role,
          token: result.data.token,
        } as User;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // ✅ Handles JWT creation and updates
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === "google") {
          const firstName = user.name?.split(" ")[0] || "";
          const lastName = user.name?.split(" ")[1] || "";

          // Fetch user from DB
          let dbUser = await prisma.users.findUnique({
            where: { email: user.email },
            select: {
              id: true,
              first_name: true,
              email: true,
              role: true,
            },
          });

          // If not exists, register
          if (!dbUser) {
            const registerResult = await register({
              first_name: firstName,
              last_name: lastName,
              email: user.email!,
              password: crypto.randomUUID(),
            });

            if (!registerResult.data || registerResult.data.id === undefined) {
              throw new Error("Failed to register Google user");
            }

            dbUser = registerResult.data;
          }

          // Use DB user ID and role
          const backendToken = jwt.sign(
            {
              user_id: dbUser.id,
              role: dbUser.role,
              name: firstName,
            },
            process.env.NEXTAUTH_SECRET as string,
            { expiresIn: "15d" }
          );

          token.id = dbUser.id ?? "";
          token.firstName = firstName;
          token.role = dbUser.role;
          token.token = backendToken;
        } else {
          // Credentials provider
          token.id = user.id;
          token.firstName = user.firstName;
          token.role = user.role;
          token.token = user.token;
        }
      }
      return token;
    },

    // ✅ Always fetches latest role from DB
    async session({ session, token }) {
      if (session.user) {
        try {
          console.log("token: ", token.id);
          const result = await prisma.users.findUnique({
            where: { email: token.email },
            select: { id: true, first_name: true, role: true },
          });

          const latestRole = result?.role || token.role;
          const dbId = result?.id || token.id;
          session.user.id = dbId;
          session.user.firstName = token.firstName;
          session.user.role = latestRole;
          session.user.token = token.token;
        } catch (err) {
          console.error("Error fetching user role:", err);
          // fallback to old token role
          session.user.role = token.role;
        }
      }
      return session;
    },
  },

  // ✅ Ensure Google users exist in DB
  events: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.users.findUnique({
            where: { email: user.email },
          });

          if (existingUser?.email === undefined) {
            await register({
              first_name: user.name?.split(" ")[0] || "",
              last_name: user.name?.split(" ")[1] || "",
              email: user.email!,
              password: crypto.randomUUID(), // random password for Google users
            });
          }
        } catch (err) {
          console.error("Error registering Google user:", err);
        }
      }
    },
  },
};
