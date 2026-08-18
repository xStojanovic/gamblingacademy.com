# V7 Full Re-upload Checklist

Use this checklist when replacing the existing GitHub repository.

## Repository

1. Remove the old project files from the repository working tree, except `.git` if working locally.
2. Extract the V7 ZIP so `package.json`, `app/`, `modules/`, `db/`, `scripts/` and `next.config.mjs` are at repository root.
3. Do **not** upload `node_modules/` or `.next/`.
4. Commit all V7 files to `main`.
5. Confirm `package.json` says:
   - version `0.7.0`
   - next `15.5.21`
   - react `19.2.6`
   - node `22.x`

## Hostinger

Use:

- Framework preset: Next.js
- Branch: main
- Node: 22.x
- Root: ./
- Build: npm run build
- Package manager: npm
- Output: .next
- Environment variables: none for demo

If Hostinger exposes a **clear build cache** option, use it for this first V7 deployment because earlier deployments used different dependency versions.

## Build log

Do not continue troubleshooting React if the preflight says the installed Next version is not `15.5.21`. That means Hostinger is using stale dependency state or a different source revision.

## Success verification

After deployment:

1. open `/`;
2. open `/dashboard/learning-paths`;
3. open `/build-info`;
4. open `/api/build-info`;
5. open `/admin/deployments`;
6. verify light and dark themes;
7. verify learner, company and owner-admin navigation.
