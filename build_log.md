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
