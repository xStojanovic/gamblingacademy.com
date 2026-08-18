const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const root = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const expected = { next: '15.5.21', react: '19.2.6', reactDom: '19.2.6', nodeMajor: 22 };

function section(title) {
  console.log(`\n${'='.repeat(68)}\n ${title}\n${'='.repeat(68)}`);
}

function installedVersion(packageName) {
  try {
    const packageJsonPath = require.resolve(`${packageName}/package.json`, { paths: [root] });
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).version;
  } catch (error) {
    return null;
  }
}

function run(script) {
  const full = path.join(root, 'scripts', script);
  const result = cp.spawnSync(process.execPath, [full], {
    cwd: root,
    env: process.env,
    stdio: 'inherit'
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

section('OPSACADEMY V7 — HOSTINGER BUILD PREFLIGHT');

const declared = {
  next: pkg.dependencies?.next,
  react: pkg.dependencies?.react,
  reactDom: pkg.dependencies?.['react-dom']
};
const installed = {
  next: installedVersion('next'),
  react: installedVersion('react'),
  reactDom: installedVersion('react-dom')
};
const commit = process.env.GITHUB_SHA || process.env.COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || 'not-provided';
const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';

console.log(` Release:     ${pkg.name} ${pkg.version}`);
console.log(` Node:        ${process.version}`);
console.log(` Next:        declared=${declared.next} installed=${installed.next || 'NOT FOUND'}`);
console.log(` React:       declared=${declared.react} installed=${installed.react || 'NOT FOUND'}`);
console.log(` React DOM:   declared=${declared.reactDom} installed=${installed.reactDom || 'NOT FOUND'}`);
console.log(` Commit:      ${commit}`);
console.log(` Demo mode:   ${demoMode ? 'enabled/default' : 'disabled'}`);
console.log(` Root:        ./`);
console.log(` Build:       npm run build`);
console.log(` Output:      .next`);

const failures = [];
if (Number(process.versions.node.split('.')[0]) !== expected.nodeMajor) {
  failures.push(`Node ${expected.nodeMajor}.x is required; Hostinger is using ${process.version}.`);
}
if (declared.next !== expected.next) failures.push(`package.json must declare next=${expected.next}; found ${declared.next}.`);
if (declared.react !== expected.react) failures.push(`package.json must declare react=${expected.react}; found ${declared.react}.`);
if (declared.reactDom !== expected.reactDom) failures.push(`package.json must declare react-dom=${expected.reactDom}; found ${declared.reactDom}.`);
if (!installed.next) failures.push('Next.js is not installed. Hostinger must install npm dependencies before running the build command.');
if (!installed.react) failures.push('React is not installed.');
if (!installed.reactDom) failures.push('React DOM is not installed.');
if (installed.next && installed.next !== expected.next) failures.push(`STALE DEPENDENCY CACHE: installed Next.js is ${installed.next}, expected ${expected.next}. Clear Hostinger build cache and redeploy.`);
if (installed.react && installed.react !== expected.react) failures.push(`STALE DEPENDENCY CACHE: installed React is ${installed.react}, expected ${expected.react}. Clear Hostinger build cache and redeploy.`);
if (installed.reactDom && installed.reactDom !== expected.reactDom) failures.push(`STALE DEPENDENCY CACHE: installed React DOM is ${installed.reactDom}, expected ${expected.reactDom}. Clear Hostinger build cache and redeploy.`);

if (failures.length) {
  console.error('\nPREBUILD ENVIRONMENT CHECK FAILED');
  failures.forEach((failure) => console.error(` - ${failure}`));
  process.exit(1);
}

// Never allow a previous deployment artifact to influence a new build.
fs.rmSync(path.join(root, '.next'), { recursive: true, force: true });
console.log('\nOld .next output removed. Running V7 source safety suite...');

run('validate-source.cjs');
run('jsx-object-safety.cjs');
run('catalog-safety.cjs');
run('route-audit.cjs');
run('validate-v7.cjs');

console.log('\nV7 prebuild: PASS');
console.log('Starting Next.js production build with a clean .next directory.\n');
