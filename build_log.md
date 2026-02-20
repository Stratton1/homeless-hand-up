# Build Log — Homeless Hand Up

---

## 2026-02-20 — Project Initialisation

**Summary:** Created project structure, planning documents, and technical foundation.

**Why:** Greenfield project — needed to establish structure, document the vision, and set up the technical baseline before writing any application code.

**What was done:**
- Created directory structure: /docs, /Execution, /Directives, /.tmp
- Created .gitignore and .env.example
- Wrote CLAUDE.md (canonical project handbook)
- Wrote /docs/README.md (documentation index + run instructions)
- Wrote /docs/ROADMAP.md (full phased roadmap)
- Wrote project_summary.md (current snapshot)
- Wrote build_log.md (this file)

**Technical decisions made:**
- Web-first PWA (not native app) — zero cost, faster to launch
- Next.js + TypeScript + Tailwind CSS — modern, well-supported, free
- Stripe for payments — no monthly fees, PCI compliant
- Vercel for hosting — free tier, handles everything needed

**Verification:** N/A (documentation only, no runnable code yet)

**Files changed:** All new files created from scratch.

**Follow-ups:** Initialise Next.js application, build landing page.

---

## 2026-02-20 — Phase 1 Complete: Landing Page Live

**Summary:** Built and deployed the landing page to Vercel.

