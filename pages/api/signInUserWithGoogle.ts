import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function signInUserWithGoogle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name } = req.body;

  try {
    const creation = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {},
      create: {
        email: email,
        name: name,
      },
    });
    console.log(creation);
    return res.status(200).send(creation);
  } catch (error) {
    return res.status(400).json({ message: "It's not working" });
  }
}
