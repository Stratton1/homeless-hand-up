import Stripe from "stripe";

/**
 * Server-side Stripe client.
 * Only import this in server components or API routes — never in client code.
 *
 * During build time (e.g. on Vercel), the secret key may not be available.
 * The client is created lazily so the build doesn't crash. API routes that
 * need Stripe will fail at runtime if the key is missing — which is correct.
 */

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Add it to your .env file or Vercel environment variables. " +
          "Get test keys from https://dashboard.stripe.com/test/apikeys"
      );
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
  }
  return _stripe;
}