**What was done:**
- Next.js app initialised with TypeScript and Tailwind CSS
- Full landing page with hero, stats, how-it-works, why-it-matters, safeguards, CTA, footer
- Brand identity established: warm orange (#E8734A) + trust blue (#2D6A8A)
- Deployed to Vercel at https://homeless-hand-up.vercel.app
- Deploy instructions written in /Directives/HOW-TO-DEPLOY.md

**Verification:** Build passes cleanly. Site live and responsive on mobile.

**Files changed:** src/app/page.tsx, layout.tsx, globals.css, package.json, configs

**Follow-ups:** Phase 2 — Stripe payment integration and donation flow.

---

## 2026-02-20 — Phase 2: Stripe Payment Flow + QR Codes

**Summary:** Built the complete donation flow — from QR code scan to Stripe payment to confirmation.

**What was done:**
- Stripe SDK integration with configurable service charge (15%) and savings (10%)
- Donation page per user (/donate/[slug]) with amount presets (£2, £5, £10, £20) and custom amount
- Live payment breakdown showing donation + platform fee + total + savings earmark
- Stripe Checkout session creation via /api/checkout
- Stripe webhook handler at /api/webhook (logs donations, ready for database in Phase 3)
- Success and cancelled pages with clear next-steps messaging
- Profile page per user (/profile/[slug]) with QR code, stats, and donate button
- QR code generation using the qrcode library
- Sample user data (James/Manchester, Sarah/London, Mark/Birmingham) for development
- Centralised config in src/lib/config.ts for easy tuning of charges and amounts

**Technical decisions:**
- Stripe Checkout (hosted) rather than custom payment form — faster, more secure, handles 3D Secure
- QR codes generated client-side via data URL — no server dependency
- Service charge shown transparently to donor before payment
- Metadata passed through Stripe session for webhook processing

**Verification:** Build compiles cleanly with all 8 routes. Screenshots taken of all pages.

**Files changed:**
- New: src/lib/config.ts, stripe.ts, users.ts
- New: src/app/donate/[id]/page.tsx, donation-form.tsx
- New: src/app/donate/success/page.tsx, cancelled/page.tsx
- New: src/app/api/checkout/route.ts, api/webhook/route.ts
- New: src/app/profile/[id]/page.tsx, qr-code-display.tsx
- Updated: package.json (added stripe, qrcode dependencies)

**Follow-ups:** Push to GitHub to auto-deploy. Set up Stripe test keys. Phase 3: database and admin dashboard.

---

## 2026-02-20 — Design Overhaul: Warm Visuals, Navigation & UX Fixes

**Summary:** Comprehensive visual upgrade and navigation fixes based on user feedback. Landing page now includes recipient cards for direct donation access, all pages have warmer design with SVG illustrations, and navigation flows properly between pages.

**Why:** User feedback identified that (1) there was no way to reach donation pages from the landing page, (2) profile pages weren't accessible, and (3) the design felt bland.

**What was done:**
- Fixed Stripe build error: changed from eager initialization to lazy `getStripe()` pattern so Vercel builds don't crash without API keys
- Landing page completely rewritten with:
  - Custom SVG hero illustration (phone with QR code, two people, hearts, coins)
  - "People who need your help" section with recipient cards linked to /donate/ and /profile/
  - SVG step illustrations for How It Works
  - Gradient backgrounds, decorative blur circles, hover animations
  - "No app needed · No signup required" badge
  - Mobile "Give Now" button in sticky nav
  - Footer with navigation links
- Donation page enhanced: gradient header bar, avatar badge, stats boxes, back-to-profile link, decorative background shapes
- Profile page enhanced: gradient header with centered avatar, larger stats, QR code section with icon, gradient donate button, shield icon for safeguards
- Success page enhanced: larger icon with shadow, floating animated hearts, gradient numbered steps, warmer CTAs

**Verification:** Build passes cleanly — all 8 routes compile. No TypeScript errors.

**Files changed:**
- Updated: src/app/page.tsx (full rewrite)
- Updated: src/app/donate/[id]/page.tsx (visual upgrade + navigation)
- Updated: src/app/donate/success/page.tsx (visual upgrade)
- Updated: src/app/profile/[id]/page.tsx (visual upgrade)
- Updated: src/lib/stripe.ts (lazy init fix)
- Updated: src/app/api/checkout/route.ts (getStripe)
- Updated: src/app/api/webhook/route.ts (getStripe)

**Follow-ups:** Push to GitHub. Set up Stripe test keys on Vercel. Phase 3: database integration.

---

## 2026-02-20 — Phase 2 Complete: Full Platform Overhaul

**Summary:** Massive platform expansion from 8 routes to 20 routes. Transformed from a single-page donation tool into a comprehensive multi-page community platform with advanced features.

**What was done:**

### Architecture & Pages
- Multi-page architecture: /, /our-mission, /how-it-works/donors, /how-it-works/recipients, /community, /transparency, /where-to-spend, /leaderboard, /local, /admin, /recipient-dashboard
- Shared SiteHeader (responsive, mobile hamburger, dropdown submenus) and SiteFooter
- Homepage rewritten with emotional hero, live impact counter, featured profiles, Payday Friday banner

### Data Model Overhaul
- Renamed HomelessUser → CommunityMember with rich fields: age, area, journey[], wishlist[], messages[], savingsGoalPence, savingsGoalDescription, background, supportWorker, matchedFundingPartner
- 5 sample members (added Lisa/Leeds and David/Glasgow)
- Platform stats, retailer partners, corporate leaderboard data
- Default wishlist items (6 categories: food, clothing, connectivity, hygiene, transport)

### Enhanced Donation Form
- One-time vs Monthly toggle (Stripe subscription support)
- Wishlist grid — donors fund specific needs (meal, coat, phone top-up, etc.)
- Message of support textarea (280 chars)
- Company attribution dropdown for leaderboard
- Gift Aid checkbox (+25% for UK taxpayers)
- Milestone notification opt-in
- Enhanced donation breakdown display
- Checkout API updated for all new fields and subscription mode

### Enhanced Profiles
- Journey timeline with colour-coded milestones (start/progress/goal/achievement)
- Savings progress bar towards housing goal
- Messages of support guestbook feed
- Wishlist display linking to pre-filled donation pages
- Matched funding badge
- Support worker info
- Background story section

### Advanced Features
- /local — Find Near Me with city filtering and map placeholder
- /admin — Support Worker Portal (demo: member table, stats summary)
- /profile/[id]/print — Printable QR badge (A6 optimised, @media print CSS)
- /recipient-dashboard — Recipient view with balance, messages, wishlist, emergency button
- Emergency "Request Support Worker Contact" button
- /api/wallet-pass — Mock endpoint (coming soon)

### Copy & Vocabulary
- "Users" → "Community Members" throughout
- "Service Charge" → "Operational Contribution"
- Community-focused, warm vocabulary across all pages
- Removed all lucide-react dependencies (replaced with inline SVGs)

**Verification:** Build passes cleanly — 20 routes, 0 errors.

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /admin
├ ƒ /api/checkout
├ ƒ /api/wallet-pass
├ ƒ /api/webhook
├ ○ /community
├ ƒ /donate/[id]
├ ○ /donate/cancelled
├ ○ /donate/success
├ ○ /how-it-works/donors
├ ○ /how-it-works/recipients
├ ○ /leaderboard
├ ○ /local
├ ○ /our-mission
├ ƒ /profile/[id]
├ ƒ /profile/[id]/print
├ ○ /recipient-dashboard
├ ○ /transparency
└ ○ /where-to-spend
```

**Files changed:**
- New: src/components/site-header.tsx, site-footer.tsx
- New: src/app/our-mission/page.tsx
- New: src/app/how-it-works/donors/page.tsx, recipients/page.tsx
- New: src/app/community/page.tsx, community-grid.tsx
- New: src/app/transparency/page.tsx
- New: src/app/where-to-spend/page.tsx
- New: src/app/leaderboard/page.tsx
- New: src/app/local/page.tsx, local-finder.tsx
- New: src/app/admin/page.tsx
- New: src/app/profile/[id]/print/page.tsx
- New: src/app/recipient-dashboard/page.tsx, emergency-button.tsx
- New: src/app/api/wallet-pass/route.ts
- Rewritten: src/lib/users.ts (complete data model overhaul)
- Rewritten: src/app/page.tsx (new homepage)
- Rewritten: src/app/donate/[id]/donation-form.tsx (all new features)
- Rewritten: src/app/profile/[id]/page.tsx (journey, wishlist, messages, savings)
- Updated: src/app/donate/[id]/page.tsx (new props)
- Updated: src/app/api/checkout/route.ts (subscriptions, new metadata)
- Updated: docs/ROADMAP.md, project_summary.md, build_log.md

**Follow-ups:** Push to GitHub. Deploy to Vercel. Phase 3: Supabase database integration.

---

## 2026-02-20 — Phase 3 Hardening + Phase 4 Engineering Kickoff

**Summary:** Implemented Phase 3 close-out hardening tasks and started Phase 4 engineering track, including GitHub-sourced supermarket logos and reporting/ops endpoints.

**What was done:**
- Added company normalization utility and support-message sanitisation pipeline.
- Extended webhook + checkout flow to persist cleaned message/company data.
- Added `SEED_FALLBACK_ENABLED` runtime flag support for production cutover.
- Added health endpoint: `GET /api/health/data` for DB/webhook/queue visibility.
- Added monthly reconciliation API report: `/api/admin/reports/monthly-reconciliation`.
- Expanded transaction export schema with event ID, net/gross, and normalized company fields.
- Added migration `202602200002_phase4_hardening.sql`:
  - `normalize_company_name(...)`
  - `admin_transaction_ledger_v`
  - `member_savings_ledger_v`
  - `monthly_reconciliation_v`
  - `donor_notification_queue` placeholder table + indexes.
- Upgraded admin page with:
  - role checks,
  - auto-refresh,
  - last-updated timestamp,
  - savings ledger section,
  - monthly reconciliation panel and CSV export link.
- Upgraded recipient dashboard with auto-refresh, last-updated stamp, and stale-data notice.
- Replaced supermarket emoji placeholders with real SVG logos sourced from GitHub and hosted locally in `public/logos/retailers`.
- Added logo sync script (`npm run sync:retailer-logos`) and attribution docs (`docs/LOGO_CREDITS.md`).
- Added external dependency board doc (`docs/EXTERNAL_DEPENDENCIES.md`) and updated roadmap/project summary status.

**Verification:**
- `npm run sync:retailer-logos` completed successfully and saved 6 supermarket SVGs.
- `npm run lint` passed.
- `npm run test:unit` passed (7 tests).
- `npm run build -- --webpack` passed.
- `npx playwright test` passed across Chromium, Firefox, and WebKit (12 tests, including axe critical check).

**Files changed (high impact):**
- `src/lib/users.ts`
- `src/app/api/checkout/route.ts`
- `src/app/api/webhook/route.ts`
- `src/app/admin/page.tsx`
- `src/app/where-to-spend/page.tsx`
- `src/app/api/admin/transactions/export/route.ts`
- `src/app/api/admin/reports/monthly-reconciliation/route.ts`
- `src/app/api/health/data/route.ts`
- `supabase/migrations/202602200002_phase4_hardening.sql`
- `scripts/sync-retailer-logos.ts`
- `src/lib/retailer-logos.ts`
- `src/lib/company-normalization.ts`
- `src/lib/support-message.ts`
- `docs/ROADMAP.md`, `docs/LOGO_CREDITS.md`, `docs/EXTERNAL_DEPENDENCIES.md`, `project_summary.md`, `README.md`

**Follow-ups:**
- Apply Supabase migrations in production and disable seed fallback.
- Configure Stripe production webhook and validate end-to-end payment/accounting.
- Complete CI quality gates and launch checklist.
