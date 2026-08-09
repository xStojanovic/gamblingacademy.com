# GamingOps Academy — Platform V3

## Owner Admin
Introduced a dedicated `/admin` workspace separate from learner and company administration.

### New owner controls
- Executive platform dashboard and analytics
- Course catalogue management
- Advanced course builder with Overview, Curriculum, Assessment, Access & Pricing, SEO and Settings tabs
- Lesson editor with text/video/scenario/quiz/assessment types, resources and publication states
- Assessment and reusable question-bank builder
- Learning path manager
- Resource Library manager
- Knowledge Hub manager
- Certificate / credential registry
- Faculty and reviewer management
- Company account management and detailed company workspace
- Learner management
- Plans and billing configuration
- Public pages and navigation management
- Global SEO and structured-data controls
- Branding and light/dark theme configuration
- Email and notification template management
- Platform integrations
- Feature flags
- Roles and permissions
- Audit log
- System health
- Global platform settings

## Learner improvements
- More prominent continue-learning experience
- Progress ring and learning streak
- Skill/capability map
- Assignment and deadline summary
- Stronger learning-path visualization
- AI tutor suggestions
- Recommended-next course cards

## Company improvements
- Learning health score
- Team completion visualization
- Weekly learning engagement view
- Attention-needed actions
- Seat utilization visualization
- Private Company Academy overview
- More direct links to assignments, reporting and billing

## Data architecture
Added production-ready schema concepts for:
- admin roles and assignments
- site pages and navigation
- email templates
- platform integrations
- feature flags
- pricing plans
- content review workflow
- assessment question bank

## Validation
- 113 JS/JSX files parsed using the TypeScript compiler API
- 0 syntax errors
- 75 routes in the application
- 0 missing `@/` imports
- 40 static internal links checked with 0 unresolved routes

## Environment limitation
`npm install` cannot complete in the current execution environment because its internal npm registry returns 404 for `next@15.2.4`. The source itself is syntax-validated, but a production `next build` must be run in a normal Node/npm environment.
