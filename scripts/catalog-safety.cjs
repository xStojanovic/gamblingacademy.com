const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(root, 'modules/learning/data/catalog.js');

function primitive(value) {
  return value === null || value === undefined || ['string', 'number', 'boolean'].includes(typeof value);
}

function requirePrimitive(value, label, issues) {
  if (!primitive(value)) issues.push(`${label} must be a render-safe primitive; found ${Array.isArray(value) ? 'array' : typeof value}`);
}

(async () => {
  // Import from a data URL so this check works even though the project package is not type=module.
  const source = fs.readFileSync(catalogPath, 'utf8');
  const encoded = Buffer.from(`${source}\n//# sourceURL=${pathToFileURL(catalogPath).href}`).toString('base64');
  const catalog = await import(`data:text/javascript;base64,${encoded}`);
  const issues = [];

  for (const [index, course] of (catalog.courses || []).entries()) {
    for (const field of ['slug', 'title', 'eyebrow', 'description', 'duration', 'lessons', 'level', 'certificate', 'progress']) {
      requirePrimitive(course?.[field], `courses[${index}].${field}`, issues);
    }
    if (!Array.isArray(course?.skills)) issues.push(`courses[${index}].skills must be an array`);
    if (!Array.isArray(course?.modules)) issues.push(`courses[${index}].modules must be an array`);
  }

  for (const [index, pathItem] of (catalog.learningPaths || []).entries()) {
    for (const field of ['slug', 'title', 'description', 'duration', 'badge']) {
      requirePrimitive(pathItem?.[field], `learningPaths[${index}].${field}`, issues);
    }
    if (!Array.isArray(pathItem?.courses)) issues.push(`learningPaths[${index}].courses must be an array`);
    for (const [courseIndex, course] of (pathItem?.courses || []).entries()) {
      if (course && typeof course === 'object') {
        requirePrimitive(course.slug, `learningPaths[${index}].courses[${courseIndex}].slug`, issues);
        requirePrimitive(course.title, `learningPaths[${index}].courses[${courseIndex}].title`, issues);
      } else if (!primitive(course)) {
        issues.push(`learningPaths[${index}].courses[${courseIndex}] has unsupported type ${typeof course}`);
      }
    }
  }

  for (const [index, resource] of (catalog.resources || []).entries()) {
    for (const field of ['slug', 'title', 'category', 'format', 'description']) {
      requirePrimitive(resource?.[field], `resources[${index}].${field}`, issues);
    }
  }

  for (const [index, article] of (catalog.knowledgeArticles || []).entries()) {
    for (const field of ['slug', 'category', 'title', 'summary', 'read']) {
      requirePrimitive(article?.[field], `knowledgeArticles[${index}].${field}`, issues);
    }
  }

  console.log(`Catalog safety: ${(catalog.courses || []).length} courses, ${(catalog.learningPaths || []).length} paths, ${(catalog.resources || []).length} resources, ${(catalog.knowledgeArticles || []).length} articles`);
  console.log(`Catalog render-safety issues: ${issues.length}`);
  if (issues.length) {
    console.error(issues.join('\n'));
    process.exit(1);
  }
})().catch((error) => {
  console.error('Catalog safety check could not run:', error);
  process.exit(1);
});
