import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  jwt: { secret: process.env.SECRET },

  secret: process.env.SECERT,

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

        return user;
      },
    }),
  ],
});
