"use server"

import { redirect } from "next/navigation"
import type Stripe from "stripe"
import { env } from "~/env"
import { stripe } from "~/services/stripe"

export const createStripeCheckout = async (
  priceId: string,
  slug: string,
  mode: Stripe.Checkout.SessionCreateParams["mode"],
) => {
  // Creates a Checkout Session object.
  const checkoutSession = await stripe.checkout.sessions.create({
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.NEXT_PUBLIC_SITE_URL}/submit/thanks?subscribed=true`,
    cancel_url: `${env.NEXT_PUBLIC_SITE_URL}/submit/${slug}?cancelled=true`,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    subscription_data: mode === "subscription" ? { metadata: { slug } } : undefined,
    payment_intent_data: mode === "payment" ? { metadata: { slug } } : undefined,
  })

  if (!checkoutSession.url) {
    throw new Error("Unable to create a new Stripe Checkout Session.")
  }

  // Redirect to the checkout session url
  redirect(checkoutSession.url)
}
