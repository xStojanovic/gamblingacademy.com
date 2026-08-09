# Changelog — V4 Modular

## Architecture
- Reorganized platform into feature-domain modules.
- Centralized public, learner, company and owner-admin navigation.
- Added `AppChrome` to isolate workspace navigation from public marketing chrome.
- Consolidated legacy `/cms` into `/admin` redirects.
- Replaced monolithic forward DB schema with ordered domain migrations.

## Production foundations
- Added environment readiness layer.
- Added Supabase REST repository adapter.
- Added production auth/session/role enforcement and middleware.
- Fixed role security so production privileges come from DB profiles, never login-form selection.
- Added server persistence paths for learner progress, goals, profile, resources, notes and notifications.
- Added server company context and endpoints for teams, assignments, modules, settings and SSO.
- Added secure expiring company invitations and acceptance flow.
- Added private media upload + signed access endpoints.

## Owner admin
- Added review queue, media library, localization, support operations, announcements, enterprise controls, data imports, API keys, webhooks, backups, live activity, integrations/system health, community moderation and jobs.
- Extended course builder with versions/review state and production save/publish adapters.
- Added assessment question-bank controls and company detail workspaces.

## Learner
- Added development goals, transcript, notifications, profile persistence, notes persistence and saved-resource persistence.
- Improved AI tutor to call a grounded service route and display sources/mode.
- Connected successful assessments to credential issuance.
- Added public credential pages.
- Added community/career areas.

## Company
- Added skills matrix, CSV employee import, CSV report export and SSO/provisioning settings.
- Added private Company Academy module editor.
- Improved employee invitation flow and status visibility.
- Added production company-state hydration path.

## Commercial/platform
- Added billing checkout/portal/webhook adapters.
- Added transactional email adapter.
- Added analytics adapter.
- Added localization infrastructure for EN/SR/ES/PT shared UI.

## Design
- Light and dark themes remain first-class across all four application surfaces.
- Mobile navigation remains available across public, learner, company and owner-admin sections.
