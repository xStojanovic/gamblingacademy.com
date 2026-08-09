# Year-One Roadmap — Pulled Forward Into V4

The previous 12-month roadmap has been deliberately compressed into the V4 architecture. The distinction below is between code/product capability that now exists and external activation/hardening that still requires real provider accounts, data and QA.

| Original horizon | Capability | V4 status |
|---|---|---|
| Month 1 | Modular production architecture, auth, DB, RBAC/RLS | Built/scaffolded now |
| Month 2 | Billing, email, analytics, media infrastructure | Provider adapters built now |
| Month 3 | B2B pilots, employee onboarding, assignments, reporting | Product flows + server APIs built now |
| Month 4 | Content governance, faculty review, versioning | Owner controls built now |
| Month 5 | Company Academy, imports, SSO/provisioning | Built as configurable enterprise workflows |
| Month 6 | Credentials, verification, public professional proof | Built now |
| Month 7 | Localization | Shared UI EN/SR/ES/PT + content coverage workflow built; body translations still need production content |
| Month 8 | Grounded AI learning assistant | Adapter + reviewed local fallback built; full retrieval index requires production content ingestion |
| Month 9 | Community and career ecosystem | Product/admin surfaces built now |
| Month 10 | APIs, webhooks, audit, backups and enterprise controls | Owner surfaces/data model built now; live external consumers require credentials/contracts |
| Month 11 | Skills analytics, support operations, richer reporting | Core surfaces built now |
| Month 12 | Enterprise hardening and scale | Architecture supports it; load/security/accessibility/compliance testing remains a launch gate |

## What “built now” does not mean

Provider-backed behavior still requires the provider itself. For example, a Stripe webhook cannot process a real payment without a Stripe account and price IDs; production SSO cannot authenticate a customer until their IdP metadata is configured; and AI retrieval cannot cite unpublished course text that has not yet been entered into the CMS.

## Recommended activation order

1. Supabase DB/Auth/Storage + migrations/RLS
2. Real owner/course data in CMS
3. Learner end-to-end persistence
4. Company pilot provisioning + invitation flow
5. Stripe + Resend
6. Credential production rules
7. Video provider
8. Analytics/error monitoring
9. Grounded retrieval index
10. SSO/SCIM for enterprise customer demand
11. Localization of actual course content
12. Load/security/accessibility hardening
