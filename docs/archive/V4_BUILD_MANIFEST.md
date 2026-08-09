# GamingOps Academy V4 Modular — Build Manifest

## Validation snapshot

- JS/JSX source files parsed: **223**
- Syntax errors: **0**
- Missing `@/` imports: **0**
- Missing configured navigation routes: **0**
- Static internal hrefs checked: **183**
- Unresolved static hrefs: **0**
- Routed pages: **102**
- API route handlers: **34**
- Feature module directories: **18**
- Ordered database migrations: **11**

## Build-environment limitation

The project source is validated using TypeScript's JSX parser and internal route/import checks. The current execution environment's private npm registry returns HTTP 404 for `next@15.2.4`, so dependency installation and a true `next build` cannot be completed in this environment. Run `npm install`, `npm run check:source` and `npm run build` in a normal npm, GitHub Actions or Vercel environment before production deployment.

## Important security change in V4

Production role authorization is resolved from the authenticated `profiles` record. Company/owner access is not granted from the role value submitted by the login form and server authorization no longer treats a role cookie as authoritative.

## Demo versus production

`NEXT_PUBLIC_DEMO_MODE=true` keeps all workspaces usable without external credentials. When demo mode is disabled, server repositories and provider adapters become the persistence/authorization path where implemented.
