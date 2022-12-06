import { prisma  } from "lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerFindManySales(req: NextApiRequest, res: NextApiResponse) {
    try {
        
        const sales = await prisma.sale.findMany(
                {
            select: {
               id: true,
               total: true,
               date: true,
               state: true,
               user:{
                select: {
                    id: true,
                    email: true,
                    username: true,
                    role:true
                
               }},
               userId: true,

            }
        }
        )
        return res.status(200).json(sales);
    } catch (error) {
        console.log(error)
        return res.status(400).send("Cannot get sales");
    }
}