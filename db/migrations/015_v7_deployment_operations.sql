-- V7 Deployment Ready: release observability, deployment history and system incident records.
-- These tables are optional for demo mode and become active when Supabase is configured.

create table if not exists platform_releases (
  id uuid primary key default uuid_generate_v4(),
  version text not null,
  channel text,
  commit_sha text,
  branch text default 'main',
  next_version text,
  react_version text,
  node_version text,
  status text default 'built',
  release_notes text,
  metadata jsonb default '{}'::jsonb,
  built_at timestamptz,
  deployed_at timestamptz,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists deployment_events (
  id uuid primary key default uuid_generate_v4(),
  release_id uuid references platform_releases(id) on delete set null,
  provider text default 'hostinger',
  environment text default 'production',
  status text not null,
  stage text,
  message text,
  build_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists system_incidents (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  severity text default 'low',
  status text default 'open',
  service text,
  summary text,
  started_at timestamptz default now(),
  resolved_at timestamptz,
  owner_user_id uuid references profiles(id) on delete set null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table platform_releases enable row level security;
alter table deployment_events enable row level security;
alter table system_incidents enable row level security;

create policy "platform admins manage releases" on platform_releases for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage deployment events" on deployment_events for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage incidents" on system_incidents for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());
