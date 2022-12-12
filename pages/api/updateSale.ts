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
    } catch(error){
        res.status(400).send(error)
    }


}