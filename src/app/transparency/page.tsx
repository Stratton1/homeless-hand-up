import { getMonthlyGrowth, getPlatformStats, formatPence } from "@/lib/users";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default async function TransparencyPage() {
  const [stats, monthlyData] = await Promise.all([
    getPlatformStats(),
    getMonthlyGrowth(),
  ]);

  // Calculate operational breakdown
  const operationalPercent = 15; // 15% service charge
  const savingsPercent = 10; // 10% auto-savings
  const directPercent = 75; // 75% goes directly to member

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-trust/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-brand-dark">
            Complete Transparency. Always.
          </h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
            No mystery fees. No hidden agendas. We publish everything. See exactly where every pound
            comes from and where it goes.
          </p>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-brand-warm/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm text-brand-gray uppercase tracking-wide mb-2 font-semibold">
                Total Raised
              </div>
              <div className="text-3xl font-bold text-brand-warm">
                {formatPence(stats.totalProcessedPence)}
              </div>
              <p className="text-xs text-brand-gray mt-2">Since launch</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-trust/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm text-brand-gray uppercase tracking-wide mb-2 font-semibold">
                Housing Savings
              </div>
              <div className="text-3xl font-bold text-brand-trust">
                {formatPence(stats.totalSavingsPence)}
              </div>
              <p className="text-xs text-brand-gray mt-2">Locked for housing</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-hope/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm text-brand-gray uppercase tracking-wide mb-2 font-semibold">
                Donations
              </div>
              <div className="text-3xl font-bold text-brand-hope">
                {stats.totalDonations}
              </div>
              <p className="text-xs text-brand-gray mt-2">Individual gifts</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-dark/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm text-brand-gray uppercase tracking-wide mb-2 font-semibold">
                Members Supported
              </div>
              <div className="text-3xl font-bold text-brand-dark">
                {stats.totalMembers}
              </div>
              <p className="text-xs text-brand-gray mt-2">Active profiles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Your Money Goes Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-brand-dark">Where Your Money Goes</h2>
          <p className="text-brand-gray mb-10 leading-relaxed">
            For every pound donated, here&rsquo;s exactly how it&rsquo;s distributed:
          </p>

          {/* Visual breakdown — pie representation using progress bars */}
          <div className="space-y-6">
            {/* Direct to Member */}
            <div className="bg-brand-cream rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">Goes directly to member</h3>
                  <p className="text-sm text-brand-gray mt-1">
                    Spends on food, hygiene, transport, and essentials
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-brand-trust">75p</div>
                  <div className="text-xs text-brand-gray">{directPercent}%</div>
                </div>
              </div>
              <div className="w-full bg-brand-gray/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-trust to-brand-trust-light h-full"
                  style={{ width: `${directPercent}%` }}
                />
              </div>
            </div>

            {/* Housing Savings */}
            <div className="bg-brand-cream rounded-xl p-6 border border-brand-hope/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">Auto-saved for housing</h3>
                  <p className="text-sm text-brand-gray mt-1">
                    Locked fund towards deposit and first month&rsquo;s rent
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-brand-hope">10p</div>
                  <div className="text-xs text-brand-gray">{savingsPercent}%</div>
                </div>
              </div>
              <div className="w-full bg-brand-gray/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-hope to-brand-hope h-full"
                  style={{ width: `${savingsPercent}%` }}
                />
              </div>
            </div>

            {/* Operational Contribution */}
            <div className="bg-brand-cream rounded-xl p-6 border border-brand-warm/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-brand-dark text-lg">Operational & growth</h3>
                  <p className="text-sm text-brand-gray mt-1">
                    Platform running costs, payment processing, fraud prevention
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-brand-warm">15p</div>
                  <div className="text-xs text-brand-gray">{operationalPercent}%</div>
                </div>
              </div>
              <div className="w-full bg-brand-gray/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-warm to-brand-warm-dark h-full"
                  style={{ width: `${operationalPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use Operational Contribution */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-brand-dark">How We Reinvest Every Penny</h2>
          <p className="text-brand-gray mb-10 leading-relaxed">
            Your operational contribution drives the platform forward. Here&rsquo;s where it goes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-brand-warm/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-warm/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-brand-warm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-dark">Payment Processing</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Secure Stripe transactions, fraud detection, and PCI compliance so your money gets
                through safely.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-trust/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-trust/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-brand-trust"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-dark">Security & Compliance</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Protecting your data and our members&rsquo; funds with industry-leading safeguards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-hope/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-hope/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-brand-hope"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-dark">Platform Hosting</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Vercel infrastructure keeps the platform fast, reliable, and always available for
                donations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-warm/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-warm/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-brand-warm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 11a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-dark">Expansion & Support</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Growing the community, onboarding new members, and partnering with retailers and
                charities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Housing Savings Fund Explainer */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-brand-trust-dark/5 to-brand-trust/5 rounded-3xl mx-4 sm:mx-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-brand-dark">The Housing Savings Fund</h2>
          <p className="text-brand-gray mb-6 leading-relaxed">
            We believe real impact means long-term stability. That&rsquo;s why 10% of every donation
            is automatically locked away.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-brand-trust/10">
              <div className="text-sm font-bold text-brand-trust uppercase tracking-wide mb-3">
                How It Works
              </div>
              <p className="text-sm text-brand-gray leading-relaxed">
                Every time someone donates, 10% goes into a locked savings account. Members can't
                spend it — it can only be used toward housing.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-brand-trust/10">
              <div className="text-sm font-bold text-brand-trust uppercase tracking-wide mb-3">
                Why Lock It
              </div>
              <p className="text-sm text-brand-gray leading-relaxed">
                Small amounts add up fast when protected. A £100 donation with 10% savings becomes
                £50 over time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-brand-trust/10">
              <div className="text-sm font-bold text-brand-trust uppercase tracking-wide mb-3">
                The Goal
              </div>
              <p className="text-sm text-brand-gray leading-relaxed">
                Once the savings goal is reached, funds can be released for deposit, first
                month&rsquo;s rent, or essential moving costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Snapshot */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-brand-dark">Platform Growth</h2>
          <p className="text-brand-gray mb-10 leading-relaxed">
            Month-by-month progress shows our community expanding and impact growing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyData.map((month, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-brand-warm/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-brand-dark mb-4">{month.month}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-1">
                      Raised
                    </div>
                    <div className="text-lg font-bold text-brand-warm">
                      {formatPence(month.raisedPence)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-1">
                      Saved
                    </div>
                    <div className="text-lg font-bold text-brand-trust">
                      {formatPence(month.savingsPence)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brand-gray uppercase tracking-wide mb-1">
                      Members
                    </div>
                    <div className="text-lg font-bold text-brand-dark">{month.memberCount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-brand-dark">Want to see more?</h2>
          <p className="text-lg text-brand-gray mb-8 leading-relaxed">
            We&rsquo;re committed to publishing full detailed reports every quarter. Transparency
            builds trust. Trust builds community.
          </p>
          <a
            href="mailto:hello@homelesshandup.org"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white font-semibold rounded-full hover:shadow-lg hover:shadow-brand-warm/20 transition-all hover:-translate-y-0.5"
          >
            Subscribe for Reports
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
