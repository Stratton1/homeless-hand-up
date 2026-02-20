import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "How It Works for Recipients | Homeless Hand Up",
  description:
    "How homeless individuals join Homeless Hand Up and receive direct support from their community.",
};

export default function RecipientsPage() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      {/* Background decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-warm/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-80 h-80 bg-brand-trust/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-hope/3 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10">
        <SiteHeader />

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          {/* Hero Section */}
          <section className="mb-16 sm:mb-24 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              How we support our community members
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
              This page explains how someone joins the platform. We believe transparency matters. You deserve to know exactly how we work.
            </p>
          </section>

          {/* Onboarding Process */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-2">
                The pathway to joining
              </h2>
              <p className="text-brand-gray">
                Four steps. Thoughtful. Supported. Human.
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-brand-trust text-white font-bold text-xl flex items-center justify-center shadow-md">
                    1
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-brand-trust/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    Referred by a partner
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    Someone working in homelessness support—a charity, shelter, outreach worker, or support organisation—identifies you as someone who would benefit from the platform. They know your situation. They know you want to receive support but can't easily do so.
                  </p>
                  <div className="bg-brand-cream rounded-lg p-4 text-sm text-brand-gray">
                    <p className="font-medium text-brand-dark mb-2">Who our partners are:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Homelessness charities and shelters</li>
                      <li>• Local authority outreach teams</li>
                      <li>• Mental health and addiction support services</li>
                      <li>• Food banks and community centres</li>
                      <li>• Frontline support workers</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-brand-warm text-white font-bold text-xl flex items-center justify-center shadow-md">
                    2
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-brand-warm/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    Verified and registered
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    A support worker completes your registration with us. We confirm your identity, your situation, and that you've given consent to join. Nothing happens without you agreeing. You control what information appears on your profile.
                  </p>
                  <p className="text-sm text-brand-gray italic">
                    We gather only what we need: your name, a location, what you need most, and how to reach you. Nothing invasive. Nothing you wouldn't tell someone genuinely trying to help.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-brand-hope text-white font-bold text-xl flex items-center justify-center shadow-md">
                    3
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-brand-hope/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    QR card issued
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    You receive a printed card or lanyard badge with your unique QR code. It's durable. It's yours. You carry it with you. When someone scans it, they reach your profile and can donate directly to you.
                  </p>
                  <p className="text-sm text-brand-gray italic">
                    The card is simple. Professional. Not stigmatising. Just a tool that makes it easy for good people to help.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                    4
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-green-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                    Donations received
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">
                    When someone scans your QR code and donates, the money hits your account instantly. You get a notification. You can see exactly who gave, how much, and when. No waiting. No uncertainty.
                  </p>
                  <p className="text-sm text-brand-gray italic">
                    You can check your balance anytime via your profile link or your card holder portal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Restricted Card System */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-2">
                The restricted card system
              </h2>
              <p className="text-brand-gray">
                What it is, why it exists, and why it's dignifying.
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-brand-trust/10">
              <p className="text-brand-gray leading-relaxed mb-8">
                Your donations load onto a restricted mobile card. It works like a debit card, but at partner retailers only. No off-license. No bookmaker. No gaming arcade. Those blocks are about channelling support into what genuinely helps rebuild.
              </p>

              <div className="space-y-6">
                {/* What you can spend on */}
                <div>
                  <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    You can spend on
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm text-brand-gray">
                    <li className="flex gap-2">
                      <span className="text-brand-warm">•</span>
                      <span>Food and groceries</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-warm">•</span>
                      <span>Toiletries and hygiene</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-warm">•</span>
                      <span>Clothing and shoes</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-warm">•</span>
                      <span>Phone top-ups</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-warm">•</span>
                      <span>Travel and transport</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-warm">•</span>
                      <span>Books and learning</span>
                    </li>
                  </ul>
                </div>

                {/* What you can't spend on */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Not allowed
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm text-brand-gray">
                    <li className="flex gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Alcohol</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Tobacco</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Gambling</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Energy drinks (high caffeine)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 bg-brand-cream rounded-lg p-6">
                <p className="text-sm text-brand-dark font-medium mb-2">
                  Why this matters
                </p>
                <p className="text-sm text-brand-gray leading-relaxed">
                  These aren't rules to control you. They're channels for support. Donors want to help rebuild your life, not fund habits that keep you stuck. Every person is an expert in their own recovery. The card system just makes sure your path home is as clear as possible.
                </p>
              </div>
            </div>
          </section>

          {/* Housing Savings Section */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                The 10% housing savings
              </h2>
              <p className="text-brand-gray">
                How your path home builds, penny by penny.
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-brand-trust/10">
              <p className="text-brand-gray leading-relaxed mb-8">
                Of every donation you receive, 10% automatically goes into housing savings. You can't spend this. It just grows. It's protected. And one day, it becomes your deposit.
              </p>

              {/* Example */}
              <div className="bg-brand-cream rounded-lg p-8 mb-8">
                <p className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-4">
                  A real example
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-brand-gray">If you receive £50 per month</span>
                    <span className="font-bold text-brand-dark">£50</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-brand-gray">10% locks away for housing</span>
                    <span className="font-bold text-brand-warm">£5</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-brand-gray">You have to spend</span>
                    <span className="font-bold text-brand-dark">£45</span>
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-gray-300">
                    <p className="text-xs text-brand-gray mb-3 font-medium">After 12 months</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-brand-dark">
                        Your housing savings
                      </span>
                      <span className="text-2xl font-bold text-brand-trust">£60</span>
                    </div>
                    <p className="text-xs text-brand-gray mt-2">
                      That's real progress towards a deposit.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-brand-gray leading-relaxed">
                We know housing deposits are the biggest blocker to independence. We know people want to save but can't when survival is the priority. This system does the saving for you. Automatically. Reliably. Towards something real.
              </p>
            </div>
          </section>

          {/* Support Network */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                You're never alone
              </h2>
              <p className="text-brand-gray">
                A support network around you, every step.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Support card 1 */}
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-3">
                  Dedicated support worker
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  You keep your relationship with the person who brought you on the platform. They check in. They help you manage your account. They know your situation.
                </p>
              </div>

              {/* Support card 2 */}
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-3">
                  Access to services
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Partner with us and you access a network of services: mental health support, addiction services, housing advice, healthcare.
                </p>
              </div>

              {/* Support card 3 */}
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-3">
                  Pathway planning
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Together, you build a plan. Housing. Employment. Training. Each person's path is different. We support it.
                </p>
              </div>

              {/* Support card 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-3">
                  Community
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  You're part of something. Other people rebuilding. Donors who care. A movement towards dignity and independence.
                </p>
              </div>
            </div>
          </section>

          {/* For organisations */}
          <section className="mb-20 sm:mb-28">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-brand-trust/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-6">
                Want to partner with us?
              </h2>
              <p className="text-brand-gray leading-relaxed mb-6">
                If you work in homelessness support—a charity, shelter, outreach team, or local authority—we'd love to talk about getting people on the platform. You identify individuals. We handle the technology. Together, we help people rebuild.
              </p>
              <p className="text-brand-gray mb-8">
                Partner organisations get:
              </p>
              <ul className="space-y-3 mb-8 text-sm text-brand-gray">
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
                  <span>Support for integrating people into the programme</span>
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
                  <span>Free QR cards and lanyards for your community members</span>
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
                  <span>Access to an admin dashboard showing impacts</span>
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
                  <span>Training and ongoing technical support</span>
                </li>
              </ul>

              <a
                href="mailto:hello@homelesshandup.uk"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand-warm text-white font-medium hover:bg-brand-warm-dark transition-colors shadow-sm"
              >
                Get in touch about partnerships
              </a>
            </div>
          </section>

          {/* Dignity & Transparency */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
                Our commitment to you
              </h2>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="bg-brand-cream rounded-lg p-6 border-l-4 border-brand-warm">
                  <p className="text-brand-dark font-medium mb-2">Dignity</p>
                  <p className="text-sm text-brand-gray">
                    You're not a case study. You're a person rebuilding. We respect that.
                  </p>
                </div>

                <div className="bg-brand-cream rounded-lg p-6 border-l-4 border-brand-trust">
                  <p className="text-brand-dark font-medium mb-2">Transparency</p>
                  <p className="text-sm text-brand-gray">
                    See exactly what comes in. Where it goes. No hidden deductions. No mystery.
                  </p>
                </div>

                <div className="bg-brand-cream rounded-lg p-6 border-l-4 border-brand-hope">
                  <p className="text-brand-dark font-medium mb-2">Autonomy</p>
                  <p className="text-sm text-brand-gray">
                    You choose how to spend your money (within the parameters). You lead. We support.
                  </p>
                </div>

                <div className="bg-brand-cream rounded-lg p-6 border-l-4 border-green-500">
                  <p className="text-brand-dark font-medium mb-2">Progress</p>
                  <p className="text-sm text-brand-gray">
                    Every month, your housing savings grow. Your pathway home becomes clearer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-3">
              Ready to join?
            </h2>
            <p className="text-brand-gray mb-8 max-w-lg mx-auto">
              Talk to your support worker or local homelessness service. They can refer you. Or reach out to us directly.
            </p>
            <a
              href="mailto:hello@homelesshandup.uk"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand-warm text-white font-medium hover:bg-brand-warm-dark transition-colors shadow-sm"
            >
              Get in touch
            </a>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
