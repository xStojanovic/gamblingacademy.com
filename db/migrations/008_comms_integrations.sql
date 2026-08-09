create table if not exists email_templates (
  id uuid primary key default uuid_generate_v4(), name text not null, trigger_key text unique,
  subject text not null, body_html text, body_text text, status text default 'draft', updated_at timestamptz default now()
);
create table if not exists announcements (
  id uuid primary key default uuid_generate_v4(), title text not null, body text, audience jsonb default '{}'::jsonb,
  channels text[] default '{in_app}', status text default 'draft', publish_at timestamptz,
  created_by uuid references profiles(id) on delete set null, created_at timestamptz default now()
);
create table if not exists platform_integrations (
  id uuid primary key default uuid_generate_v4(), provider text unique not null, category text not null,
  status text default 'disconnected', environment text default 'production', config jsonb default '{}'::jsonb,
  last_sync_at timestamptz, updated_at timestamptz default now()
);
create table if not exists webhooks (
  id uuid primary key default uuid_generate_v4(), owner_type text default 'platform', owner_id uuid,
  name text not null, endpoint_url text not null, events text[] not null, secret_hash text,
  status text default 'active', created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists api_keys (
  id uuid primary key default uuid_generate_v4(), owner_type text default 'platform', owner_id uuid,
  name text not null, key_prefix text not null, key_hash text not null, scopes text[] default '{}',
  status text default 'active', last_used_at timestamptz, created_at timestamptz default now(), revoked_at timestamptz
);
