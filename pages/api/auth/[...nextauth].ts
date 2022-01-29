import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  secret: process.env.SECERT,

  jwt: { secret: process.env.SECRET },

  providers: [
    CredentialsProvider({
      credentials: {},

      async authorize(credentials) {
        const res = await fetch(`${process.env.SERVER}/api/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
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
