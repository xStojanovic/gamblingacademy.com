-- V6 Sellable Beta: cohorts, scheduled reporting, white-labeling, sales pipeline,
-- LMS interoperability and automated course quality controls.

create table if not exists cohorts (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  audience text,
  capacity integer default 25,
  status text default 'scheduled',
  starts_at timestamptz,
  ends_at timestamptz,
  instructor_id uuid references profiles(id) on delete set null,
  settings jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists cohort_members (
  cohort_id uuid references cohorts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  enrollment_status text default 'active',
  progress numeric default 0,
  joined_at timestamptz default now(),
  completed_at timestamptz,
  primary key(cohort_id,user_id)
);
create table if not exists live_sessions (
  id uuid primary key default uuid_generate_v4(),
  cohort_id uuid references cohorts(id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  duration_minutes integer default 60,
  meeting_url text,
  provider text,
  recording_url text,
  attendance_required boolean default true,
  created_at timestamptz default now()
);
create table if not exists scheduled_reports (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  owner_user_id uuid references profiles(id) on delete set null,
  name text not null,
  report_type text not null,
  recipients jsonb default '[]'::jsonb,
  cadence text not null,
  format text default 'pdf_csv',
  filters jsonb default '{}'::jsonb,
  enabled boolean default true,
  next_run_at timestamptz,
  last_run_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists white_label_configs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade unique,
  academy_name text,
  custom_domain text unique,
  primary_color text,
  secondary_color text,
  logo_asset_id uuid references media_assets(id) on delete set null,
  support_email text,
  default_theme text default 'system',
  hide_powered_by boolean default false,
  login_message text,
  dns_status text default 'pending',
  ssl_status text default 'pending',
  settings jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists sales_opportunities (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete set null,
  company_name text not null,
  owner_user_id uuid references profiles(id) on delete set null,
  stage text default 'lead',
  annual_value numeric default 0,
  probability numeric default 0,
  source text,
  next_step text,
  next_step_at timestamptz,
  notes text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists interoperability_packages (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  standard text not null,
  version text,
  status text default 'queued',
  storage_path text,
  checksum text,
  exported_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now(),
  completed_at timestamptz
);
create table if not exists interoperability_connections (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  protocol text not null,
  endpoint text,
  enabled boolean default false,
  config jsonb default '{}'::jsonb,
  last_test_at timestamptz,
  last_test_status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists course_quality_checks (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade,
  check_type text not null,
  score numeric,
  severity text,
  issue_count integer default 0,
  findings jsonb default '[]'::jsonb,
  checked_at timestamptz default now(),
  checked_by uuid references profiles(id) on delete set null
);

alter table cohorts enable row level security;
alter table cohort_members enable row level security;
alter table live_sessions enable row level security;
alter table scheduled_reports enable row level security;
alter table white_label_configs enable row level security;
alter table sales_opportunities enable row level security;
alter table interoperability_packages enable row level security;
alter table interoperability_connections enable row level security;
alter table course_quality_checks enable row level security;

create policy "company admins manage cohorts" on cohorts for all
  using (public.is_platform_admin() or public.is_company_admin(company_id))
  with check (public.is_platform_admin() or public.is_company_admin(company_id));
create policy "learners read joined cohorts" on cohorts for select
  using (public.is_platform_admin() or exists(select 1 from cohort_members cm where cm.cohort_id=id and cm.user_id=auth.uid()) or public.is_company_admin(company_id));
create policy "cohort members read own enrollment" on cohort_members for select
  using (auth.uid()=user_id or public.is_platform_admin() or exists(select 1 from cohorts c where c.id=cohort_id and public.is_company_admin(c.company_id)));
create policy "company admins manage cohort membership" on cohort_members for all
  using (public.is_platform_admin() or exists(select 1 from cohorts c where c.id=cohort_id and public.is_company_admin(c.company_id)))
  with check (public.is_platform_admin() or exists(select 1 from cohorts c where c.id=cohort_id and public.is_company_admin(c.company_id)));
create policy "cohort users read sessions" on live_sessions for select
  using (public.is_platform_admin() or exists(select 1 from cohorts c where c.id=cohort_id and (public.is_company_admin(c.company_id) or exists(select 1 from cohort_members cm where cm.cohort_id=c.id and cm.user_id=auth.uid()))));
create policy "company admins manage sessions" on live_sessions for all
  using (public.is_platform_admin() or exists(select 1 from cohorts c where c.id=cohort_id and public.is_company_admin(c.company_id)))
  with check (public.is_platform_admin() or exists(select 1 from cohorts c where c.id=cohort_id and public.is_company_admin(c.company_id)));
create policy "company admins manage scheduled reports" on scheduled_reports for all
  using (public.is_platform_admin() or public.is_company_admin(company_id))
  with check (public.is_platform_admin() or public.is_company_admin(company_id));
create policy "company admins manage white label" on white_label_configs for all
  using (public.is_platform_admin() or public.is_company_admin(company_id))
  with check (public.is_platform_admin() or public.is_company_admin(company_id));
create policy "platform admins manage sales pipeline" on sales_opportunities for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "company admins read package exports" on interoperability_packages for select
  using (public.is_platform_admin() or public.is_company_admin(company_id));
create policy "platform admins manage package exports" on interoperability_packages for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "company admins manage interoperability" on interoperability_connections for all
  using (public.is_platform_admin() or public.is_company_admin(company_id))
  with check (public.is_platform_admin() or public.is_company_admin(company_id));
create policy "platform admins manage course quality" on course_quality_checks for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());
