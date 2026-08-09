-- V5 security hardening for newly introduced production-core tables.
-- Server APIs also scope every service-role query; RLS is defense in depth.

alter table learner_competencies enable row level security;
alter table onboarding_programs enable row level security;
alter table onboarding_steps enable row level security;
alter table onboarding_enrollments enable row level security;
alter table saved_admin_views enable row level security;
alter table admin_account_notes enable row level security;
alter table manual_grading_queue enable row level security;
alter table credential_templates enable row level security;
alter table certificate_events enable row level security;
alter table entitlement_rules enable row level security;
alter table payment_events enable row level security;

drop policy if exists "learner manages own competency profile" on learner_competencies;
create policy "learner manages own competency profile" on learner_competencies for all
  using (auth.uid()=user_id or public.is_platform_admin())
  with check (auth.uid()=user_id or public.is_platform_admin());

drop policy if exists "company admins read onboarding programs" on onboarding_programs;
create policy "company admins read onboarding programs" on onboarding_programs for select
  using (public.is_company_admin(company_id) or public.is_platform_admin());
drop policy if exists "company admins manage onboarding programs" on onboarding_programs;
create policy "company admins manage onboarding programs" on onboarding_programs for all
  using (public.is_company_admin(company_id) or public.is_platform_admin())
  with check (public.is_company_admin(company_id) or public.is_platform_admin());

drop policy if exists "company admins manage onboarding steps" on onboarding_steps;
create policy "company admins manage onboarding steps" on onboarding_steps for all
  using (exists(select 1 from onboarding_programs p where p.id=program_id and (public.is_company_admin(p.company_id) or public.is_platform_admin())))
  with check (exists(select 1 from onboarding_programs p where p.id=program_id and (public.is_company_admin(p.company_id) or public.is_platform_admin())));

drop policy if exists "learner or company admin reads onboarding enrollment" on onboarding_enrollments;
create policy "learner or company admin reads onboarding enrollment" on onboarding_enrollments for select
  using (auth.uid()=user_id or public.is_platform_admin() or exists(select 1 from onboarding_programs p where p.id=program_id and public.is_company_admin(p.company_id)));
drop policy if exists "company admin manages onboarding enrollment" on onboarding_enrollments;
create policy "company admin manages onboarding enrollment" on onboarding_enrollments for update
  using (public.is_platform_admin() or exists(select 1 from onboarding_programs p where p.id=program_id and public.is_company_admin(p.company_id)))
  with check (public.is_platform_admin() or exists(select 1 from onboarding_programs p where p.id=program_id and public.is_company_admin(p.company_id)));

drop policy if exists "admin owns saved views" on saved_admin_views;
create policy "admin owns saved views" on saved_admin_views for all
  using (auth.uid()=user_id and public.is_platform_admin())
  with check (auth.uid()=user_id and public.is_platform_admin());

drop policy if exists "platform admins manage account notes" on admin_account_notes;
create policy "platform admins manage account notes" on admin_account_notes for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());

drop policy if exists "platform admins manage grading queue" on manual_grading_queue;
create policy "platform admins manage grading queue" on manual_grading_queue for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());

drop policy if exists "public reads active credential templates" on credential_templates;
create policy "public reads active credential templates" on credential_templates for select using (status='active' or public.is_platform_admin());
drop policy if exists "platform admins manage credential templates" on credential_templates;
create policy "platform admins manage credential templates" on credential_templates for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());

drop policy if exists "platform admins read credential events" on certificate_events;
create policy "platform admins read credential events" on certificate_events for select using (public.is_platform_admin());
drop policy if exists "platform admins create credential events" on certificate_events;
create policy "platform admins create credential events" on certificate_events for insert with check (public.is_platform_admin());

drop policy if exists "platform admins manage entitlements" on entitlement_rules;
create policy "platform admins manage entitlements" on entitlement_rules for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());

drop policy if exists "platform admins read payment events" on payment_events;
create policy "platform admins read payment events" on payment_events for select using (public.is_platform_admin());
