import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { normalizeCompanyName } from "@/lib/company-normalization";
import { sanitizeDonorName, sanitizeSupportMessage } from "@/lib/support-message";

type DonationPayload = {
  donationKey: string;
  source: "checkout_session" | "invoice";
  memberLegacyId: string;
  memberDbId: string;
  memberSlug: string;
  stripeCheckoutSessionId: string;
  stripeInvoiceId: string;
  stripeSubscriptionId: string;
  paymentIntentId: string;
  frequency: "one-time" | "monthly";
  donationPence: number;
  savingsPence: number;
  spendablePence: number;
  platformFeePence: number;
  totalPaidPence: number;
  currency: string;
  companyName: string;
  wishlistItemCode: string;
  notifyEmail: boolean;
  donorEmail: string;
  message: string;
  donorName: string;
  createdAtIso: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function asBoolean(value: unknown): boolean {
  return value === true || value === "true";
}

function eventTimestampToIso(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString();
}

function normaliseCompanyForStorage(rawValue: string): string {
  if (!rawValue.trim()) {
    return "";
  }
  return normalizeCompanyName(rawValue);
}

function buildCheckoutPayload(
  event: Stripe.Event,
  session: Stripe.Checkout.Session
): DonationPayload {
  const meta = session.metadata ?? {};
  const donationPence = asNumber(meta.donationPence);
  const savingsPence = asNumber(meta.savingsPence);
  const spendablePence = asNumber(meta.spendablePence || donationPence - savingsPence);
  const platformFeePence = asNumber(meta.serviceChargePence);
  const rawCompanyName = asString(meta.companyName);
  const rawDonorName = asString(meta.donorName);

  return {
    donationKey: `checkout:${session.id}`,
    source: "checkout_session",
    memberLegacyId: asString(meta.recipientId),
    memberDbId: asString(meta.recipientDbId),
    memberSlug: asString(meta.recipientSlug),
    stripeCheckoutSessionId: session.id,
    stripeInvoiceId: "",
    stripeSubscriptionId:
      typeof session.subscription === "string" ? session.subscription : "",
    paymentIntentId:
      typeof session.payment_intent === "string" ? session.payment_intent : "",
    frequency:
      asString(meta.frequency) === "monthly" ? "monthly" : "one-time",
    donationPence,
    savingsPence,
    spendablePence,
    platformFeePence,
    totalPaidPence: asNumber(session.amount_total),
    currency: asString(session.currency || "gbp"),
    companyName: normaliseCompanyForStorage(rawCompanyName),
    wishlistItemCode: asString(meta.wishlistItemId),
    notifyEmail: asBoolean(meta.notifyEmail),
    donorEmail: asString(session.customer_details?.email),
    message: sanitizeSupportMessage(asString(meta.message)),
    donorName: sanitizeDonorName(rawDonorName),
    createdAtIso: eventTimestampToIso(event.created),
  };
}

async function buildInvoicePayload(
  event: Stripe.Event,
  invoice: Stripe.Invoice
): Promise<DonationPayload> {
  const stripe = getStripe();
  const invoiceAny = invoice as Stripe.Invoice & {
    subscription?: string;
    parent?: { subscription_details?: { subscription?: string } };
    payment_intent?: string;
  };
  const subscriptionId =
    typeof invoiceAny.subscription === "string"
      ? invoiceAny.subscription
      : typeof invoiceAny.parent?.subscription_details?.subscription === "string"
        ? invoiceAny.parent.subscription_details.subscription
        : "";

  let metadata: Record<string, string> = {
    ...(invoice.metadata ?? {}),
  };

  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    metadata = {
      ...(subscription.metadata ?? {}),
      ...metadata,
    };
  }

  const donationPence = asNumber(metadata.donationPence);
  const savingsPence = asNumber(metadata.savingsPence);
  const spendablePence = asNumber(
    metadata.spendablePence || donationPence - savingsPence
  );
  const platformFeePence = asNumber(metadata.serviceChargePence);
  const rawCompanyName = asString(metadata.companyName);
  const rawDonorName = asString(metadata.donorName);

  return {
    donationKey: `invoice:${invoice.id}`,
    source: "invoice",
    memberLegacyId: asString(metadata.recipientId),
    memberDbId: asString(metadata.recipientDbId),
    memberSlug: asString(metadata.recipientSlug),
    stripeCheckoutSessionId: "",
    stripeInvoiceId: invoice.id,
    stripeSubscriptionId: subscriptionId,
    paymentIntentId:
      typeof invoiceAny.payment_intent === "string" ? invoiceAny.payment_intent : "",
    frequency: "monthly",
    donationPence,
    savingsPence,
    spendablePence,
    platformFeePence,
    totalPaidPence: asNumber(invoice.amount_paid),
    currency: asString(invoice.currency || "gbp"),
    companyName: normaliseCompanyForStorage(rawCompanyName),
    wishlistItemCode: asString(metadata.wishlistItemId),
    notifyEmail: asBoolean(metadata.notifyEmail),
    donorEmail: asString(invoice.customer_email),
    message: sanitizeSupportMessage(asString(metadata.message)),
    donorName: sanitizeDonorName(rawDonorName),
    createdAtIso: eventTimestampToIso(event.created),
  };
}

