# Transaction Export Schema

Canonical endpoint: `GET /api/admin/transactions/export`

## Columns
- `donation_key`
- `created_at`
- `source_event_id`
- `member_name`
- `member_slug`
- `source`
- `frequency`
- `donation_pence`
- `gross_paid_pence`
- `net_to_member_pence`
- `spendable_pence`
- `savings_pence`
- `platform_fee_pence`
- `total_paid_pence`
- `company_name`
- `normalized_company_name`
- `donation_display`
- `gross_display`
- `net_to_member_display`
- `spendable_display`
- `savings_display`
- `fee_display`

## Notes
- `source_event_id` is derived from `donation_key` (e.g. checkout session ID or invoice ID).
- `normalized_company_name` applies company-name cleanup logic and may be `Unknown/Other`.
- Currency in product is GBP (`pence` integer fields + `*_display` convenience columns).
