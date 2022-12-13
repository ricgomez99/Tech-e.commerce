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
  }  catch (error) {
    if(error instanceof Error){
    return res.status(400).json({ message: error.message });
    }
    else return res.status(404).json({message: "error not found"})
  }
}