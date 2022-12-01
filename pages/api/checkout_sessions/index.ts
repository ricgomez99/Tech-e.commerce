import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const line_items = req.body
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/payment`
    })
    res.status(200).json({ sessionId: session.id })

  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}
