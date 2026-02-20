/**
 * Homeless user data store.
 *
 * MVP: in-memory sample data. This will be replaced with a proper database
 * (Supabase / Vercel Postgres) in Phase 3.
 *
 * Each user has a unique slug used in their donation URL and QR code.
 */

export interface HomelessUser {
  /** Unique identifier */
  id: string;
  /** URL-friendly slug — used in /donate/[id] and QR codes */
  slug: string;
  /** Display name (first name only for privacy) */
  firstName: string;
  /** Optional short bio / situation description */
  bio: string;
  /** City or area */
  location: string;
  /** Running total of donations received (pence) */
  balancePence: number;
  /** Locked savings balance (pence) */
  savingsPence: number;
  /** Whether the profile is active and accepting donations */
  active: boolean;
  /** Date the user was registered */
  createdAt: string;
}

/**
 * Sample users for development and demo purposes.
 * In production these come from the database.
 */
const sampleUsers: HomelessUser[] = [
  {
    id: "usr_001",
    slug: "james-manchester",
    firstName: "James",
    bio: "Sleeping rough in Manchester for 8 months. Trying to get back on my feet and save for a deposit.",
    location: "Manchester",
    balancePence: 4520,
    savingsPence: 1230,
    active: true,
    createdAt: "2026-02-01",
  },
  {
    id: "usr_002",
    slug: "sarah-london",
    firstName: "Sarah",
    bio: "Lost my home after a relationship breakdown. Staying in a shelter and looking for work.",
    location: "London",
    balancePence: 2100,
    savingsPence: 780,
    active: true,
    createdAt: "2026-02-10",
  },
  {
    id: "usr_003",
    slug: "mark-birmingham",
    firstName: "Mark",
    bio: "Ex-forces, been on the streets for 2 years. Grateful for any help.",
    location: "Birmingham",
    balancePence: 890,
    savingsPence: 340,
    active: true,
    createdAt: "2026-02-15",
  },
];

/** Look up a user by their URL slug */
export function getUserBySlug(slug: string): HomelessUser | undefined {
  return sampleUsers.find((u) => u.slug === slug);
}

/** Look up a user by their ID */
export function getUserById(id: string): HomelessUser | undefined {
  return sampleUsers.find((u) => u.id === id);
}

/** Get all active users */
export function getAllActiveUsers(): HomelessUser[] {
  return sampleUsers.filter((u) => u.active);
}

/** Format pence as pounds string (e.g. 4520 → "£45.20") */
export function formatPence(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}
