import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(id as string, {expand: ['payment_intent', ]})
    res.status(200).json({ session })

  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}