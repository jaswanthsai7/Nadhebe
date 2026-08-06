/**
 * Zero-dependency, bulletproof text conversion utilities
 * Safe for browser and server environments without ESM/CJS import errors.
 */

export function toWords(str: string): string[] {
  if (!str) return [];
  // Split on spaces, underscores, dashes, or transition between lower and uppercase
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function toCamelCase(str: string): string {
  const words = toWords(str);
  if (words.length === 0) return '';
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('');
}

export function toPascalCase(str: string): string {
  const words = toWords(str);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

export function toSnakeCase(str: string): string {
  const words = toWords(str);
  return words.map(w => w.toLowerCase()).join('_');
}

export function toKebabCase(str: string): string {
  const words = toWords(str);
  return words.map(w => w.toLowerCase()).join('-');
}

export function toConstantCase(str: string): string {
  const words = toWords(str);
  return words.map(w => w.toUpperCase()).join('_');
}

export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

export function toSentenceCase(str: string): string {
  const trimmed = str.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function toCapitalCase(str: string): string {
  const words = toWords(str);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

export function toSlug(str: string, separator: string = '-', lower: boolean = true): string {
  if (!str) return '';
  let s = str.trim();
  if (lower) s = s.toLowerCase();
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  s = s.replace(/[^a-z0-9]+/gi, separator);
  if (separator) {
    const esc = separator.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    s = s.replace(new RegExp(`^${esc}+|${esc}+$`, 'g'), '');
  }
  return s;
}
