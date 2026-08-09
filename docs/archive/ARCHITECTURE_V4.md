# GamingOps Academy V4 — Modular Architecture

## Principle

Route files render feature modules. They should not own business rules, persistence or provider-specific code.

```text
app/ route
   ↓
modules/<segment>/components
   ↓
modules/<segment>/services
   ↓
API route / provider adapter
   ↓
PostgreSQL / external service
```

## Segment boundaries

### Public
Owns acquisition pages, headers/footers, public course/resource cards and contact conversion UI. It may read learning catalogue data but must not contain learner/company/admin mutations.

### Learning
Owns reusable learning-domain structures: course catalogue, paths, curriculum model, assessment relationships and course repository behavior.

### Learner
Owns the student experience: course progress, assignments, goals, notifications, transcript, notes, saved resources, profile, AI tutor UI and learner settings.

### Company
Owns B2B customer operations: employees, teams, assignments, company academy, reports, skills matrix, people import, SSO/provisioning, billing surface and company settings.

### Admin
Owns GamingOps internal operations: courses, assessments, reviews, faculty, media, resources, knowledge, credentials, customers, plans, site CMS, SEO, branding, email, announcements, enterprise controls, API/webhooks, permissions, audit and health.

### Infrastructure/service modules
Auth, billing, credentials, notifications, analytics, AI, integrations and database access are deliberately separated so providers can change without rewriting screens.

## Application shell

`modules/shared/components/AppChrome.js` prevents public marketing navigation from appearing inside authenticated workspaces. Each workspace owns its own navigation while sharing design tokens, light/dark theme behavior and common components.

## Owner admin consolidation

`/admin` is the only source of truth for GamingOps owner operations. `/cms/*` exists only as backward-compatible redirects.

## Database strategy

V4 replaces the old monolithic forward schema with ordered domain migrations under `db/migrations`:

1. Identity/RBAC
2. Learning
3. Learner records
4. Company/enterprise
5. Content/CMS/media
6. Credentials
7. Billing
8. Communications/integrations
9. Operations
10. RLS/security policies
11. Runtime learner progress rollups

## Editing rule

When changing a feature, start in its module. Example:

- Change company billing UI → `modules/company` + `modules/billing`
- Change learner certificates → `modules/credentials` + `modules/learner`
- Change course builder → `modules/admin` + `modules/learning`
- Change navigation → `modules/shared/config/routes.js`
- Change localization → `modules/localization`
- Change auth/RBAC → `modules/auth` + RLS migration

Avoid adding generic components to `shared` unless at least two product segments truly use them.
