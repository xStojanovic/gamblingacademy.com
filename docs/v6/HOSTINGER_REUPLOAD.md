# Hostinger Full Re-upload — V6

This package is designed to replace the previous repository/application contents.

## 1. Replace the old project

Back up `.env` values first. Then replace the old project source with the contents of this V6 folder.

Do not upload old build artifacts:

- `node_modules/`
- `.next/`
- old ZIP files

## 2. Hostinger Node version

Use **Node.js 22**.

The project contains:

```json
"engines": { "node": "22.x" }
```

## 3. Build settings

Install/build:

```bash
npm install && npm run hostinger:build
```

Start:

```bash
npm run start
```

## 4. Demo environment

```env
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_APP_URL=https://YOUR-DOMAIN
```

The app will run without Supabase, Stripe, Resend, OpenAI, Mux or HubSpot while demo mode is enabled.

## 5. Known prerender issue fixed

The older repository rendered learning-path course objects directly inside React JSX. V6 normalizes each course object and renders `course.title`, so `/` and `/dashboard/learning-paths` no longer contain the previously identified object-as-child defect.

## 6. Clean build

If Hostinger caches the previous deployment, clear the build/application cache before deploying V6.

## 7. GitHub

The package includes `.github/workflows/ci.yml`. After pushing V6 to GitHub, every push/PR to `main` will install dependencies, run modular source validation and execute a production Next.js build.
