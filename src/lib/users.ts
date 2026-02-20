import { getSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase/admin";
import {
  getAllActiveUsers as getSeedUsers,
  getAllLocations as getSeedLocations,
  getLeaderboard as getSeedLeaderboard,
  getPlatformStats as getSeedPlatformStats,
  getUserBySlug as getSeedUserBySlug,
  getUsersByLocation as getSeedUsersByLocation,
  isPaydayFriday,
  retailerPartners,
  type CommunityMember,
  type JourneyMilestone,
  type LeaderboardEntry,
  type PlatformStats,
  type RetailerPartner,
  type SupportMessage,
  type WishlistItem,
} from "@/lib/seed/phase2-members";

export type {
  CommunityMember,
  JourneyMilestone,
  LeaderboardEntry,
  PlatformStats,
  RetailerPartner,
  SupportMessage,
  WishlistItem,
};

export { isPaydayFriday, retailerPartners };

type MemberRow = {
  id: string;
  legacy_id: string | null;
  slug: string;
  first_name: string;
  age: number;
  bio: string;
  location: string;
  area: string;
  spendable_balance_pence: number;
  savings_pence: number;
  lifetime_raised_pence: number;
  savings_goal_pence: number;
  savings_goal_description: string;
  is_active: boolean;
  created_at: string;
  background: string;
  support_worker: string | null;
  matched_funding_partner: string | null;
  matched_funding_multiplier: number | null;
};

type JourneyRow = {
  member_id: string;
  event_date: string;
  title: string;
  description: string;
  type: JourneyMilestone["type"];
  sort_order: number;
};

type WishlistRow = {
  member_id: string;
  code: string;
  label: string;
  emoji: string;
  amount_pence: number;
  description: string;
  category: WishlistItem["category"];
  is_active: boolean;
  sort_order: number;
};

type MessageRow = {
  id: string;
  member_id: string;
  donor_name: string;
  message: string;
  created_at: string;
};

export interface TransactionLedgerItem {
  donationKey: string;
  createdAt: string;
  memberSlug: string;
  memberName: string;
  source: "checkout_session" | "invoice";
  frequency: "one-time" | "monthly";
  donationPence: number;
  spendablePence: number;
  savingsPence: number;
  platformFeePence: number;
  totalPaidPence: number;
  companyName?: string;
}

function useSeedFallback(): boolean {
  return !hasSupabaseAdminConfig();
}

function coerceNumber(value: unknown, fallback = 0): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function dateOnly(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

function mapMember(
  row: MemberRow,
  journeys: JourneyMilestone[],
  wishlist: WishlistItem[],
  messages: SupportMessage[]
): CommunityMember {
  const spendable = coerceNumber(row.spendable_balance_pence);
  const savings = coerceNumber(row.savings_pence);
  const lifetime = coerceNumber(row.lifetime_raised_pence, spendable + savings);

  return {
    id: row.legacy_id ?? row.id,
    databaseId: row.id,
    slug: row.slug,
    firstName: row.first_name,
    age: row.age,
    bio: row.bio,
    location: row.location,
    area: row.area,
    balancePence: lifetime,
    spendableBalancePence: spendable,
    savingsPence: savings,
    savingsGoalPence: coerceNumber(row.savings_goal_pence),
    savingsGoalDescription: row.savings_goal_description,
    active: row.is_active,
    createdAt: dateOnly(row.created_at),
    background: row.background,
    journey: journeys,
    wishlist,
    messages,
    supportWorker: row.support_worker ?? undefined,
    matchedFundingPartner: row.matched_funding_partner ?? undefined,
    matchedFundingMultiplier: row.matched_funding_multiplier ?? undefined,
  };
}

async function hydrateMembers(rows: MemberRow[]): Promise<CommunityMember[]> {
  if (rows.length === 0) {
    return [];
  }

  const supabase = getSupabaseAdminClient();
  const memberIds = rows.map((row) => row.id);

  const [journeyResult, wishlistResult, messagesResult] = await Promise.all([
    supabase
      .from("member_journey")
      .select("member_id,event_date,title,description,type,sort_order")
      .in("member_id", memberIds)
      .order("sort_order", { ascending: true }),
    supabase
      .from("member_wishlist_items")
      .select("member_id,code,label,emoji,amount_pence,description,category,is_active,sort_order")
      .in("member_id", memberIds)
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("support_messages")
      .select("id,member_id,donor_name,message,created_at")
      .in("member_id", memberIds)
      .order("created_at", { ascending: true }),
  ]);

  if (journeyResult.error) {
    throw journeyResult.error;
  }
  if (wishlistResult.error) {
    throw wishlistResult.error;
  }
  if (messagesResult.error) {
    throw messagesResult.error;
  }

  const journeyByMember = new Map<string, JourneyMilestone[]>();
  for (const row of (journeyResult.data as JourneyRow[]) ?? []) {
    const list = journeyByMember.get(row.member_id) ?? [];
    list.push({
      date: row.event_date,
      title: row.title,
      description: row.description,
      type: row.type,
    });
    journeyByMember.set(row.member_id, list);
  }

  const wishlistByMember = new Map<string, WishlistItem[]>();
  for (const row of (wishlistResult.data as WishlistRow[]) ?? []) {
    const list = wishlistByMember.get(row.member_id) ?? [];
    list.push({
      id: row.code,
      label: row.label,
      emoji: row.emoji,
      amountPence: coerceNumber(row.amount_pence),
      description: row.description,
      category: row.category,
    });
    wishlistByMember.set(row.member_id, list);
  }

  const messagesByMember = new Map<string, SupportMessage[]>();
  for (const row of (messagesResult.data as MessageRow[]) ?? []) {
    const list = messagesByMember.get(row.member_id) ?? [];
    list.push({
      id: row.id,
      donorName: row.donor_name || "Anonymous",
      message: row.message,
      createdAt: dateOnly(row.created_at),
    });
    messagesByMember.set(row.member_id, list);
  }

  return rows.map((row) =>
    mapMember(
      row,
      journeyByMember.get(row.id) ?? [],
      wishlistByMember.get(row.id) ?? [],
      messagesByMember.get(row.id) ?? []
    )
  );
}

async function getMemberRows(
  queryBuilder: () => Promise<{ data: MemberRow[] | null; error: { message: string } | null }>
): Promise<CommunityMember[]> {
  if (useSeedFallback()) {
    return getSeedUsers();
  }

  const result = await queryBuilder();
  if (result.error) {
    throw new Error(`Failed to fetch members: ${result.error.message}`);
  }

  return hydrateMembers(result.data ?? []);
}

export async function getAllActiveUsers(): Promise<CommunityMember[]> {
  if (useSeedFallback()) {
    return getSeedUsers();
  }

  const supabase = getSupabaseAdminClient();
  return getMemberRows(async () =>
    supabase
      .from("members")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true })
  );
}

