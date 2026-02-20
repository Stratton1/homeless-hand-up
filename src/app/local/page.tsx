import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import LocalFinder from "./local-finder";
import { getAllActiveUsers, getAllLocations } from "@/lib/users";

export default async function LocalPage() {
  const [locations, members] = await Promise.all([
    getAllLocations(),
    getAllActiveUsers(),
  ]);

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
              Find Near Me
            </h1>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
              Support people in your area. Select your city to discover community members you can help today.
            </p>
          </div>
        </div>
      </section>

      {/* Local Finder Section */}
      <section className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <LocalFinder locations={locations} members={members} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
