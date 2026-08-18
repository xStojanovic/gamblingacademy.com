# V7 Changelog

## Deployment reliability

- Kept the Hostinger React object-rendering fix from V6.0.1.
- Added an AST-based JSX safety scanner that blocks map callback objects and dynamic indexed values from being rendered directly as React children.
- Normalized all findings discovered by the stricter scanner across public, learner, company and owner-admin components.
- Added catalogue render-safety validation for courses, learning paths, resources and Knowledge Hub data.
- Added full static internal-route audit.
- Added prebuild verification of the *installed* Next/React versions, not only package.json.
- Added automatic stale `.next` removal before each build.
- Added postbuild verification of `.next/BUILD_ID`, server output and static assets.
- Added runtime release fingerprint through `/build-info` and `/api/build-info`.
- Added Next.js instrumentation startup logging.
- Added global error, route error, loading and 404 boundaries.
- Added demo-safe browser guards to CSV export helpers.

## Owner Admin

- Added Deployments & Releases workspace.
- Added Hostinger configuration verification.
- Added release history architecture.
- Added platform release, deployment event and system incident database tables.
- Added searchable Owner Admin navigation.
- Updated System Health with current migration/security/deployment information.

## Public/product quality

- Added sitemap, robots and web manifest metadata routes.
- Added static generation for course, learning path, Knowledge Hub and glossary pages.
- Added skip navigation and stronger keyboard focus states.
- Improved public homepage copy and deployment-era MVP wording.
- Standardized OA brand marks.
- Hardened ResourceCard and generic AdminTable against object-valued display data.

## Dependencies

- Next.js: 15.5.21
- React: 19.2.6
- React DOM: 19.2.6
- Node: 22.x
- TypeScript validator: 5.8.3
