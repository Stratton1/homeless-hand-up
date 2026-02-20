import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { formatPence, getRecentTransactions } from "@/lib/users";

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  if (role !== "support_worker" && role !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const transactions = await getRecentTransactions(1000);
  const headers = [
    "donation_key",
    "created_at",
    "member_name",
    "member_slug",
    "source",
    "frequency",
    "donation_pence",
    "spendable_pence",
    "savings_pence",
    "platform_fee_pence",
    "total_paid_pence",
    "company_name",
    "donation_display",
    "spendable_display",
    "savings_display",
    "fee_display",
  ];

  const rows = transactions.map((tx) => [
    tx.donationKey,
    tx.createdAt,
    tx.memberName,
    tx.memberSlug,
    tx.source,
    tx.frequency,
    String(tx.donationPence),
    String(tx.spendablePence),
    String(tx.savingsPence),
    String(tx.platformFeePence),
    String(tx.totalPaidPence),
    tx.companyName ?? "",
    formatPence(tx.donationPence),
    formatPence(tx.spendablePence),
    formatPence(tx.savingsPence),
    formatPence(tx.platformFeePence),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map((col) => csvEscape(col)).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=homeless-hand-up-transactions-${new Date().toISOString().slice(0, 10)}.csv`,
      "Cache-Control": "no-store",
    },
  });
}
