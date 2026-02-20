import Link from "next/link";
import { getAllActiveUsers, formatPence } from "@/lib/users";

export default function Home() {
  const users = getAllActiveUsers();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-warm/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-warm to-brand-warm-dark flex items-center justify-center shadow-md shadow-brand-warm/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-brand-dark">Homeless Hand Up</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#how-it-works" className="text-brand-gray hover:text-brand-warm transition-colors">How It Works</a>
            <a href="#donate-now" className="text-brand-gray hover:text-brand-warm transition-colors">Donate Now</a>
            <a href="#safeguards" className="text-brand-gray hover:text-brand-warm transition-colors">Safeguards</a>
            <a href="#donate-now" className="bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white px-5 py-2 rounded-full hover:shadow-lg hover:shadow-brand-warm/25 transition-all font-medium">
              Give Now
            </a>
          </div>
          {/* Mobile menu button */}
          <a href="#donate-now" className="sm:hidden bg-brand-warm text-white px-4 py-2 rounded-full text-sm font-medium">
            Give Now
          </a>
        </div>
      </nav>

      {/* Hero Section — with warm illustration */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-brand-warm/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="absolute top-40 left-10 w-48 h-48 bg-brand-trust/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-gradient-to-r from-brand-warm/10 to-brand-hope/10 text-brand-warm-dark px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-brand-warm/10">
                No app needed &middot; No signup required
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-brand-dark">
                Give directly.
                <br />
                <span className="bg-gradient-to-r from-brand-warm to-brand-warm-dark bg-clip-text text-transparent">
                  Change lives.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                No more &ldquo;sorry, I don&rsquo;t have cash.&rdquo; Scan a QR code and donate directly to someone who needs it &mdash; with safeguards that ensure every penny helps.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <a href="#donate-now" className="bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-brand-warm/25 transition-all hover:-translate-y-0.5">
                  Start Giving Today
                </a>
                <a href="#how-it-works" className="text-brand-trust font-medium flex items-center gap-2 hover:text-brand-trust-dark transition-colors px-4 py-4">
                  See how it works
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
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

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-brand-trust-dark via-brand-trust to-brand-trust-dark py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
          <div>
            <div className="text-3xl font-bold mb-1">300,000+</div>
            <div className="text-brand-trust-light text-sm">People experiencing homelessness in the UK</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">78%</div>
            <div className="text-brand-trust-light text-sm">Say &ldquo;no cash&rdquo; is the top reason they don&rsquo;t give</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">100%</div>
            <div className="text-brand-trust-light text-sm">Of your donation goes directly to the individual</div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DONATE NOW — recipient cards                 */}
      {/* ============================================ */}
      <section id="donate-now" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-brand-warm/10 text-brand-warm-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              No signup needed
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              People who need your help
            </h2>
            <p className="text-brand-gray text-lg max-w-xl mx-auto">
              Choose someone to support. Every donation is protected with spending safeguards and 10% goes straight into their housing savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-brand-cream rounded-2xl overflow-hidden border border-brand-warm/10 hover:shadow-lg hover:shadow-brand-warm/10 transition-all hover:-translate-y-1 group">
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
                      <span className="text-2xl font-bold text-brand-trust">{user.firstName.charAt(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-12 pb-6 px-6">
                  <h3 className="text-xl font-bold text-brand-dark mb-1">{user.firstName}</h3>
                  <p className="text-sm text-brand-gray flex items-center gap-1 mb-3">
                    <svg className="w-3.5 h-3.5 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </p>
                  <p className="text-brand-gray text-sm leading-relaxed mb-4 line-clamp-3">{user.bio}</p>

                  {/* Stats */}
                  <div className="flex gap-3 mb-5">
                    <div className="bg-white rounded-lg px-3 py-2 flex-1 text-center">
                      <div className="text-sm font-bold text-brand-dark">{formatPence(user.balancePence)}</div>
                      <div className="text-[10px] text-brand-gray uppercase tracking-wide">Raised</div>
                    </div>
                    <div className="bg-brand-trust/5 rounded-lg px-3 py-2 flex-1 text-center">
                      <div className="text-sm font-bold text-brand-trust">{formatPence(user.savingsPence)}</div>
                      <div className="text-[10px] text-brand-gray uppercase tracking-wide">Housing</div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/donate/${user.slug}`}
                      className="flex-1 bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-brand-warm/20 transition-all text-sm"
                    >
                      Donate Now
                    </Link>
                    <Link
                      href={`/profile/${user.slug}`}
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

          <p className="text-center mt-8 text-sm text-brand-gray">
            More people will be added as we grow. Want to help someone get set up?{" "}
            <a href="#get-involved" className="text-brand-warm hover:text-brand-warm-dark font-medium">Get in touch</a>.
          </p>
        </div>
      </section>

      {/* How It Works — with illustrations */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Three taps. One real difference.</h2>
            <p className="text-brand-gray text-lg max-w-xl mx-auto">No app to download. No account to create. Just scan, choose, give.</p>
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
              <div className="text-brand-warm font-bold text-sm uppercase tracking-wide mb-2">Step 1</div>
              <h3 className="text-xl font-bold mb-3">Scan the QR Code</h3>
              <p className="text-brand-gray leading-relaxed">See someone with a Homeless Hand Up QR card? Open your phone camera and scan it. No app download needed.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10 text-center relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-hope to-brand-hope-light" />
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
              <div className="text-brand-hope font-bold text-sm uppercase tracking-wide mb-2">Step 2</div>
              <h3 className="text-xl font-bold mb-3">Choose Your Amount</h3>
              <p className="text-brand-gray leading-relaxed">Pick how much you&rsquo;d like to give — from as little as £1. Quick preset amounts or enter your own.</p>
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
              <div className="text-brand-trust font-bold text-sm uppercase tracking-wide mb-2">Step 3</div>
              <h3 className="text-xl font-bold mb-3">Give &amp; Connect</h3>
              <p className="text-brand-gray leading-relaxed">Pay securely with Apple Pay, Google Pay, or your card. Have a chat. You just made someone&rsquo;s day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section id="why-it-matters" className="py-20 px-4 sm:px-6 bg-white relative">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-warm/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why this matters</h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              We live in a cashless world, but homelessness hasn&rsquo;t gone anywhere. The number one reason people don&rsquo;t help is &ldquo;I don&rsquo;t carry cash.&rdquo; We&rsquo;re fixing that.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-brand-cream to-white rounded-2xl p-6 border border-brand-warm/10 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-warm/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Direct bottom-up charity</h3>
              <p className="text-brand-gray">No middleman. No waiting for councils or government. Your money goes straight to the person in front of you.</p>
            </div>
            <div className="bg-gradient-to-br from-brand-cream to-white rounded-2xl p-6 border border-brand-warm/10 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-trust/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-trust" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Protected spending</h3>
              <p className="text-brand-gray">Funds can only be spent at approved retailers. No alcohol, no cigarettes, no gambling. Every penny supports real needs.</p>
            </div>
            <div className="bg-gradient-to-br from-brand-cream to-white rounded-2xl p-6 border border-brand-warm/10 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-hope/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-hope" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Built-in savings</h3>
              <p className="text-brand-gray">10% of every donation is automatically saved towards housing. Small amounts add up to life-changing totals.</p>
            </div>
            <div className="bg-gradient-to-br from-brand-cream to-white rounded-2xl p-6 border border-brand-warm/10 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Works on any phone</h3>
              <p className="text-brand-gray">No app to download. Just scan the QR code with your phone camera and you&rsquo;re ready to give. Takes less than 30 seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safeguards */}
      <section id="safeguards" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Smart safeguards. Real accountability.</h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              We&rsquo;ve designed this to give donors confidence and recipients dignity. Every feature promotes long-term benefit.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-brand-warm/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Restricted purchases", desc: "Funds work at approved supermarkets and essential retailers only. Alcohol, tobacco, and gambling are blocked." },
                { title: "Non-transferable", desc: "Each account is linked to an individual. Funds can't be moved to someone else's account." },
                { title: "Daily limits", desc: "Recipients can set their own daily spending limits, building healthy financial habits." },
                { title: "Full paper trail", desc: "Every donation and transaction is tracked transparently. Donors and recipients can see where money goes." },
                { title: "Housing savings", desc: "10% of each donation is automatically saved in a locked fund, building towards a deposit for housing." },
                { title: "Contactless & hygienic", desc: "No physical cash changes hands. Safer and more hygienic for everyone involved." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-brand-gray text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="get-involved" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-brand-trust-dark via-brand-trust to-brand-trust">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-lg text-brand-trust-light mb-10 leading-relaxed">
            Whether you want to donate, volunteer, partner with us, or help a homeless person get set up — we&rsquo;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#donate-now" className="bg-white text-brand-trust px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-brand-cream transition-colors shadow-lg">
              Donate Now
            </a>
            <a href="mailto:hello@homelesshandup.org" className="border-2 border-white/40 text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:border-white transition-colors">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="py-10 px-4 sm:px-6 bg-gradient-to-r from-brand-warm-dark via-brand-warm to-brand-warm-dark text-white text-center">
        <p className="text-lg sm:text-xl font-medium italic max-w-3xl mx-auto">
          &ldquo;Bottom up charity with parameters in place that promote long term benefits for the homeless.&rdquo;
        </p>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-brand-dark text-white/60">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-warm to-brand-warm-dark flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-white font-semibold">Homeless Hand Up</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#donate-now" className="hover:text-white transition-colors">Donate</a>
              <a href="#safeguards" className="hover:text-white transition-colors">Safeguards</a>
            </div>
            <div className="text-sm">&copy; {new Date().getFullYear()} Homeless Hand Up. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
