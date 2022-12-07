import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handlerCreateDetailSale(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, price, idProduct, saleId } = req.body;
  try {
    const creation = await prisma.saleDetail.create({
      data: {
        amount,
        price,
        idProduct,
        saleId,
      },
    });
    return res.status(200).send(creation);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "It's not working" });
  }
}
