import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "Our Mission | Homeless Hand Up",
  description:
    "Discover how Homeless Hand Up is changing charity from the ground up. Direct giving, transparency, and real impact.",
};

export default function OurMissionPage() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      {/* Background decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-warm/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-80 h-80 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-brand-trust/3 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10">
        <SiteHeader />

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          {/* Hero Section */}
          <section className="mb-16 sm:mb-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-6 leading-tight">
                Why We Exist
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
                You want to help the person you see on the street. But you don't carry cash. They can't accept a bank transfer. So nothing happens. We're here to close that gap.
              </p>
            </div>
          </section>

          {/* The Problem Section */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                The Problem
              </h2>
              <p className="text-brand-gray">
                Cash is disappearing. Homelessness isn't.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-brand-warm/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-warm"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  78% say "I don't carry cash"
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  That's the number one reason people give for not supporting homeless individuals they encounter.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-trust/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-brand-trust/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-trust"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 6a3 3 0 11-6 0 3 3 0 016 0zM6 20h12v-2a9 9 0 00-9-9 9 9 0 00-9 9v2h6v-2a3 3 0 016 0v2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  300,000+ in the UK
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  People experiencing homelessness need support today. The system that could help moves slowly.
                </p>
              </div>
            </div>
          </section>

          {/* Our Philosophy Section */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                Our Philosophy
              </h2>
              <p className="text-brand-gray">
                Bottom-up charity. Direct support. No middlemen.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-brand-hope/10 max-w-2xl mx-auto">
              <p className="text-brand-dark text-lg leading-relaxed mb-8">
                When you donate, your money goes directly to the person. No charity overhead. No waiting. No bureaucracy. Just real help, real fast.
              </p>

              {/* Visual breakdown */}
              <div className="space-y-4">
                <div className="text-sm font-bold text-brand-dark mb-3 uppercase tracking-wide">
                  For every £10 donated
                </div>

                {/* Spendable */}
                <div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm font-medium text-brand-dark">Spendable immediately</span>
                    <span className="text-lg font-bold text-brand-warm">£9</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-brand-warm h-full rounded-full w-[90%] shadow-sm" />
                  </div>
                  <p className="text-xs text-brand-gray mt-2">
                    At approved retailers. No alcohol, tobacco, or gambling.
                  </p>
                </div>

                {/* Savings */}
                <div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm font-medium text-brand-dark">Housing savings</span>
                    <span className="text-lg font-bold text-brand-trust">£1</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-brand-trust h-full rounded-full w-[10%] shadow-sm" />
                  </div>
                  <p className="text-xs text-brand-gray mt-2">
                    Locked away. Building towards a deposit. Their path home.
                  </p>
                </div>
              </div>

              <p className="text-sm text-brand-gray mt-8 pt-8 border-t border-gray-100">
                Every donation builds. Every percentage locked away is a step towards genuine independence. This isn't about controlling spending—it's about channelling support into what genuinely changes lives.
              </p>
            </div>
          </section>

          {/* How We're Different Section */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                How We're Different
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Traditional */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-700 mb-6">Traditional Charity</h3>
                  <ul className="space-y-4 text-sm text-gray-600">
                    <li className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Top-down decisions</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Bureaucratic delays</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Opaque impact tracking</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Hard to see real impact</span>
                    </li>
                  </ul>
                </div>

                {/* Hand Up */}
                <div className="bg-white rounded-2xl p-8 border-2 border-brand-warm/30 shadow-sm">
                  <h3 className="text-lg font-bold text-brand-dark mb-6">Homeless Hand Up</h3>
                  <ul className="space-y-4 text-sm text-brand-dark">
                    <li className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-brand-warm flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Direct to the person</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-brand-warm flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Instant. Real time.</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-brand-warm flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Full transparency</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-brand-warm flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>See your impact live</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* The Vision Section */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                Our Vision
              </h2>
              <p className="text-brand-gray">
                Where we're heading. What we're building.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Vision card 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-trust/10">
                <div className="w-12 h-12 rounded-full bg-brand-trust/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-trust"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h10m4 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  Restricted cards
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Mobile-first cards that work at partner retailers. No one decides what you eat but you.
                </p>
              </div>

              {/* Vision card 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-hope/10">
                <div className="w-12 h-12 rounded-full bg-brand-hope/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-hope"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25c0 5.105 3.07 9.408 7.5 11.398m0-23c5.5 0 10 4.745 10 10.997 0 5.105-3.07 9.408-7.5 11.398"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  Retailer partnerships
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Working with shops and restaurants. Building a network where every donation counts.
                </p>
              </div>

              {/* Vision card 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10">
                <div className="w-12 h-12 rounded-full bg-brand-warm/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-warm"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25c0 5.105 3.07 9.408 7.5 11.398m0-23c5.5 0 10 4.745 10 10.997 0 5.105-3.07 9.408-7.5 11.398"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  Cooking resources
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Recipes, tips, and supermarket partners. Helping people nourish themselves well.
                </p>
              </div>

              {/* Vision card 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-trust/10">
                <div className="w-12 h-12 rounded-full bg-brand-trust/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-trust"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  Pathways home
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Savings that build. Support that stays. Real routes to independence and housing.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-6">
              Join the movement
            </h2>
            <p className="text-brand-gray mb-8 max-w-lg mx-auto">
              Whether you want to give, receive support, or partner with us—let's build a more direct, human charity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/community"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand-warm text-white font-medium hover:bg-brand-warm-dark transition-colors shadow-sm"
              >
                Explore our community
              </Link>
              <a
                href="mailto:hello@homelesshandup.uk"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-brand-dark font-medium border-2 border-brand-warm hover:bg-brand-cream transition-colors"
              >
                Get in touch
              </a>
            </div>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
