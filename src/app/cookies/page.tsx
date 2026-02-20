import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-brand-dark mb-6">Cookie Policy</h1>
        <div className="bg-white rounded-2xl p-8 border border-brand-warm/10 shadow-sm space-y-6 text-sm leading-relaxed text-brand-gray">
          <p>
            We use cookies and similar technologies to keep the website secure, remember preferences, and understand
            platform usage.
          </p>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">Essential cookies</h2>
            <p>
              Required for core functionality including admin authentication, routing, and fraud prevention.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">Analytics cookies</h2>
            <p>
              Used only when enabled to help improve performance and accessibility. These are configured with privacy-first
              defaults.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-brand-dark mb-2">Managing cookies</h2>
            <p>
              You can control cookie settings in your browser. Blocking essential cookies may affect site functionality.
            </p>
          </section>
          <p className="text-xs text-brand-gray">Last updated: 20 February 2026</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