export async function getUserBySlug(slug: string): Promise<CommunityMember | undefined> {
  if (useSeedFallback()) {
    return getSeedUserBySlug(slug);
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch member by slug: ${error.message}`);
  }

  if (!data) {
    return undefined;
  }

  const members = await hydrateMembers([data as MemberRow]);
  return members[0];
}

export async function getUsersByLocation(location: string): Promise<CommunityMember[]> {
  if (useSeedFallback()) {
    return getSeedUsersByLocation(location);
  }

  const supabase = getSupabaseAdminClient();
  return getMemberRows(async () =>
    supabase
      .from("members")
      .select("*")
      .eq("is_active", true)
      .ilike("location", location)
      .order("created_at", { ascending: true })
  );
}

export async function getAllLocations(): Promise<string[]> {
  if (useSeedFallback()) {
    return getSeedLocations();
  }

  const users = await getAllActiveUsers();
  return [...new Set(users.map((user) => user.location))].sort();
}

export async function getPlatformStats(): Promise<PlatformStats> {
  if (useSeedFallback()) {
    return getSeedPlatformStats();
  }

  const supabase = getSupabaseAdminClient();
  const viewResult = await supabase
    .from("platform_stats_v")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (!viewResult.error && viewResult.data) {
    const row = viewResult.data as Record<string, unknown>;
    return {
      totalProcessedPence: coerceNumber(row.total_processed_pence),
      totalSavingsPence: coerceNumber(row.total_savings_pence),
      totalDonations: coerceNumber(row.total_donations),
      totalMembers: coerceNumber(row.total_members),
      platformRevenuePence: coerceNumber(row.platform_revenue_pence),
      reinvestedPence: coerceNumber(row.reinvested_pence),
    };
  }

  const [members, donationsCount] = await Promise.all([
    getAllActiveUsers(),
    supabase.from("donations").select("id", { count: "exact", head: true }),
  ]);

  const totalProcessedPence = members.reduce((sum, member) => sum + member.balancePence, 0);
  const totalSavingsPence = members.reduce((sum, member) => sum + member.savingsPence, 0);

  return {
    totalProcessedPence,
    totalSavingsPence,
    totalDonations: donationsCount.count ?? 0,
    totalMembers: members.length,
    platformRevenuePence: Math.round(totalProcessedPence * 0.15),
    reinvestedPence: Math.round(totalProcessedPence * 0.15 * 0.6),
  };
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  if (useSeedFallback()) {
    return getSeedLeaderboard();
  }

  const supabase = getSupabaseAdminClient();
  const viewResult = await supabase
    .from("company_leaderboard_v")
    .select("company_name,total_donated_pence,donation_count,rank")
    .order("rank", { ascending: true });

  if (viewResult.error) {
    return getSeedLeaderboard();
  }

  return (viewResult.data ?? []).map((row: Record<string, unknown>) => ({
    companyName: String(row.company_name ?? "Unknown"),
    totalDonatedPence: coerceNumber(row.total_donated_pence),
    donationCount: coerceNumber(row.donation_count),
    rank: coerceNumber(row.rank),
  }));
}

export async function getMonthlyGrowth(): Promise<
  { month: string; raisedPence: number; savingsPence: number; memberCount: number }[]
> {
  if (useSeedFallback()) {
    return [
      { month: "January", raisedPence: 850000, savingsPence: 85000, memberCount: 2 },
      { month: "February", raisedPence: 1230000, savingsPence: 123000, memberCount: 5 },
      { month: "March", raisedPence: 1568000, savingsPence: 156800, memberCount: 8 },
      { month: "April", raisedPence: 1892000, savingsPence: 189200, memberCount: 10 },
      { month: "May", raisedPence: 2215000, savingsPence: 221500, memberCount: 12 },
      { month: "June", raisedPence: 2678000, savingsPence: 267800, memberCount: 15 },
    ];
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("monthly_growth_v")
    .select("month_label,raised_pence,savings_pence,member_count")
    .order("month_start", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch monthly growth: ${error.message}`);
  }

  return (data ?? []).map((row: Record<string, unknown>) => ({
    month: String(row.month_label ?? "Unknown"),
    raisedPence: coerceNumber(row.raised_pence),
    savingsPence: coerceNumber(row.savings_pence),
    memberCount: coerceNumber(row.member_count),
  }));
}

