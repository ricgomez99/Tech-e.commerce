import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { state } = req.body;
    const { id } = req.query;
    try{
        const currentState = await prisma.sale.update({
            where: {id: Number(id)},
            data: {state: state}
        })
        res.status(201).send(currentState)
    }  catch (error) {
        if(error instanceof Error){
        return res.status(400).json({ message: error.message });
        }
        else return res.status(404).json({message: "error not found"})
      }
    }
