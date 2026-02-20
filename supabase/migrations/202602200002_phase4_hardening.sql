create or replace function public.normalize_company_name(p_raw text)
returns text
language sql
immutable
as $$
  with cleaned as (
    select regexp_replace(lower(coalesce(p_raw, '')), '[^a-z0-9]+', ' ', 'g') as value
  )
  select case
    when btrim(value) = '' then 'Unknown/Other'
    when btrim(value) in ('no', 'none', 'other', 'unknown') then 'Unknown/Other'
    when btrim(value) in ('deloitte', 'deloitte manchester', 'deloitte uk') then 'Deloitte'
    when btrim(value) in ('pwc', 'pwc birmingham', 'pricewaterhousecoopers', 'price waterhouse coopers') then 'PwC'
    when btrim(value) in ('bbc media city', 'bbc mediacity') then 'BBC Media City'
    when btrim(value) in ('natwest', 'natwest group') then 'NatWest Group'
    when btrim(value) in ('rolls royce', 'rolls royce derby') then 'Rolls-Royce'
    when btrim(value) in ('co op', 'coop') then 'Co-op'
    when btrim(value) in ('sainsburys', 'sainsbury s') then 'Sainsbury''s'
    when btrim(value) = 'tesco' then 'Tesco'
    when btrim(value) = 'asda' then 'Asda'
    when btrim(value) = 'morrisons' then 'Morrisons'
    when btrim(value) = 'aldi' then 'Aldi'
    when btrim(value) = 'lidl' then 'Lidl'
    else initcap(btrim(value))
  end
  from cleaned;
$$;

create or replace view public.company_leaderboard_v as
with normalized as (
  select
    public.normalize_company_name(d.company_name) as company_name,
    d.donation_pence,
    d.created_at
  from public.donations d
)
select
  row_number() over (order by sum(n.donation_pence) desc, min(n.created_at) asc) as rank,
  n.company_name,
  sum(n.donation_pence)::bigint as total_donated_pence,
  count(*)::integer as donation_count
from normalized n
where n.company_name <> 'Unknown/Other'
group by n.company_name
order by total_donated_pence desc;

create or replace view public.admin_transaction_ledger_v as
select
  d.id as donation_id,
  d.donation_key,
  split_part(d.donation_key, ':', 2) as source_event_id,
  d.created_at,
  m.slug as member_slug,
  m.first_name as member_name,
  d.source,
  d.frequency,
  d.donation_pence,
  d.spendable_pence,
  d.savings_pence,
  d.platform_fee_pence,
  d.total_paid_pence,
  (d.spendable_pence + d.savings_pence)::bigint as net_to_member_pence,
  d.company_name,
  public.normalize_company_name(d.company_name) as normalized_company_name
from public.donations d
join public.members m on m.id = d.member_id;

create or replace view public.member_savings_ledger_v as
select
  d.donation_key,
  d.created_at,
  m.slug as member_slug,
  m.first_name as member_name,
  d.frequency,
  d.savings_pence,
  sum(d.savings_pence) over (
    partition by m.id
    order by d.created_at asc, d.id asc
    rows between unbounded preceding and current row
  )::bigint as cumulative_savings_pence
from public.donations d
join public.members m on m.id = d.member_id;

create or replace view public.monthly_reconciliation_v as
select
  to_char(date_trunc('month', d.created_at), 'YYYY-MM') as month_key,
  date_trunc('month', d.created_at)::date as month_start,
  count(*)::bigint as donation_count,
  sum(d.donation_pence)::bigint as donation_pence,
  sum(d.savings_pence)::bigint as savings_pence,
  sum(d.spendable_pence)::bigint as spendable_pence,
  sum(d.platform_fee_pence)::bigint as platform_fee_pence,
  sum(d.total_paid_pence)::bigint as gross_paid_pence,
  sum(d.spendable_pence + d.savings_pence)::bigint as net_to_members_pence
from public.donations d
group by date_trunc('month', d.created_at)
order by month_start desc;

create table if not exists public.donor_notification_queue (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid references public.donations(id) on delete cascade,
  member_id uuid not null references public.members(id) on delete cascade,
  donor_email text not null,
  notification_type text not null check (notification_type in ('milestone_update', 'monthly_update', 'thank_you')),
  status text not null default 'pending' check (status in ('pending', 'processing', 'sent', 'failed', 'cancelled')),
  payload jsonb not null default '{}'::jsonb,
  attempts integer not null default 0 check (attempts >= 0),
  available_at timestamptz not null default now(),
  sent_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_donor_notification_queue_status_available
  on public.donor_notification_queue (status, available_at);

create index if not exists idx_donor_notification_queue_member_id
  on public.donor_notification_queue (member_id, created_at);

create index if not exists idx_stripe_events_status_received_at
  on public.stripe_events (status, received_at desc);

drop trigger if exists trg_donor_notification_queue_updated_at on public.donor_notification_queue;
create trigger trg_donor_notification_queue_updated_at
before update on public.donor_notification_queue
for each row
execute function public.set_updated_at();
