import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerGetUniqueUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email?.toString()
      },
    });
    return res.status(200).json(findUser);
  } catch (error) {
    return res.status(404).json({ message: "No users found" });
  }
}
