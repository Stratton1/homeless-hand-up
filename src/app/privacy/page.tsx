import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-brand-dark mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-2xl p-8 border border-brand-warm/10 shadow-sm space-y-6 text-sm leading-relaxed text-brand-gray">
          <p>
            Homeless Hand Up is committed to protecting your personal information. This page explains what we collect,
            why we collect it, and how it is used.
          </p>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">What we collect</h2>
            <p>
              We collect donation metadata, optional support messages, and operational information needed to process
              payments and maintain platform security.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">How we use data</h2>
            <p>
              Data is used for payment processing, transparency reporting, fraud prevention, and support coordination.
              We do not sell personal data.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">Retention and access</h2>
            <p>
              Financial and operational records are retained for audit and legal compliance. To request access or deletion,
              email hello@homelesshandup.org.
            </p>
          </section>
          <p className="text-xs text-brand-gray">Last updated: 20 February 2026</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
