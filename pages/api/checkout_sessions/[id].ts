import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(id as string, {
      expand: ["payment_intent", "line_items"],
    });
    res.status(200).json({ session });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else return res.status(404).json({ message: "error not found" });
  }
}
