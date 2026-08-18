const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [];
for (const base of ['app', 'modules']) walk(path.join(root, base));

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(js|jsx)$/.test(entry.name)) files.push(full);
  }
}

function routeExists(href) {
  if (!href || !href.startsWith('/')) return true;
  if (href.startsWith('/api/')) return true;
  const clean = href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
  if (clean === '/') return fs.existsSync(path.join(root, 'app/page.js'));
  const parts = clean.slice(1).split('/');
  let current = path.join(root, 'app');
  for (const part of parts) {
    const exact = path.join(current, part);
    if (fs.existsSync(exact) && fs.statSync(exact).isDirectory()) {
      current = exact;
      continue;
    }
    if (!fs.existsSync(current)) return false;
    const dyn = fs.readdirSync(current, { withFileTypes: true }).find((entry) => entry.isDirectory() && /^\[.*\]$/.test(entry.name));
    if (!dyn) return false;
    current = path.join(current, dyn.name);
  }
  return fs.existsSync(path.join(current, 'page.js')) || fs.existsSync(path.join(current, 'route.js'));
}

const links = [];
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const patterns = [
    /href\s*=\s*["'](\/[^"']*)["']/g,
    /href\s*=\s*\{\s*["'](\/[^"']*)["']\s*\}/g,
    /href\s*:\s*["'](\/[^"']*)["']/g
  ];
  for (const re of patterns) {
    let match;
    while ((match = re.exec(src))) links.push({ href: match[1], file: path.relative(root, file) });
  }
}

const unique = [...new Map(links.map((item) => [`${item.file}|${item.href}`, item])).values()];
const missing = unique.filter((item) => !routeExists(item.href));
console.log(`Static internal links audited: ${unique.length}`);
console.log(`Unresolved static internal routes: ${missing.length}`);
if (missing.length) {
  for (const item of missing) console.error(`${item.file} -> ${item.href}`);
  process.exit(1);
}
