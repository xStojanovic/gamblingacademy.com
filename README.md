# OpsAcademy V7 — Deployment Ready

V7 is the deployment-hardened modular release of the OpsAcademy professional learning platform.

The codebase is split by product domain so public website, learner LMS, company administration, owner administration, authoring, assessment, credentials, billing, AI, analytics, integrations and shared UI can evolve independently.

## Hostinger configuration

V7 is built specifically to work with the standard Hostinger Next.js settings:

- Framework preset: **Next.js**
- Branch: **main**
- Node version: **22.x**
- Root directory: **./**
- Build command: **npm run build**
- Package manager: **npm**
- Output directory: **.next**
- Environment variables: **none required for demo mode**

`npm run build` automatically executes the V7 prebuild safety suite before `next build`, and verifies the `.next` output afterward.

## Local commands

```bash
npm install
npm run check:all
npm run build
npm run start
```

## Deployment safety

The prebuild automatically:

1. verifies Node 22;
2. verifies both declared and actually installed Next/React versions;
3. removes stale `.next` output;
4. parses all JS/JSX source;
5. checks internal module imports;
6. scans for unsafe direct object rendering in JSX;
7. validates course/path/resource/article data used during prerendering;
8. audits static internal routes;
9. verifies V7 release assets.

If Hostinger reuses stale dependencies, the build now fails before Next.js prerendering with an explicit `STALE DEPENDENCY CACHE` message.

## Build diagnostics

After deployment open:

- `/build-info`
- `/api/build-info`
- Owner Admin → Platform → Deployments & Releases

The runtime should report:

- OpsAcademy `0.7.0`
- Next.js `15.5.21`
- React `19.2.6`
- Node `v22.x`

## Demo mode

Demo mode is enabled by default when `NEXT_PUBLIC_DEMO_MODE` is unset. This allows the complete product to build and run without external provider credentials.

Production services can later be activated independently using Supabase, Stripe, Resend, OpenAI, PostHog, Mux and CRM environment variables.

## Main workspaces

- `/` — Public website
- `/dashboard` — Learner LMS
- `/company` — Company Admin
- `/admin` — OpsAcademy Owner Admin

## Documentation

See `docs/v7/` for the deployment guide, release notes, implementation status and validation manifest.
