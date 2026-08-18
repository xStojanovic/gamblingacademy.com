const base = process.env.NEXT_PUBLIC_APP_URL || 'https://opsacademy.example';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/company/', '/dashboard/', '/api/', '/build-info', '/login', '/invite/']
    },
    sitemap: `${base}/sitemap.xml`
  };
}
