# Roadmap — Homeless Hand Up
**Last updated: 2026-02-20**

---

## Phase 1: Foundation & Landing Page ✅ COMPLETE
**Goal:** Professional landing page live on the internet. Shareable URL. Brand established.

### Tasks
- [x] Initialise Next.js project with TypeScript and Tailwind CSS
- [x] Design and build responsive landing page
- [x] Set up brand identity: colours, typography
- [x] Deploy to Vercel (free tier)
- [x] Verify: mobile responsive, accessible, fast load

**Status:** Live at https://homeless-hand-up.vercel.app

---

## Phase 2: Core Donation Flow & Platform Overhaul ✅ COMPLETE
**Goal:** Full donation flow, multi-page architecture, advanced features.

### Part A — Donation Flow
- [x] Stripe integration (test mode) with lazy initialisation
- [x] Community member profile pages (/profile/[slug]) with QR codes
- [x] Donation page (/donate/[slug]): choose amount → pay via Stripe Checkout
- [x] Confirmation page (/donate/success)
- [x] Payment webhooks (/api/webhook)
- [x] Service charge (15%) shown transparently
- [x] Savings earmark (10%) in breakdown

### Part B — Multi-Page Architecture
- [x] Homepage rewrite — emotional hero, impact counter, featured profiles
- [x] /our-mission — why we exist, philosophy, comparison with traditional charity
- [x] /how-it-works/donors — 5-step donor flow, security info
- [x] /how-it-works/recipients — onboarding, restricted card, housing savings
- [x] /community — directory with city filtering
- [x] /transparency — public financials dashboard
- [x] /where-to-spend — approved retailers grid
- [x] /leaderboard — corporate giving rankings
- [x] Shared SiteHeader (responsive, mobile menu, dropdowns) and SiteFooter

### Part C — Enhanced Donation Form
- [x] One-time vs Monthly toggle (Stripe subscription support)
- [x] Wishlist grid — donors can fund specific needs
- [x] Message of support — optional encouraging message
- [x] Company attribution dropdown — leaderboard integration
- [x] Gift Aid checkbox (UK taxpayer, +25%)
- [x] Milestone notification opt-in
- [x] Enhanced donation breakdown display

### Part D — Enhanced Profiles
- [x] Journey timeline with colour-coded milestones
- [x] Savings progress bar towards housing goal
- [x] Messages of support guestbook feed
- [x] Wishlist display linking to pre-filled donation
- [x] Matched funding badge
- [x] Support worker info
- [x] Background story section

### Part E — Advanced Features
- [x] /local — Find Near Me with city filtering and map placeholder
- [x] /admin — Support Worker Portal (demo view, member table, stats)
- [x] /profile/[id]/print — Printable QR badge (A6 optimised, @media print CSS)
- [x] /recipient-dashboard — Recipient view with balance, messages, wishlist
- [x] Emergency "Request Support Worker Contact" button
- [x] /api/wallet-pass — Mock endpoint (coming soon)
- [x] Payday Friday detection and homepage banner
- [x] Matched funding banners on profiles

### Part F — Data & Copy Overhaul
- [x] Renamed "Users" → "Community Members" throughout
- [x] Renamed "Service Charge" → "Operational Contribution"
- [x] 5 sample members: James/Manchester, Sarah/London, Mark/Birmingham, Lisa/Leeds, David/Glasgow
- [x] Rich data model: journey[], wishlist[], messages[], savingsGoal, matchedFunding
- [x] Platform stats, retailer partners, leaderboard data
- [x] Community-focused, warm vocabulary throughout

**Status:** 20 routes compiling. All features working in code. Database moved to Phase 3.

**Routes:**
```
○ /                          Static  — Homepage
○ /our-mission               Static  — Mission page
○ /how-it-works/donors       Static  — Donor guide
○ /how-it-works/recipients   Static  — Recipient guide
○ /community                 Static  — Community directory
○ /transparency              Static  — Financials dashboard
○ /where-to-spend            Static  — Approved retailers
○ /leaderboard               Static  — Corporate giving
○ /local                     Static  — Find Near Me
○ /admin                     Static  — Support Worker Portal
○ /recipient-dashboard       Static  — Recipient view
ƒ /donate/[id]               Dynamic — Donation page
○ /donate/success            Static  — Thank you page
○ /donate/cancelled          Static  — Cancelled page
ƒ /profile/[id]              Dynamic — Community member profile
ƒ /profile/[id]/print        Dynamic — Printable QR badge
ƒ /api/checkout              Dynamic — Stripe checkout
ƒ /api/webhook               Dynamic — Stripe webhook
ƒ /api/wallet-pass           Dynamic — Wallet pass (coming soon)
```

---

## Phase 3: Database & Real Data 🔜 NEXT
**Goal:** Real data storage. Live Stripe payments. Admin authentication.

### Tasks
- [ ] Set up Supabase (free tier) with tables: members, donations, transactions, messages
- [ ] Migrate from in-memory sample data to real database queries
- [ ] Connect Stripe webhook to database (record donations, update balances, track savings)
- [ ] Admin authentication (NextAuth.js)
- [ ] Real-time balance updates after donations
- [ ] Subscription billing for monthly donors
- [ ] Store messages of support in database
- [ ] Track company attributions for leaderboard

---

## Phase 4: Savings, Partnerships & Growth
**Goal:** Full savings tracking. Retailer partnerships. Public launch preparation.

### Tasks
- [ ] Savings balance tracked per member in database
- [ ] Restricted spending card partnership (Monzo/Starling)
- [ ] Retailer partnership conversations
- [ ] Transaction reporting and audit trail
- [ ] Gift Aid reclaim process
- [ ] Email notifications for milestone updates

---

## Phase 5: Polish, Test & Launch
**Goal:** Production-ready. Real money. Public launch.

### Tasks
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimisation (Lighthouse 90+)
- [ ] Legal pages: privacy policy, terms, cookies
- [ ] Switch Stripe to live mode
- [ ] SEO: meta tags, Open Graph, sitemap
- [ ] Cross-browser and cross-device testing
- [ ] Launch!

---

## Post-Launch (Future)
- Native mobile apps (iOS/Android)
- Apple Wallet / Google Pay passes
- Real-time map integration for Find Near Me
- Donor accounts with history
- Recipe/cooking tips integration
- Investment of savings pool (UK gilts)
- Balance checking at retailer service desks

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Stripe account verification delays | Can't take real payments | Use test mode; apply early |
| No card-issuing partner | Can't restrict spending | Defer to Phase 4; track as partnership |
| Homeless users unable to access dashboard | Feature unused | Design for assisted access via support workers |
| Low initial donor adoption | No revenue | Focus on compelling content + social sharing |
| FCA / charity registration | Legal risk | Research early; may need charity registration |
