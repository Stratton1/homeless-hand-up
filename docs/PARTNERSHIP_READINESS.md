# Partnership Readiness Artifacts

## Card-Issuer Integration Requirements (External Dependency)
- Partner capability: merchant category controls and restricted spend profiles.
- Required APIs: card issuance, balance controls, transaction webhooks, freeze/unfreeze.
- Compliance checks: KYC/AML ownership, safeguarding model, PCI scope confirmation.
- Delivery status: External dependency, not yet integrated in code.

## Retailer Data Export Contract (External Dependency)
- Export formats: CSV and JSON (daily batch plus optional webhook feed).
- Mandatory fields: donation ID, anonymised recipient ID, spend category, timestamp, amount.
- Privacy controls: pseudonymisation and retention windows per UK policy.
- Delivery status: External dependency, not yet integrated in code.

## Email Updates Readiness
- Donor email and consent flags are persisted in donations.
- Outbound notifications are deferred until provider and legal approval.
- Delivery status: Prepared in data model; sending not enabled.

## Tracking and Ownership
- External dependency owners, target dates, and unblock criteria are tracked in `docs/EXTERNAL_DEPENDENCIES.md`.
