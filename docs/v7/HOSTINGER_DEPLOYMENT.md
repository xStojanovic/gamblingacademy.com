# Hostinger Deployment — V7

## Use these exact settings

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Branch | main |
| Node version | 22.x |
| Root directory | ./ |
| Build command | npm run build |
| Package manager | npm |
| Output directory | .next |
| Environment variables | None required for demo build |

No custom `hostinger:build` command is required in V7.

## Why plain `npm run build` is enough

npm automatically runs the `prebuild` script before `build` and `postbuild` after it. V7 uses these lifecycle hooks to validate the release without changing Hostinger's build command.

Expected sequence:

```text
npm install
  ↓
npm run build
  ↓
prebuild-v7.cjs
  ↓
source / JSX / catalog / route / version checks
  ↓
next build
  ↓
postbuild-v7.cjs
  ↓
.next output verification
```

## Expected prebuild fingerprint

The Hostinger log should include:

```text
OPSACADEMY V7 — HOSTINGER BUILD PREFLIGHT
Release: opsacademy-platform-v7 0.7.0
Node: v22.x
Next: declared=15.5.21 installed=15.5.21
React: declared=19.2.6 installed=19.2.6
Root: ./
Build: npm run build
Output: .next
```

If the log says `installed Next.js is 15.2.4` or any version other than `15.5.21`, clear the Hostinger build cache and redeploy. V7 intentionally stops at this point rather than continuing into a misleading React prerender error.

## After deployment

Open:

```text
https://YOUR-DOMAIN/build-info
https://YOUR-DOMAIN/api/build-info
```

The page/API should identify release `0.7.0`.

## Demo deployment

You do not need to add any environment variables for the first successful build.

When external services are ready, follow `.env.example` and set `NEXT_PUBLIC_DEMO_MODE=false` only after Supabase authentication/database variables are correctly configured.
