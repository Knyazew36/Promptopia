import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      session.user.id = sessionUser.id;

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await prisma.$connect();
        const userExists = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            },
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
