import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { APP_CONFIG } from "@/lib/config";

export const metadata = {
  title: "How It Works for Donors | Homeless Hand Up",
  description:
    "See how giving to homeless individuals is now as simple as scanning a QR code. Secure, direct, and impactful.",
};

export default function DonorsPage() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      {/* Background decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-warm/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-80 h-80 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-trust/3 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10">
        <SiteHeader />

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          {/* Hero Section */}
          <section className="mb-16 sm:mb-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              Giving made simple
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
              No app to download. No registration. Just a QR code, a few taps, and your support reaches someone who needs it.
            </p>
          </section>

          {/* Step-by-step flow */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-2">
                Five simple steps
              </h2>
              <p className="text-brand-gray">
                From first encounter to real impact.
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-brand-warm text-white font-bold text-xl flex items-center justify-center shadow-md">
                    1
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    See a QR card
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    A person you meet is wearing a lanyard or holding a card. It has a simple QR code on it and their name. That's how you know they're part of our community.
                  </p>
                  <p className="text-sm text-brand-gray italic">
                    The card is printed and includes essential information—where they are, a bit about them, and what they need.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-brand-hope text-white font-bold text-xl flex items-center justify-center shadow-md">
                    2
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-brand-hope/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    Scan with your phone
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    Open your phone's camera app. Point it at the QR code. Tap the notification that appears. No app to download. No login. Just your phone, as is.
                  </p>
                  <p className="text-sm text-brand-gray italic">
                    Works on any modern smartphone—iOS, Android, doesn't matter.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-brand-trust text-white font-bold text-xl flex items-center justify-center shadow-md">
                    3
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-brand-trust/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    Choose how to help
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    You'll see their profile. Quick preset amounts (£2, £5, £10, £20) or choose your own. Some people list what they need most—a hot meal, socks, a phone top-up.
                  </p>
                  <p className="text-sm text-brand-gray italic">
                    You decide the amount. We show you exactly where it goes.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-brand-warm-dark text-white font-bold text-xl flex items-center justify-center shadow-md">
                    4
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    Pay securely
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    We use Stripe—the same payment system that runs shops worldwide. We never see your card details. You can pay with your card, Apple Pay, or Google Pay.
                  </p>
                  <p className="text-sm text-brand-gray italic">
                    All transactions are encrypted. All payments are PCI compliant. Your money is safe.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                    5
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-green-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    See your impact
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    Money arrives in their account instantly. They're notified. You can see a confirmation right there. No waiting. No mystery about whether it arrived.
                  </p>
                  <p className="text-sm text-brand-gray italic">
                    10% automatically goes into their housing savings. The rest is theirs to spend.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* One-time or monthly */}
          <section className="mb-20 sm:mb-28">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-brand-trust/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-6">
                One time or recurring
              </h2>
              <p className="text-brand-gray leading-relaxed mb-8">
                You can give once. Or you can commit to supporting someone every month. Recurring donations are the bedrock of sustainable help—people know they can rely on you. And for you, it's set and forget.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-brand-warm"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    One-time
                  </h3>
                  <p className="text-sm text-brand-gray">
                    When you see someone and want to help right then. It's immediate. No setup. No future obligation.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-brand-trust"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    </svg>
                    Monthly
                  </h3>
                  <p className="text-sm text-brand-gray">
                    Build a real relationship. Know that your support is consistent. They plan around it. Real change comes from steady support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Where does the money go */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                Where does your money go?
              </h2>
              <p className="text-brand-gray">
                Complete transparency. Every pound accounted for.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Breakdown visualization */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <div className="text-sm font-bold text-brand-dark mb-6 uppercase tracking-wide">
                  For a £10 donation
                </div>

                <div className="space-y-6">
                  {/* Direct to member */}
                  <div>
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-brand-dark">Direct to community member</h3>
                        <p className="text-xs text-brand-gray">
                          For essentials, meals, support
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-brand-warm">£8.50</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-warm to-brand-warm-dark h-full rounded-full w-[85%] shadow-sm" />
                    </div>
                  </div>

                  {/* Housing savings */}
                  <div>
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-brand-dark">Housing savings (locked)</h3>
                        <p className="text-xs text-brand-gray">
                          Building towards a deposit
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-brand-trust">£1.00</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-trust to-brand-trust-light h-full rounded-full w-[10%] shadow-sm" />
                    </div>
                  </div>

                  {/* Platform & support */}
                  <div>
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-brand-dark">Platform & support</h3>
                        <p className="text-xs text-brand-gray">
                          Keeping this service running (15% service charge)
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-brand-gray">£0.50</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div className="bg-gray-300 h-full rounded-full w-[5%] shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-sm text-brand-gray">
                    <strong>The service charge is optional.</strong> If you want to cover the cost of keeping this platform running—so we don't charge the people receiving help—you can add it. Otherwise, we work with partner grants and donations from supporters.
                  </p>
                </div>
              </div>

              {/* Why we retain 10% */}
              <div className="bg-brand-cream rounded-2xl p-8 border border-brand-hope/20">
                <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-brand-hope"
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
                  Why 10% for housing?
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  The biggest barrier to housing is a deposit. People want to save. But when you're living on the street, every pound is survival. We lock away 10% automatically—not as control, but as possibility. Over time, that builds. A person who receives £50 a month has £60 saved towards housing after a year. That's real.
                </p>
              </div>
            </div>
          </section>

          {/* Security & Trust Section */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                Security & trust
              </h2>
              <p className="text-brand-gray">
                Your donation is secure. Your data is protected.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {/* Trust badge 1 */}
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-green-100">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-dark mb-2">PCI Compliant</h3>
                <p className="text-sm text-brand-gray">
                  Stripe handles all card data. We never see or store it.
                </p>
              </div>

              {/* Trust badge 2 */}
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-green-100">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m7.414-6.414l1.414 1.414L12 19.414l-8.828-8.828 1.414-1.414L12 16.586l7.414-7.414z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-dark mb-2">Encrypted</h3>
                <p className="text-sm text-brand-gray">
                  All connections are HTTPS. Data in transit is encrypted.
                </p>
              </div>

              {/* Trust badge 3 */}
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-green-100">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4v2m0 5a9 9 0 110-18 9 9 0 010 18z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-dark mb-2">Transparent</h3>
                <p className="text-sm text-brand-gray">
                  See where money goes. Real-time updates. No hidden fees.
                </p>
              </div>
            </div>

            <div className="mt-12 max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-brand-trust/10">
              <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-brand-trust"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Restricted spending
              </h3>
              <p className="text-sm text-brand-gray">
                Community members can spend at approved retailers only. No alcohol, tobacco, or gambling. This isn't about control—it's about channelling support into what genuinely helps rebuild life.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-3">
              Ready to help?
            </h2>
            <p className="text-brand-gray mb-8 max-w-lg mx-auto">
              Start making a real difference. Scan a QR code. Give directly. See your impact.
            </p>
            <Link
              href="/community"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand-warm text-white font-medium hover:bg-brand-warm-dark transition-colors shadow-sm"
            >
              Find someone to support
            </Link>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
