import Stripe from "stripe";

/**
 * Server-side Stripe client.
 * Only import this in server components or API routes — never in client code.
 */

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is not set. Add it to your .env file. " +
      "Get test keys from https://dashboard.stripe.com/test/apikeys"
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover",
  typescript: true,
});
