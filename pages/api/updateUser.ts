import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { number, string } from "yup";

export default async function handlerUpdateUser(req: NextApiRequest, res: NextApiResponse) {
    const {email, password, username, id} = req.body;
    try {
        console.log("entra")
const creation = prisma.user.update
      console.log("creation")
     return res.status(200).send(creation)
    } catch (error) {
      return res.status(400).json({message: "It's not working"})
    }
}