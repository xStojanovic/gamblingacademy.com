# OpsAcademy V5 — Implementation Status

## Release objective

V5 Production Core focuses on making the existing platform operable as a real learning SaaS rather than expanding page count for its own sake.

## Built in the codebase

### Architecture
- 23 domain modules with thin App Router entry points.
- Four isolated application shells: public, learner, company and owner admin.
- Light and dark theme system shared across all workspaces.
- Shared locale preference infrastructure for EN/SR/ES/PT.

### Learning and authoring
- 12 domain-neutral course structures and five learning paths.
- Course Studio with overview, curriculum, assessment, pricing/access, completion/drip, SEO, review/version and settings tabs.
- Reusable lesson blocks: text, heading, callout, video, image, download, scenario and knowledge check.
- Lesson prerequisites, required/optional state, release delays, duplication and ordering.
- Public learner runtime can consume authored course blocks through the course API.

### Assessments
- Assessment metadata, attempts, passing score, time limit, cooldown and randomization.
- Question pools and draw counts.
- Single choice, multiple choice, true/false, scenario and open-response question types.
- Difficulty, points, explanations and manual-grading architecture.

### Learner
- Course progress, learning paths, assignments, onboarding, skills/readiness, goals, transcript, credentials, saved resources, notes, notifications, tutor, career, profile and settings.
- Production API/repository boundaries for progress, notes, resources, goals/profile and skills where configured.

### Company
- Employees, secure invitation flow, teams, assignments, onboarding, private Company Academy, credentials, reports, skills matrix, people import, SSO/provisioning, integrations, billing/seats and settings.
- Company onboarding and private modules have server persistence paths.
- CSV report/export and people-import architecture.

### Owner Admin
- Dashboard, analytics, revenue/renewals and live activity.
- Course, assessment, competency, onboarding, review, resource, media, knowledge, credential and faculty management.
- Companies, Company Academies, learners, plans, support and customer-success account management.
- Pages/navigation, SEO, branding/themes, email, announcements.
- Enterprise controls, imports, API keys and webhooks.
- Integrations, feature flags, granular role definitions, audit, backups/export, health and platform settings.
- Saved table views and bulk actions for key registries.

### Credentials
- Credential templates.
- Issuance API.
- Public verification.
- PDF endpoint.
- Expiry/revocation data model and owner revocation endpoint.
- Credential-event audit architecture.

### Production infrastructure
- Supabase REST adapter and ordered domain migrations.
- Production role resolution from database profile; privileged roles are not trusted from client login input.
- Stripe checkout/portal/webhook adapter.
- Resend transactional email adapter.
- PostHog event adapter.
- Grounded tutor service adapter with local reviewed-content fallback.
- Private media upload/signing architecture.
- RLS/security hardening through migration 013.

## Demo-persistent / partially wired

The owner admin still uses browser-side demo state for many management screens so the platform can be evaluated without external credentials. Several owner actions also have server endpoints but are not yet connected to every UI mutation. Plan-entitlement editing and some advanced customer-success actions are currently demo-persistent.

## Requires external activation

- Supabase project, database, Auth and Storage
- Stripe products/prices, webhook secret and live/test configuration
- Resend account and verified sender
- OpenAI API credentials and indexed reviewed content for full retrieval
- PostHog project
- Optional Mux/video provider
- Optional HubSpot/CRM
- Real customer SAML/OIDC/SCIM configuration

## Production launch blockers

Before handling real customers:
1. Run `npm run build` in normal CI/npm infrastructure.
2. Apply and test all 13 migrations against a clean Supabase project.
3. Run role/RLS tests for learner, company admin and owner admin.
4. Add automated API/integration tests.
5. Add error monitoring and structured server logging.
6. Test Stripe lifecycle edge cases and webhook replay/idempotency.
7. Test invitation abuse/expiry/rate limits.
8. Finish accessibility and browser/mobile QA.
9. Define privacy, retention, backup and incident-response procedures.
10. Run a security review before production data is accepted.
