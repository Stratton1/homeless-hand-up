import Link from "next/link";

/**
 * /donate/cancelled
 *
 * Shown if the donor abandons Stripe Checkout without paying.
 */
export default function DonateCancelledPage() {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-brand-hope/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-brand-hope"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-brand-dark mb-3">
          Payment cancelled
        </h1>

        <p className="text-brand-gray text-lg mb-8">
          No worries — no money has been taken. You can try again whenever
          you&rsquo;re ready.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-brand-warm text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-warm-dark transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