function revalidateDonationRoutes(memberSlug: string) {
  if (!memberSlug) return;

  revalidatePath(`/profile/${memberSlug}`);
  revalidatePath(`/donate/${memberSlug}`);
  revalidatePath(`/profile/${memberSlug}/print`);
  revalidatePath("/");
  revalidatePath("/community");
  revalidatePath("/local");
  revalidatePath("/transparency");
  revalidatePath("/leaderboard");
  revalidatePath("/admin");
  revalidatePath("/recipient-dashboard");
}

async function applyDonationPayload(payload: DonationPayload): Promise<boolean> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.rpc("apply_donation_event", {
    p_donation_key: payload.donationKey,
    p_source: payload.source,
    p_member_id: payload.memberDbId || null,
    p_member_legacy_id: payload.memberLegacyId || null,
    p_stripe_checkout_session_id: payload.stripeCheckoutSessionId || null,
    p_stripe_invoice_id: payload.stripeInvoiceId || null,
    p_stripe_subscription_id: payload.stripeSubscriptionId || null,
    p_payment_intent_id: payload.paymentIntentId || null,
    p_frequency: payload.frequency,
    p_donation_pence: payload.donationPence,
    p_savings_pence: payload.savingsPence,
    p_spendable_pence: payload.spendablePence,
    p_platform_fee_pence: payload.platformFeePence,
    p_total_paid_pence: payload.totalPaidPence,
    p_currency: payload.currency,
    p_company_name: payload.companyName || null,
    p_wishlist_item_code: payload.wishlistItemCode || null,
    p_notify_email: payload.notifyEmail,
    p_donor_email: payload.donorEmail || null,
    p_message: payload.message || null,
    p_donor_name: payload.donorName || "Anonymous",
    p_event_created_at: payload.createdAtIso,
  });

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

async function persistWebhookEventStart(event: Stripe.Event): Promise<boolean> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("stripe_events").insert({
    id: event.id,
    event_type: event.type,
    livemode: event.livemode,
    received_at: new Date().toISOString(),
    status: "failed",
    error_message: "Processing",
  });

  if (!error) {
    return true;
  }

  if (error.code === "23505") {
    return false;
  }

  throw new Error(error.message);
}

async function markWebhookEvent(eventId: string, status: "processed" | "duplicate" | "failed", errorMessage?: string) {
  const supabase = getSupabaseAdminClient();
  await supabase
    .from("stripe_events")
    .update({
      status,
      error_message: errorMessage ?? null,
      processed_at: new Date().toISOString(),
    })
    .eq("id", eventId);
}

/**
 * POST /api/webhook
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

  const eventInserted = await persistWebhookEventStart(event);
  if (!eventInserted) {
    await markWebhookEvent(event.id, "duplicate", "Duplicate event replay");
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const payload = buildCheckoutPayload(event, session);

      const inserted = await applyDonationPayload(payload);
      if (!inserted) {
        await markWebhookEvent(event.id, "duplicate");
        return NextResponse.json({ received: true, duplicate: true });
      }

      revalidateDonationRoutes(payload.memberSlug);
      await markWebhookEvent(event.id, "processed");
      return NextResponse.json({ received: true });
    }

    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice;

      if (invoice.billing_reason !== "subscription_cycle") {
        await markWebhookEvent(event.id, "processed", "Ignored non-cycle invoice event");
        return NextResponse.json({ received: true });
      }

      const payload = await buildInvoicePayload(event, invoice);
      const inserted = await applyDonationPayload(payload);

      if (!inserted) {
        await markWebhookEvent(event.id, "duplicate");
        return NextResponse.json({ received: true, duplicate: true });
      }

      revalidateDonationRoutes(payload.memberSlug);
      await markWebhookEvent(event.id, "processed");
      return NextResponse.json({ received: true });
    }

    await markWebhookEvent(event.id, "processed", `Ignored event type: ${event.type}`);
    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown webhook processing error";
    await markWebhookEvent(event.id, "failed", message);
    console.error("Webhook processing failed:", message);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
