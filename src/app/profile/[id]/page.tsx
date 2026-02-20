import { notFound } from "next/navigation";
import { getUserBySlug, formatPence } from "@/lib/users";
import { APP_CONFIG } from "@/lib/config";
import QRCodeDisplay from "./qr-code-display";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

/**
 * /profile/[id]
 *
 * Comprehensive public profile page for a community member.
 * Shows their story, journey, wishlist, savings goal, messages of support,
 * and donation options with QR code.
 */
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = await getUserBySlug(id);

  if (!user || !user.active) {
    notFound();
  }

  const donateUrl = `${APP_CONFIG.appUrl}/donate/${user.slug}`;
  const savingsPercentage = (user.savingsPence / user.savingsGoalPence) * 100;

  // Timeline colour and icon mapping
  const getTimelineStyles = (type: string) => {
    switch (type) {
      case "start":
        return { bgColor: "bg-red-100", textColor: "text-red-600", icon: "🌅" };
      case "progress":
        return { bgColor: "bg-blue-100", textColor: "text-blue-600", icon: "📈" };
      case "goal":
        return { bgColor: "bg-green-100", textColor: "text-green-600", icon: "🎯" };
      case "achievement":
        return { bgColor: "bg-amber-100", textColor: "text-amber-600", icon: "⭐" };
      default:
        return { bgColor: "bg-gray-100", textColor: "text-gray-600", icon: "○" };
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-brand-trust/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-warm/5 rounded-full blur-3xl" />

      <SiteHeader />

      <main className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        {/* =============== 1. GRADIENT HEADER WITH AVATAR =============== */}
        <div className="bg-white rounded-3xl shadow-sm border border-brand-warm/10 overflow-hidden mb-6">
          <div className="h-40 bg-gradient-to-br from-brand-warm via-brand-warm to-brand-warm-dark relative">
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 500 160">
              <circle cx="80" cy="30" r="50" fill="white" />
              <circle cx="420" cy="100" r="60" fill="white" />
              <circle cx="250" cy="120" r="35" fill="white" />
            </svg>
            {/* Avatar */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-white flex items-center justify-center shadow-lg">
                <span className="text-5xl font-bold text-brand-warm">{user.firstName.charAt(0)}</span>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-6">
            {/* Name, age, location */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-brand-dark mb-2">{user.firstName}, {user.age}</h1>
              <div className="flex items-center justify-center gap-1 text-brand-gray">
                <svg className="w-4 h-4 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">{user.location}</span>
                {user.area && <span className="text-xs">· {user.area}</span>}
              </div>
            </div>

            {/* =============== 2. BIO SECTION =============== */}
            <div className="bg-brand-cream rounded-xl p-4 mb-6">
              <p className="text-brand-dark text-sm leading-relaxed">{user.bio}</p>
              {user.background && (
                <div className="mt-4 pt-4 border-t border-brand-warm/20">
                  <p className="text-xs font-semibold text-brand-warm mb-2">Background</p>
                  <p className="text-xs text-brand-gray leading-relaxed">{user.background}</p>
                </div>
              )}
            </div>

            {/* =============== 3. STATS GRID =============== */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-lg p-3 border border-brand-warm/10">
                <div className="text-lg font-bold text-brand-dark">{formatPence(user.balancePence)}</div>
                <div className="text-xs text-brand-gray mt-1">Total raised</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-brand-warm/10">
                <div className="text-lg font-bold text-brand-trust">{formatPence(user.savingsPence)}</div>
                <div className="text-xs text-brand-gray mt-1">Savings</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-brand-warm/10">
                <div className="text-lg font-bold text-brand-hope">{user.messages.length}</div>
                <div className="text-xs text-brand-gray mt-1">Messages</div>
              </div>
            </div>

            {/* =============== 4. MATCHED FUNDING BADGE =============== */}
            {user.matchedFundingPartner && (
              <div className="bg-gradient-to-r from-brand-hope/10 to-brand-trust/10 rounded-xl p-4 mb-6 border border-brand-hope/20">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🎉</div>
                  <div>
                    <p className="font-bold text-brand-dark">Matched Donations!</p>
                    <p className="text-sm text-brand-gray">
                      {user.matchedFundingPartner} is matching donations pound-for-pound.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =============== 5. SUPPORT WORKER INFO =============== */}
            {user.supportWorker && (
              <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200/30">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Supported by</p>
                    <p className="text-sm text-blue-700">{user.supportWorker}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =============== 6. SAVINGS PROGRESS BAR =============== */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-brand-dark">Housing Goal</h2>
            <span className="text-sm font-semibold text-brand-warm">{Math.round(savingsPercentage)}%</span>
          </div>
          <p className="text-sm text-brand-gray mb-4">{user.savingsGoalDescription}</p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-brand-warm to-brand-warm-dark transition-all duration-500"
              style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-brand-gray">
            <span>{formatPence(user.savingsPence)}</span>
            <span>{formatPence(user.savingsGoalPence)}</span>
          </div>
        </div>

        {/* =============== 7. JOURNEY TIMELINE =============== */}
        {user.journey.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 mb-6">
            <h2 className="font-bold text-brand-dark mb-6 text-lg">Journey</h2>

            <div className="space-y-6">
              {user.journey.map((milestone, idx) => {
                const styles = getTimelineStyles(milestone.type);
                return (
                  <div key={idx} className="relative">
                    {/* Timeline connector */}
                    {idx < user.journey.length - 1 && (
                      <div className="absolute left-3 top-12 w-0.5 h-10 bg-gray-200" />
                    )}

                    {/* Timeline dot */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${styles.bgColor} ${styles.textColor} relative z-10`}>
                      {styles.icon}
                    </div>

                    {/* Content */}
                    <div className="ml-12 pt-0.5">
                      <div className="flex items-baseline gap-2 mb-1">
                        <p className="font-semibold text-brand-dark">{milestone.title}</p>
                        <span className="text-xs text-brand-gray">{milestone.date}</span>
                      </div>
                      <p className="text-sm text-brand-gray">{milestone.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =============== 8. WISHLIST GRID =============== */}
        {user.wishlist.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 mb-6">
            <h2 className="font-bold text-brand-dark mb-4 text-lg">Wishlist</h2>
            <p className="text-sm text-brand-gray mb-5">Help with specific needs</p>

            <div className="grid grid-cols-2 gap-4">
              {user.wishlist.map((item) => (
                <Link
                  key={item.id}
                  href={`/donate/${user.slug}?wishlist=${item.id}`}
                  className="group bg-gradient-to-br from-brand-cream to-white rounded-xl p-4 border border-brand-warm/10 hover:border-brand-warm/30 hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <h3 className="font-semibold text-brand-dark group-hover:text-brand-warm transition-colors mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs text-brand-gray mb-2 line-clamp-2">{item.description}</p>
                  <div className="text-sm font-bold text-brand-warm">{formatPence(item.amountPence)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* =============== 9. MESSAGES OF SUPPORT =============== */}
        {user.messages.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 mb-6">
            <h2 className="font-bold text-brand-dark mb-5 text-lg">Messages of Support</h2>

            <div className="space-y-4">
              {user.messages.map((message) => (
                <div
                  key={message.id}
                  className="bg-brand-cream rounded-lg p-4 border-l-4 border-brand-warm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-brand-dark">{message.donorName}</p>
                    <span className="text-xs text-brand-gray">{message.createdAt}</span>
                  </div>
                  <p className="text-sm text-brand-gray italic">"{message.message}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =============== 10. QR CODE SECTION =============== */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <p className="font-semibold text-brand-dark">Scan to donate</p>
          </div>

          <div className="bg-gradient-to-br from-brand-cream to-white rounded-xl p-6 flex justify-center mb-4">
            <QRCodeDisplay url={donateUrl} />
          </div>

          <p className="text-xs text-brand-gray text-center">
            Point your phone camera at this QR code to donate directly
          </p>
        </div>

        {/* =============== 11. DONATE BUTTON =============== */}
        <Link
          href={`/donate/${user.slug}`}
          className="block w-full bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-brand-warm/25 transition-all hover:-translate-y-1 mb-6 text-center"
        >
          Donate to {user.firstName}
        </Link>

        {/* =============== 12. SAFEGUARDS SECTION =============== */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h2 className="font-bold text-brand-dark">Safeguards</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-brand-gray">
                <span className="font-semibold text-brand-dark">Restricted spending</span> — Funds can only be spent at approved supermarkets and retailers
              </span>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-brand-gray">
                <span className="font-semibold text-brand-dark">Auto-saved</span> — {APP_CONFIG.savingsPercentage}% of each donation automatically retained towards housing
              </span>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-brand-gray">
                <span className="font-semibold text-brand-dark">Full transparency</span> — Every donation and transaction is tracked and visible
              </span>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
