import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/lib/config";
import { getAllActiveUsers } from "@/lib/users";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_CONFIG.appUrl.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "/",
    "/our-mission",
    "/how-it-works/donors",
    "/how-it-works/recipients",
    "/community",
    "/transparency",
    "/where-to-spend",
    "/leaderboard",
    "/local",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const members = await getAllActiveUsers();
  const dynamicRoutes = members.flatMap((member) => [
    `/profile/${member.slug}`,
    `/donate/${member.slug}`,
  ]);

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
