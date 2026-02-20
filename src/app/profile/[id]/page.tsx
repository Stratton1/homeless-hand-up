import { notFound } from "next/navigation";
import { getUserBySlug, formatPence } from "@/lib/users";
import { APP_CONFIG } from "@/lib/config";
import QRCodeDisplay from "./qr-code-display";
import Link from "next/link";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

/**
 * /profile/[id]
 *
 * Public profile page for a homeless user.
 * Shows their info, QR code, and a link to donate.
 * The QR code links directly to /donate/[slug].
 */
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = getUserBySlug(id);

  if (!user || !user.active) {
    notFound();
  }

  const donateUrl = `${APP_CONFIG.appUrl}/donate/${user.slug}`;

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <header className="bg-white border-b border-brand-warm/10 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          <Link
            href="/"
            className="text-sm text-brand-gray hover:text-brand-warm transition-colors"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Profile card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 text-center mb-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-brand-trust/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-brand-trust">
              {user.firstName.charAt(0)}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-brand-dark mb-1">
            {user.firstName}
          </h1>
          <p className="text-sm text-brand-gray flex items-center justify-center gap-1 mb-4">
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

          <p className="text-brand-gray text-sm leading-relaxed mb-6">
            {user.bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-brand-cream rounded-xl p-3">
              <div className="text-lg font-bold text-brand-dark">
                {formatPence(user.balancePence)}
              </div>
              <div className="text-xs text-brand-gray">Total raised</div>
            </div>
            <div className="bg-brand-trust/5 rounded-xl p-3">
              <div className="text-lg font-bold text-brand-trust">
                {formatPence(user.savingsPence)}
              </div>
              <div className="text-xs text-brand-gray">Housing savings</div>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-brand-cream rounded-xl p-6 mb-6">
            <p className="text-sm font-medium text-brand-dark mb-3">
              Scan to donate
            </p>
            <QRCodeDisplay url={donateUrl} />
            <p className="text-xs text-brand-gray mt-3">
              Point your phone camera at this code
            </p>
          </div>

          {/* Donate button */}
          <Link
            href={`/donate/${user.slug}`}
            className="block w-full bg-brand-warm text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-warm-dark transition-colors shadow-lg shadow-brand-warm/20"
          >
            Donate to {user.firstName}
          </Link>
        </div>

        {/* Safeguards summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-brand-warm/10">
          <h2 className="font-bold text-sm text-brand-dark mb-3">
            Your donation is protected
          </h2>
          <div className="space-y-2 text-xs text-brand-gray">
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-green-500 shrink-0"
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
              Funds can only be spent at approved supermarkets and retailers
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-green-500 shrink-0"
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
              10% automatically saved towards housing
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-green-500 shrink-0"
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
              Full transparency — every transaction tracked
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
