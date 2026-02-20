# Project Summary — Homeless Hand Up
**Last updated: 2026-02-20**

## What We Are Building

A web-based contactless donation platform where the public can scan a QR code to donate directly to a homeless individual via their phone. Donations are tracked per recipient, 10% is auto-saved towards housing goals, and a 15% operational contribution funds the platform. No app download required — works in any mobile browser.

## Current State

**Phases 1 & 2 complete. 20 routes built. Ready for database integration.**

The platform has grown from a simple landing page into a full multi-page community platform with:

- **20 routes** all compiling successfully
- **5 community member profiles** with rich data (journey timeline, wishlist, messages, savings goals)
- **Enhanced donation form** with one-time/monthly toggle, wishlist funding, messages of support, Gift Aid, company attribution
- **Multi-page architecture** with shared header/footer navigation
- **Community-focused language** — "Community Members" not "Users", warm and empowering tone throughout

### What's Working

| Feature | Status |
|---------|--------|
| Homepage with emotional hero and impact counter | ✅ |
| Our Mission page | ✅ |
| How It Works (donors + recipients) | ✅ |
| Community directory with city filtering | ✅ |
| Enhanced donation form (one-time/monthly, wishlist, messages, Gift Aid) | ✅ |
| Profile pages with journey timeline, savings bar, messages guestbook | ✅ |
| Transparency dashboard | ✅ |
| Where to Spend (approved retailers) | ✅ |
| Corporate Leaderboard | ✅ |
| Find Near Me (/local) with city filtering | ✅ |
| Support Worker Portal (/admin) — demo | ✅ |
| Printable QR badges (/profile/[id]/print) | ✅ |
| Recipient Dashboard with emergency button | ✅ |
| Payday Friday detection and banner | ✅ |
| Matched funding badges | ✅ |
| Stripe Checkout integration | ✅ Code complete |
| Wallet Pass API (mock endpoint) | ✅ |
| Database | ❌ Phase 3 |
| Admin authentication | ❌ Phase 3 |
| Real Stripe payments | ❌ Needs keys |

## Next Milestone

**Phase 3: Database & Real Data**
- Set up Supabase for real data storage
- Connect Stripe webhook to record live donations
- Admin authentication with NextAuth.js
- Replace in-memory sample data with real queries

## Immediate Actions Needed

1. **Push to GitHub** — All changes committed and ready
2. **Stripe test keys** — Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to Vercel env vars
3. **Deploy** — Push triggers auto-deploy on Vercel

## Tech Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Framework | Next.js 16 (App Router) | ✅ |
| Language | TypeScript | ✅ |
| Styling | Tailwind CSS v4 | ✅ |
| Payments | Stripe Checkout | ✅ |
| Hosting | Vercel (free tier) | ✅ |
| Database | Supabase (free tier) | ⏳ Phase 3 |
| Auth | NextAuth.js | ⏳ Phase 3 |
| QR Codes | qrcode (client-side) | ✅ |

## How to Run Locally

See `/docs/README.md` for full instructions.
