import { NextResponse } from "next/server";
import { getSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase/admin";

const WEBHOOK_FAILURE_ALERT_THRESHOLD = 5;
const WEBHOOK_STALE_MINUTES = 60;

function minutesSince(isoTime: string): number {
  const timestamp = Date.parse(isoTime);
  if (!Number.isFinite(timestamp)) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.round((Date.now() - timestamp) / (1000 * 60));
}

export async function GET() {
  const checkedAt = new Date().toISOString();

  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json(
      {
        status: "degraded",
        checkedAt,
        db: {
          connected: false,
          reason: "Supabase environment variables are not configured.",
        },
        webhook: {
          latestEventAt: null,
          minutesSinceLatest: null,
          failedLast24h: null,
          status: "unknown",
        },
        queue: {
          pendingNotifications: null,
          status: "unknown",
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [dbProbe, latestWebhookResult, failedWebhookResult, queueResult] =
      await Promise.all([
        supabase.from("members").select("id", { head: true, count: "exact" }).limit(1),
        supabase
          .from("stripe_events")
          .select("id,received_at,status,event_type")
          .order("received_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("stripe_events")
          .select("id", { head: true, count: "exact" })
          .eq("status", "failed")
          .gte("received_at", twentyFourHoursAgo),
        supabase
          .from("donor_notification_queue")
          .select("id", { head: true, count: "exact" })
          .eq("status", "pending"),
      ]);

    const dbConnected = !dbProbe.error;
    const latestWebhookAt = latestWebhookResult.data?.received_at ?? null;
    const minutesFromLatestWebhook = latestWebhookAt
      ? minutesSince(latestWebhookAt)
      : null;
    const failedLast24h = failedWebhookResult.count ?? 0;

    const queueTableMissing = /donor_notification_queue/i.test(
      queueResult.error?.message ?? ""
    );
    const pendingNotifications = queueTableMissing ? null : (queueResult.count ?? 0);

    const webhookStatus =
      latestWebhookAt && minutesFromLatestWebhook !== null
        ? minutesFromLatestWebhook <= WEBHOOK_STALE_MINUTES
          ? "healthy"
          : "stale"
        : "unknown";

    const queueStatus = queueTableMissing
      ? "migration_pending"
      : pendingNotifications === null
        ? "unknown"
        : pendingNotifications > 0
          ? "backlog"
          : "clear";

    const alerts: string[] = [];
    if (failedLast24h > WEBHOOK_FAILURE_ALERT_THRESHOLD) {
      alerts.push(`Webhook failures over threshold: ${failedLast24h} in the last 24h.`);
    }
    if (webhookStatus === "stale") {
      alerts.push(
        `Webhook recency stale: last event ${minutesFromLatestWebhook} minutes ago.`
      );
    }
    if (!dbConnected) {
      alerts.push("Database probe failed.");
    }

    const status = !dbConnected ? "down" : alerts.length > 0 ? "degraded" : "ok";

    return NextResponse.json(
      {
        status,
        checkedAt,
        db: {
          connected: dbConnected,
          error: dbProbe.error?.message ?? null,
        },
        webhook: {
          latestEventAt: latestWebhookAt,
          minutesSinceLatest: minutesFromLatestWebhook,
          failedLast24h,
          latestStatus: latestWebhookResult.data?.status ?? null,
          latestType: latestWebhookResult.data?.event_type ?? null,
          status: webhookStatus,
        },
        queue: {
          pendingNotifications,
          status: queueStatus,
          note: queueTableMissing
            ? "donor_notification_queue migration not applied yet."
            : null,
        },
        alerts,
      },
      {
        status: status === "down" ? 503 : 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown health check failure";
    return NextResponse.json(
      {
        status: "down",
        checkedAt,
        error: message,
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
