import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerCreateSale(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { total, date, userId, state } = req.body;
  try {
    const creation = await prisma.sale.create({
      data: {
        total: total,
        date: date,
        userId: userId,
        state: state,
      },
    });
    return res.status(200).json(creation);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else return res.status(404).json({ message: "error not found" });
  }
}
