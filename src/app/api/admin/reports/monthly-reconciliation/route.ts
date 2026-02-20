import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { hasRequiredRole, isAdminRole } from "@/lib/admin-rbac";
import { formatPence, getMonthlyReconciliation } from "@/lib/users";

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  if (!isAdminRole(role) || !hasRequiredRole(role, "viewer")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const reconciliation = await getMonthlyReconciliation(24);
  const outputFormat = request.nextUrl.searchParams.get("format");

  if (outputFormat !== "csv") {
    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        months: reconciliation,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const headers = [
    "month_key",
    "month_start",
    "donation_count",
    "donation_pence",
    "savings_pence",
    "spendable_pence",
    "platform_fee_pence",
    "gross_paid_pence",
    "net_to_members_pence",
    "donation_display",
    "savings_display",
    "spendable_display",
    "fee_display",
    "gross_display",
    "net_display",
  ];

  const rows = reconciliation.map((month) => [
    month.monthKey,
    month.monthStart,
    String(month.donationCount),
    String(month.donationPence),
    String(month.savingsPence),
    String(month.spendablePence),
    String(month.platformFeePence),
    String(month.grossPaidPence),
    String(month.netToMembersPence),
    formatPence(month.donationPence),
    formatPence(month.savingsPence),
    formatPence(month.spendablePence),
    formatPence(month.platformFeePence),
    formatPence(month.grossPaidPence),
    formatPence(month.netToMembersPence),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map((value) => csvEscape(value)).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=monthly-reconciliation-${new Date().toISOString().slice(0, 10)}.csv`,
      "Cache-Control": "no-store",
    },
  });
}
