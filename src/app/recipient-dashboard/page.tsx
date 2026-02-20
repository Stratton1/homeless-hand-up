import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AutoRefresh from "@/components/auto-refresh";
import { getUserBySlug, formatPence } from "@/lib/users";
import EmergencyButton from "./emergency-button";

export default async function RecipientDashboardPage() {
  let user;
  let dataError: string | null = null;

  try {
    user = await getUserBySlug("james-manchester");
  } catch (error) {
    dataError =
      error instanceof Error ? error.message : "Failed to load dashboard data.";
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-cream">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              User Not Found
            </h1>
            <p className="text-brand-gray">
              Could not load recipient dashboard.
            </p>
            {dataError && (
              <p className="text-sm text-amber-700 mt-3">
                Live data temporarily unavailable: {dataError}
              </p>
            )}
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const spendableBalancePence =
    user.spendableBalancePence ?? Math.max(user.balancePence - user.savingsPence, 0);
  const progressPercent = Math.round(
    (user.savingsPence / Math.max(user.savingsGoalPence, 1)) * 100
  );
  const lastUpdatedAt = new Date().toISOString();

  // Calculate recent messages (last 3)
  const recentMessages = user.messages.slice(-3).reverse();

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />
      <AutoRefresh intervalMs={20000} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-warm/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-hope/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-brand-dark">
              Welcome Back, {user.firstName}
            </h1>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
              Check your balance, track your progress, and stay connected with your support.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Demo Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 flex items-start gap-4">
            <div className="text-3xl">ℹ️</div>
            <div>
              <h2 className="font-bold text-blue-900 mb-1">Demo View</h2>
              <p className="text-blue-800 text-sm">
                This is a demonstration of the recipient dashboard. In production, recipients would log in securely to view and manage their account, with real-time transaction history and support options.
              </p>
              <p className="text-blue-800 text-xs mt-2">
                Last refreshed: {new Date(lastUpdatedAt).toLocaleString("en-GB")}
              </p>
            </div>
          </div>

          {dataError && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              Live data is temporarily unavailable. You may be viewing cached content.
            </div>
          )}

          {/* Balance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Current Balance */}
            <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 p-8">
              <p className="text-sm text-brand-gray font-medium mb-3">
                💰 Current Balance
              </p>
              <p className="text-4xl font-bold text-brand-warm mb-2">
                {formatPence(spendableBalancePence)}
              </p>
              <p className="text-xs text-brand-gray">
                Available to spend at partner retailers
              </p>
            </div>

            {/* Savings */}
            <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 p-8">
              <p className="text-sm text-brand-gray font-medium mb-3">
                🏦 Savings Balance
              </p>
              <p className="text-4xl font-bold text-brand-trust mb-2">
                {formatPence(user.savingsPence)}
              </p>
              <p className="text-xs text-brand-gray">
                Locked away for your future
              </p>
            </div>

            {/* Support Worker */}
            <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 p-8">
              <p className="text-sm text-brand-gray font-medium mb-3">
                👤 Your Support Worker
              </p>
              <p className="text-xl font-bold text-brand-dark mb-2">
                {user.supportWorker || "Unassigned"}
              </p>
              <p className="text-xs text-brand-gray">
                Always here to help you
              </p>
            </div>
          </div>

          {/* Housing Savings Goal */}
          <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 p-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-2">
              🏠 Housing Goal Progress
            </h2>
            <p className="text-brand-gray mb-6">
              {user.savingsGoalDescription}
            </p>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-brand-gray">
                  {progressPercent}% complete
                </span>
                <span className="text-sm font-bold text-brand-warm">
                  {formatPence(user.savingsPence)} of{" "}
                  {formatPence(user.savingsGoalPence)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-brand-warm/10">
                <div
                  className="h-full bg-gradient-to-r from-brand-warm to-brand-warm-dark transition-all duration-500"
                  style={{
                    width: `${Math.min(progressPercent, 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-brand-gray mt-2">
                Every donation brings you closer to your goal. Keep going!
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Messages of Support */}
            <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 p-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <span>💌</span> Messages of Support
              </h2>

              {recentMessages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-brand-gray">
                    No messages yet. Keep sharing your story!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-brand-cream rounded-lg p-4 border border-brand-warm/10"
                    >
                      <p className="text-sm text-brand-dark mb-2">
                        "{msg.message}"
                      </p>
                      <p className="text-xs text-brand-gray font-medium">
                        — {msg.donorName}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Status */}
            <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 p-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <span>🎁</span> Your Wishlist
              </h2>

              {user.wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-brand-gray">
                    No wishlist items yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {user.wishlist.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 bg-brand-cream rounded-lg border border-brand-warm/10"
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-brand-dark text-sm">
                          {item.label}
                        </p>
                        <p className="text-xs text-brand-gray">
                          {item.description}
                        </p>
                        <p className="text-xs font-bold text-brand-warm mt-1">
                          {formatPence(item.amountPence)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {user.wishlist.length > 4 && (
                    <p className="text-xs text-brand-gray text-center pt-2">
                      +{user.wishlist.length - 4} more items
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Emergency Support Section */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-lg border-2 border-red-200 p-8">
            <h2 className="text-2xl font-bold text-red-900 mb-2 flex items-center gap-2">
              <span>🆘</span> In Crisis?
            </h2>
            <p className="text-red-800 mb-6">
              If you need immediate support, emergency contact, or are in a dangerous situation, use the button below. Your support worker will respond as soon as possible.
            </p>
            <EmergencyButton />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-trust/10 rounded-xl p-6 border border-brand-trust/20">
              <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                <span>✅</span> Account Status
              </h3>
              <p className="text-sm text-brand-gray">
                Your account is active and accepting donations. Your QR code is working and ready to share.
              </p>
            </div>

            <div className="bg-brand-warm/10 rounded-xl p-6 border border-brand-warm/20">
              <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                <span>📱</span> How to Share
              </h3>
              <p className="text-sm text-brand-gray">
                Show your QR badge to receive donations. Ask your support worker for printed copies to carry with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
