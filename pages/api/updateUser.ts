import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerUpdateUser(req: NextApiRequest, res: NextApiResponse) {
    const {email, password, username} = req.body;
    const {id} = req.query
    try {
        console.log("entra")
const creation = prisma.user.update
      console.log("creation")
     return res.status(200).send(creation)
    } catch (error) {
      return res.status(400).json({message: "It's not working"})
    }
}