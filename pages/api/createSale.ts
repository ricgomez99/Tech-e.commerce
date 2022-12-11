import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handlerCreateSale(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { total, date, userId } = req.body;
  //!in order create the sale, you must pass by date an constant with new Date()
  //! and then pass that constant like date.toISOString()
  //? just like this => new Date().toISOString()

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
