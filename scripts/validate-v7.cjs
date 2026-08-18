const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const issues = [];
const check = (condition, message) => { if (!condition) issues.push(message); };

check(pkg.version === '0.7.0', `Expected package version 0.7.0, found ${pkg.version}`);
check(pkg.dependencies?.next === '15.5.21', `Expected Next.js 15.5.21, found ${pkg.dependencies?.next}`);
check(pkg.dependencies?.react === '19.2.6', `Expected React 19.2.6, found ${pkg.dependencies?.react}`);
check(pkg.dependencies?.['react-dom'] === '19.2.6', `Expected React DOM 19.2.6, found ${pkg.dependencies?.['react-dom']}`);
check(pkg.engines?.node === '22.x', `Expected Node 22.x, found ${pkg.engines?.node}`);
check(pkg.scripts?.build === 'next build', 'Hostinger build command must remain compatible with plain `npm run build`');
check(Boolean(pkg.scripts?.prebuild), 'A prebuild deployment safety hook is required');
check(Boolean(pkg.scripts?.postbuild), 'A postbuild verification hook is required');

const required = [
  'app/page.js',
  'instrumentation.js',
  'app/error.js',
  'app/global-error.js',
  'app/not-found.js',
  'app/loading.js',
  'app/build-info/page.js',
  'app/api/build-info/route.js',
  'app/admin/deployments/page.js',
  'app/api/admin/deployments/route.js',
  'modules/infrastructure/config/release.js',
  'modules/infrastructure/components/DeploymentCenter.js',
  'db/migrations/015_v7_deployment_operations.sql',
  'modules/public/components/PathCard.js',
  'modules/public/components/CourseCard.js',
  'modules/shared/utils/renderText.js',
  'scripts/prebuild-v7.cjs',
  'scripts/postbuild-v7.cjs',
  'scripts/jsx-object-safety.cjs',
  'scripts/catalog-safety.cjs',
  'scripts/route-audit.cjs'
];
for (const file of required) check(fs.existsSync(path.join(root, file)), `Missing required V7 asset: ${file}`);

const pathCard = fs.readFileSync(path.join(root, 'modules/public/components/PathCard.js'), 'utf8');
check(pathCard.includes('normalizePathCourse'), 'PathCard must normalize course objects');
check(!/\{\s*c\s*\}<\/div>/.test(pathCard), 'Legacy raw object rendering remains in PathCard');

const envConfig = fs.readFileSync(path.join(root, 'modules/infrastructure/config/env.js'), 'utf8');
check(envConfig.includes("process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'"), 'Demo mode must default to enabled when no environment variable is set');

const config = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf8');
check(!/output\s*:\s*['"]export['"]/.test(config), 'Hostinger Node deployment must not use static export output');

console.log(`V7 required assets checked: ${required.length}`);
console.log(`V7 validation issues: ${issues.length}`);
if (issues.length) {
  issues.forEach((issue) => console.error(` - ${issue}`));
  process.exit(1);
}
console.log('V7 deployment-ready validation: PASS');
