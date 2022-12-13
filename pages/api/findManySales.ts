import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerFindManySales(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sales = await prisma.sale.findMany({
      select: {
        id: true,
        total: true,
        date: true,
        state: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        userId: true,
      },
    });
    return res.status(200).json(sales);
  }  catch (error) {
    if(error instanceof Error){
    return res.status(400).json({ message: error.message });
    }
    else return res.status(404).json({message: "error not found"})
  }
}
