import Link from "next/link";
import { getAllActiveUsers, getAllLocations, getUsersByLocation } from "@/lib/users";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CommunityGrid from "./community-grid";

export default function CommunityPage() {
  const allUsers = getAllActiveUsers();
  const locations = getAllLocations();

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-warm/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-hope/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-brand-dark">
              Meet Our Community
            </h1>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
              Real people, real stories, real impact. Get to know the individuals we support and
              choose who to help today.
            </p>
          </div>
        </div>
      </section>

      {/* Community Grid Section */}
      <section className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <CommunityGrid users={allUsers} locations={locations} />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-brand-trust-dark to-brand-trust relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            More people joining every day
          </h2>
          <p className="text-lg text-brand-trust-light mb-8 leading-relaxed">
            Are you or someone you know experiencing homelessness and want to join Homeless Hand Up?
            We&rsquo;re here to support your journey.
          </p>
          <a
            href="mailto:hello@homelesshandup.org"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-trust font-semibold rounded-full hover:shadow-lg hover:shadow-brand-trust/20 transition-all hover:-translate-y-0.5"
          >
            Get Registered
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
