# V7 Validation Report

Release: **OpsAcademy 0.7.0 — V7 Deployment Ready**

## Target Hostinger configuration

- Framework preset: Next.js
- Branch: main
- Node.js: 22.x
- Root directory: ./
- Build command: npm run build
- Package manager: npm
- Output directory: .next
- Environment variables: none required for demo-mode compilation

## Source and deployment safety validation

`npm run check:all` completed successfully.

- JS/JSX source files parsed by source validator: 302
- Syntax errors: 0
- Missing `@/` imports: 0
- Missing configured routes: 0
- Unsafe direct-object JSX render patterns: 0
- Courses validated: 12
- Learning paths validated: 5
- Resources validated: 20
- Knowledge articles validated: 12
- Catalog render-safety issues: 0
- Static internal links audited: 208
- Unresolved static internal routes: 0
- V7 required assets checked: 21
- V7 validation issues: 0

## Platform inventory

- Routed pages: 122
- API route handlers: 55
- Modular feature domains: 28
- Ordered database migrations: 15

## Build protections

`npm run build` automatically runs `prebuild` before Next.js and `postbuild` after a successful build.

The V7 prebuild:

1. verifies Node 22.x;
2. verifies the declared dependency versions;
3. verifies the versions actually installed by Hostinger;
4. fails with an explicit stale-cache error if Hostinger installs an old Next/React version;
5. deletes any old `.next` output;
6. runs source/import validation;
7. scans for raw-object JSX rendering patterns;
8. validates public catalog data;
9. audits internal routes;
10. validates required V7 release assets.

The V7 postbuild verifies that the generated `.next` directory contains the expected Next.js production build artifacts and writes a build fingerprint into `.next/OPSACADEMY_BUILD_INFO.json`.

## Important limitation of this QA environment

A full `next build` could not be executed inside the artifact-generation environment because the runtime does not have the npm dependencies installed and package installation is not reliably available here. The source and deployment-safety suites above pass. The actual framework build must therefore be completed by Hostinger or CI after `npm install`.

V7 is intentionally designed to fail early with a precise dependency/cache message if Hostinger is compiling an old dependency set rather than the uploaded project.
