import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerCreateSale(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { total, date, userId } = req.body;
  try {
    const creation = await prisma.sale.create({
      data: {
        total: total,
        date: date,
        userId: userId,
      },
    });
    return res.status(200).json(creation);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Cannot create sale");
  }
}
