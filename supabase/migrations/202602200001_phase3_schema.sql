create extension if not exists "pgcrypto";

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  slug text not null unique,
  first_name text not null,
  age integer not null check (age >= 16 and age <= 120),
  bio text not null,
  location text not null,
  area text not null,
  background text not null,
  support_worker text,
  matched_funding_partner text,
  matched_funding_multiplier numeric(4,2) not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  spendable_balance_pence bigint not null default 0,
  savings_pence bigint not null default 0,
  lifetime_raised_pence bigint not null default 0,
  savings_goal_pence bigint not null check (savings_goal_pence >= 0),
  savings_goal_description text not null
);

create table if not exists public.member_journey (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  event_date date not null,
  title text not null,
  description text not null,
  type text not null check (type in ('start', 'progress', 'goal', 'achievement')),
  sort_order integer not null default 0
);

create table if not exists public.member_wishlist_items (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  code text not null,
  label text not null,
  emoji text not null,
  amount_pence integer not null check (amount_pence >= 0),
  description text not null,
  category text not null check (category in ('food', 'clothing', 'hygiene', 'connectivity', 'transport', 'housing')),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  unique (member_id, code)
);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  donor_name text not null default 'Anonymous',
  message text not null check (char_length(message) <= 280),
  stripe_checkout_session_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete restrict,
  donation_key text not null unique,
  source text not null check (source in ('checkout_session', 'invoice')),
  stripe_checkout_session_id text,
  stripe_invoice_id text,
  stripe_subscription_id text,
  payment_intent_id text,
  frequency text not null check (frequency in ('one-time', 'monthly')),
  donation_pence bigint not null check (donation_pence >= 0),
  savings_pence bigint not null check (savings_pence >= 0),
  spendable_pence bigint not null check (spendable_pence >= 0),
  platform_fee_pence bigint not null check (platform_fee_pence >= 0),
  total_paid_pence bigint not null check (total_paid_pence >= 0),
  currency text not null,
  company_name text,
  wishlist_item_code text,
  notify_email boolean not null default false,
  donor_email text,
  created_at timestamptz not null default now()
);

