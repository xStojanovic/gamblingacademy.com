create table if not exists companies (
  id uuid primary key default uuid_generate_v4(), name text not null, seat_limit integer default 25,
  plan text default 'team', primary_domain text, settings jsonb default '{}'::jsonb,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists teams (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete cascade,
  name text not null, description text, created_at timestamptz default now(), unique(company_id,name)
);
create table if not exists company_users (
  company_id uuid references companies(id) on delete cascade, user_id uuid references profiles(id) on delete cascade,
  team_id uuid references teams(id) on delete set null, company_role text default 'member', primary key(company_id,user_id)
);
create table if not exists company_invitations (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete cascade,
  email text not null, company_role text default 'member', team_id uuid references teams(id) on delete set null,
  token text unique not null, expires_at timestamptz not null, accepted_at timestamptz, created_at timestamptz default now()
);
create table if not exists assignments (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete cascade,
  title text not null, target_type text not null, target_value text, course_id uuid references courses(id),
  learning_path_id uuid references learning_paths(id), due_at timestamptz, created_at timestamptz default now()
);
create table if not exists company_modules (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete cascade,
  title text not null, audience jsonb default '{}'::jsonb, content jsonb default '{}'::jsonb,
  position integer default 0, status text default 'draft', created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists company_identity_connections (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete cascade,
  provider text not null, protocol text not null, domain text, enabled boolean default false,
  auto_provision boolean default false, scim_enabled boolean default false, config jsonb default '{}'::jsonb,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists data_imports (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete cascade,
  import_type text not null, status text default 'pending', row_count integer default 0,
  error_count integer default 0, summary jsonb default '{}'::jsonb, created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now(), completed_at timestamptz
);
