# V5.0.1 deployment hotfix

- Fixed React object-child crash in `PathCard` affecting `/` and `/dashboard/learning-paths`.
- `PathCard` now supports both string course labels and full course objects safely.
- Course rows now link to course pages when a slug is available.
- Updated Next.js from 15.2.4 to 15.5.23.
- Updated React / React DOM from 19.0.0 to 19.2.6.
- Added Node.js engine requirement >=20.9.0.
- Corrected one legacy homepage phrase from “gaming businesses” to “service businesses”.
- Source validation passes with zero syntax/import/route errors.
