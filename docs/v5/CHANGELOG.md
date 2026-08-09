# OpsAcademy V5 Production Core — Changelog

## Architecture
- Converted the platform to a domain-module-first structure.
- Added authoring, competencies, onboarding, reporting and permissions domains.
- Consolidated legacy owner CMS behavior under `/admin`.

## Authoring & assessment
- Added block-based course authoring and learner runtime rendering.
- Added prerequisites, release delays, completion rules, course version/review controls.
- Added question pools, advanced assessment settings and manual-grading architecture.

## Skills & onboarding
- Added competencies, role profiles and learner readiness scoring.
- Added owner/company/learner onboarding-program surfaces.
- Added 30/60/90-day program architecture in the data model.

## Credentials
- Added credential-template management, OA credential IDs, PDF endpoint, public verification and revocation lifecycle.

## Company & customer success
- Added company account health, renewal risk, success owner, next review, account notes and support case context.
- Added owner-wide Company Academies overview.
- Added stronger subscription/entitlement and learning-health controls.

## Admin operations
- Added saved views and bulk actions.
- Added bulk learner activation/suspension and credential lifecycle controls.
- Added revenue and renewals workspace.
- Added more granular roles/permissions definitions.

## Security
- Production roles now resolve from the authenticated database profile.
- Removed reliance on a production role cookie as an authorization source.
- Added organization scoping to onboarding enrollment updates.
- Added V5 RLS hardening policies for newly introduced tables.
- Changed new application/session naming from legacy GO keys toward OA keys.

## Brand/domain neutrality
- Replaced previous industry-specific course/content seed data with general operations, product, risk, customer service and leadership education.
- Renamed platform-facing credential/API identifiers to OA/OpsAcademy.
