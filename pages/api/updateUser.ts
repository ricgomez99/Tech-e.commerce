import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerUpdateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { role, active } = req.body;
  const { id } = req.query;
  
  try {
    const user = await prisma.user.update({
     where: {id: id?.toString()},
      data: {
        role: role,
        active: active
      },
    });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).json({ message: "It's not working" });
  }
}

