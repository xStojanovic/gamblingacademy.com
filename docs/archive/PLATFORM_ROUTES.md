# GamingOps Academy — Platform Routes

## Public website
- `/` — homepage
- `/courses` and `/course/[slug]`
- `/learning-paths` and `/learning-paths/[slug]`
- `/for-companies`
- `/company-academy`
- `/certifications` and `/certifications/verify`
- `/resources`
- `/knowledge` and `/knowledge/[slug]`
- `/glossary/[term]`
- `/experts`, `/about`, `/pricing`, `/contact`, `/login`

## Learner workspace
- `/dashboard` — overview
- `/dashboard/courses`
- `/dashboard/learning-paths`
- `/dashboard/assignments`
- `/dashboard/certificates`
- `/dashboard/resources`
- `/dashboard/notes`
- `/dashboard/tutor`
- `/dashboard/profile`
- `/dashboard/settings`
- `/learn/[slug]`
- `/assessment/[slug]`

## Company admin
- `/company` — overview
- `/company/employees`
- `/company/teams`
- `/company/assignments`
- `/company/academy`
- `/company/certificates`
- `/company/reports`
- `/company/integrations`
- `/company/billing`
- `/company/settings`

## Platform CMS
- `/cms` — overview
- `/cms/courses`
- `/cms/courses/[slug]` — course/lesson builder
- `/cms/learning-paths`
- `/cms/resources`
- `/cms/knowledge`
- `/cms/certificates`
- `/cms/company-content`
- `/cms/users`
- `/cms/settings`

## Demo persistence
The CMS, company administration actions, notes and theme preferences use browser localStorage in the standalone MVP runtime. The repository also includes a PostgreSQL/Supabase-ready schema under `lib/schema.sql` for the production persistence layer.
