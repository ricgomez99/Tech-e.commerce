import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try{
    const userSales = await prisma.sale.findMany({
        where:{
            userId: id?.toString()
        }
    })
    res.status(200).json(userSales)
  } catch (error) {
    if(error instanceof Error){
    return res.status(400).json({ message: error.message });
    }
    else return res.status(404).json({message: "error not found"})
  }
}