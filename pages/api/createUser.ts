import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import bcryptjs from "bcryptjs";

export default async function handlerCreateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, username } = req.body;
  let passwordHash: any = await bcryptjs.hash(password, 8);
  try {
    const creation = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        username: username,
      },
    });
    console.log(creation)
    return res.status(200).send(creation);
  } catch (error) {
    return res.status(400).json({ message: "It's not working" });
  }
}
