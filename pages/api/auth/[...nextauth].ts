import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
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

        if (user.email) {
          return user;
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      await dbConnect();

      // add a cart property to the user object who signed up with google provider
      const googleUser = await User.findOne({ email: token?.email }).then(
        async (doc) => {
          if (!doc.cart) {
            doc.set("cart", [], Array, { strict: false });
            await doc.save();
            return doc;
          }
        }
      );

      return token;
    },
  },
});
