import { NextResponse } from "next/server";
import { Stripe } from "stripe";
export const revalidate = 0;

export async function GET(request) {
  const stripe = new Stripe(process.env.STRIPE_API_SECRET);
  const prices = await stripe.prices.list({ active: true });
  return NextResponse.json(prices.data);
}
