/**
 * Community member data store.
 *
 * MVP: in-memory sample data. This will be replaced with a proper database
 * (Supabase / Vercel Postgres) in Phase 3.
 *
 * Each member has a unique slug used in their donation URL and QR code.
 */

/** A wishlist item that donors can fund */
export interface WishlistItem {
  id: string;
  label: string;
  emoji: string;
  amountPence: number;
  description: string;
  category: "food" | "clothing" | "hygiene" | "connectivity" | "transport" | "housing";
}

/** A message of support from a donor */
export interface SupportMessage {
  id: string;
  message: string;
  donorName: string;
  createdAt: string;
}

/** A milestone in the member's journey */
export interface JourneyMilestone {
  date: string;
  title: string;
  description: string;
  type: "start" | "progress" | "goal" | "achievement";
}

export interface CommunityMember {
  /** Unique identifier */
  id: string;
  /** URL-friendly slug — used in /donate/[id] and QR codes */
  slug: string;
  /** Display name (first name only for privacy) */
  firstName: string;
  /** Age (for humanising — no full DOB for privacy) */
  age: number;
  /** Optional short bio / situation description */
  bio: string;
  /** City or area */
  location: string;
  /** Borough or specific area within city */
  area: string;
  /** Running total of donations received (pence) */
  balancePence: number;
  /** Locked savings balance (pence) */
  savingsPence: number;
  /** Housing savings goal (pence) — what they're working towards */
  savingsGoalPence: number;
  /** A short description of the savings goal */
  savingsGoalDescription: string;
  /** Whether the profile is active and accepting donations */
  active: boolean;
  /** Date the member was registered */
  createdAt: string;
  /** Key life circumstances or background */
  background: string;
  /** Journey timeline milestones */
  journey: JourneyMilestone[];
  /** Wishlist of specific needs donors can fund */
  wishlist: WishlistItem[];
  /** Messages of support from donors */
  messages: SupportMessage[];
  /** Registered support worker name (if assigned) */
  supportWorker?: string;
  /** Company name running matched funding (if any) */
  matchedFundingPartner?: string;
  /** Match multiplier (e.g. 1 = pound-for-pound) */
  matchedFundingMultiplier?: number;
}

// Default wishlist items available to all members
const defaultWishlist: WishlistItem[] = [
  { id: "wl_meal", label: "Hot Meal", emoji: "🍲", amountPence: 500, description: "A warm meal from a local cafe", category: "food" },
  { id: "wl_coat", label: "Winter Coat", emoji: "🧥", amountPence: 1500, description: "A warm coat for cold nights", category: "clothing" },
  { id: "wl_phone", label: "Phone Top-up", emoji: "📱", amountPence: 1000, description: "Stay connected with services and family", category: "connectivity" },
  { id: "wl_hygiene", label: "Hygiene Kit", emoji: "🧴", amountPence: 800, description: "Toiletries, toothbrush, soap, and basics", category: "hygiene" },
  { id: "wl_bus", label: "Bus Pass", emoji: "🚌", amountPence: 2000, description: "Weekly travel to appointments and interviews", category: "transport" },
  { id: "wl_groceries", label: "Week's Groceries", emoji: "🛒", amountPence: 2500, description: "A full week of healthy meals", category: "food" },
];

/**
 * Sample community members for development and demo purposes.
 * In production these come from the database.
 */