export async function getRecentTransactions(limit = 100): Promise<TransactionLedgerItem[]> {
  if (useSeedFallback()) {
    return [];
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("donations")
    .select(
      "donation_key,created_at,source,frequency,donation_pence,spendable_pence,savings_pence,platform_fee_pence,total_paid_pence,company_name,members(slug,first_name)"
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch transaction ledger: ${error.message}`);
  }

  return (data ?? []).map((row: Record<string, unknown>) => {
    const member = (row.members as Record<string, unknown> | null) ?? {};

    return {
      donationKey: String(row.donation_key ?? ""),
      createdAt: String(row.created_at ?? ""),
      memberSlug: String(member.slug ?? "unknown"),
      memberName: String(member.first_name ?? "Unknown"),
      source: (String(row.source ?? "checkout_session") as TransactionLedgerItem["source"]),
      frequency: (String(row.frequency ?? "one-time") as TransactionLedgerItem["frequency"]),
      donationPence: coerceNumber(row.donation_pence),
      spendablePence: coerceNumber(row.spendable_pence),
      savingsPence: coerceNumber(row.savings_pence),
      platformFeePence: coerceNumber(row.platform_fee_pence),
      totalPaidPence: coerceNumber(row.total_paid_pence),
      companyName: row.company_name ? String(row.company_name) : undefined,
    };
  });
}

/** Format pence as pounds string (e.g. 4520 -> "£45.20") */
export function formatPence(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}
