import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerCreateUser(req: NextApiRequest, res: NextApiResponse) {
    const {email, password, username} = req.body;
    try {
      const creation = await prisma.user.create({
        data: {
          email: email,
          password: password,
          username: username
        }
      })
     return res.status(200).send(creation)
    } catch (error) {
      return res.status(400).json({message: "It's not working"})
    }
}
