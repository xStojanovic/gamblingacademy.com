create table if not exists pricing_plans (
  id uuid primary key default uuid_generate_v4(), code text unique not null, name text not null,
  audience text not null, price_cents integer default 0, currency text default 'EUR', billing_interval text,
  provider_price_id text, entitlements jsonb default '{}'::jsonb, status text default 'active',
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists company_subscriptions (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete cascade,
  provider_customer_id text, provider_subscription_id text, plan_id uuid references pricing_plans(id),
  seat_limit integer not null, status text default 'active', current_period_end timestamptz,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists individual_subscriptions (
  id uuid primary key default uuid_generate_v4(), user_id uuid references profiles(id) on delete cascade,
  provider_customer_id text, provider_subscription_id text, plan_id uuid references pricing_plans(id),
  status text default 'active', current_period_end timestamptz, created_at timestamptz default now(), updated_at timestamptz default now()
);
