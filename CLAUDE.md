# CLAUDE.md — Homeless Hand Up
**Last updated: 2026-02-20**

---

## Project Overview

**One-liner:** A web-based contactless donation platform enabling the public to give directly to homeless individuals via QR codes, with restricted spending and built-in savings.

**Problem:** Most people want to help homeless individuals but don't carry cash. Existing charity models involve intermediaries, delays, and lack transparency. Homeless individuals have no simple way to receive digital payments directly.

**Users:**
- **Donors** — members of the public who want to give directly to a homeless person they encounter
- **Homeless individuals** — recipients who receive funds on a restricted payment system

**Success criteria (30 days):** A working web platform where a donor can scan a QR code, make a payment via Stripe, and funds are tracked against a homeless individual's profile. Landing page live, payment flow functional, basic homeless user dashboard available.

**Success criteria (90 days):** Multiple homeless users onboarded. Donor accounts with history. Savings feature (10% auto-retained). Partnership conversations with at least one retailer. Stories feature live. Service charge model active.

---

## User Profile Summary

- The project owner is non-technical. All decisions and communication must be in plain UK English.
- Priorities: launch speed, zero upfront cost, professional credibility, real social impact.
- Constraints: zero budget (free-tier tools only), no existing codebase, idea stage.
- Decision policy: Claude decides all technical matters by default. Only escalate genuinely irreversible or brand-critical decisions.

---

## Communication Rules

- UK English throughout all code, docs, and communication.
- Ask only 1–2 questions at a time. Wait for answers.
- Decide by default; only escalate when genuinely necessary.
- Update the user after each meaningful milestone with a plain-English summary.
- Define any technical term immediately if used.

---

## Product Scope

### MVP (Minimum Viable Product)
1. **Landing page** — explains the concept, builds trust, clear call to action
2. **Donor payment flow** — scan QR code → choose amount → pay via Stripe → confirmation
3. **Homeless user profiles** — unique ID, QR code, balance tracking, basic info
4. **Admin dashboard** — manage homeless user accounts, view transactions
5. **Savings feature** — 10% of each donation auto-retained as savings
6. **Service charge** — configurable percentage added to donations (donor pays)

### Post-MVP
- Native mobile apps (iOS/Android)
- Restricted retailer card integration (Monzo/Starling API)
- Stories from the streets (homeless user stories on profiles)
- Donor accounts with history and recurring donations
- Retailer partnerships (matched donations, branded campaigns)
- Payday Friday campaigns
- Supermarket recipe/cooking tips integration
- Investment of savings pool (UK gilts or similar low-risk)
- Balance checking at retailer customer service desks

### Non-goals (for now)
- Physical hardware/EPOS devices
- Native app store presence
- Bank account creation for homeless users
- Alcohol/cigarette/gambling purchase blocking (requires card issuing partnership)

---

## Look & Feel

- **Brand adjectives:** Warm, trustworthy, human, credible, hopeful
- **Visual direction:** Clean modern design with warm colour palette. Human photography/illustration over corporate graphics. Feels like a community platform backed by proper fintech.
- **Accessibility baseline:** WCAG 2.1 AA minimum. High contrast, readable fonts, works on any phone browser.
- **Copy tone:** Compassionate but not patronising. Direct but not aggressive. Hopeful and empowering.
- **Tagline:** "Bottom up charity with parameters in place that promote long term benefits for the homeless."

---

## Technical Plan

- **Platform:** Web (Progressive Web App)
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Payments:** Stripe (Checkout / Payment Intents)
- **Hosting:** Vercel (free tier)
- **Database:** Vercel Postgres or Supabase (free tier) — to be set up when needed
- **Authentication:** NextAuth.js (for admin; donors don't need accounts for MVP)
- **QR Codes:** Generated per homeless user, links to their payment page
- **Architecture:** Server-side rendering for landing/marketing, client-side for dashboards

### Security
- All payments via Stripe (PCI compliant, we never touch card data)
- HTTPS everywhere (Vercel default)
- Environment variables for all secrets
- Admin routes protected by authentication

### Non-functional requirements
- Mobile-first responsive design
- Page load under 3 seconds on 3G
- Works on all modern browsers (Chrome, Safari, Firefox, Edge)
- Accessible (WCAG 2.1 AA)

---

## Engineering Standards

- **Repo structure:** As defined in /docs/README.md
- **Naming:** kebab-case for files/folders, PascalCase for React components, camelCase for variables/functions
- **Tests:** Vitest for unit tests, Playwright for E2E (added incrementally)
- **Lint/format:** ESLint + Prettier (configured with Next.js defaults)
- **Docs:** All docs in /docs except this file. /docs/README.md is the index.
- **Git hygiene:** .gitignore excludes .tmp/, .env, Credentials.json, node_modules/

---

## Execution & Delivery

### Phases
1. **Foundation** — project structure, docs, Next.js scaffold, landing page
2. **Core payment flow** — Stripe integration, QR codes, donation page
3. **User management** — homeless user profiles, admin dashboard, balance tracking
4. **Savings & charges** — 10% savings feature, service charge model
5. **Polish & launch** — testing, accessibility audit, performance, deploy

### Definition of Done
- Feature works as described
- No console errors
- Mobile responsive
- Accessible
- Documented

### Demo checkpoints
- After Phase 1: landing page live, shareable URL
- After Phase 2: end-to-end donation via QR code
- After Phase 3: full admin view of users and transactions
- After Phase 5: production-ready launch

---

## Templates

### Decision Log Entry
```
**Date:** YYYY-MM-DD
**Decision:** [What was decided]
**Why:** [Brief justification]
**Implications:** [Cost/time/maintenance impact]
**Alternatives considered:** [What else was evaluated]
```

### Change Log Entry
```
**Date:** YYYY-MM-DD HH:MM (UK)
**Summary:** [What changed]
**Why:** [Reason for change]
**Verification:** [Commands run + results]
**Files changed:** [High-level list]
**Follow-ups:** [If any]
```

### Task Template
```
**Task:** [Description]
**Acceptance criteria:** [Checkable list]
**Dependencies:** [What must exist first]
**Estimated effort:** [Small/Medium/Large]
```

### Assumptions Template
```
**Assumption:** [What we're assuming]
**Risk if wrong:** [What happens if this is wrong]
**How to validate:** [How we'd confirm it]
**Status:** [Unvalidated/Validated/Invalidated]
```
