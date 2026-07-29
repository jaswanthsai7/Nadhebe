/**
 * Client-Side Developer Utilities & Formatters / Converters
 */

export interface ValidationResult {
  valid: boolean;
  message: string;
  line?: number;
  column?: number;
}

export function validateJson(code: string): ValidationResult {
  if (!code || !code.trim()) {
    return { valid: false, message: 'Empty input' };
  }

  try {
    JSON.parse(code);
    return { valid: true, message: 'Valid JSON' };
  } catch (err: any) {
    const msg = err.message || 'Syntax Error';
    let line: number | undefined;
    let column: number | undefined;

    const lineMatch = msg.match(/at line (\d+) column (\d+)/i) || msg.match(/line (\d+)/i);
    if (lineMatch) {
      line = parseInt(lineMatch[1], 10);
      if (lineMatch[2]) column = parseInt(lineMatch[2], 10);
    }

    return {
      valid: false,
      message: msg,
      line,
      column,
    };
  }
}

export function formatJson(code: string, indent: number | string = 2): { success: boolean; result: string; error?: string } {
  try {
    const parsed = JSON.parse(code);
    const indentVal = typeof indent === 'string' && indent.toLowerCase().includes('tab') ? '\t' : Number(indent) || 2;
    return { success: true, result: JSON.stringify(parsed, null, indentVal) };
  } catch (err: any) {
    return { success: false, result: '', error: err.message || 'Invalid JSON syntax' };
  }
}

export function minifyJson(code: string): { success: boolean; result: string; error?: string } {
  try {
    const parsed = JSON.parse(code);
    return { success: true, result: JSON.stringify(parsed) };
  } catch (err: any) {
    return { success: false, result: '', error: err.message || 'Invalid JSON syntax' };
  }
}

export function jsonToXml(code: string): { success: boolean; result: string; error?: string } {
  try {
    const parsed = JSON.parse(code);

    function toXml(obj: any, nodeName = 'root'): string {
      if (obj === null || obj === undefined) return `<${nodeName}/>`;
      if (typeof obj !== 'object') {
        const escaped = String(obj).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<${nodeName}>${escaped}</${nodeName}>`;
      }

      if (Array.isArray(obj)) {
        return obj.map((item) => toXml(item, 'item')).join('\n');
      }

      const children = Object.keys(obj)
        .map((key) => {
          const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
          return toXml(obj[key], safeKey);
        })
        .join('\n');

      return `<${nodeName}>\n${children}\n</${nodeName}>`;
    }

    return { success: true, result: `<?xml version="1.0" encoding="UTF-8"?>\n` + toXml(parsed) };
  } catch (err: any) {
    return { success: false, result: '', error: err.message || 'Invalid JSON syntax' };
  }
}

export function jsonToYaml(code: string): { success: boolean; result: string; error?: string } {
  try {
    const parsed = JSON.parse(code);

    function toYaml(obj: any, indentLevel = 0): string {
      const indentStr = ' '.repeat(indentLevel * 2);
      if (obj === null || obj === undefined) return 'null';
      if (typeof obj !== 'object') return JSON.stringify(obj);

      if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';
        return obj
          .map((item) => {
            if (typeof item === 'object' && item !== null) {
              const lines = toYaml(item, indentLevel + 1).trimStart();
              return `${indentStr}- ${lines}`;
            }
            return `${indentStr}- ${toYaml(item, 0)}`;
          })
          .join('\n');
      }

      const keys = Object.keys(obj);
      if (keys.length === 0) return '{}';

      return keys
        .map((key) => {
          const val = obj[key];
          if (typeof val === 'object' && val !== null) {
            return `${indentStr}${key}:\n${toYaml(val, indentLevel + 1)}`;
          }
          return `${indentStr}${key}: ${toYaml(val, 0)}`;
        })
        .join('\n');
    }

    return { success: true, result: toYaml(parsed) };
  } catch (err: any) {
    return { success: false, result: '', error: err.message || 'Invalid JSON syntax' };
  }
}

export function jsonToCsv(code: string): { success: boolean; result: string; error?: string } {
  try {
    let parsed = JSON.parse(code);
    if (!Array.isArray(parsed)) {
      parsed = [parsed];
    }

    if (parsed.length === 0) return { success: true, result: '' };

    const headers = Array.from(new Set(parsed.flatMap((item: any) => (typeof item === 'object' && item ? Object.keys(item) : []))));
    if (headers.length === 0) {
      return { success: true, result: parsed.map((item: any) => String(item)).join('\n') };
    }

    const csvRows = [headers.join(',')];

    for (const row of parsed) {
      const values = headers.map((header) => {
        const val = row[header];
        if (val === undefined || val === null) return '""';
        const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    return { success: true, result: csvRows.join('\n') };
  } catch (err: any) {
    return { success: false, result: '', error: err.message || 'Invalid JSON input' };
  }
}