const communityMembers: CommunityMember[] = [
  {
    id: "usr_001",
    slug: "james-manchester",
    firstName: "James",
    age: 34,
    bio: "Sleeping rough in Manchester for 8 months. Trying to get back on my feet and save for a deposit. Used to work in construction before things fell apart.",
    location: "Manchester",
    area: "Northern Quarter",
    balancePence: 4520,
    savingsPence: 1230,
    savingsGoalPence: 50000,
    savingsGoalDescription: "Deposit for a shared flat in Salford",
    active: true,
    createdAt: "2026-02-01",
    background: "Former construction worker. Lost his job after an injury, then lost his rented flat. Has been working with a local housing charity to get back on his feet.",
    journey: [
      { date: "2025-06-15", title: "Lost housing", description: "Evicted after falling behind on rent following a workplace injury.", type: "start" },
      { date: "2025-09-01", title: "Connected with support", description: "Began working with Manchester Shelter Network.", type: "progress" },
      { date: "2026-02-01", title: "Joined Homeless Hand Up", description: "Registered on the platform with help from his support worker.", type: "progress" },
      { date: "2026-02-15", title: "First donations received", description: "Community started contributing to his housing fund.", type: "achievement" },
    ],
    wishlist: defaultWishlist,
    messages: [
      { id: "msg_001", message: "Stay strong James, rooting for you!", donorName: "Anonymous", createdAt: "2026-02-18" },
      { id: "msg_002", message: "Hope this helps towards your flat. You've got this.", donorName: "Claire", createdAt: "2026-02-16" },
    ],
    supportWorker: "Dave (Manchester Shelter Network)",
    matchedFundingPartner: "Tesco",
    matchedFundingMultiplier: 1,
  },
  {
    id: "usr_002",
    slug: "sarah-london",
    firstName: "Sarah",
    age: 28,
    bio: "Lost my home after a relationship breakdown. Staying in a shelter and looking for work. I want to get my own place and rebuild my life.",
    location: "London",
    area: "Camden",
    balancePence: 2100,
    savingsPence: 780,
    savingsGoalPence: 80000,
    savingsGoalDescription: "First month's rent and deposit in zone 3",
    active: true,
    createdAt: "2026-02-10",
    background: "Former retail worker. Fled a difficult relationship and had no family support network in London. Currently in temporary shelter accommodation.",
    journey: [
      { date: "2025-11-01", title: "Left home", description: "Left an unsafe living situation with no savings.", type: "start" },
      { date: "2025-12-10", title: "Found shelter", description: "Secured a place at a women's shelter in Camden.", type: "progress" },
      { date: "2026-02-10", title: "Joined Homeless Hand Up", description: "Referred by shelter staff.", type: "progress" },
    ],
    wishlist: defaultWishlist,
    messages: [
      { id: "msg_003", message: "Sending love and strength. Things will get better.", donorName: "Mike", createdAt: "2026-02-14" },
    ],
    supportWorker: "Priya (St Mungo's Camden)",
  },
  {
    id: "usr_003",
    slug: "mark-birmingham",
    firstName: "Mark",
    age: 42,
    bio: "Ex-forces, been on the streets for 2 years. Grateful for any help. Would love to get back into work and find a stable place to live.",
    location: "Birmingham",
    area: "City Centre",
    balancePence: 890,
    savingsPence: 340,
    savingsGoalPence: 40000,
    savingsGoalDescription: "Deposit for supported accommodation",
    active: true,
    createdAt: "2026-02-15",
    background: "Served 12 years in the British Army. Struggled with the transition to civilian life and PTSD. Has been receiving support from a veterans' charity.",
    journey: [
      { date: "2024-01-01", title: "Left the forces", description: "Discharged after 12 years of service.", type: "start" },
      { date: "2024-06-01", title: "Housing difficulties", description: "Temporary accommodation ended. Began sleeping rough.", type: "start" },
      { date: "2025-09-01", title: "Veterans' support", description: "Connected with a veterans' outreach programme.", type: "progress" },
      { date: "2026-02-15", title: "Joined Homeless Hand Up", description: "Registered with support from his outreach worker.", type: "progress" },
    ],
    wishlist: defaultWishlist,
    messages: [
      { id: "msg_004", message: "Thank you for your service, Mark. Wishing you all the best.", donorName: "Anonymous", createdAt: "2026-02-19" },
    ],
    supportWorker: "Tony (SSAFA Birmingham)",
  },
  {
    id: "usr_004",
    slug: "lisa-leeds",
    firstName: "Lisa",
    age: 31,
    bio: "Mum of two. Lost my flat after being made redundant. Kids are with family while I get back on my feet. Every day is a step closer.",
    location: "Leeds",
    area: "Headingley",
    balancePence: 1560,
    savingsPence: 560,
    savingsGoalPence: 60000,
    savingsGoalDescription: "Two-bedroom flat deposit to reunite with my kids",
    active: true,
    createdAt: "2026-02-05",
    background: "Single mother who lost her warehouse job during company restructuring. Children are temporarily with her sister. Determined to provide a home for them again.",
    journey: [
      { date: "2025-08-01", title: "Made redundant", description: "Lost her warehouse job during restructuring.", type: "start" },
      { date: "2025-10-15", title: "Lost tenancy", description: "Unable to keep up with rent payments.", type: "start" },
      { date: "2026-01-10", title: "Shelter placement", description: "Secured a place at a family support shelter.", type: "progress" },
      { date: "2026-02-05", title: "Joined Homeless Hand Up", description: "Signed up with help from shelter coordinators.", type: "progress" },
    ],
    wishlist: defaultWishlist,
    messages: [
      { id: "msg_005", message: "You'll be back with your kids before you know it. Stay strong.", donorName: "Emma", createdAt: "2026-02-17" },
      { id: "msg_006", message: "Every little helps. Keep going, Lisa.", donorName: "Anonymous", createdAt: "2026-02-12" },
    ],
    supportWorker: "Rachel (Simon on the Streets)",
  },
  {
    id: "usr_005",
    slug: "david-glasgow",
    firstName: "David",
    age: 55,
    bio: "Long-term rough sleeper trying to break the cycle. Recently connected with support services and feeling hopeful for the first time in years.",
    location: "Glasgow",
    area: "City Centre",
    balancePence: 3200,
    savingsPence: 920,
    savingsGoalPence: 35000,
    savingsGoalDescription: "Supported housing placement",
    active: true,
    createdAt: "2026-01-20",
    background: "Has experienced homelessness on and off for over a decade. Recently engaged with addiction recovery services and housing support. Making real progress.",
    journey: [
      { date: "2015-01-01", title: "First period of homelessness", description: "Lost housing after a period of personal difficulty.", type: "start" },
      { date: "2025-06-01", title: "Engaged with recovery", description: "Started working with addiction support services.", type: "progress" },
      { date: "2025-11-01", title: "Stable progress", description: "Six months sober. Attending regular appointments.", type: "achievement" },
      { date: "2026-01-20", title: "Joined Homeless Hand Up", description: "Registered by his outreach worker.", type: "progress" },
    ],
    wishlist: defaultWishlist,
    messages: [
      { id: "msg_007", message: "Incredible progress David. Keep it up!", donorName: "Anonymous", createdAt: "2026-02-10" },
    ],
    supportWorker: "Fiona (Glasgow City Mission)",
    matchedFundingPartner: "Co-op",
    matchedFundingMultiplier: 1,
  },
];

