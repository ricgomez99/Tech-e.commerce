import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerUpdateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, username } = req.body;
  const { id } = req.query;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email: email,
        password: password,
        username: username,
      },
    });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).json({ message: "It's not working" });
  }
}
