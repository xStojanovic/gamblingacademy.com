# OpsAcademy V6 — Sellable Beta

A modular professional learning SaaS with four connected workspaces:

- Public website
- Learner LMS
- Company Admin
- Owner Admin

V6 includes the Hostinger prerender hotfix for learning-path cards and is packaged for a full project replacement/re-upload.

## Runtime

- Node.js: **22.x**
- Next.js: **15.5.21 Maintenance LTS**
- React / React DOM: **19.2.6**

## Local run

```bash
npm install
npm run check:all
npm run dev
```

## Production build

```bash
npm install
npm run hostinger:build
npm run start
```

## Demo mode

For a frontend/demo deployment without external service credentials:

```env
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

Set `NEXT_PUBLIC_DEMO_MODE=false` only after Supabase/Auth environment variables are configured and migrations are applied.

## Core modules

Business logic lives under `/modules`, while `/app` route files should remain thin entry points.

V6 adds modular domains for cohorts, white-label academies, B2B sales, LMS interoperability and course quality.

See `docs/v6/MODULE_MAP.md` and `docs/v6/HOSTINGER_REUPLOAD.md`.
