# Roadmap — Homeless Hand Up
**Last updated: 2026-02-20**

---

## Phase 1: Foundation & Landing Page
**Goal:** Professional landing page live on the internet. Shareable URL. Brand established.

### Tasks
- [ ] Initialise Next.js project with TypeScript and Tailwind CSS
- [ ] Design and build responsive landing page
  - Hero section: tagline, explanation, call to action
  - How it works: 3-step donor flow, visual
  - Why it matters: stats on homelessness + cashless society
  - For homeless individuals: how the system protects and helps them
  - Footer: contact, legal links
- [ ] Set up brand identity: colours, typography, logo placeholder
- [ ] Deploy to Vercel (free tier)
- [ ] Verify: mobile responsive, accessible, fast load

**Acceptance criteria:** Landing page is live at a public URL, looks professional, explains the product clearly, works on mobile.

---

## Phase 2: Core Donation Flow
**Goal:** A donor can scan a QR code and complete a real payment.

### Tasks
- [ ] Set up Stripe integration (test mode)
- [ ] Create homeless user profile pages (unique URL per person)
- [ ] Generate QR codes per homeless user (links to their donation page)
- [ ] Build donation page: choose amount → pay via Stripe Checkout
- [ ] Confirmation page after successful payment
- [ ] Handle payment webhooks (track donations server-side)
- [ ] Set up database (Vercel Postgres or Supabase free tier)
- [ ] Store: donations, homeless user profiles, balances

**Acceptance criteria:** End-to-end flow works in Stripe test mode — scan QR, pick amount, pay, see confirmation, balance updates.

---

## Phase 3: User Management & Admin
**Goal:** Admin can manage homeless users. Homeless users have a basic dashboard.

### Tasks
- [ ] Admin authentication (NextAuth.js)
- [ ] Admin dashboard: list all homeless users, view transactions, add/edit users
- [ ] Homeless user dashboard: view balance, donation history, savings balance
- [ ] Unique QR code generation + printable card for each user
- [ ] Daily limits setting (homeless user can set their own)

**Acceptance criteria:** Admin can log in, create a homeless user, generate their QR code. Homeless user can view their balance and history.

---

## Phase 4: Savings & Service Charge
**Goal:** 10% savings feature live. Service charge model active.

### Tasks
- [ ] Implement 10% auto-savings on each donation
- [ ] Savings dashboard: balance, progress toward goals, lock period
- [ ] Service charge: configurable % added to donation amount
- [ ] Transparent display to donor: "£10 donation + £1.50 platform fee"
- [ ] Transaction reporting for all flows

**Acceptance criteria:** When a donor gives £10, the system charges £11.50 (with 15% fee), credits £9 to the user's spendable balance and £1 to savings. All amounts visible in dashboards.

---

## Phase 5: Polish, Test & Launch
**Goal:** Production-ready. Real money. Public launch.

### Tasks
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimisation (Lighthouse score 90+)
- [ ] Error handling and edge cases
- [ ] Legal pages: privacy policy, terms of service, cookie policy
- [ ] Switch Stripe to live mode
- [ ] SEO basics: meta tags, Open Graph, sitemap
- [ ] Social sharing: preview cards when URL is shared
- [ ] Final cross-browser and cross-device testing
- [ ] Launch!

**Acceptance criteria:** Platform handles real payments. Professional appearance. Accessible. Fast. Legal basics covered.

---

## Post-Launch (Future)
- Stories from the streets (homeless user stories on profiles)
- Donor accounts with history and recurring donations
- Native mobile apps
- Restricted spending card (Monzo/Starling partnership)
- Retailer partnerships and matched donations
- Payday Friday campaign feature
- Investment of savings pool
- Cooking tips / resources integration
- Balance checking at retailer service desks

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Stripe account verification delays | Can't take real payments | Use test mode throughout dev; apply for Stripe account early |
| No card-issuing partner for restricted spending | Can't block alcohol/gambling purchases | Defer to post-MVP; track as future partnership |
| Homeless users unable to access dashboard | Feature unused | Design for assisted access (charity workers, support staff) |
| Low initial donor adoption | No revenue | Focus on compelling landing page + social content first |
| Regulatory requirements (FCA, charity registration) | Legal risk | Research early; may need to register as a charity or obtain FCA permissions |
