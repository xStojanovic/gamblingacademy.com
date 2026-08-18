const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const scanRoots = ['app', 'modules'];
const files = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(js|jsx)$/.test(entry.name)) files.push(full);
  }
}
scanRoots.forEach((dir) => walk(path.join(root, dir)));

const issues = [];

function loc(sourceFile, node) {
  const p = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return `${path.relative(root, sourceFile.fileName)}:${p.line + 1}:${p.character + 1}`;
}

function isJsxChildExpression(node) {
  return ts.isJsxExpression(node) && node.expression && !ts.isJsxAttribute(node.parent);
}

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);

  function visit(node) {
    // A literal object used as a JSX child is always invalid React rendering.
    if (isJsxChildExpression(node) && ts.isObjectLiteralExpression(node.expression)) {
      issues.push(`${loc(sf, node)} object literal rendered directly as a React child`);
    }

    // Dynamic indexed values are another common source of accidental object rendering
    // in generic tables/collections. Require an explicit renderer/normalizer.
    if (isJsxChildExpression(node) && ts.isElementAccessExpression(node.expression)) {
      issues.push(`${loc(sf, node)} dynamic indexed value rendered directly as JSX; normalize with renderText() or a custom renderer`);
    }

    // Catch the exact class of bug that previously broke Hostinger:
    // array.map((item) => <div>{item}</div>) where item may be an object.
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'map' &&
      node.arguments.length
    ) {
      const callback = node.arguments[0];
      if (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) {
        const params = new Set(
          callback.parameters
            .map((p) => (ts.isIdentifier(p.name) ? p.name.text : null))
            .filter(Boolean)
        );
        if (params.size) {
          function inspectCallback(child) {
            if (
              isJsxChildExpression(child) &&
              ts.isIdentifier(child.expression) &&
              params.has(child.expression.text)
            ) {
              issues.push(`${loc(sf, child)} map callback parameter "${child.expression.text}" rendered directly as a JSX child; render a property or normalize it first`);
            }
            ts.forEachChild(child, inspectCallback);
          }
          inspectCallback(callback.body);
        }
      }
    }

    ts.forEachChild(node, visit);
  }
  visit(sf);
}

console.log(`JSX object-safety scan: ${files.length} files`);
console.log(`Unsafe direct-object render patterns: ${issues.length}`);
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
