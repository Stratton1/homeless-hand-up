import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AutoRefresh from "@/components/auto-refresh";
import { hasRequiredRole, isAdminRole } from "@/lib/admin-rbac";
import {
  getAllActiveUsers,
  formatPence,
  getMonthlyReconciliation,
  getRecentTransactions,
  getSavingsLedger,
} from "@/lib/users";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const role = session.user.role;
  if (!isAdminRole(role)) {
    redirect("/admin/login?error=forbidden");
  }

  const canManage = hasRequiredRole(role, "support_worker");
  const [users, transactions, savingsLedger, reconciliation, dataError] =
    await (async () => {
      try {
        const result = await Promise.all([
          getAllActiveUsers(),
          getRecentTransactions(25),
          getSavingsLedger(20),
          getMonthlyReconciliation(6),
        ]);
        return [result[0], result[1], result[2], result[3], null] as const;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load live admin data.";
        return [[], [], [], [], message] as const;
      }
    })();

  const lastUpdatedAt = new Date().toISOString();

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <SiteHeader />
      <AutoRefresh intervalMs={30000} />

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
          <div className="bg-gradient-to-r from-brand-trust/20 to-brand-warm/20 border-2 border-brand-trust/30 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔐</div>
              <div>
                <h2 className="font-bold text-brand-dark mb-1">Authenticated Admin Session</h2>
                <p className="text-brand-gray text-sm">
                  Signed in as {session.user.email}. Role: <span className="font-semibold">{role.replace("_", " ")}</span>.
                </p>
                <p className="text-brand-gray text-xs mt-1">
                  Last updated: {new Date(lastUpdatedAt).toLocaleString("en-GB")}
                </p>
                {!canManage && (
                  <p className="text-amber-700 text-xs mt-2">
                    Viewer role: read-only access is enabled.
                  </p>
                )}
              </div>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-brand-dark/20 text-brand-dark text-sm font-semibold hover:bg-white transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>

          {dataError && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              Live data is temporarily unavailable. Showing fallback-safe empty state. Error:{" "}
              {dataError}
            </div>
          )}

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
                    {users.map((user) => {
                      const progressPercent = Math.round(
                        (user.savingsPence / Math.max(user.savingsGoalPence, 1)) * 100
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

          {/* Transaction Ledger */}
          <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 overflow-hidden">
            <div className="p-6 border-b border-brand-warm/10 bg-gradient-to-r from-brand-trust/5 to-brand-warm/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-brand-dark">Transaction Ledger</h2>
                <p className="text-sm text-brand-gray mt-1">
                  Latest donation events (one-time and recurring) for audit and reconciliation.
                </p>
              </div>
              {canManage ? (
                <Link
                  href="/api/admin/transactions/export"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-dark text-white text-sm font-semibold hover:bg-brand-dark/90 transition-colors"
                >
                  Export CSV
                </Link>
              ) : (
                <span className="text-xs text-brand-gray">CSV export available to support worker/super admin roles.</span>
              )}
            </div>

            {transactions.length === 0 ? (
              <div className="p-8 text-center text-brand-gray">
                <p>No transactions recorded yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-brand-cream border-b border-brand-warm/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Timestamp</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Event</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Member</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Type</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">Donation</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">Net</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">Spendable</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">Savings</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">Fee</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Company</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-warm/10">
                    {transactions.map((tx) => (
                      <tr key={tx.donationKey} className="hover:bg-brand-cream/40">
                        <td className="px-6 py-3 text-xs text-brand-gray whitespace-nowrap">
                          {new Date(tx.createdAt).toLocaleString("en-GB")}
                        </td>
                        <td className="px-6 py-3 text-xs text-brand-gray whitespace-nowrap">
                          {tx.eventId}
                        </td>
                        <td className="px-6 py-3 text-sm text-brand-dark font-medium">
                          {tx.memberName}
                        </td>
                        <td className="px-6 py-3 text-xs text-brand-gray uppercase tracking-wide">
                          {tx.source.replace("_", " ")} · {tx.frequency}
                        </td>
                        <td className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">
                          {formatPence(tx.donationPence)}
                        </td>
                        <td className="px-6 py-3 text-right text-sm text-brand-dark">
                          {formatPence(tx.netToMemberPence)}
                        </td>
                        <td className="px-6 py-3 text-right text-sm text-brand-dark">
                          {formatPence(tx.spendablePence)}
                        </td>
                        <td className="px-6 py-3 text-right text-sm text-brand-trust">
                          {formatPence(tx.savingsPence)}
                        </td>
                        <td className="px-6 py-3 text-right text-sm text-brand-gray">
                          {formatPence(tx.platformFeePence)}
                        </td>
                        <td className="px-6 py-3 text-xs text-brand-gray">
                          {tx.normalizedCompanyName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 overflow-hidden">
              <div className="p-6 border-b border-brand-warm/10 bg-gradient-to-r from-brand-hope/10 to-brand-trust/10">
                <h2 className="text-xl font-bold text-brand-dark">Savings Ledger</h2>
                <p className="text-sm text-brand-gray mt-1">
                  Running savings accumulation by donation event.
                </p>
              </div>

              {savingsLedger.length === 0 ? (
                <div className="p-8 text-center text-brand-gray">
                  <p>No savings ledger entries yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-brand-cream border-b border-brand-warm/10">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Timestamp</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Member</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-brand-dark">Frequency</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">Savings</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">Cumulative</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-warm/10">
                      {savingsLedger.map((entry) => (
                        <tr key={`${entry.donationKey}-${entry.memberSlug}`} className="hover:bg-brand-cream/40">
                          <td className="px-6 py-3 text-xs text-brand-gray whitespace-nowrap">
                            {new Date(entry.createdAt).toLocaleString("en-GB")}
                          </td>
                          <td className="px-6 py-3 text-sm text-brand-dark font-medium">
                            {entry.memberName}
                          </td>
                          <td className="px-6 py-3 text-xs text-brand-gray uppercase tracking-wide">
                            {entry.frequency}
                          </td>
                          <td className="px-6 py-3 text-right text-sm text-brand-trust">
                            {formatPence(entry.savingsPence)}
                          </td>
                          <td className="px-6 py-3 text-right text-sm font-semibold text-brand-dark">
                            {formatPence(entry.cumulativeSavingsPence)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-brand-warm/10 overflow-hidden">
              <div className="p-6 border-b border-brand-warm/10 bg-gradient-to-r from-brand-trust/10 to-brand-warm/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-brand-dark">Monthly Reconciliation</h2>
                  <p className="text-sm text-brand-gray mt-1">
                    Donations, savings, spendable and platform fee totals by month.
                  </p>
                </div>
                <Link
                  href="/api/admin/reports/monthly-reconciliation?format=csv"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-brand-dark/20 text-brand-dark text-sm font-semibold hover:bg-brand-cream transition-colors"
                >
                  Export Monthly CSV
                </Link>
              </div>

              {reconciliation.length === 0 ? (
                <div className="p-8 text-center text-brand-gray">
                  <p>No reconciliation rows yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-brand-warm/10">
                  {reconciliation.map((month) => (
                    <div key={month.monthKey} className="p-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-brand-dark">{month.monthKey}</p>
                        <p className="text-xs text-brand-gray">
                          {month.donationCount} donations • Savings {formatPence(month.savingsPence)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-brand-dark">
                          Gross {formatPence(month.grossPaidPence)}
                        </p>
                        <p className="text-xs text-brand-gray">
                          Net to members {formatPence(month.netToMembersPence)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
