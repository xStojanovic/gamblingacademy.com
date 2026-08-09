create table if not exists courses (
  id uuid primary key default uuid_generate_v4(), slug text unique not null, title text not null,
  description text, level text, department text, language text default 'en', status text default 'draft',
  version text default '1.0', price_cents integer default 0, certificate_enabled boolean default true,
  seo jsonb default '{}'::jsonb, settings jsonb default '{}'::jsonb,
  published_at timestamptz, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists modules (
  id uuid primary key default uuid_generate_v4(), course_id uuid references courses(id) on delete cascade,
  title text not null, position integer not null default 0, status text default 'draft'
);
create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(), module_id uuid references modules(id) on delete cascade,
  title text not null, lesson_type text default 'text', content jsonb default '{}'::jsonb,
  duration_minutes integer default 0, position integer not null default 0, status text default 'draft',
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists learning_paths (
  id uuid primary key default uuid_generate_v4(), slug text unique not null, title text not null,
  description text, audience text, status text default 'draft', created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists learning_path_courses (
  learning_path_id uuid references learning_paths(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade, position integer not null default 0,
  required boolean default true, primary key(learning_path_id,course_id)
);
create table if not exists assessments (
  id uuid primary key default uuid_generate_v4(), course_id uuid references courses(id) on delete cascade,
  title text not null, passing_score integer default 80, max_attempts integer default 3,
  time_limit_minutes integer, randomize_questions boolean default true, status text default 'draft'
);
create table if not exists question_bank (
  id uuid primary key default uuid_generate_v4(), assessment_id uuid references assessments(id) on delete cascade,
  question_type text not null default 'single_choice', prompt text not null, options jsonb default '[]'::jsonb,
  correct_answer jsonb, explanation text, points integer default 1, sort_order integer default 0,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists content_versions (
  id uuid primary key default uuid_generate_v4(), entity_type text not null, entity_id uuid not null,
  version integer not null, snapshot jsonb not null, created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now(), unique(entity_type,entity_id,version)
);
create table if not exists course_reviews (
  id uuid primary key default uuid_generate_v4(), course_id uuid references courses(id) on delete cascade,
  reviewer_id uuid references profiles(id) on delete set null, status text default 'pending',
  notes text, reviewed_at timestamptz, created_at timestamptz default now()
);
