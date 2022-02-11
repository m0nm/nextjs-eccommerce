import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },

  adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialsProvider({
      credentials: {},

      async authorize(credentials, req) {
        const res = await fetch(`${process.env.SERVER}/api/login`, {
          method: "POST",
          body: JSON.stringify({
            email: req.body?.email,
            password: req.body?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (res.status === 200) {
          return user;
        } else {
          return;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },
});
