import { notFound } from "next/navigation";
import { getUserBySlug, formatPence } from "@/lib/users";
import { APP_CONFIG } from "@/lib/config";
import DonationForm from "./donation-form";

interface DonatePageProps {
  params: Promise<{ id: string }>;
}

export default async function DonatePage({ params }: DonatePageProps) {
  const { id } = await params;
  const user = getUserBySlug(id);

  if (!user || !user.active) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <header className="bg-white border-b border-brand-warm/10 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-warm flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <span className="font-bold text-brand-dark">Homeless Hand Up</span>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Recipient card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-trust/10 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-brand-trust">
                {user.firstName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-dark mb-1">
                Donate to {user.firstName}
              </h1>
              <p className="text-sm text-brand-gray flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {user.location}
              </p>
            </div>
          </div>
          <p className="mt-4 text-brand-gray text-sm leading-relaxed">
            {user.bio}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-brand-gray">
            <div>
              <span className="font-semibold text-brand-dark">
                {formatPence(user.balancePence)}
              </span>{" "}
              raised
            </div>
            <div>
              <span className="font-semibold text-brand-trust">
                {formatPence(user.savingsPence)}
              </span>{" "}
              saved for housing
            </div>
          </div>
        </div>

        {/* Donation form (client component) */}
        <DonationForm
          slug={user.slug}
          firstName={user.firstName}
          presetAmounts={APP_CONFIG.presetAmounts}
          minimumDonation={APP_CONFIG.minimumDonation}
          maximumDonation={APP_CONFIG.maximumDonation}
          serviceChargePercentage={APP_CONFIG.serviceChargePercentage}
          savingsPercentage={APP_CONFIG.savingsPercentage}
        />

        {/* Trust badges */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-brand-gray">
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure payment via Stripe
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Restricted spending
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              10% auto-saved
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
