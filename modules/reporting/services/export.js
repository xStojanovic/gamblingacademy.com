export function toCsv(rows = []) {
  if (!rows.length) return '';
  const keys = [...new Set(rows.flatMap((item) => Object.keys(item)))];
  const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  return [keys.map(escape).join(','), ...rows.map((row) => keys.map((key) => escape(row[key])).join(','))].join('\n');
}

export function downloadCsv(name, rows) {
  if (typeof document === 'undefined' || typeof URL === 'undefined') return false;
  const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
  return true;
}
