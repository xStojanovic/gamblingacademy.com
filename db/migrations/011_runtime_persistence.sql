-- Runtime persistence added in V4 to support fast learner dashboards without recomputing lesson rollups on every request.
create table if not exists course_progress (
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  progress_percent integer default 0 check (progress_percent between 0 and 100),
  completed_lessons integer default 0,
  updated_at timestamptz default now(),
  primary key(user_id,course_id)
);

alter table profiles add column if not exists preferences jsonb default '{}'::jsonb;

alter table course_progress enable row level security;
drop policy if exists "learner reads own course progress" on course_progress;
create policy "learner reads own course progress" on course_progress for select using (auth.uid()=user_id);
drop policy if exists "learner writes own course progress" on course_progress;
create policy "learner writes own course progress" on course_progress for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