/** Platform-wide aggregated stats */
export interface PlatformStats {
  totalProcessedPence: number;
  totalSavingsPence: number;
  totalDonations: number;
  totalMembers: number;
  platformRevenuePence: number;
  reinvestedPence: number;
}

/** Get platform-wide stats for the transparency dashboard */
export function getPlatformStats(): PlatformStats {
  const members = communityMembers.filter((m) => m.active);
  const totalProcessedPence = members.reduce((sum, m) => sum + m.balancePence, 0);
  const totalSavingsPence = members.reduce((sum, m) => sum + m.savingsPence, 0);
  return {
    totalProcessedPence,
    totalSavingsPence,
    totalDonations: 47, // mock — would come from transactions table
    totalMembers: members.length,
    platformRevenuePence: Math.round(totalProcessedPence * 0.15),
    reinvestedPence: Math.round(totalProcessedPence * 0.15 * 0.6), // 60% reinvested
  };
}

/** Retailer partners for the "Where to Spend" page */
export interface RetailerPartner {
  name: string;
  logo: string; // emoji placeholder — real logos in production
  category: string;
  description: string;
}

export const retailerPartners: RetailerPartner[] = [
  { name: "Tesco", logo: "🏪", category: "Supermarket", description: "Groceries, toiletries, and household essentials" },
  { name: "Sainsbury's", logo: "🏪", category: "Supermarket", description: "Food, drink, and everyday items" },
  { name: "Asda", logo: "🏪", category: "Supermarket", description: "Affordable groceries and clothing" },
  { name: "Morrisons", logo: "🏪", category: "Supermarket", description: "Fresh food and daily essentials" },
  { name: "Aldi", logo: "🏪", category: "Supermarket", description: "Budget-friendly groceries" },
  { name: "Lidl", logo: "🏪", category: "Supermarket", description: "Quality food at low prices" },
  { name: "Greggs", logo: "☕", category: "Cafe", description: "Hot meals, sandwiches, and warm drinks" },
  { name: "Boots", logo: "💊", category: "Pharmacy", description: "Medicines, toiletries, and health essentials" },
  { name: "Primark", logo: "👕", category: "Clothing", description: "Affordable clothing and basics" },
];

/** Corporate giving leaderboard entry */
export interface LeaderboardEntry {
  companyName: string;
  totalDonatedPence: number;
  donationCount: number;
  rank: number;
}

export function getLeaderboard(): LeaderboardEntry[] {
  // Mock leaderboard — would come from database
  return [
    { companyName: "Deloitte Manchester", totalDonatedPence: 45000, donationCount: 23, rank: 1 },
    { companyName: "PwC Birmingham", totalDonatedPence: 32000, donationCount: 18, rank: 2 },
    { companyName: "BBC Media City", totalDonatedPence: 28500, donationCount: 15, rank: 3 },
    { companyName: "NatWest Group", totalDonatedPence: 21000, donationCount: 12, rank: 4 },
    { companyName: "Rolls-Royce Derby", totalDonatedPence: 18000, donationCount: 9, rank: 5 },
  ];
}

/** Look up a member by their URL slug */
export function getUserBySlug(slug: string): CommunityMember | undefined {
  return communityMembers.find((u) => u.slug === slug);
}

/** Look up a member by their ID */
export function getUserById(id: string): CommunityMember | undefined {
  return communityMembers.find((u) => u.id === id);
}

/** Get all active community members */
export function getAllActiveUsers(): CommunityMember[] {
  return communityMembers.filter((u) => u.active);
}

/** Get members filtered by location */
export function getUsersByLocation(location: string): CommunityMember[] {
  return communityMembers.filter(
    (u) => u.active && u.location.toLowerCase() === location.toLowerCase()
  );
}

/** Get all unique locations */
export function getAllLocations(): string[] {
  const locations = communityMembers.filter((u) => u.active).map((u) => u.location);
  return [...new Set(locations)].sort();
}

/** Format pence as pounds string (e.g. 4520 → "£45.20") */
export function formatPence(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

/** Check if today is Payday Friday (last Friday of the month) */
export function isPaydayFriday(): boolean {
  const today = new Date();
  if (today.getDay() !== 5) return false; // Not a Friday
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  return nextWeek.getMonth() !== today.getMonth(); // Next Friday is in a different month
}
