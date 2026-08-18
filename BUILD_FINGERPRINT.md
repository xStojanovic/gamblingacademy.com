# OpsAcademy V6.0.1 Hostinger Build Fingerprint

A correct deployment must print these values before `next build`:

- Release: OpsAcademy 0.6.1 / V6.0.1 Hostinger Hardening
- Next.js: 15.5.21
- React: 19.2.6
- Node: 22.x

If Hostinger reports Next.js 15.2.4, it is not compiling this project revision.

The build preflight intentionally fails before Next.js starts if the dependency or runtime fingerprint is wrong.
