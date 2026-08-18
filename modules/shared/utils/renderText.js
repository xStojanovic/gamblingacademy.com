export function renderText(value, fallback = '') {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';

  if (Array.isArray(value)) {
    return value.map((item) => renderText(item, '')).filter(Boolean).join(', ');
  }

  if (typeof value === 'object') {
    return String(
      value.title ??
      value.name ??
      value.label ??
      value.slug ??
      value.id ??
      fallback
    );
  }

  return String(value);
}
