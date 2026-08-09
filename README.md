# OpsAcademy — V5 Production Core

OpsAcademy is a modular professional learning SaaS for individual learners and company training. V5 moves the project from a broad product prototype toward a sellable beta architecture: modular feature domains, production persistence boundaries, advanced authoring and assessment, company onboarding, competency frameworks, governed credentials, billing/integration adapters, customer-success controls and security hardening.

## Application surfaces

- `/` — public website and acquisition
- `/dashboard` — learner LMS
- `/company` — customer company administration
- `/admin` — OpsAcademy platform-owner administration

Legacy `/cms/*` routes redirect to the owner admin so `/admin` remains the single control surface.

## Modular code structure

Business logic lives under `modules/`, not route files. V5 has 23 feature domains including authoring, learning, learner, company, competencies, onboarding, credentials, billing, reporting, permissions and owner administration.

See `docs/v5/MODULE_MAP.md`.

## V5 highlights

- Advanced Course Studio with reusable lesson blocks, prerequisites, completion rules, drip scheduling and review/versioning
- Assessment Studio with question pools, difficulty, weighted scoring, cooldowns and manual-grading architecture
- Competency and role-readiness framework
- Company 30/60/90-day onboarding programs
- Company Academy and customer-account operations
- Credential templates, public verification, PDF generation and revocation lifecycle
- Learner progress, goals, notes, saved resources, transcript and skills persistence boundaries
- Bulk admin actions and saved views
- Revenue/renewal and company reporting surfaces
- Stripe, Resend, Supabase, PostHog, OpenAI and media-service adapters
- Production role resolution from authenticated database profiles
- V5 RLS/security hardening migrations
- First-class light and dark themes across all four workspaces
- EN/SR/ES/PT shared-interface localization infrastructure

## Local demo

```bash
cp .env.example .env.local
npm install
npm run dev
```

`NEXT_PUBLIC_DEMO_MODE=true` keeps the platform usable without external providers. Demo state is stored locally where appropriate.

## Production activation

1. Set `NEXT_PUBLIC_DEMO_MODE=false`.
2. Configure Supabase and apply all migrations in `db/migrations` in numeric order.
3. Configure Stripe, Resend, PostHog and other providers as required.
4. Test learner, company-admin and owner-admin authorization separately.
5. Run the production launch checklist in `docs/v5/PRODUCTION_SETUP.md`.

## Validation

```bash
npm run check:source
npm run build
```

The packaged V5 source passes the custom source validator for syntax, `@/` imports and configured navigation routes. A real Next.js build must still be run in a normal npm/CI environment before deployment.

## Documentation

- `docs/v5/IMPLEMENTATION_STATUS.md`
- `docs/v5/BUILD_MANIFEST.md`
- `docs/v5/MODULE_MAP.md`
- `docs/v5/ROUTE_MAP.md`
- `docs/v5/PRODUCTION_SETUP.md`
- `docs/v5/CHANGELOG.md`

Older V2–V4 project notes are retained under `docs/archive/` for history only.
