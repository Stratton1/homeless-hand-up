import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getAllActiveUsers, formatPence } from "@/lib/users";

export default function AdminPage() {
  const users = getAllActiveUsers();

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
              Support Worker Portal
            </h1>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
              Manage community members, track progress, and ensure everyone receives the support they need.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Demo Banner */}
          <div className="bg-gradient-to-r from-brand-warm/20 to-brand-warm-dark/20 border-2 border-brand-warm/30 rounded-xl p-6 flex items-start gap-4">
            <div className="text-3xl">📋</div>
            <div>
              <h2 className="font-bold text-brand-dark mb-1">Demo View</h2>
              <p className="text-brand-gray text-sm">
                This is a demonstration of the support worker portal. In production, this would connect to a secure admin dashboard with authentication, real-time updates, and full member management capabilities.
              </p>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 overflow-hidden">
            <div className="p-6 border-b border-brand-warm/10 bg-gradient-to-r from-brand-warm/5 to-brand-warm-dark/5">
              <h2 className="text-2xl font-bold text-brand-dark">
                Community Members ({users.length})
              </h2>
            </div>

            {users.length === 0 ? (
              <div className="p-8 text-center text-brand-gray">
                <p>No active community members at this time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-brand-cream border-b border-brand-warm/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">
                        Area
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">
                        Balance
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">
                        Savings
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-brand-dark">
                        Goal Progress
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">
                        Support Worker
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-warm/10">
                    {users.map((user, index) => {
                      const progressPercent = Math.round(
                        (user.savingsPence / user.savingsGoalPence) * 100
                      );

                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-brand-cream/50 transition-colors"
                        >
                          {/* Name */}
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-brand-dark">
                                {user.firstName}
                              </p>
                              <p className="text-xs text-brand-gray">
                                Age {user.age}
                              </p>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="px-6 py-4 text-brand-dark font-medium">
                            {user.location}
                          </td>

                          {/* Area */}
                          <td className="px-6 py-4 text-brand-gray text-sm">
                            {user.area}
                          </td>

                          {/* Balance */}
                          <td className="px-6 py-4 text-right">
                            <span className="inline-block bg-brand-warm/10 text-brand-warm font-semibold px-3 py-1 rounded-lg text-sm">
                              {formatPence(user.balancePence)}
                            </span>
                          </td>

                          {/* Savings */}
                          <td className="px-6 py-4 text-right">
                            <span className="inline-block bg-brand-trust/10 text-brand-trust font-semibold px-3 py-1 rounded-lg text-sm">
                              {formatPence(user.savingsPence)}
                            </span>
                          </td>

                          {/* Goal Progress */}
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-full bg-gradient-to-r from-brand-warm to-brand-warm-dark rounded-full transition-all"
                                  style={{
                                    width: `${Math.min(progressPercent, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-bold text-brand-dark min-w-[2rem]">
                                {progressPercent}%
                              </span>
                            </div>
                          </td>

                          {/* Support Worker */}
                          <td className="px-6 py-4">
                            {user.supportWorker ? (
                              <div className="bg-brand-trust/5 px-3 py-1 rounded-lg inline-block">
                                <p className="text-sm font-medium text-brand-dark">
                                  {user.supportWorker}
                                </p>
                              </div>
                            ) : (
                              <span className="text-xs text-brand-gray italic">
                                Unassigned
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md border border-brand-warm/10 p-6">
              <p className="text-sm text-brand-gray font-medium mb-2">
                Total Members
              </p>
              <p className="text-4xl font-bold text-brand-warm">{users.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-brand-warm/10 p-6">
              <p className="text-sm text-brand-gray font-medium mb-2">
                Active Donations
              </p>
              <p className="text-4xl font-bold text-brand-dark">
                {formatPence(
                  users.reduce((sum, u) => sum + u.balancePence, 0)
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-brand-warm/10 p-6">
              <p className="text-sm text-brand-gray font-medium mb-2">
                Total Savings
              </p>
              <p className="text-4xl font-bold text-brand-trust">
                {formatPence(
                  users.reduce((sum, u) => sum + u.savingsPence, 0)
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-brand-warm/10 p-6">
              <p className="text-sm text-brand-gray font-medium mb-2">
                Assigned Workers
              </p>
              <p className="text-4xl font-bold text-brand-dark">
                {users.filter((u) => u.supportWorker).length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
