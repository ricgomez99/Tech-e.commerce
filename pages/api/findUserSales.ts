import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try{
    const userSales = await prisma.sale.findMany({
        where:{
            userId: Number(id)
        }
    })
    res.status(200).json(userSales)
  }catch(err){
    res.status(400).send("not found")
  }
}