# Homeless Hand Up

Homeless Hand Up is a Next.js platform for direct donations to community members, with Stripe checkout, Supabase-backed accounting, admin authentication, and transparent reporting.

## Quick Start
```bash
npm install
npm run dev
```

## Core Scripts
- `npm run build` - production build
- `npm run seed:phase2` - seed Supabase with current member dataset
- `npm run bootstrap:admin` - create or update initial admin account
- `npm run sync:retailer-logos` - download supermarket logos from GitHub
- `npm run ci` - lint + build + unit tests

## Environment Variables
- `NEXT_PUBLIC_APP_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AUTH_SECRET`
- `ADMIN_BOOTSTRAP_EMAIL`
- `ADMIN_BOOTSTRAP_PASSWORD`
- `SEED_FALLBACK_ENABLED` (set to `false` in production after DB migration)

See `docs/README.md` and `docs/ROADMAP.md` for full documentation.
