import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerGetUniqueUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  // const newId = Number(id);
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: id 
      },
    });
    return res.status(200).json(findUser);
  } catch (error) {
    return res.status(404).json({ message: "No users found" });
  }
}
