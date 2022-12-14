import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const detail = await prisma.sale.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        saleDetails: {
          select: {
            id: true,
            amount: true,
            price: true,
            idProduct: true,
          },
        },
      },
    });
    res.status(200).json(detail);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else return res.status(404).json({ message: "error not found" });
  }
}
