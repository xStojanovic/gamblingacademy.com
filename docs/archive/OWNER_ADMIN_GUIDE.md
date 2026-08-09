# GamingOps Academy — Owner Admin Guide

Open `/admin` to enter the platform-owner workspace.

## Overview
The owner admin is designed for GamingOps Academy staff, not customer-company administrators. It controls the Academy as a business and platform.

## Learning Operations
### Courses
Create a course from `/admin/courses` and open it in the builder.

The course builder controls:
- title, slug, department, level, duration and language
- description and skills
- draft/review/published/archive states
- course ownership and reviewer workflow
- curriculum and lesson ordering
- text, video, interactive scenario, quiz, assessment and download lesson types
- protected video reference
- lesson content and practical exercises
- attached resources
- assessment pass mark, attempts and certificate behavior
- standalone price and membership/corporate availability
- prerequisites and enrollment behavior
- SEO title, meta description, canonical and schema/index controls
- course-level feature switches

### Assessments
`/admin/assessments` includes a dedicated assessment builder with question-bank editing, correct answers, explanations, points, delivery rules and attempt behavior.

### Learning paths, Resources, Knowledge and Credentials
All are managed as separate owner-admin collections with create/edit/delete, search, filtering and publication status.

## Customer Operations
### Companies
`/admin/companies` manages corporate accounts. Every company can be opened in a detailed workspace covering:
- account health
- plan and seats
- billing equivalent and renewal
- entitlements
- learning utilization
- Company Academy features
- account status and lifecycle

### Learners
Control learner account status, company relationship, access plan, learning record and credential count.

### Plans & Billing
Manage Free, Professional and corporate plans together with price, billing interval and entitlements.

## Website Operations
### Pages & Navigation
Manage public pages and menu entries separately. Navigation visibility and ordering are controlled independently of page publishing.

### SEO & AI Discovery
Manage default metadata, title templates, canonical origin, OpenGraph image, indexing, sitemap, robots and structured-data behavior.

### Branding & Theme
Light and dark themes are first-class platform requirements. The owner panel includes identity, primary/secondary colors, typography, radius and default-theme controls.

### Email & Notifications
Manage transactional templates and triggers such as welcome, course assignment, certificate issuance and inactivity reminders.

## Platform Operations
### Integrations
Designed for Supabase, Stripe, Resend, Mux/Vimeo, PostHog and HubSpot adapters.

### Feature Flags
Stage large features such as AI tutor, Company Academy, community and job/career functionality.

### Roles & Permissions
Separate Super Admin, Content, Commercial, Reviewer and Support responsibilities.

### Audit Log
Important administrative operations should be written to an immutable production audit trail.

### System Health
Provides an owner view of API, database, auth, storage, video, email and billing readiness.

## Demo persistence
The V3 owner admin currently persists changes in browser localStorage for demonstration. The included `lib/schema.sql` represents the intended PostgreSQL/Supabase persistence layer.
