import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerGetUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const findUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        name: true

      },
    });
    return res.status(200).json(findUsers);
  } catch (error) {
    return res.status(404).json({ message: "No users found" });
  }
}
