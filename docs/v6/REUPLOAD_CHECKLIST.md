# Full Re-upload Checklist

- [ ] Back up current production environment variables.
- [ ] Remove old source files from the repository/project working copy.
- [ ] Copy all V6 files into repository root.
- [ ] Do not copy `node_modules` or `.next`.
- [ ] Commit and push V6 to `main`.
- [ ] Confirm GitHub Actions build passes.
- [ ] Set Hostinger to Node 22.
- [ ] Use `npm install && npm run hostinger:build` as build command.
- [ ] Use `npm run start` as start command.
- [ ] Keep `NEXT_PUBLIC_DEMO_MODE=true` until Supabase is configured.
- [ ] Clear Hostinger build cache from previous failed build.
- [ ] Redeploy the latest `main` commit.
- [ ] Open `/`, `/dashboard/learning-paths`, `/company`, and `/admin` after deployment.
- [ ] Confirm both light and dark themes work.
