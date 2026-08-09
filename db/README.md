# OpsAcademy database migrations

Apply migrations in numeric order. They are deliberately split by product domain so identity, learning, learner records, company features, CMS, credentials, billing, communications, runtime persistence and security can evolve independently.

1. `001_identity.sql`
2. `002_learning.sql`
3. `003_learner.sql`
4. `004_company_enterprise.sql`
5. `005_content_cms.sql`
6. `006_credentials.sql`
7. `007_billing.sql`
8. `008_comms_integrations.sql`
9. `009_operations.sql`
10. `010_rls.sql`
11. `011_runtime_persistence.sql`
12. `012_v5_production_core.sql`
13. `013_v5_security_hardening.sql`

Run the full sequence against a clean test database before production. RLS must be verified with learner, company-admin and platform-admin accounts; server-side service-role access does not replace explicit API tenant scoping.
