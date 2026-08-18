# Hostinger deployment fix — V5.0.1

## Fixed build blocker

The learning path catalogue enriches each path with full course objects:

```js
courses: path.courseSlugs.map(slug => courses.find(...))
```

The old `PathCard` rendered each `course` value directly as a JSX child. React cannot render a plain JavaScript object, which caused prerendering of `/` and `/dashboard/learning-paths` to fail.

`modules/public/components/PathCard.js` now normalizes each item and renders `course.title` (plus a course link when a slug exists) instead of rendering the object.

## Security dependency update

Pinned versions in `package.json`:

- `next`: `15.5.23`
- `react`: `19.2.6`
- `react-dom`: `19.2.6`
- Node.js engine: `>=20.9.0`

## Hostinger deployment

1. Replace the old project files with this corrected project.
2. Do not upload an old `node_modules` or `.next` directory.
3. Use Node.js 20+ (Node 22 is also suitable).
4. Build command:

```bash
npm install && npm run build
```

5. Start command:

```bash
npm run start
```

6. For the current demo-mode deployment, copy `.env.example` to the environment settings and set at minimum:

```env
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_APP_URL=https://YOUR-DOMAIN
```

Provider credentials can remain empty until Supabase, Stripe, email, AI, video, etc. are activated.

## Local validation performed

```text
JS/JSX files parsed: 263
Syntax errors: 0
Missing @/ imports: 0
Missing configured routes: 0
```

A full `next build` could not be executed in the generation environment because its private npm mirror does not contain the Next.js package. Hostinger/public npm should install the pinned packages normally.
