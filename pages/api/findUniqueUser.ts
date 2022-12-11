import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerGetUniqueUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: id?.toString()
      },
    });
    return res.status(200).json(findUser);
  } catch (error) {
    return res.status(404).json({ message: "No users found" });
  }
}
