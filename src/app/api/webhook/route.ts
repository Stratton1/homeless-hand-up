import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

/**
 * POST /api/webhook
 *
 * Stripe webhook handler. Called by Stripe after a payment completes.
 *
 * In MVP this logs the event. In Phase 3, this will update the database
 * (credit the recipient's balance and savings).
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata;

      console.log("=== DONATION RECEIVED ===");
      console.log(`Recipient: ${meta?.recipientName} (${meta?.recipientId})`);
      console.log(`Donation: ${meta?.donationPence} pence`);
      console.log(`Service charge: ${meta?.serviceChargePence} pence`);
      console.log(`Savings (10%): ${meta?.savingsPence} pence`);
      console.log(`Stripe session: ${session.id}`);
      console.log(`Payment status: ${session.payment_status}`);
      console.log("========================");

      // TODO Phase 3: Update database
      // - Credit recipient's spendable balance (donation - savings)
      // - Credit recipient's savings balance
      // - Record the transaction
      break;
    }

    default:
      // Unhandled event types are fine — just log them
      console.log(`Unhandled Stripe event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
