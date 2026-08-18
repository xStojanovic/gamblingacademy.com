import { courses, learningPaths, knowledgeArticles, glossary } from '@/modules/learning/data/catalog';

const base = process.env.NEXT_PUBLIC_APP_URL || 'https://opsacademy.example';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    '', '/courses', '/learning-paths', '/for-companies', '/company-academy', '/certifications',
    '/resources', '/knowledge', '/glossary', '/pricing', '/about', '/experts', '/community', '/careers', '/contact'
  ];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: now, changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : .8 })),
    ...courses.map((course) => ({ url: `${base}/course/${course.slug}`, lastModified: now, changeFrequency: 'monthly', priority: .8 })),
    ...learningPaths.map((path) => ({ url: `${base}/learning-paths/${path.slug}`, lastModified: now, changeFrequency: 'monthly', priority: .8 })),
    ...knowledgeArticles.map((article) => ({ url: `${base}/knowledge/${article.slug}`, lastModified: now, changeFrequency: 'monthly', priority: .7 })),
    ...glossary.map(([term]) => ({ url: `${base}/glossary/${encodeURIComponent(String(term).toLowerCase())}`, lastModified: now, changeFrequency: 'yearly', priority: .5 }))
  ];
}
