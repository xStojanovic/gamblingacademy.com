create table if not exists feature_flags (
  key text primary key, name text not null, description text, enabled boolean default false,
  scope jsonb default '{}'::jsonb, updated_by uuid references profiles(id) on delete set null, updated_at timestamptz default now()
);
create table if not exists platform_settings (
  key text primary key, value jsonb not null, updated_by uuid references profiles(id) on delete set null, updated_at timestamptz default now()
);
create table if not exists audit_log (
  id uuid primary key default uuid_generate_v4(), actor_id uuid references profiles(id) on delete set null,
  company_id uuid references companies(id) on delete set null, action text not null, entity_type text not null,
  entity_id text, metadata jsonb default '{}'::jsonb, created_at timestamptz default now()
);
create table if not exists support_cases (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete set null,
  learner_id uuid references profiles(id) on delete set null, subject text not null, priority text default 'normal',
  status text default 'open', owner_id uuid references profiles(id) on delete set null, metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create index if not exists idx_audit_created on audit_log(created_at desc);
create index if not exists idx_support_status on support_cases(status,priority);
