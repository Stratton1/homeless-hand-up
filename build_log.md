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
