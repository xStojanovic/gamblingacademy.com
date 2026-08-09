-- Enable RLS. Policies assume Supabase auth.uid() is available.
alter table profiles enable row level security;
alter table enrollments enable row level security;
alter table lesson_progress enable row level security;
alter table assessment_attempts enable row level security;
alter table learner_notes enable row level security;
alter table learner_goals enable row level security;
alter table learner_notifications enable row level security;
alter table transcript_events enable row level security;
alter table companies enable row level security;
alter table company_users enable row level security;
alter table teams enable row level security;
alter table assignments enable row level security;
alter table company_modules enable row level security;

create or replace function public.is_company_admin(target_company uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from company_users cu where cu.company_id=target_company and cu.user_id=auth.uid() and cu.company_role in ('admin','manager'));
$$;
create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from admin_role_assignments ara join admin_roles ar on ar.id=ara.role_id where ara.user_id=auth.uid());
$$;

create policy "profile self read" on profiles for select using (id=auth.uid() or public.is_platform_admin());
create policy "profile self update" on profiles for update using (id=auth.uid() or public.is_platform_admin());
create policy "learner own enrollments" on enrollments for all using (user_id=auth.uid() or public.is_platform_admin());
create policy "learner own progress" on lesson_progress for all using (user_id=auth.uid() or public.is_platform_admin());
create policy "learner own attempts" on assessment_attempts for select using (user_id=auth.uid() or public.is_platform_admin());
create policy "learner own notes" on learner_notes for all using (user_id=auth.uid() or public.is_platform_admin());
create policy "learner own goals" on learner_goals for all using (user_id=auth.uid() or public.is_platform_admin());
create policy "learner own notifications" on learner_notifications for all using (user_id=auth.uid() or public.is_platform_admin());
create policy "learner own transcript" on transcript_events for select using (user_id=auth.uid() or public.is_platform_admin());
create policy "company members read company" on companies for select using (exists(select 1 from company_users cu where cu.company_id=id and cu.user_id=auth.uid()) or public.is_platform_admin());
create policy "company admin manages teams" on teams for all using (public.is_company_admin(company_id) or public.is_platform_admin());
create policy "company admin manages assignments" on assignments for all using (public.is_company_admin(company_id) or public.is_platform_admin());
create policy "company admin manages modules" on company_modules for all using (public.is_company_admin(company_id) or public.is_platform_admin());
