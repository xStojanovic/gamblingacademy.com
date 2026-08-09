create table if not exists enrollments (
  user_id uuid references profiles(id) on delete cascade, course_id uuid references courses(id) on delete cascade,
  enrolled_at timestamptz default now(), completed_at timestamptz, primary key(user_id,course_id)
);
create table if not exists lesson_progress (
  user_id uuid references profiles(id) on delete cascade, lesson_id uuid references lessons(id) on delete cascade,
  completed boolean default false, completed_at timestamptz, primary key(user_id,lesson_id)
);
create table if not exists assessment_attempts (
  id uuid primary key default uuid_generate_v4(), assessment_id uuid references assessments(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade, score integer not null, passed boolean not null,
  answers jsonb default '[]'::jsonb, created_at timestamptz default now()
);
create table if not exists learner_notes (
  id uuid primary key default uuid_generate_v4(), user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete set null, lesson_id uuid references lessons(id) on delete set null,
  title text, body text not null, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists learner_goals (
  id uuid primary key default uuid_generate_v4(), user_id uuid references profiles(id) on delete cascade,
  title text not null, target_date date, progress integer default 0, status text default 'planned',
  created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists learner_notifications (
  id uuid primary key default uuid_generate_v4(), user_id uuid references profiles(id) on delete cascade,
  notification_type text, title text not null, body text, read_at timestamptz, metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
create table if not exists transcript_events (
  id uuid primary key default uuid_generate_v4(), user_id uuid references profiles(id) on delete cascade,
  item_type text not null, item_id text, title text not null, result text, learning_hours numeric(8,2) default 0,
  completed_at timestamptz default now(), metadata jsonb default '{}'::jsonb
);
