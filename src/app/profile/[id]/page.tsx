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
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-brand-trust/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-warm/5 rounded-full blur-3xl" />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-brand-warm/10 px-4 py-4 relative z-10">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-warm to-brand-warm-dark flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-bold text-brand-dark">Homeless Hand Up</span>
          </Link>
          <Link href="/" className="text-sm text-brand-gray hover:text-brand-warm transition-colors">
            Home
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 relative z-10">
        {/* Profile card — enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-warm/10 overflow-hidden mb-6">
          {/* Gradient header */}
          <div className="h-28 bg-gradient-to-br from-brand-trust via-brand-trust to-brand-trust-light relative">
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 500 120">
              <circle cx="60" cy="20" r="40" fill="white" />
              <circle cx="440" cy="80" r="50" fill="white" />
              <circle cx="250" cy="100" r="25" fill="white" />
              <circle cx="160" cy="90" r="15" fill="white" />
            </svg>
            {/* Avatar */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-brand-trust">{user.firstName.charAt(0)}</span>
              </div>
            </div>
          </div>

          <div className="pt-14 pb-6 px-6 text-center">
            <h1 className="text-2xl font-bold text-brand-dark mb-1">{user.firstName}</h1>
            <p className="text-sm text-brand-gray flex items-center justify-center gap-1 mb-4">
              <svg className="w-3.5 h-3.5 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location}
            </p>

            <p className="text-brand-gray text-sm leading-relaxed mb-6">{user.bio}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-brand-cream rounded-xl p-4">
                <div className="text-xl font-bold text-brand-dark">{formatPence(user.balancePence)}</div>
                <div className="text-xs text-brand-gray mt-1">Total raised</div>
              </div>
              <div className="bg-gradient-to-br from-brand-trust/5 to-brand-trust/10 rounded-xl p-4">
                <div className="text-xl font-bold text-brand-trust">{formatPence(user.savingsPence)}</div>
                <div className="text-xs text-brand-gray mt-1">Housing savings</div>
              </div>
            </div>

            {/* QR Code — enhanced */}
            <div className="bg-gradient-to-br from-brand-cream to-white rounded-xl p-6 mb-6 border border-brand-warm/10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg className="w-5 h-5 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <p className="text-sm font-semibold text-brand-dark">Scan to donate</p>
              </div>
              <QRCodeDisplay url={donateUrl} />
              <p className="text-xs text-brand-gray mt-4">
                Point your phone camera at this code to donate directly
              </p>
            </div>

            {/* Donate button — enhanced */}
            <Link
              href={`/donate/${user.slug}`}
              className="block w-full bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-brand-warm/25 transition-all hover:-translate-y-0.5"
            >
              Donate to {user.firstName}
            </Link>
          </div>
        </div>

        {/* Safeguards summary — enhanced */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="font-bold text-brand-dark">Your donation is protected</h2>
          </div>
          <div className="space-y-3 text-sm text-brand-gray">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Funds can only be spent at approved supermarkets and retailers
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              10% automatically saved towards housing
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Full transparency — every transaction tracked
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
