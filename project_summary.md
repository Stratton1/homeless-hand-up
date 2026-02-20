# Project Summary — Homeless Hand Up
**Last updated: 2026-02-20**

## What We Are Building

A web-based contactless donation platform where the public can scan a QR code to donate directly to a homeless individual via their phone. Donations are tracked per recipient, 10% is auto-saved towards housing goals, and a 15% operational contribution funds the platform. No app download required — works in any mobile browser.

## Current State

**Phase 3 code is implemented and in hardening mode. Phase 4 engineering-track work has started.**

The platform now includes:

- Supabase schema migrations with atomic donation accounting RPC
- DB-first data layer with optional seed fallback for local/dev
- Stripe checkout + webhook persistence for one-time and recurring donation flows
- NextAuth admin login (credentials) backed by Supabase `admin_users`
- Admin transaction export + monthly reconciliation report endpoint
- Health endpoint for operational checks: `GET /api/health/data`
- GitHub-sourced supermarket logos with local hosting and attribution docs

### What's Working

| Feature | Status |
|---------|--------|
| Homepage with emotional hero and impact counter | ✅ |
| Our Mission page | ✅ |
| How It Works (donors + recipients) | ✅ |
| Community directory with city filtering | ✅ |
| Enhanced donation form (one-time/monthly, wishlist, messages, Gift Aid disabled until HMRC readiness) | ✅ |
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
| Database schema + DB-backed reads | ✅ |
| Webhook accounting persistence | ✅ |
| Admin authentication | ✅ |
| Health/reporting endpoints | ✅ |
| Real Stripe payments | ⏳ Requires live keys + webhook config in Stripe/Vercel |

## Next Milestone

**Phase 3 close-out in production + Phase 4 external dependency track**
- Apply migrations and seed to production Supabase
- Configure Stripe live webhook and verify end-to-end live event writes
- Populate external dependency board owners/dates for card-issuer and retailer agreements
- Complete launch quality gates (tests, accessibility, performance, CI)

## Immediate Actions Needed

1. **Apply Supabase migrations in production** and run `npm run seed:phase2`
2. **Set `SEED_FALLBACK_ENABLED=false`** in production env after migration verification
3. **Configure Stripe webhook events** (`checkout.session.completed`, `invoice.paid`)
4. **Bootstrap admin account** with `npm run bootstrap:admin`
5. **Run CI gate** (`npm run ci`) before final production release

## Tech Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Framework | Next.js 16 (App Router) | ✅ |
| Language | TypeScript | ✅ |
| Styling | Tailwind CSS v4 | ✅ |
| Payments | Stripe Checkout | ✅ |
| Hosting | Vercel (free tier) | ✅ |
| Database | Supabase (free tier) | ✅ Implemented in code |
| Auth | NextAuth.js | ✅ Implemented in code |
| QR Codes | qrcode (client-side) | ✅ |

## How to Run Locally

See `/docs/README.md` for full instructions.
