-- V5 Production Core: competency framework, onboarding, assessment pools,
-- credential lifecycle, admin operations and commercial controls.

create table if not exists competencies (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  category text not null default 'core',
  description text,
  level_labels jsonb not null default '["Awareness","Working","Proficient","Advanced","Expert"]'::jsonb,
  status text not null default 'active',
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists role_profiles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null, title text not null, family text, seniority text,
  description text, status text not null default 'active',
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists role_competencies (
  role_id uuid references role_profiles(id) on delete cascade,
  competency_id uuid references competencies(id) on delete cascade,
  target_level integer not null default 1 check(target_level between 1 and 5),
  weight numeric(5,2) not null default 1,
  primary key(role_id,competency_id)
);

create table if not exists course_competencies (
  course_id uuid references courses(id) on delete cascade,
  competency_id uuid references competencies(id) on delete cascade,
  level_gain numeric(5,2) default 0.5,
  evidence_rule text default 'completion',
  primary key(course_id,competency_id)
);

create table if not exists learner_competencies (
  user_id uuid references profiles(id) on delete cascade,
  competency_id uuid references competencies(id) on delete cascade,
  level numeric(5,2) not null default 0,
  evidence jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now(),
  primary key(user_id,competency_id)
);

create table if not exists onboarding_programs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  title text not null, description text, audience jsonb default '{}'::jsonb,
  duration_days integer default 30, status text default 'draft',
  settings jsonb default '{}'::jsonb,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists onboarding_steps (
  id uuid primary key default uuid_generate_v4(),
  program_id uuid references onboarding_programs(id) on delete cascade,
  title text not null, step_type text not null default 'course',
  target_id text, due_offset_days integer default 0, position integer default 0,
  required boolean default true, settings jsonb default '{}'::jsonb
);

create table if not exists onboarding_enrollments (
  id uuid primary key default uuid_generate_v4(),
  program_id uuid references onboarding_programs(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  manager_id uuid references profiles(id) on delete set null,
  started_at timestamptz default now(), target_completion_at timestamptz,
  completed_at timestamptz, progress_percent integer default 0,
  state jsonb default '{}'::jsonb,
  unique(program_id,user_id)
);

create table if not exists assessment_question_pools (
  id uuid primary key default uuid_generate_v4(), assessment_id uuid references assessments(id) on delete cascade,
  name text not null, draw_count integer default 10, position integer default 0,
  rules jsonb default '{}'::jsonb
);

alter table question_bank add column if not exists pool_id uuid references assessment_question_pools(id) on delete set null;
alter table question_bank add column if not exists difficulty text default 'standard';
alter table question_bank add column if not exists manual_grading boolean default false;
alter table assessments add column if not exists cooldown_minutes integer default 0;
alter table assessments add column if not exists scoring_rules jsonb default '{}'::jsonb;
alter table assessments add column if not exists delivery_rules jsonb default '{}'::jsonb;

create table if not exists manual_grading_queue (
  id uuid primary key default uuid_generate_v4(),
  attempt_id uuid references assessment_attempts(id) on delete cascade,
  question_id uuid references question_bank(id) on delete cascade,
  response jsonb, score numeric(8,2), max_score numeric(8,2),
  reviewer_id uuid references profiles(id) on delete set null,
  reviewer_notes text, status text default 'pending', graded_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists credential_templates (
  id uuid primary key default uuid_generate_v4(), slug text unique not null,
  name text not null, title_pattern text not null, design jsonb default '{}'::jsonb,
  validity_days integer, renewal_rules jsonb default '{}'::jsonb,
  status text default 'active', created_at timestamptz default now(), updated_at timestamptz default now()
);

alter table certificates add column if not exists template_id uuid references credential_templates(id) on delete set null;
alter table certificates add column if not exists expires_at timestamptz;
alter table certificates add column if not exists revoked_at timestamptz;
alter table certificates add column if not exists revocation_reason text;
alter table certificates add column if not exists metadata jsonb default '{}'::jsonb;

create table if not exists certificate_events (
  id uuid primary key default uuid_generate_v4(), certificate_id uuid references certificates(id) on delete cascade,
  event_type text not null, actor_id uuid references profiles(id) on delete set null,
  details jsonb default '{}'::jsonb, created_at timestamptz default now()
);

create table if not exists saved_admin_views (
  id uuid primary key default uuid_generate_v4(), user_id uuid references profiles(id) on delete cascade,
  area text not null, name text not null, filters jsonb default '{}'::jsonb,
  columns jsonb default '[]'::jsonb, is_default boolean default false,
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists admin_account_notes (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete cascade,
  author_id uuid references profiles(id) on delete set null, note text not null,
  note_type text default 'general', created_at timestamptz default now()
);

create table if not exists publication_schedules (
  id uuid primary key default uuid_generate_v4(), entity_type text not null, entity_id uuid not null,
  action text not null default 'publish', scheduled_for timestamptz not null,
  payload jsonb default '{}'::jsonb, status text default 'scheduled',
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now(), completed_at timestamptz
);

create table if not exists entitlement_rules (
  id uuid primary key default uuid_generate_v4(), plan_id uuid references pricing_plans(id) on delete cascade,
  feature_key text not null, allowed boolean default true, limit_value numeric,
  configuration jsonb default '{}'::jsonb, unique(plan_id,feature_key)
);

create table if not exists payment_events (
  id uuid primary key default uuid_generate_v4(), company_id uuid references companies(id) on delete set null,
  user_id uuid references profiles(id) on delete set null, provider text default 'stripe',
  provider_event_id text unique, event_type text not null, amount_cents integer,
  currency text default 'EUR', status text, details jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_onboarding_company on onboarding_programs(company_id);
create index if not exists idx_onboarding_user on onboarding_enrollments(user_id);
create index if not exists idx_learner_comp_user on learner_competencies(user_id);
create index if not exists idx_manual_grading_status on manual_grading_queue(status);
create index if not exists idx_certificate_status on certificates(revoked_at,expires_at);

alter table learner_competencies enable row level security;
drop policy if exists "learner reads own competency profile" on learner_competencies;
create policy "learner reads own competency profile" on learner_competencies for select using (auth.uid()=user_id);

alter table onboarding_enrollments enable row level security;
drop policy if exists "learner reads own onboarding" on onboarding_enrollments;
create policy "learner reads own onboarding" on onboarding_enrollments for select using (auth.uid()=user_id);
