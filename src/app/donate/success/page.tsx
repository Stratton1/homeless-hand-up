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
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-500"
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

        <h1 className="text-3xl font-bold text-brand-dark mb-3">
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

        {/* What happens next */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-warm/10 text-left mb-8">
          <h2 className="font-bold text-sm text-brand-dark mb-3">
            What happens next
          </h2>
          <div className="space-y-3 text-sm text-brand-gray">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brand-warm/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-brand-warm font-bold text-xs">1</span>
              </div>
              <p>
                Your donation is credited to the recipient&rsquo;s account
                within minutes.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brand-warm/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-brand-warm font-bold text-xs">2</span>
              </div>
              <p>
                They can use it at approved supermarkets and essential retailers.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brand-warm/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-brand-warm font-bold text-xs">3</span>
              </div>
              <p>
                10% is locked in a housing savings fund, building towards a
                better future.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block bg-brand-warm text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-warm-dark transition-colors"
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
