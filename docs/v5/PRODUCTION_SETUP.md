# OpsAcademy V5 — Production Activation Guide

## 1. Database and authentication

Create a Supabase project and configure:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Apply every file in `db/migrations` from `001` through `013` in order.

Production user roles are resolved from `profiles.role`. Supported top-level workspace roles are:

- `learner`
- `company_admin`
- `academy_admin`

The role buttons shown in demo login do not grant production privileges. Middleware and server APIs resolve the authenticated profile instead.

## 2. Security tests

Test with three separate accounts. Verify that:

- learners cannot reach company or owner endpoints;
- company admins can only mutate data for their own organization;
- owner admins can access owner operations;
- invitation tokens expire and cannot be reused;
- private media URLs require authenticated signing;
- revocation and sensitive admin actions create audit events.

Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

## 3. Media and video

Create a private Supabase Storage bucket matching `SUPABASE_MEDIA_BUCKET` (default `academy-media`). Owner uploads use `/api/admin/media/upload`; authenticated access can use `/api/media/sign`.

For large-scale video delivery, configure Mux or another dedicated video provider.

## 4. Billing

Configure:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PROFESSIONAL`
- `STRIPE_PRICE_TEAM`
- `STRIPE_PRICE_BUSINESS`
- `STRIPE_PRICE_SCALE`

Point the Stripe webhook to `/api/billing/webhook`. Validate webhook signatures, idempotency, failed-payment handling, upgrades/downgrades and seat changes in test mode before live activation.

## 5. Email

Configure `RESEND_API_KEY` and a verified `EMAIL_FROM`. Test employee invitations, assignments, reminders and credential delivery.

## 6. AI tutor

Configure `OPENAI_API_KEY` and `OPENAI_TUTOR_MODEL`. Before production, index approved lesson content into a retrieval layer and require source attribution. Keep unreviewed/generated material out of the authoritative knowledge corpus.

## 7. Analytics and observability

Configure PostHog. Before launch also add server error monitoring, request correlation IDs and structured logs. Keep sensitive learner/customer data out of analytics payloads unless explicitly required and covered by policy.

## 8. Enterprise identity

SSO/SCIM configuration is customer-specific. Validate each customer domain, metadata/issuer, callback configuration and provisioning behavior. Use least-privilege defaults.

## 9. Release gate

```bash
npm install
npm run check:source
npm run build
```

Then run:

1. clean-database migration test;
2. auth and RLS integration suite;
3. billing lifecycle suite;
4. invitation and account-provisioning suite;
5. course authoring → publish → learner delivery test;
6. assessment → pass/fail → credential lifecycle test;
7. company assignment/onboarding/report flow;
8. light/dark theme QA;
9. accessibility and responsive QA;
10. backup/restore and incident-response drill.