create table if not exists public.stripe_events (
  id text primary key,
  event_type text not null,
  livemode boolean not null default false,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  status text not null check (status in ('processed', 'duplicate', 'failed')),
  error_message text
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  full_name text not null,
  role text not null check (role in ('super_admin', 'support_worker', 'viewer')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create index if not exists idx_members_active on public.members (is_active);
create index if not exists idx_members_slug on public.members (slug);
create index if not exists idx_member_journey_member_id on public.member_journey (member_id, sort_order);
create index if not exists idx_member_wishlist_member_id on public.member_wishlist_items (member_id, sort_order);
create index if not exists idx_support_messages_member_id on public.support_messages (member_id, created_at);
create index if not exists idx_donations_member_id on public.donations (member_id, created_at);
create index if not exists idx_donations_company_name on public.donations (company_name);
create index if not exists idx_donations_created_at on public.donations (created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_members_updated_at on public.members;
create trigger trg_members_updated_at
before update on public.members
for each row
execute function public.set_updated_at();

create or replace view public.company_leaderboard_v as
select
  row_number() over (order by sum(d.donation_pence) desc, min(d.created_at) asc) as rank,
  d.company_name,
  sum(d.donation_pence)::bigint as total_donated_pence,
  count(*)::integer as donation_count
from public.donations d
where d.company_name is not null and btrim(d.company_name) <> ''
group by d.company_name
order by total_donated_pence desc;

create or replace view public.platform_stats_v as
select
  coalesce(sum(d.donation_pence), 0)::bigint as total_processed_pence,
  coalesce(sum(d.savings_pence), 0)::bigint as total_savings_pence,
  count(d.id)::bigint as total_donations,
  (select count(*)::bigint from public.members m where m.is_active = true) as total_members,
  coalesce(sum(d.platform_fee_pence), 0)::bigint as platform_revenue_pence,
  coalesce(round(sum(d.platform_fee_pence) * 0.60), 0)::bigint as reinvested_pence
from public.donations d;

create or replace view public.monthly_growth_v as
with months as (
  select
    date_trunc('month', d.created_at) as month_start,
    sum(d.donation_pence)::bigint as raised_pence,
    sum(d.savings_pence)::bigint as savings_pence,
    count(*)::bigint as donation_count
  from public.donations d
  group by date_trunc('month', d.created_at)
)
select
  m.month_start,
  to_char(m.month_start, 'FMMonth') as month_label,
  m.raised_pence,
  m.savings_pence,
  (
    select count(*)::bigint
    from public.members mem
    where mem.is_active = true
      and mem.created_at <= (m.month_start + interval '1 month - 1 second')
  ) as member_count,
  m.donation_count
from months m
order by m.month_start;

create or replace function public.apply_donation_event(
  p_donation_key text,
  p_source text,
  p_member_id uuid,
  p_member_legacy_id text,
  p_stripe_checkout_session_id text,
  p_stripe_invoice_id text,
  p_stripe_subscription_id text,
  p_payment_intent_id text,
  p_frequency text,
  p_donation_pence bigint,
  p_savings_pence bigint,
  p_spendable_pence bigint,
  p_platform_fee_pence bigint,
  p_total_paid_pence bigint,
  p_currency text,
  p_company_name text,
  p_wishlist_item_code text,
  p_notify_email boolean,
  p_donor_email text,
  p_message text,
  p_donor_name text,
  p_event_created_at timestamptz default now()
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_member_id uuid;
begin
  if p_member_id is not null then
    select m.id into v_member_id from public.members m where m.id = p_member_id;
  end if;

  if v_member_id is null and p_member_legacy_id is not null then
    select m.id into v_member_id from public.members m where m.legacy_id = p_member_legacy_id;
  end if;

  if v_member_id is null then
    raise exception 'Member not found for donation event %', p_donation_key;
  end if;

  insert into public.donations (
    member_id,
    donation_key,
    source,
    stripe_checkout_session_id,
    stripe_invoice_id,
    stripe_subscription_id,
    payment_intent_id,
    frequency,
    donation_pence,
    savings_pence,
    spendable_pence,
    platform_fee_pence,
    total_paid_pence,
    currency,
    company_name,
    wishlist_item_code,
    notify_email,
    donor_email,
    created_at
  )
  values (
    v_member_id,
    p_donation_key,
    p_source,
    p_stripe_checkout_session_id,
    p_stripe_invoice_id,
    p_stripe_subscription_id,
    p_payment_intent_id,
    p_frequency,
    greatest(p_donation_pence, 0),
    greatest(p_savings_pence, 0),
    greatest(p_spendable_pence, 0),
    greatest(p_platform_fee_pence, 0),
    greatest(p_total_paid_pence, 0),
    p_currency,
    nullif(p_company_name, ''),
    nullif(p_wishlist_item_code, ''),
    coalesce(p_notify_email, false),
    nullif(p_donor_email, ''),
    coalesce(p_event_created_at, now())
  )
  on conflict (donation_key) do nothing;

  if not found then
    return false;
  end if;

  update public.members
  set
    spendable_balance_pence = spendable_balance_pence + greatest(p_spendable_pence, 0),
    savings_pence = savings_pence + greatest(p_savings_pence, 0),
    lifetime_raised_pence = lifetime_raised_pence + greatest(p_donation_pence, 0)
  where id = v_member_id;

  if p_message is not null and char_length(btrim(p_message)) > 0 then
    insert into public.support_messages (
      member_id,
      donor_name,
      message,
      stripe_checkout_session_id,
      created_at
    )
    values (
      v_member_id,
      coalesce(nullif(btrim(p_donor_name), ''), 'Anonymous'),
      left(btrim(p_message), 280),
      nullif(p_stripe_checkout_session_id, ''),
      coalesce(p_event_created_at, now())
    );
  end if;

  return true;
end;
$$;
