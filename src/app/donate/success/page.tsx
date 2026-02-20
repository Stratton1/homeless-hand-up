import Link from "next/link";

/**
 * /donate/success
 *
 * Shown after a successful Stripe Checkout payment.
 * Stripe redirects here with ?session_id=xxx which we can use
 * to look up the session details in Phase 3.
 */
export default function DonateSuccessPage() {
  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden flex items-center justify-center px-4">
      {/* Background decorative shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-green-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-brand-hope/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-warm/5 rounded-full blur-3xl" />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Success icon — enhanced with warm glow */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-100/50">
            <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Floating hearts */}
          <div className="absolute top-0 right-1/4 text-brand-warm/40 text-lg animate-bounce" style={{ animationDelay: "0.2s" }}>&#x2764;</div>
          <div className="absolute bottom-0 left-1/4 text-brand-warm/30 text-sm animate-bounce" style={{ animationDelay: "0.5s" }}>&#x2764;</div>
          <div className="absolute top-2 left-1/3 text-brand-hope/40 text-xs animate-bounce" style={{ animationDelay: "0.8s" }}>&#x2764;</div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
          Thank you!
        </h1>

        <p className="text-brand-gray text-lg mb-2">
          Your donation has been received.
        </p>

        <p className="text-brand-gray text-sm mb-8 leading-relaxed">
          The funds will be available to the recipient shortly. 10% has been
          automatically set aside in their housing savings fund. You&rsquo;re
          making a real difference.
        </p>

        {/* What happens next — enhanced card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 text-left mb-8">
          <h2 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            What happens next
          </h2>
          <div className="space-y-4 text-sm text-brand-gray">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-brand-warm/10 to-brand-warm/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-brand-warm font-bold text-xs">1</span>
              </div>
              <p>Your donation is credited to the recipient&rsquo;s account within minutes.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-brand-hope/10 to-brand-hope/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-brand-hope font-bold text-xs">2</span>
              </div>
              <p>They can use it at approved supermarkets and essential retailers.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-brand-trust/10 to-brand-trust/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-brand-trust font-bold text-xs">3</span>
              </div>
              <p>10% is locked in a housing savings fund, building towards a better future.</p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-brand-warm/25 transition-all hover:-translate-y-0.5"
        >
          Back to Home
        </Link>

        <p className="mt-6 text-xs text-brand-gray">
          A receipt has been sent to your email by Stripe.
        </p>
      </div>
    </div>
  );
}
