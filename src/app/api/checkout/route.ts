import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getUserBySlug } from "@/lib/users";
import { APP_CONFIG } from "@/lib/config";

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout session for a donation (one-time or recurring).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      amountPounds,
      frequency = "one-time",
      wishlistItemId,
      message,
      companyName,
      notifyEmail,
    } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid recipient." },
        { status: 400 }
      );
    }

    if (![
      "one-time",
      "monthly",
    ].includes(frequency)) {
      return NextResponse.json(
        { error: "Invalid frequency. Must be 'one-time' or 'monthly'." },
        { status: 400 }
      );
    }

    const amount = Number(amountPounds);
    if (
      Number.isNaN(amount) ||
      amount < APP_CONFIG.minimumDonation ||
      amount > APP_CONFIG.maximumDonation
    ) {
      return NextResponse.json(
        {
          error: `Donation must be between £${APP_CONFIG.minimumDonation} and £${APP_CONFIG.maximumDonation}.`,
        },
        { status: 400 }
      );
    }

    const user = await getUserBySlug(slug);
    if (!user || !user.active) {
      return NextResponse.json(
        { error: "Recipient not found or not currently active." },
        { status: 404 }
      );
    }

    // Gift Aid remains disabled until HMRC/legal onboarding is complete.
    const donationPence = Math.round(amount * 100);
    const serviceChargePence = Math.round(
      donationPence * (APP_CONFIG.serviceChargePercentage / 100)
    );
    const savingsPence = Math.round(
      donationPence * (APP_CONFIG.savingsPercentage / 100)
    );
    const spendablePence = donationPence - savingsPence;

    const metadata = {
      recipientId: user.id,
      recipientDbId: user.databaseId ?? "",
      recipientSlug: user.slug,
      recipientName: user.firstName,
      donationPence: donationPence.toString(),
      serviceChargePence: serviceChargePence.toString(),
      savingsPence: savingsPence.toString(),
      spendablePence: spendablePence.toString(),
      frequency,
      wishlistItemId: wishlistItemId || "",
      message: message || "",
      companyName: companyName || "",
      notifyEmail: notifyEmail ? "true" : "false",
      giftAid: "disabled",
    };

    let description = `£${amount.toFixed(2)} donation to ${user.firstName} in ${user.location} via Homeless Hand Up`;
    if (wishlistItemId) {
      description += " (wishlist item)";
    }
    if (companyName) {
      description += ` (company match: ${companyName})`;
    }

    if (frequency === "monthly") {
      const session = await getStripe().checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: APP_CONFIG.currency,
              product_data: {
                name: `Monthly donation to ${user.firstName}`,
                description,
              },
              unit_amount: donationPence,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: APP_CONFIG.currency,
              product_data: {
                name: "Platform fee",
                description: `${APP_CONFIG.serviceChargePercentage}% monthly platform fee`,
              },
              unit_amount: serviceChargePence,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata,
        subscription_data: {
          metadata,
        },
        success_url: `${APP_CONFIG.appUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_CONFIG.appUrl}/donate/${user.slug}`,
      });

      return NextResponse.json({ url: session.url });
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: APP_CONFIG.currency,
            product_data: {
              name: `Donation to ${user.firstName}`,
              description,
            },
            unit_amount: donationPence,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: APP_CONFIG.currency,
            product_data: {
              name: "Platform fee",
              description: `${APP_CONFIG.serviceChargePercentage}% platform fee to keep Homeless Hand Up running`,
            },
            unit_amount: serviceChargePence,
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${APP_CONFIG.appUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_CONFIG.appUrl}/donate/${user.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Something went wrong creating the payment. Please try again." },
      { status: 500 }
    );
  }
}
