# OpsAcademy V5 Module Map

V5 contains **23 top-level feature modules**. Route files under `app/` should remain thin and delegate business behavior to these modules.

- `modules/admin` — platform-owner operations, content, customers and configuration.
- `modules/ai` — grounded learning-assistant services.
- `modules/analytics` — product and learning event tracking.
- `modules/auth` — login, sessions and server-side role enforcement.
- `modules/authoring` — course/lesson block authoring and transforms.
- `modules/billing` — plans, entitlements and payment provider adapters.
- `modules/career` — career-development and skills surfaces.
- `modules/community` — professional community and moderation.
- `modules/company` — B2B customer administration and repositories.
- `modules/competencies` — skills framework, role profiles and readiness.
- `modules/credentials` — credential templates, issuance, verification and lifecycle.
- `modules/enterprise` — imports, exports and enterprise utilities.
- `modules/infrastructure` — environment and database service adapters.
- `modules/integrations` — provider integration helpers.
- `modules/learner` — learner workspace, progress and personal records.
- `modules/learning` — course catalogue, learning paths and public runtime.
- `modules/localization` — locale preferences and translation coverage.
- `modules/notifications` — transactional email and notification adapters.
- `modules/onboarding` — 30/60/90-day onboarding program architecture.
- `modules/permissions` — granular role/permission definitions.
- `modules/public` — marketing and acquisition surfaces.
- `modules/reporting` — company reports and owner commercial analytics.
- `modules/shared` — design system, navigation and application shell.

## Change rule

When adding or changing a feature, edit its domain module first. Add only thin route wiring under `app/`. Shared visual primitives belong in `modules/shared`; do not place domain-specific logic there.