import Link from "next/link";
import Image from "next/image";
import { getAllActiveUsers, getPlatformStats, formatPence, isPaydayFriday } from "@/lib/users";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default async function Home() {
  const [allCommunityMembers, stats] = await Promise.all([
    getAllActiveUsers(),
    getPlatformStats(),
  ]);
  const communityMembers = allCommunityMembers.slice(0, 3);
  const isPayday = isPaydayFriday();

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <SiteHeader />

      {/* ============================================ */}
      {/* HERO SECTION — Emotional hook                */}
      {/* ============================================ */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-brand-warm/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="absolute top-40 left-10 w-48 h-48 bg-brand-trust/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          {/* Payday Friday banner (optional) */}
          {isPayday && (
            <div className="mb-6 mx-auto max-w-2xl">
              <div className="bg-gradient-to-r from-brand-hope to-brand-hope/80 text-brand-dark px-6 py-3 rounded-full text-center font-semibold shadow-md shadow-brand-hope/20">
                ✨ It's Payday Friday! Donate your coffee money today.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-gradient-to-r from-brand-warm/10 to-brand-hope/10 text-brand-warm-dark px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-brand-warm/10">
                No app needed · No signup required
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-brand-dark">
                Every person
                <br />
                <span className="bg-gradient-to-r from-brand-warm to-brand-warm-dark bg-clip-text text-transparent">
                  deserves to be seen.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                When you see someone asking for help, what stops you? Not anymore. Scan their QR code, choose how much to give, and connect directly — with safeguards that protect dignity on both sides.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <Link
                  href="/community"
                  className="bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-brand-warm/25 transition-all hover:-translate-y-0.5"
                >
                  Meet Our Community
                </Link>
                <Link
                  href="/how-it-works/donors"
                  className="text-brand-trust font-medium flex items-center gap-2 hover:text-brand-trust-dark transition-colors px-4 py-4"
                >
                  How It Works
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: illustration — warm scene of giving */}
            <div className="hidden lg:flex justify-center">
              <svg viewBox="0 0 500 440" fill="none" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
                {/* Background circle */}
                <circle cx="250" cy="220" r="200" fill="#FFF8F0" stroke="#E8734A" strokeWidth="1" strokeDasharray="8 4" opacity="0.5" />
                {/* Warm glow */}
                <circle cx="250" cy="200" r="130" fill="url(#warmGlow)" opacity="0.3" />
                {/* Phone */}
                <rect x="185" y="80" width="130" height="240" rx="20" fill="white" stroke="#2D6A8A" strokeWidth="2.5" />
                <rect x="195" y="100" width="110" height="190" rx="4" fill="#FFF8F0" />
                <circle cx="250" cy="310" r="8" stroke="#2D6A8A" strokeWidth="1.5" fill="none" />
                {/* QR code on phone */}
                <rect x="210" y="115" width="80" height="80" rx="4" fill="white" stroke="#1A1A2E" strokeWidth="1" />
                <rect x="218" y="123" width="20" height="20" rx="2" fill="#1A1A2E" />
                <rect x="262" y="123" width="20" height="20" rx="2" fill="#1A1A2E" />
                <rect x="218" y="167" width="20" height="20" rx="2" fill="#1A1A2E" />
                <rect x="245" y="150" width="8" height="8" fill="#E8734A" />
                <rect x="258" y="163" width="8" height="8" fill="#E8734A" />
                <rect x="245" y="176" width="8" height="8" fill="#E8734A" />
                <rect x="270" y="150" width="8" height="8" fill="#1A1A2E" />
                {/* Amount on phone */}
                <text x="250" y="220" textAnchor="middle" fill="#1A1A2E" fontWeight="bold" fontSize="22">£5.00</text>
                <rect x="210" y="240" width="80" height="30" rx="15" fill="#E8734A" />
                <text x="250" y="260" textAnchor="middle" fill="white" fontWeight="600" fontSize="12">Donate</text>
                {/* Heart particles */}
                <text x="340" y="120" fontSize="20" opacity="0.7">&#x2764;</text>
                <text x="360" y="170" fontSize="14" opacity="0.5">&#x2764;</text>
                <text x="330" y="200" fontSize="16" opacity="0.6">&#x2764;</text>
                <text x="140" y="150" fontSize="16" opacity="0.5">&#x2764;</text>
                <text x="120" y="200" fontSize="20" opacity="0.4">&#x2764;</text>
                {/* Coins/notes floating */}
                <circle cx="370" cy="250" r="15" fill="#F5C563" stroke="#E8734A" strokeWidth="1.5" opacity="0.8" />
                <text x="370" y="255" textAnchor="middle" fill="#C55A33" fontWeight="bold" fontSize="12">£</text>
                <circle cx="130" cy="270" r="12" fill="#F5C563" stroke="#E8734A" strokeWidth="1.5" opacity="0.6" />
                <text x="130" y="274" textAnchor="middle" fill="#C55A33" fontWeight="bold" fontSize="10">£</text>
                <circle cx="355" cy="300" r="10" fill="#F5C563" stroke="#E8734A" strokeWidth="1" opacity="0.5" />
                {/* Two people */}
                {/* Person 1 (donor) */}
                <circle cx="160" cy="340" r="18" fill="#4A9BC2" />
                <rect x="142" y="362" width="36" height="50" rx="10" fill="#4A9BC2" />
                <line x1="160" y1="375" x2="190" y2="355" stroke="#4A9BC2" strokeWidth="6" strokeLinecap="round" />
                {/* Person 2 (recipient) */}
                <circle cx="340" cy="340" r="18" fill="#E8734A" />
                <rect x="322" y="362" width="36" height="50" rx="10" fill="#E8734A" />
                <line x1="340" y1="375" x2="310" y2="355" stroke="#E8734A" strokeWidth="6" strokeLinecap="round" />
                {/* Connection line between people */}
                <path d="M190 360 Q250 320 310 360" stroke="#F5C563" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                <defs>
                  <radialGradient id="warmGlow">
                    <stop offset="0%" stopColor="#F5C563" />
                    <stop offset="100%" stopColor="#F5C563" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* REAL IMAGES — Ground the story               */}
      {/* ============================================ */}
      <section className="pb-10 sm:pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/60">
              <Image
                src="/images/community-volunteer.jpg"
                alt="Volunteer handing food to people in need"
                width={1600}
                height={1067}
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">Direct support, same day</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/60">
              <Image
                src="/images/community-groceries.jpg"
                alt="Person carrying groceries and essentials"
                width={1600}
                height={1067}
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">Essentials people actually need</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/60">
              <Image
                src="/images/community-food.jpg"
                alt="Canned food and supplies prepared for distribution"
                width={1600}
                height={1067}
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">Food, hygiene, and basics</p>
            </div>
          </div>
          <p className="text-xs text-brand-gray mt-3 text-right">
            Real photos from Unsplash (free licence).
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* LIVE IMPACT COUNTER — Real platform stats    */}
      {/* ============================================ */}
      <section className="bg-gradient-to-r from-brand-trust-dark via-brand-trust to-brand-trust-dark py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">{formatPence(stats.totalProcessedPence)}</div>
            <div className="text-brand-trust-light text-sm sm:text-base">raised for our community</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">{stats.totalMembers}</div>
            <div className="text-brand-trust-light text-sm sm:text-base">lives being supported</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-bold mb-2">{formatPence(stats.totalSavingsPence)}</div>
            <div className="text-brand-trust-light text-sm sm:text-base">saved for housing</div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED COMMUNITY PROFILES                   */}
      {/* ============================================ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-brand-warm/10 text-brand-warm-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Real people, real stories
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-brand-dark">
              Meet Our Community
            </h2>
            <p className="text-brand-gray text-lg max-w-xl mx-auto">
              These are the people you can support directly. Scan a QR code, give what you can, and watch the impact unfold in real time.
            </p>
          </div>

          {communityMembers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {communityMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-brand-cream rounded-2xl overflow-hidden border border-brand-warm/10 hover:shadow-lg hover:shadow-brand-warm/10 transition-all hover:-translate-y-1 group"
                  >
                    {/* Coloured header bar */}
                    <div className="h-24 bg-gradient-to-br from-brand-trust to-brand-trust-light relative">
                      {/* Decorative pattern */}
                      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 100">
                        <circle cx="50" cy="20" r="30" fill="white" />
                        <circle cx="350" cy="60" r="40" fill="white" />
                        <circle cx="200" cy="80" r="20" fill="white" />
                      </svg>
                      {/* Avatar */}
                      <div className="absolute -bottom-8 left-6">
                        <div className="w-16 h-16 rounded-full bg-white border-4 border-brand-cream flex items-center justify-center shadow-md">
                          <span className="text-2xl font-bold text-brand-trust">{member.firstName.charAt(0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-12 pb-6 px-6">
                      <h3 className="text-xl font-bold text-brand-dark mb-1">{member.firstName}</h3>
                      <p className="text-sm text-brand-gray flex items-center gap-1 mb-3">
                        <svg className="w-3.5 h-3.5 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {member.location}, {member.area}
                      </p>
                      <p className="text-brand-gray text-sm leading-relaxed mb-4 line-clamp-2">{member.bio}</p>

                      {/* Savings progress */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-brand-trust uppercase tracking-wide">Housing Goal</span>
                          <span className="text-sm font-bold text-brand-dark">{formatPence(member.savingsPence)} of {formatPence(member.savingsGoalPence)}</span>
                        </div>
                        <div className="w-full bg-brand-gray/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-brand-warm to-brand-warm-dark h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min((member.savingsPence / member.savingsGoalPence) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Matched funding badge (if applicable) */}
                      {member.matchedFundingPartner && (
                        <div className="mb-4 bg-brand-hope/10 text-brand-warm-dark text-xs font-semibold px-3 py-1.5 rounded-full text-center">
                          {member.matchedFundingPartner} matching donations
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/donate/${member.slug}`}
                          className="flex-1 bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-brand-warm/20 transition-all text-sm"
                        >
                          Support {member.firstName}
                        </Link>
                        <Link
                          href={`/profile/${member.slug}`}
                          className="px-4 py-3 rounded-xl border border-brand-warm/20 text-brand-warm hover:bg-brand-warm/5 transition-colors"
                          title="View profile & QR code"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/community"
                  className="inline-block text-brand-warm hover:text-brand-warm-dark font-semibold transition-colors"
                >
                  View all community members →
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-brand-gray text-lg">Community members coming soon. Check back soon to meet people you can support.</p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS — mini-section                  */}
      {/* ============================================ */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-brand-dark">Three simple steps</h2>
            <p className="text-brand-gray text-lg max-w-xl mx-auto">No app. No account. Just scan, choose, give.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10 text-center relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-warm to-brand-warm-light" />
              <div className="w-20 h-20 mx-auto mb-5">
                <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                  <circle cx="40" cy="40" r="38" fill="#FFF8F0" stroke="#E8734A" strokeWidth="1" />
                  <rect x="22" y="18" width="36" height="44" rx="6" fill="white" stroke="#2D6A8A" strokeWidth="2" />
                  <rect x="28" y="26" width="24" height="24" rx="2" fill="#FFF8F0" stroke="#1A1A2E" strokeWidth="1" />
                  <rect x="31" y="29" width="7" height="7" rx="1" fill="#1A1A2E" />
                  <rect x="42" y="29" width="7" height="7" rx="1" fill="#1A1A2E" />
                  <rect x="31" y="40" width="7" height="7" rx="1" fill="#1A1A2E" />
                  <rect x="40" y="38" width="4" height="4" fill="#E8734A" />
                  <rect x="45" y="43" width="4" height="4" fill="#E8734A" />
                  <line x1="28" y1="58" x2="52" y2="58" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-brand-warm font-bold text-sm uppercase tracking-wide mb-2">Scan</div>
              <h3 className="text-xl font-bold mb-3 text-brand-dark">Open the QR Code</h3>
              <p className="text-brand-gray leading-relaxed">Use your phone camera to scan their QR code. No app needed — your browser does the work.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10 text-center relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-hope to-brand-hope/80" />
              <div className="w-20 h-20 mx-auto mb-5">
                <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                  <circle cx="40" cy="40" r="38" fill="#FFF8F0" stroke="#F5C563" strokeWidth="1" />
                  <circle cx="40" cy="38" r="20" fill="white" stroke="#2D6A8A" strokeWidth="2" />
                  <text x="40" y="44" textAnchor="middle" fill="#1A1A2E" fontWeight="bold" fontSize="16">£5</text>
                  <rect x="18" y="60" width="12" height="8" rx="4" fill="#E8734A" opacity="0.6" />
                  <rect x="34" y="60" width="12" height="8" rx="4" fill="#E8734A" />
                  <rect x="50" y="60" width="12" height="8" rx="4" fill="#E8734A" opacity="0.6" />
                  <text x="24" y="67" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">£2</text>
                  <text x="40" y="67" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">£5</text>
                  <text x="56" y="67" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">£10</text>
                </svg>
              </div>
              <div className="text-brand-hope font-bold text-sm uppercase tracking-wide mb-2">Choose</div>
              <h3 className="text-xl font-bold mb-3 text-brand-dark">Pick Your Amount</h3>
              <p className="text-brand-gray leading-relaxed">Select a preset amount or enter your own. From £1 upwards — whatever feels right.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10 text-center relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-trust to-brand-trust-light" />
              <div className="w-20 h-20 mx-auto mb-5">
                <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                  <circle cx="40" cy="40" r="38" fill="#FFF8F0" stroke="#2D6A8A" strokeWidth="1" />
                  <path d="M40 22 C40 22 28 28 28 38 C28 48 40 56 40 56 C40 56 52 48 52 38 C52 28 40 22 40 22Z" fill="#E8734A" opacity="0.15" />
                  <path d="M33.318 30.318a4.5 4.5 0 000 6.364L40 43.364l6.682-6.682a4.5 4.5 0 00-6.364-6.364L40 30.636l-.318-.318a4.5 4.5 0 00-6.364 0z" fill="#E8734A" />
                  <circle cx="26" cy="58" r="8" fill="#4A9BC2" />
                  <circle cx="54" cy="58" r="8" fill="#E8734A" />
                  <path d="M34 56 Q40 50 46 56" stroke="#F5C563" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                  <circle cx="40" cy="66" r="4" fill="#F5C563" opacity="0.6" />
                  <text x="40" y="69" textAnchor="middle" fill="#C55A33" fontSize="5" fontWeight="bold">£</text>
                </svg>
              </div>
              <div className="text-brand-trust font-bold text-sm uppercase tracking-wide mb-2">Give</div>
              <h3 className="text-xl font-bold mb-3 text-brand-dark">Pay & Connect</h3>
              <p className="text-brand-gray leading-relaxed">Pay securely with Apple Pay, Google Pay, or card. You just made someone's day real.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/how-it-works/donors"
              className="inline-block text-brand-trust hover:text-brand-trust-dark font-semibold transition-colors"
            >
              Full guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST SECTION — Safe giving                  */}
      {/* ============================================ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-brand-dark">Our Commitment to Safe Giving</h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              We've built safeguards into every part of the platform. Your donation is protected. Their dignity is protected. Everything is transparent.
            </p>
          </div>

          <div className="bg-gradient-to-br from-brand-cream to-white rounded-2xl p-8 sm:p-10 border border-brand-warm/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-warm/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">Restricted Spending</h4>
                  <p className="text-brand-gray text-sm">Funds work at approved supermarkets and essential retailers only. No alcohol, cigarettes, or gambling.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-trust/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-brand-trust" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">10% Housing Savings</h4>
                  <p className="text-brand-gray text-sm">Every donation automatically saves 10% towards a housing deposit. Small amounts add up to real change.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-hope/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-brand-hope" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">Full Transparency</h4>
                  <p className="text-brand-gray text-sm">See exactly where your money goes. Every transaction is tracked and visible to you and the recipient.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">No Middlemen</h4>
                  <p className="text-brand-gray text-sm">Direct from you to them. No charities, no waiting lists, no bureaucracy — just real connection and real help.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/transparency"
              className="inline-block text-brand-trust hover:text-brand-trust-dark font-semibold transition-colors"
            >
              Learn more about our safeguards →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION at bottom                       */}
      {/* ============================================ */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-brand-trust-dark via-brand-trust to-brand-trust">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-lg text-brand-trust-light mb-10 leading-relaxed">
            Whether you want to give right now, partner with us, or help someone get set up — we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/community"
              className="bg-white text-brand-trust px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-brand-cream transition-colors shadow-lg"
            >
              Meet Our Community
            </Link>
            <a
              href="mailto:hello@homelesshandup.org"
              className="border-2 border-white/40 text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:border-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TAGLINE SECTION                              */}
      {/* ============================================ */}
      <section className="py-12 px-4 sm:px-6 bg-gradient-to-r from-brand-warm-dark via-brand-warm to-brand-warm-dark text-white text-center">
        <p className="text-lg sm:text-xl font-medium italic max-w-3xl mx-auto">
          &ldquo;Bottom up charity with parameters in place that promote long term benefits for the homeless.&rdquo;
        </p>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
