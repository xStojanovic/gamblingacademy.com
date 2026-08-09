# Module Map — Where to Edit What

| Need to change | Primary module | Important routes |
|---|---|---|
| Homepage / public pages | `modules/public` | `/`, `/courses`, `/for-companies` |
| Course catalogue / learning paths | `modules/learning` | `/courses`, `/learning-paths` |
| Learner dashboard | `modules/learner` | `/dashboard/*`, `/learn/*`, `/assessment/*` |
| Company admin | `modules/company` | `/company/*` |
| GamingOps owner admin | `modules/admin` | `/admin/*` |
| Login / roles / middleware | `modules/auth` | `/login`, `/api/auth/*`, `middleware.js` |
| Payments | `modules/billing` | `/api/billing/*` |
| Credentials | `modules/credentials` | `/credential/*`, `/api/certificates/*` |
| AI tutor | `modules/ai` + learner tutor component | `/dashboard/tutor`, `/api/ai/tutor` |
| Email | `modules/notifications` | `/api/notifications/*` |
| Analytics | `modules/analytics` | `/api/analytics/*` |
| Localization | `modules/localization` | learner/company settings, `/admin/localization` |
| Community | `modules/community` | `/community`, `/dashboard/community`, `/admin/community` |
| Career | `modules/career` | `/careers`, `/skills-assessment`, `/admin/jobs` |
| Environment / DB adapter | `modules/infrastructure` | server APIs |
| Shared theme / shell / navigation | `modules/shared` | all surfaces |
| Database schema | `db/migrations` | apply in order |
