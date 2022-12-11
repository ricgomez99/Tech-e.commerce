<<<<<<< HEAD
import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
=======
import NextAuth from "next-auth";
>>>>>>> 65ef5e42233b600bf2ff19a3f24211269f9c6b68
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "lib/prisma";
import CredentialProviders from "next-auth/providers/credentials"
import { compare } from "bcryptjs";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
<<<<<<< HEAD
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      // version: "2.0"
    }),
    // CredentialProviders({
    //   id: "credentials",
    //   name: 'Credentials',
    //   // credentials: {
    //   //   email: { label: "Email", type: "email", placeholder: "email" },
    //   //   password: {  label: "Password", type: "password" }
    //   // },
    //   authorize: async (credentials): Promise<any> => {
    //     const result = await prisma.user.findUnique({
    //       where: {
    //         email: credentials?.email,
    //       },
    //     });
    //     if (!result) {
    //       throw new Error('No user was found with that email. Please sign up.');
    //     }
    //     let checkPassword;
    //     if (credentials?.password && result.password) {
    //       checkPassword = compare(credentials?.password, result.password);
    //     }

    //     if (!checkPassword) {
    //       throw new Error("The password does not match");
    //     }
    //     if (!checkPassword || result.email !== credentials?.email) {
    //       throw new Error('Username or password does not match.')
    //     }
    //     return result
    //   },

    //   credentials: undefined
    // })
    ]
};

export default NextAuth(authOptions)
=======
    }), 
  ],
});
>>>>>>> 65ef5e42233b600bf2ff19a3f24211269f9c6b68
