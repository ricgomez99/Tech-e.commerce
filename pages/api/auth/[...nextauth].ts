import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "lib/prisma";
interface cli {
  clientId: string
  clientSecret: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as cli),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
}

export default NextAuth(authOptions)