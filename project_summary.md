# Project Summary — Homeless Hand Up
**Last updated: 2026-02-20**

## What We Are Building

A web-based contactless donation platform where the public can scan a QR code to donate directly to a homeless individual via their phone. Donations are tracked per recipient, 10% is auto-saved towards housing goals, and a service charge funds the platform. No app download required — works in any mobile browser.

## Current State

- Project structure created
- Planning documents written (CLAUDE.md, ROADMAP.md, README)
- Technical stack decided: Next.js, TypeScript, Tailwind CSS, Stripe, Vercel
- **Building Phase 1: Foundation & Landing Page**

## Next Milestone

Phase 1 complete — landing page live with shareable URL on Vercel.

## Current Risks / Blockers

- Stripe account needed for live payments (free to create, but requires identity verification)
- Database not yet provisioned (will use Vercel Postgres or Supabase free tier)
- Restricted spending (blocking alcohol/gambling) requires a card-issuing partner — deferred to post-MVP

## How to Run Locally

See `/docs/README.md` for full instructions.
