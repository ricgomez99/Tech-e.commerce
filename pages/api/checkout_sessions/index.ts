import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15"
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { quantity } = req.body
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Papita.jpg',
              images:['https://media.tenor.com/PZTvw4FUaTcAAAAM/le%C5%9F.gif'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Banana',
              images:['https://media.tenor.com/4_E21LSI0ogAAAAj/banana-cheerer.gif'],
            },
            unit_amount: 500,
          },
          quantity: 2,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              
              name: 'Mouse',
              images: ["https://http2.mlstatic.com/D_NQ_NP_2X_979137-MLA44255818618_122020-F.webp"],
            },
            unit_amount: 1500,
          },
          quantity: 1,
        },
        {
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],
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
