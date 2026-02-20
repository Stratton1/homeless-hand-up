export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-warm/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-brand-warm flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
            <span className="text-xl font-bold text-brand-dark">
              Homeless Hand Up
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a
              href="#how-it-works"
              className="text-brand-gray hover:text-brand-warm transition-colors"
            >
              How It Works
            </a>
            <a
              href="#why-it-matters"
              className="text-brand-gray hover:text-brand-warm transition-colors"
            >
              Why It Matters
            </a>
            <a
              href="#safeguards"
              className="text-brand-gray hover:text-brand-warm transition-colors"
            >
              Safeguards
            </a>
            <a
              href="#get-involved"
              className="bg-brand-warm text-white px-4 py-2 rounded-full hover:bg-brand-warm-dark transition-colors font-medium"
            >
              Get Involved
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-brand-warm/10 text-brand-warm-dark px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            A new way to help
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-brand-dark">
            Give directly.
            <br />
            <span className="text-brand-warm">Change lives.</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            No more &ldquo;sorry, I don&rsquo;t have cash.&rdquo; Scan a QR
            code, tap your phone, and donate directly to someone who needs it
            &mdash; with safeguards that ensure every penny helps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-involved"
              className="bg-brand-warm text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-brand-warm-dark transition-colors shadow-lg shadow-brand-warm/20"
            >
              Start Giving Today
            </a>
            <a
              href="#how-it-works"
              className="text-brand-trust font-medium flex items-center gap-2 hover:text-brand-trust-dark transition-colors"
            >
              See how it works
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-trust py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
          <div>
            <div className="text-3xl font-bold mb-1">300,000+</div>
            <div className="text-brand-trust-light text-sm">
              People experiencing homelessness in the UK
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">78%</div>
            <div className="text-brand-trust-light text-sm">
              Of people say &ldquo;no cash&rdquo; is the top reason they
              don&rsquo;t give
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">100%</div>
            <div className="text-brand-trust-light text-sm">
              Of your donation goes directly to the individual
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three taps. One real difference.
            </h2>
            <p className="text-brand-gray text-lg max-w-xl mx-auto">
              Giving has never been this easy, safe, or direct.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10 text-center">
              <div className="w-16 h-16 bg-brand-warm/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-8 h-8 text-brand-warm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <div className="text-brand-warm font-bold text-sm uppercase tracking-wide mb-2">
                Step 1
              </div>
              <h3 className="text-xl font-bold mb-3">Scan the QR Code</h3>
              <p className="text-brand-gray leading-relaxed">
                See someone with a Homeless Hand Up QR card? Open your phone
                camera and scan it. No app download needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10 text-center">
              <div className="w-16 h-16 bg-brand-hope/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-8 h-8 text-brand-hope"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-brand-hope font-bold text-sm uppercase tracking-wide mb-2">
                Step 2
              </div>
              <h3 className="text-xl font-bold mb-3">Choose Your Amount</h3>
              <p className="text-brand-gray leading-relaxed">
                Pick how much you&rsquo;d like to give — from as little as
                &pound;1. Quick preset amounts or enter your own.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10 text-center">
              <div className="w-16 h-16 bg-brand-trust/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-8 h-8 text-brand-trust"
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
              <div className="text-brand-trust font-bold text-sm uppercase tracking-wide mb-2">
                Step 3
              </div>
              <h3 className="text-xl font-bold mb-3">Give &amp; Connect</h3>
              <p className="text-brand-gray leading-relaxed">
                Pay securely with Apple Pay, Google Pay, or your card. Have a
                chat. You just made someone&rsquo;s day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section
        id="why-it-matters"
        className="py-20 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why this matters
            </h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              We live in a cashless world, but homelessness hasn&rsquo;t gone
              anywhere. The number one reason people don&rsquo;t help a homeless
              person is &ldquo;I don&rsquo;t carry cash.&rdquo; We&rsquo;re
              fixing that.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-brand-cream rounded-xl p-6 border border-brand-warm/10">
              <div className="text-2xl mb-3">&#128176;</div>
              <h3 className="font-bold text-lg mb-2">Direct bottom-up charity</h3>
              <p className="text-brand-gray">
                No middleman. No waiting for councils or government. Your money
                goes straight to the person in front of you.
              </p>
            </div>
            <div className="bg-brand-cream rounded-xl p-6 border border-brand-warm/10">
              <div className="text-2xl mb-3">&#128274;</div>
              <h3 className="font-bold text-lg mb-2">
                Protected spending
              </h3>
              <p className="text-brand-gray">
                Funds can only be spent at approved retailers. No alcohol, no
                cigarettes, no gambling. Every penny supports real needs.
              </p>
            </div>
            <div className="bg-brand-cream rounded-xl p-6 border border-brand-warm/10">
              <div className="text-2xl mb-3">&#127968;</div>
              <h3 className="font-bold text-lg mb-2">Built-in savings</h3>
              <p className="text-brand-gray">
                10% of every donation is automatically saved towards housing.
                Small amounts add up to life-changing totals.
              </p>
            </div>
            <div className="bg-brand-cream rounded-xl p-6 border border-brand-warm/10">
              <div className="text-2xl mb-3">&#128241;</div>
              <h3 className="font-bold text-lg mb-2">
                Works on any phone
              </h3>
              <p className="text-brand-gray">
                No app to download. Just scan the QR code with your phone camera
                and you&rsquo;re ready to give. Takes less than 30 seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safeguards Section */}
      <section id="safeguards" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Smart safeguards. Real accountability.
            </h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto">
              We&rsquo;ve designed this to give donors confidence and recipients
              dignity. Every feature exists to promote long-term benefit.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-brand-warm/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                </div>
                <div>
                  <h4 className="font-bold mb-1">Restricted purchases</h4>
                  <p className="text-brand-gray text-sm">
                    Funds work at approved supermarkets and essential
                    retailers only. Alcohol, tobacco, and gambling are
                    blocked.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                </div>
                <div>
                  <h4 className="font-bold mb-1">Non-transferable</h4>
                  <p className="text-brand-gray text-sm">
                    Each account is linked to an individual. Funds
                    can&rsquo;t be moved to someone else&rsquo;s account.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                </div>
                <div>
                  <h4 className="font-bold mb-1">Daily limits</h4>
                  <p className="text-brand-gray text-sm">
                    Recipients can set their own daily spending limits,
                    building healthy financial habits.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                </div>
                <div>
                  <h4 className="font-bold mb-1">Full paper trail</h4>
                  <p className="text-brand-gray text-sm">
                    Every donation and transaction is tracked transparently.
                    Donors and recipients can see where money goes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                </div>
                <div>
                  <h4 className="font-bold mb-1">Housing savings</h4>
                  <p className="text-brand-gray text-sm">
                    10% of each donation is automatically saved in a locked
                    fund, building towards a deposit for housing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                </div>
                <div>
                  <h4 className="font-bold mb-1">Contactless &amp; hygienic</h4>
                  <p className="text-brand-gray text-sm">
                    No physical cash changes hands. Safer and more hygienic
                    for everyone involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="get-involved"
        className="py-20 px-4 sm:px-6 bg-brand-trust"
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-brand-trust-light mb-10 leading-relaxed">
            Whether you want to donate, volunteer, partner with us, or help a
            homeless person get set up — we&rsquo;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@homelesshandup.org"
              className="bg-white text-brand-trust px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-brand-cream transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="#how-it-works"
              className="border-2 border-white/40 text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:border-white transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Tagline Banner */}
      <section className="py-10 px-4 sm:px-6 bg-brand-warm text-white text-center">
        <p className="text-lg sm:text-xl font-medium italic max-w-3xl mx-auto">
          &ldquo;Bottom up charity with parameters in place that promote long
          term benefits for the homeless.&rdquo;
        </p>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-brand-dark text-white/60">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
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
              <span className="text-white font-semibold">
                Homeless Hand Up
              </span>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Homeless Hand Up. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
