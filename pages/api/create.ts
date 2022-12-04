import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {email, password, username} = req.body;
    console.log(email, password, username)

    try {
      const creation = await prisma.user.create({
        data: {
          email: email,
          password: password,
          username: username
        }
      })
      console.log(creation)
     return res.status(200).json(creation)
    } catch (error) {
      console.log("Failure");
      return res.status(400).json({message: "It's not working"})
    }
}