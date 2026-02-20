import { createClient } from "@supabase/supabase-js";
import { phase2CommunityMembers } from "../src/lib/seed/phase2-members";

function mustEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  const url = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = mustEnv("SUPABASE_SERVICE_ROLE_KEY");

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const slugSet = new Set<string>();

  for (const member of phase2CommunityMembers) {
    slugSet.add(member.slug);

    const spendableBalancePence =
      member.spendableBalancePence ?? Math.max(member.balancePence - member.savingsPence, 0);

    const { data: upsertedMember, error: upsertError } = await supabase
      .from("members")
      .upsert(
        {
          legacy_id: member.id,
          slug: member.slug,
          first_name: member.firstName,
          age: member.age,
          bio: member.bio,
          location: member.location,
          area: member.area,
          background: member.background,
          support_worker: member.supportWorker ?? null,
          matched_funding_partner: member.matchedFundingPartner ?? null,
          matched_funding_multiplier: member.matchedFundingMultiplier ?? 1,
          is_active: member.active,
          created_at: `${member.createdAt}T00:00:00.000Z`,
          spendable_balance_pence: spendableBalancePence,
          savings_pence: member.savingsPence,
          lifetime_raised_pence: member.balancePence,
          savings_goal_pence: member.savingsGoalPence,
          savings_goal_description: member.savingsGoalDescription,
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (upsertError || !upsertedMember) {
      throw new Error(`Failed to upsert member ${member.slug}: ${upsertError?.message}`);
    }

    const memberId = upsertedMember.id as string;

    await supabase.from("member_journey").delete().eq("member_id", memberId);
    await supabase.from("member_wishlist_items").delete().eq("member_id", memberId);
    await supabase.from("support_messages").delete().eq("member_id", memberId);

    if (member.journey.length > 0) {
      const { error } = await supabase.from("member_journey").insert(
        member.journey.map((item, index) => ({
          member_id: memberId,
          event_date: item.date,
          title: item.title,
          description: item.description,
          type: item.type,
          sort_order: index,
        }))
      );

      if (error) {
        throw new Error(`Failed to seed journey for ${member.slug}: ${error.message}`);
      }
    }

    if (member.wishlist.length > 0) {
      const { error } = await supabase.from("member_wishlist_items").insert(
        member.wishlist.map((item, index) => ({
          member_id: memberId,
          code: item.id,
          label: item.label,
          emoji: item.emoji,
          amount_pence: item.amountPence,
          description: item.description,
          category: item.category,
          is_active: true,
          sort_order: index,
        }))
      );

      if (error) {
        throw new Error(`Failed to seed wishlist for ${member.slug}: ${error.message}`);
      }
    }

    if (member.messages.length > 0) {
      const { error } = await supabase.from("support_messages").insert(
        member.messages.map((msg) => ({
          member_id: memberId,
          donor_name: msg.donorName,
          message: msg.message,
          created_at: `${msg.createdAt}T00:00:00.000Z`,
        }))
      );

      if (error) {
        throw new Error(`Failed to seed support messages for ${member.slug}: ${error.message}`);
      }
    }

    // Optional historical donation for dashboard continuity.
    const { error: donationError } = await supabase.from("donations").upsert(
      {
        member_id: memberId,
        donation_key: `seed:${member.id}`,
        source: "checkout_session",
        frequency: "one-time",
        donation_pence: member.balancePence,
        savings_pence: member.savingsPence,
        spendable_pence: spendableBalancePence,
        platform_fee_pence: Math.round(member.balancePence * 0.15),
        total_paid_pence: member.balancePence + Math.round(member.balancePence * 0.15),
        currency: "gbp",
        created_at: `${member.createdAt}T00:00:00.000Z`,
      },
      { onConflict: "donation_key" }
    );

    if (donationError) {
      throw new Error(`Failed to seed donation record for ${member.slug}: ${donationError.message}`);
    }
  }

  const { data: dbMembers, error: countError } = await supabase
    .from("members")
    .select("slug")
    .in("slug", [...slugSet]);

  if (countError) {
    throw new Error(`Failed to validate seeded members: ${countError.message}`);
  }

  const seededSlugs = new Set((dbMembers ?? []).map((row) => String(row.slug)));
  const missingSlugs = [...slugSet].filter((slug) => !seededSlugs.has(slug));

  if (missingSlugs.length > 0) {
    throw new Error(`Seed validation failed, missing slugs: ${missingSlugs.join(", ")}`);
  }

  console.log(`Seed complete: ${phase2CommunityMembers.length} members inserted/updated.`);
  console.log(`Slug parity check passed for ${seededSlugs.size} slugs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
