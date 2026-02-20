# Homeless Hand Up — Documentation

## Project Overview

Homeless Hand Up is a web-based contactless donation platform. Members of the public scan a QR code linked to a homeless individual and donate directly via their phone. Funds are tracked with built-in savings (10% auto-retained for housing goals) and spending restrictions. Revenue comes from a small service charge on each donation.

The platform is built as a Progressive Web App — no app download required. Works on any modern phone browser.

---

## Docs Index

| File | Description |
|------|-------------|
| `/docs/README.md` | This file — project overview and documentation index |
| `/docs/ROADMAP.md` | Full phased roadmap from foundation to launch |
| `/docs/IMAGE_CREDITS.md` | Source links and licence notes for photography used on the site |
| `/docs/LOGO_CREDITS.md` | Source links, attribution, and trademark notes for retailer logos |
| `/docs/EXTERNAL_DEPENDENCIES.md` | Phase 4 partnership/legal dependency board with owners and dates |
| `/docs/PARTNERSHIP_READINESS.md` | Card-issuer and retailer contract readiness checklist |
| `/docs/TRANSACTION_EXPORT_SCHEMA.md` | Canonical CSV schema for `/api/admin/transactions/export` |
| `/CLAUDE.md` | Canonical project handbook (root) |
| `/project_summary.md` | Current project snapshot — always up to date |
| `/build_log.md` | Append-only log of all changes |
| `/Execution/` | Deterministic tools and scripts |
| `/Directives/` | SOPs and runbooks |

---

## How to Run Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Steps
```bash
# 1. Clone the repo
git clone <repo-url>
cd Homeless_Hand_Up

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your Stripe keys (get free test keys at https://dashboard.stripe.com)

# 4. Run development server
npm run dev

# 5. Open in browser
# Visit http://localhost:3000
```

### Stripe Test Mode
For development, use Stripe test keys (no real money). Test card number: `4242 4242 4242 4242`, any future expiry, any CVC.
