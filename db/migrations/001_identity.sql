create extension if not exists "uuid-ossp";
create table if not exists profiles (
  id uuid primary key,
  full_name text,
  email text,
  role text default 'learner' check (role in ('learner','company_admin','academy_admin')),
  locale text default 'en',
  timezone text default 'Europe/Belgrade',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists admin_roles (
  id uuid primary key default uuid_generate_v4(), name text unique not null,
  permissions jsonb not null default '{}'::jsonb, is_system boolean default false,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists admin_role_assignments (
  user_id uuid references profiles(id) on delete cascade,
  role_id uuid references admin_roles(id) on delete cascade,
  assigned_at timestamptz default now(), primary key(user_id,role_id)
);
