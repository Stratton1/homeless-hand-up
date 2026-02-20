import Image from "next/image";
import { retailerPartners } from "@/lib/users";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function WhereToSpendPage() {
  const supermarkets = retailerPartners.filter((r) => r.category === "Supermarket");
  const other = retailerPartners.filter((r) => r.category !== "Supermarket");

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-hope/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-0 w-80 h-80 bg-brand-warm/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-brand-dark">
            Where Funds Can Be Used
          </h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
            Our restricted payment system works at real, everyday retailers. Your donation gets spent
            on genuine needs — groceries, hygiene, warm clothes, and essentials.
          </p>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-cream rounded-2xl p-8 border border-brand-warm/20">
            <h2 className="text-2xl font-bold mb-4 text-brand-dark">How It Works</h2>
            <p className="text-brand-gray leading-relaxed">
              Rather than handing over cash or using a regular debit card, we&rsquo;ve partnered with
              approved retailers where funds can be used. This approach:
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3">
                <span className="text-brand-warm font-bold">✓</span>
                <span className="text-brand-gray">
                  <strong>Ensures every penny counts</strong> — funds go to food, clothing, hygiene,
                  and essentials
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-warm font-bold">✓</span>
                <span className="text-brand-gray">
                  <strong>Prevents harmful spending</strong> — no risk of funds going to alcohol,
                  tobacco, or gambling
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-warm font-bold">✓</span>
                <span className="text-brand-gray">
                  <strong>Gives donors confidence</strong> — they know their generosity is being used
                  responsibly
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-warm font-bold">✓</span>
                <span className="text-brand-gray">
                  <strong>Protects recipients</strong> — nobody is judged or made to feel less-than
                  when purchasing essentials
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Retailers Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Supermarkets Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2 text-brand-dark">Supermarkets & Grocers</h2>
            <p className="text-brand-gray mb-8">
              Buy fresh food, household essentials, and everyday items.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {supermarkets.map((retailer) => (
                <div
                  key={retailer.slug}
                  className="bg-white rounded-2xl p-6 border border-brand-warm/10 shadow-sm hover:shadow-lg hover:shadow-brand-warm/10 transition-all hover:-translate-y-1 group"
                >
                  <div className="h-16 mb-4 rounded-xl border border-brand-warm/10 bg-brand-cream/30 flex items-center justify-start px-4">
                    {retailer.logo.type === "svg" ? (
                      <Image
                        src={retailer.logo.src}
                        alt={retailer.logo.alt}
                        width={180}
                        height={64}
                        className="max-h-10 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-5xl group-hover:scale-110 transition-transform">
                        {retailer.logo.value}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{retailer.name}</h3>
                  <p className="text-sm text-brand-gray mb-3">{retailer.description}</p>
                  <span className="inline-block text-xs font-semibold text-brand-warm bg-brand-warm/10 px-3 py-1 rounded-full">
                    {retailer.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Retailers Section */}
          <div>
            <h2 className="text-2xl font-bold mb-2 text-brand-dark">Essentials & Services</h2>
            <p className="text-brand-gray mb-8">
              Get hygiene items, health products, and affordable clothing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {other.map((retailer) => (
                <div
                  key={retailer.slug}
                  className="bg-white rounded-2xl p-6 border border-brand-trust/10 shadow-sm hover:shadow-lg hover:shadow-brand-trust/10 transition-all hover:-translate-y-1 group"
                >
                  <div className="h-16 mb-4 rounded-xl border border-brand-trust/10 bg-brand-cream/30 flex items-center justify-start px-4">
                    {retailer.logo.type === "svg" ? (
                      <Image
                        src={retailer.logo.src}
                        alt={retailer.logo.alt}
                        width={180}
                        height={64}
                        className="max-h-10 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-5xl group-hover:scale-110 transition-transform">
                        {retailer.logo.value}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{retailer.name}</h3>
                  <p className="text-sm text-brand-gray mb-3">{retailer.description}</p>
                  <span className="inline-block text-xs font-semibold text-brand-trust bg-brand-trust/10 px-3 py-1 rounded-full">
                    {retailer.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-xs text-brand-gray">
            Brand logos are used for identification only. Trademarks remain the property of their
            respective owners.
          </p>
        </div>
      </section>

      {/* What's Blocked Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-brand-dark">What's Not Allowed (And Why)</h2>
          <p className="text-brand-gray mb-10 leading-relaxed">
            We&rsquo;ve thoughtfully chosen what funds cannot be used for. This isn&rsquo;t about
            judgment — it&rsquo;s about supporting long-term wellbeing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alcohol */}
            <div className="bg-brand-cream rounded-2xl p-6 border border-brand-warm/10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🍺</div>
                <div>
                  <h3 className="font-bold text-lg text-brand-dark mb-2">Alcohol</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">
                    We support people working on their recovery and long-term stability. Funds focus
                    on health and rebuilding.
                  </p>
                </div>
              </div>
            </div>

            {/* Tobacco */}
            <div className="bg-brand-cream rounded-2xl p-6 border border-brand-warm/10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🚬</div>
                <div>
                  <h3 className="font-bold text-lg text-brand-dark mb-2">Tobacco</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">
                    We want donations to improve health and wellbeing. Support is available for
                    anyone looking to quit.
                  </p>
                </div>
              </div>
            </div>

            {/* Gambling */}
            <div className="bg-brand-cream rounded-2xl p-6 border border-brand-warm/10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎰</div>
                <div>
                  <h3 className="font-bold text-lg text-brand-dark mb-2">Gambling</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">
                    These services can create dependency and worsen financial instability. We
                    support safer pathways instead.
                  </p>
                </div>
              </div>
            </div>

            {/* Online Transfers */}
            <div className="bg-brand-cream rounded-2xl p-6 border border-brand-warm/10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💸</div>
                <div>
                  <h3 className="font-bold text-lg text-brand-dark mb-2">Online Transfers</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">
                    Funds stay tangible and visible. They&rsquo;re spent on real goods, not moved
                    between accounts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-brand-warm/5 rounded-xl border border-brand-warm/20">
            <p className="text-sm text-brand-gray leading-relaxed">
              <strong>Important:</strong> These restrictions are designed with compassion, not
              judgment. We work closely with support workers and our community to ensure
              guidelines are fair and helpful. If you have concerns about how these policies are
              applied, please get in touch.
            </p>
          </div>
        </div>
      </section>

      {/* Expansion Plans */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-brand-dark">Growing Our Network</h2>
          <p className="text-brand-gray mb-10 leading-relaxed">
            We&rsquo;re actively working with retailers to expand this list. Our goal is to make it
            easy to spend donations at places people actually shop.
          </p>

          <div className="bg-gradient-to-br from-brand-cream to-white rounded-2xl p-8 border border-brand-trust/10">
            <h3 className="text-xl font-bold text-brand-dark mb-4">Coming Soon</h3>
            <ul className="space-y-3 text-brand-gray">
              <li className="flex gap-3">
                <span className="text-brand-trust font-bold">→</span>
                <span>Charity cafes and community kitchens</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-trust font-bold">→</span>
                <span>Local independent shops and markets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-trust font-bold">→</span>
                <span>Travel operators for bus and train tickets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-trust font-bold">→</span>
                <span>Supported housing providers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-trust font-bold">→</span>
                <span>Council housing and homelessness services</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Retailer Partnership CTA */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-brand-dark">Are You a Retailer?</h2>
          <p className="text-lg text-brand-gray mb-8 leading-relaxed">
            We&rsquo;re looking for businesses and organisations who want to be part of the solution.
            Partner with us and make a real difference in your community.
          </p>
          <a
            href="mailto:hello@homelesshandup.org?subject=Retailer%20Partnership%20Interest"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-brand-warm to-brand-warm-dark text-white font-semibold rounded-full hover:shadow-lg hover:shadow-brand-warm/20 transition-all hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
