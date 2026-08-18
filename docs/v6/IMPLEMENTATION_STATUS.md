# V6 Implementation Status

## Built in the product UI
- Public website in light/dark mode.
- Learner LMS and learning experience.
- Company Admin.
- Owner Admin/CMS.
- Modular course studio and assessment studio.
- Skills/role readiness.
- 30/60/90 onboarding.
- Credential lifecycle surfaces.
- Billing, email, AI, analytics and integration adapters.
- Company Academies.
- Enterprise SSO/provisioning controls.
- Cohorts/live learning (V6).
- White-label academy controls (V6).
- Scheduled reports (V6).
- B2B sales pipeline (V6).
- LMS interoperability workspace (V6).
- Course quality center (V6).

## Database-ready
Supabase/PostgreSQL migrations cover identity, learning, learners, companies, content, credentials, billing, communications, operations, production-core persistence and V6 enterprise systems.

## Requires external activation
- Real Supabase project and migrated schema.
- Stripe account/products/prices.
- Resend sender/domain.
- OpenAI key + production retrieval index.
- Mux or chosen video provider.
- PostHog project.
- HubSpot/CRM credentials if required.
- Customer SSO metadata.
- DNS configuration for white-label domains.
- Production SCORM/xAPI/LTI package generation service beyond current architecture/demo control surfaces.

## Production QA still required
A real `npm install && npm run build` should be allowed to finish in GitHub Actions/Hostinger or a normal Node environment before live traffic is sent to the application.
