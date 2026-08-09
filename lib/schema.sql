-- GamingOps Academy MVP PostgreSQL / Supabase schema
create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key,
  full_name text,
  role text default 'learner' check (role in ('learner','company_admin','academy_admin')),
  created_at timestamptz default now()
);

create table if not exists companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  seat_limit integer default 25,
  plan text default 'team',
  created_at timestamptz default now()
);

create table if not exists company_users (
  company_id uuid references companies(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  team_name text,
  company_role text default 'member' check (company_role in ('member','manager','admin')),
  primary key(company_id,user_id)
);

create table if not exists courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  level text,
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists modules (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  position integer not null
);

create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references modules(id) on delete cascade,
  title text not null,
  lesson_type text default 'text',
  content jsonb default '{}'::jsonb,
  position integer not null
);

create table if not exists enrollments (
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  enrolled_at timestamptz default now(),
  completed_at timestamptz,
  primary key(user_id,course_id)
);

create table if not exists lesson_progress (
  user_id uuid references profiles(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  primary key(user_id,lesson_id)
);

create table if not exists assessments (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  passing_score integer default 80
);

create table if not exists assessment_attempts (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references assessments(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  score integer not null,
  passed boolean not null,
  answers jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(),
  credential_id text unique not null,
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id),
  program_name text not null,
  score integer,
  issued_at timestamptz default now(),
  revoked_at timestamptz
);

create table if not exists resources (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  category text,
  storage_path text,
  published boolean default true
);

create table if not exists assignments (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  title text not null,
  target_type text not null check (target_type in ('company','team','user')),
  target_value text,
  course_id uuid references courses(id),
  due_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists company_modules (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  title text not null,
  content jsonb default '{}'::jsonb,
  position integer default 0,
  published boolean default false
);

-- Platform V2 additions
create table if not exists learning_paths (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  audience text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists learning_path_courses (
  learning_path_id uuid references learning_paths(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  position integer not null default 0,
  required boolean default true,
  primary key(learning_path_id,course_id)
);

create table if not exists teams (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz default now(),
  unique(company_id,name)
);

alter table company_users add column if not exists team_id uuid references teams(id) on delete set null;

create table if not exists saved_resources (
  user_id uuid references profiles(id) on delete cascade,
  resource_id uuid references resources(id) on delete cascade,
  saved_at timestamptz default now(),
  primary key(user_id,resource_id)
);

create table if not exists learner_notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete set null,
  lesson_id uuid references lessons(id) on delete set null,
  title text,
  body text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists knowledge_articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  category text,
  summary text,
  body jsonb default '[]'::jsonb,
  seo jsonb default '{}'::jsonb,
  status text default 'draft' check (status in ('draft','review','published','archived')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists glossary_terms (
  id uuid primary key default uuid_generate_v4(),
  term text unique not null,
  definition text not null,
  related_terms text[] default '{}',
  published boolean default true,
  updated_at timestamptz default now()
);

create table if not exists company_invitations (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  email text not null,
  company_role text default 'member',
  team_id uuid references teams(id) on delete set null,
  token text unique not null,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists company_integrations (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  provider text not null,
  integration_type text not null,
  status text default 'disconnected',
  config jsonb default '{}'::jsonb,
  connected_at timestamptz,
  unique(company_id,provider)
);

create table if not exists company_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  provider_customer_id text,
  provider_subscription_id text,
  plan text not null,
  seat_limit integer not null,
  status text default 'active',
  current_period_end timestamptz,
  created_at timestamptz default now()
);

create table if not exists cms_users (
  user_id uuid primary key references profiles(id) on delete cascade,
  cms_role text not null default 'editor' check (cms_role in ('super_admin','admin','editor','reviewer')),
  can_publish boolean default false,
  created_at timestamptz default now()
);

create table if not exists platform_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references profiles(id) on delete set null,
  updated_at timestamptz default now()
);

create table if not exists audit_log (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references profiles(id) on delete set null,
  company_id uuid references companies(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_company_users_company on company_users(company_id);
create index if not exists idx_teams_company on teams(company_id);
create index if not exists idx_assignments_company on assignments(company_id);
create index if not exists idx_progress_user on lesson_progress(user_id);
create index if not exists idx_attempts_user on assessment_attempts(user_id);
create index if not exists idx_certificates_user on certificates(user_id);
create index if not exists idx_articles_status on knowledge_articles(status);
create index if not exists idx_audit_company on audit_log(company_id,created_at desc);

-- Recommended Supabase RLS policy model (implement after Auth is connected):
-- 1. Learners can read/update their own profile, enrollments, progress, notes and saved resources.
-- 2. Company admins can read company-user learning aggregates and mutate company-owned teams,
--    assignments, invitations, company modules and company settings.
-- 3. CMS editors can mutate Academy content according to cms_users.can_publish / cms_role.
-- 4. Public users can only read published courses, paths, resources, glossary and Knowledge Hub content.
-- 5. Certificate verification should expose only the minimum public credential fields.

-- Platform V3 owner-admin extensions
create table if not exists admin_roles (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  permissions jsonb not null default '{}'::jsonb,
  is_system boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists admin_role_assignments (
  user_id uuid references profiles(id) on delete cascade,
  role_id uuid references admin_roles(id) on delete cascade,
  assigned_at timestamptz default now(),
  primary key(user_id,role_id)
);

create table if not exists site_pages (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  template text default 'content',
  body jsonb default '[]'::jsonb,
  seo jsonb default '{}'::jsonb,
  status text default 'draft' check(status in ('draft','scheduled','published','archived')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists navigation_items (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  href text not null,
  location text not null default 'main',
  sort_order integer default 0,
  visible boolean default true,
  parent_id uuid references navigation_items(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists email_templates (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  trigger_key text unique,
  subject text not null,
  body_html text,
  body_text text,
  status text default 'draft' check(status in ('draft','active','paused')),
  updated_at timestamptz default now()
);

create table if not exists platform_integrations (
  id uuid primary key default uuid_generate_v4(),
  provider text unique not null,
  category text not null,
  status text default 'disconnected',
  environment text default 'production',
  config jsonb default '{}'::jsonb,
  last_sync_at timestamptz,
  updated_at timestamptz default now()
);

create table if not exists feature_flags (
  key text primary key,
  name text not null,
  description text,
  enabled boolean default false,
  scope jsonb default '{}'::jsonb,
  updated_by uuid references profiles(id) on delete set null,
  updated_at timestamptz default now()
);

create table if not exists pricing_plans (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  name text not null,
  audience text not null check(audience in ('individual','company')),
  price_cents integer default 0,
  currency text default 'EUR',
  billing_interval text,
  entitlements jsonb default '{}'::jsonb,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists course_reviews (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  reviewer_id uuid references profiles(id) on delete set null,
  status text default 'pending' check(status in ('pending','changes_requested','approved')),
  notes text,
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists question_bank (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references assessments(id) on delete cascade,
  question_type text not null default 'single_choice',
  prompt text not null,
  options jsonb default '[]'::jsonb,
  correct_answer jsonb,
  explanation text,
  points integer default 1,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_site_pages_status on site_pages(status);
create index if not exists idx_navigation_location on navigation_items(location,sort_order);
create index if not exists idx_question_bank_assessment on question_bank(assessment_id,sort_order);
create index if not exists idx_course_reviews_course on course_reviews(course_id,status);

-- Platform V4 note:
-- New development is maintained as domain-based migrations under /db/migrations.
-- Keep this legacy consolidated schema only for historical V2/V3 reference.
