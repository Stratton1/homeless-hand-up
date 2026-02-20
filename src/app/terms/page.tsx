import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-brand-dark mb-6">Terms of Service</h1>
        <div className="bg-white rounded-2xl p-8 border border-brand-warm/10 shadow-sm space-y-6 text-sm leading-relaxed text-brand-gray">
          <p>
            By using Homeless Hand Up, you agree to these terms governing donations, account access, and platform usage.
          </p>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">Donations</h2>
            <p>
              Donations are processed by Stripe. Refunds, disputes, and payment compliance follow Stripe and applicable
              UK consumer law requirements.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">Acceptable use</h2>
            <p>
              You must not abuse the platform, attempt unauthorised access, or submit misleading or harmful content.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">Liability and updates</h2>
            <p>
              We may update these terms as the service evolves, regulatory guidance changes, or partnerships are added.
            </p>
          </section>
          <p className="text-xs text-brand-gray">Last updated: 20 February 2026</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
