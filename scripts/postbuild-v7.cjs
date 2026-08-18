const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const nextDir = path.join(root, '.next');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const required = [
  path.join(nextDir, 'BUILD_ID'),
  path.join(nextDir, 'server'),
  path.join(nextDir, 'static')
];
const missing = required.filter((item) => !fs.existsSync(item));

if (missing.length) {
  console.error('V7 postbuild verification failed. Missing expected Next.js build output:');
  missing.forEach((item) => console.error(` - ${path.relative(root, item)}`));
  process.exit(1);
}

const buildId = fs.readFileSync(path.join(nextDir, 'BUILD_ID'), 'utf8').trim();
const info = {
  product: 'OpsAcademy',
  version: pkg.version,
  next: pkg.dependencies.next,
  react: pkg.dependencies.react,
  node: process.version,
  buildId,
  builtAt: new Date().toISOString(),
  command: 'npm run build',
  output: '.next'
};
fs.writeFileSync(path.join(nextDir, 'OPSACADEMY_BUILD_INFO.json'), JSON.stringify(info, null, 2));
console.log('\n============================================================');
console.log(' OPSACADEMY V7 BUILD VERIFIED');
console.log('============================================================');
console.log(JSON.stringify(info, null, 2));
console.log('============================================================\n');
