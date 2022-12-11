import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
// import bcryptjs from "bcryptjs";

export default async function handlerCreateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, username } = req.body;

  try {
    const creation = await prisma.user.create({
      data: {
        email: email,
        name: username,
      },
    });
    console.log(creation);
    return res.status(200).send(creation);
  } catch (error) {
    return res.status(400).json({ message: "It's not working" });
  }
}