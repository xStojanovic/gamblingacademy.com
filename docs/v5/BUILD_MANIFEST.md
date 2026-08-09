# OpsAcademy V5 — Build Manifest

## Release
- Product: OpsAcademy
- Version: 0.5.0
- Release label: V5 Production Core
- Date: 2026-08-09

## Source inventory
- 23 feature modules
- 110 routed pages
- 45 API route handlers
- 13 ordered SQL migrations
- 263 JS/JSX files parsed by source validator

## Validation result
- Syntax errors: 0
- Missing `@/` imports: 0
- Missing configured navigation routes: 0
- Static internal-link validation performed separately before packaging

## Key production domains
- Auth / role enforcement
- Learning / authoring / assessments
- Learner records
- Company administration / onboarding
- Competencies / role readiness
- Credentials
- Billing / entitlements
- Notifications
- Analytics
- AI tutor
- Enterprise integrations
- Owner operations / customer success

## Build limitation
The current execution environment does not provide a working installation of the configured Next.js package through its private npm registry. Source-level validation is complete, but `npm run build` must be executed in a normal npm, GitHub Actions or Vercel environment before production deployment.
