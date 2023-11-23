import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(request) {
  const { priceId, quantity } = await request.json();

  const stripe = new Stripe(process.env.STRIPE_API_SECRET);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: quantity,
      },
    ],
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/configurator",
  });

  return NextResponse.json({
    url: session.url,
  });
}
