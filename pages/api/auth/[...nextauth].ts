// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "lib/prisma";

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// });

// @ts-nocheck

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "lib/prisma";
import { compare } from "bcryptjs";
interface cli {
  clientId: string;
  clientSecret: string;
}

export const authOptions: NextAuthOptions = {

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

        const passwordCompare = await compare( credentials?.password, result.password);

        if(!passwordCompare){
          throw new Error("Incorrect password");
        }

        if(!passwordCompare || user.email !== credentials.email){
          throw new Error("You must enter valid email or password");
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as cli),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  //   isAdmin: true,
  // },
  // pages: {
  //   signIn: '/login',
  //   // signOut:
  // },
  // callbacks: {
  //   session: async ({ token, session }) => {
  //     if (session?.user && token?.sub) {
  //       session.user.id = token.sub
  //     }
  //     //
  //     return session
  //   },
  //   jwt: async (params) => {
  //     // update token
  //     const { admin } = await prisma.user.findUnique({
  //       where: {
  //         email: params.token.email,
  //       },
  //       select: {
  //         admin: true,
  //       },
  //     })
  //     params.token.admin = admin
  //     if (params.isNewUser === true) {
  //       emailProvider(params.token.email, params.token.email)
  //     }
  //     return params.token
  //   },
  // },
};
export default NextAuth(authOptions);
