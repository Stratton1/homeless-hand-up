import Link from "next/link";
import { getLeaderboard, formatPence } from "@/lib/users";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function LeaderboardPage() {
  const leaderboard = getLeaderboard();

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", medal: "🥇" };
      case 2:
        return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-800", medal: "🥈" };
      case 3:
        return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", medal: "🥉" };
      default:
        return { bg: "bg-brand-cream", border: "border-brand-warm/10", text: "text-brand-dark", medal: "" };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-0 w-80 h-80 bg-brand-warm/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-brand-dark">
            Top Giving Companies
          </h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
            These businesses and their teams are making a real difference. See who&rsquo;s leading the
            way in corporate giving to our community.
          </p>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="flex-1 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-warm/10">
              <div className="grid grid-cols-12 gap-4 bg-brand-dark text-white p-6 font-semibold text-sm">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Company</div>
                <div className="col-span-3 text-right">Total Given</div>
                <div className="col-span-3 text-right">Donations</div>
              </div>

              <div className="divide-y divide-brand-warm/5">
                {leaderboard.map((entry) => {
                  const colors = getMedalColor(entry.rank);
                  return (
                    <div
                      key={entry.rank}
                      className={`grid grid-cols-12 gap-4 p-6 items-center hover:bg-brand-cream/30 transition-colors border-l-4 ${
                        entry.rank <= 3 ? colors.border : "border-transparent"
                      }`}
                    >
                      <div className={`col-span-1 font-bold ${colors.text} text-lg`}>
                        {colors.medal || entry.rank}
                      </div>
                      <div className="col-span-5">
                        <p className="font-bold text-brand-dark">{entry.companyName}</p>
                      </div>
                      <div className="col-span-3 text-right">
                        <p className="font-bold text-brand-warm text-lg">
                          {formatPence(entry.totalDonatedPence)}
                        </p>
                      </div>
                      <div className="col-span-3 text-right">
                        <p className="text-brand-gray">{entry.donationCount}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4">
            {leaderboard.map((entry) => {
              const colors = getMedalColor(entry.rank);
              return (
                <div
                  key={entry.rank}
                  className={`${colors.bg} rounded-2xl p-6 border ${colors.border} shadow-sm`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`${colors.text} text-3xl font-bold`}>
                        {colors.medal || `#${entry.rank}`}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${colors.text}`}>{entry.companyName}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-brand-gray uppercase tracking-wide font-semibold mb-1">
                        Total Given
                      </p>
                      <p className="text-xl font-bold text-brand-warm">
                        {formatPence(entry.totalDonatedPence)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-gray uppercase tracking-wide font-semibold mb-1">
                        Donations
                      </p>
                      <p className="text-xl font-bold text-brand-dark">{entry.donationCount}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-brand-dark">Want Your Company on the Board?</h2>

          <div className="bg-brand-cream rounded-2xl p-8 border border-brand-warm/20 mb-8">
            <p className="text-brand-gray leading-relaxed mb-6">
              Every donation your team makes can be attributed to your company. It&rsquo;s a great way
              to show your commitment to your community whilst building team engagement around a
              cause that matters.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-warm text-white flex items-center justify-center shrink-0 font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark mb-1">At Checkout</h3>
                  <p className="text-sm text-brand-gray">
                    When making a donation, donors can select their employer name or company
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-warm text-white flex items-center justify-center shrink-0 font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark mb-1">We Track It</h3>
                  <p className="text-sm text-brand-gray">
                    All donations attributed to your company are aggregated and published on the
                    leaderboard
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-warm text-white flex items-center justify-center shrink-0 font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark mb-1">You Get Recognised</h3>
                  <p className="text-sm text-brand-gray">
                    Your company gets visibility as a leader in corporate giving and community
                    support
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-brand-warm/10 shadow-sm">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-bold text-brand-dark mb-2">Team Engagement</h3>
              <p className="text-sm text-brand-gray">
                Encourage staff to support a real cause they care about
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-brand-trust/10 shadow-sm">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-bold text-brand-dark mb-2">CSR Impact</h3>
              <p className="text-sm text-brand-gray">
                Demonstrate genuine commitment to community wellbeing
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-brand-hope/10 shadow-sm">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-bold text-brand-dark mb-2">Real Outcomes</h3>
              <p className="text-sm text-brand-gray">
                Direct impact on people working toward housing and stability
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="mailto:hello@homelesshandup.org?subject=Corporate%20Giving%20Partnership"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white font-semibold rounded-full hover:shadow-lg hover:shadow-brand-warm/20 transition-all hover:-translate-y-0.5"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      {/* Back to Community CTA */}
      <section className="py-12 px-4 sm:px-6 bg-gradient-to-r from-brand-trust-dark/5 to-brand-trust/5">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-brand-dark">
            Ready to support our community?
          </h3>
          <p className="text-brand-gray mb-6 leading-relaxed">
            Meet the people you're supporting. Browse our community directory and choose who to help.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-warm text-white font-semibold rounded-full hover:shadow-lg hover:shadow-brand-warm/20 transition-all hover:-translate-y-0.5"
          >
            View Our Community
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
