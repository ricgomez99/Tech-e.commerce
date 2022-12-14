// @ts-nocheck

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "lib/prisma";
import { compare } from "bcryptjs";
import CredentialsProvider from 'next-auth/providers/credentials'
interface cli {
  clientId: string;
  clientSecret: string;
}

export const authOptions: NextAuthOptions = {
  session:{
    strategy: "jwt"
  },

  adapter: PrismaAdapter(prisma),
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials){
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })
        if(!user){
          throw new Error("There's no user with this email, you could try another one, or please sing up")
        }

        const passwordCompare = compare( credentials?.password, user.password);

        if(!passwordCompare){
          throw new Error("Incorrect password");
        }

        if(!passwordCompare || user.email !== credentials.email){
          throw new Error("You must enter valid email or password");
        }
        // if(credentials?.email === "juan@gmail.com" && credentials?.password === "test"){
        //   return {
        //     email: "juan@gmail.com",
        //     password: "test"
        //   }
        // } 
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as cli),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({token, user}) => {
      if(user){
        token.id = user.id
      }
      return token;
    },

    session: async ({ token, session }) => {
     if(token){
      session.id = token.id;
     }
      return session;
    },
}
}
export default NextAuth(authOptions);
