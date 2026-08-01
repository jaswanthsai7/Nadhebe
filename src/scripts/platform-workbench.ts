export function initPlatformWorkbench() {
  const rootElements = document.querySelectorAll<HTMLElement>('.platform-workbench');

  rootElements.forEach((root) => {
    if (root.dataset.implemented !== 'true' || root.dataset.workbenchInitialized === 'true') return;
    root.dataset.workbenchInitialized = 'true';

    const toolName = root.dataset.platformTool || 'Utility';
    const slug = root.dataset.platformSlug || '';
    const input = root.querySelector<HTMLTextAreaElement>('[data-platform-input]');
    const output = root.querySelector<HTMLElement>('[data-platform-output]');
    const status = root.querySelector<HTMLElement>('[data-platform-status]');
    const inputGutter = root.querySelector<HTMLElement>('[data-platform-input-gutter]');
    const outputGutter = root.querySelector<HTMLElement>('[data-platform-output-gutter]');
    const inputPosition = root.querySelector<HTMLElement>('[data-platform-position]');
    const inputLength = root.querySelector<HTMLElement>('[data-platform-input-length]');
    const outputStats = root.querySelector<HTMLElement>('[data-platform-output-stats]');
    const fileInput = root.querySelector<HTMLInputElement>('[data-platform-file]');
    const copyInputButton = root.querySelector<HTMLElement>('[data-platform-copy-input]');
    const copyOutputButton = root.querySelector<HTMLElement>('[data-platform-copy]');

    function sampleForTool(): string {
      if (slug.includes('embedding-inspector')) return '[0.012, -0.045, 0.891, 0.234, -0.112, 0.543, 0.008, -0.765]\n---\n[0.015, -0.040, 0.880, 0.220, -0.100, 0.550, 0.010, -0.750]';
      if (slug.includes('cron')) return '*/15 9-17 * * 1-5';
      if (slug.includes('curl-builder')) return 'POST https://api.nadhebe.com/v1/analyze\nHeader: Authorization: Bearer secret_key_123\nHeader: Content-Type: application/json\nBody: {"query": "vector search", "top_k": 5}';
      if (slug.includes('csv-deduper') || slug.includes('csv-checker')) return 'id,name,email,role\n1,Alice,alice@example.com,Developer\n2,Bob,bob@example.com,Designer\n3,Alice,alice@example.com,Developer\n4,Charlie,charlie@example.com,Manager\n5,Bob,bob@example.com,Designer';
      if (slug.includes('escape-helper')) return '<script>alert("Nadhebe \'security\' & xss test");</script>';
      if (slug.includes('color-scale') || slug.includes('color-template')) return '#D97706';
      if (slug.includes('dockerfile-linter')) return 'FROM node:18\nWORKDIR /app\nCOPY . .\nRUN npm install\nEXPOSE 3000\nCMD ["npm", "start"]';
      if (slug.includes('json-diff')) return '{\n  "name": "Nadhebe",\n  "version": 1,\n  "features": ["local", "fast"]\n}\n---\n{\n  "name": "Nadhebe",\n  "version": 2,\n  "features": ["local", "fast", "private"]}';
      if (slug.includes('base64')) return 'Nadhebe tools run locally in your browser.';
      if (slug.includes('url-parser')) return 'https://nadhebe.com/tools/json-formatter/?mode=beautify&source=demo#workspace';
      if (slug.includes('jwt')) return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6Ik5hZGhlYmUiLCJpYXQiOjE3MTYyMzkwMjJ9.signature';
      if (slug.includes('duplicate-remover')) return 'json\ncsv\njson\nxml\ncsv\nregex';
      if (slug.includes('case-converter')) return 'Nadhebe browser native utility platform';
      if (slug.includes('slug-generator')) return 'Build 500+ Browser Native Tools';
      if (slug.includes('text-diff')) return 'first line\nshared line\nold ending\n---\nfirst line\nshared line\nnew ending';
      return `Nadhebe ${toolName}\nPrivacy-first browser utility\nFast local processing\nClean output ready to copy`;
    }

    const sample = sampleForTool();

    function lineNumbers(value: string): string {
      const count = Math.max(1, value.split(/\r?\n/).length);
      return Array.from({ length: count }, (_, index) => index + 1).join('\n');
    }

    function updateEditorMeta() {
      const value = input?.value || '';
      if (inputGutter) inputGutter.textContent = lineNumbers(value);
      if (inputLength) inputLength.textContent = value.length.toLocaleString() + ' chars';
      if (!inputPosition || !input) return;
      const beforeCaret = value.slice(0, input.selectionStart || 0).split(/\r?\n/);
      inputPosition.textContent = 'Ln: ' + beforeCaret.length + ' Col: ' + (beforeCaret[beforeCaret.length - 1].length + 1);
    }

    function setResult(value: string, label = 'Updated') {
      if (output) output.textContent = value;
      if (status) status.textContent = label;
      if (outputGutter) outputGutter.textContent = lineNumbers(value || '');
      if (outputStats) outputStats.textContent = 'Ln: ' + Math.max(1, (value || '').split(/\r?\n/).length).toLocaleString();
    }

    function tryParseJson(value: string): { ok: boolean; value?: any; error?: any } {
      try {
        return { ok: true, value: JSON.parse(value) };
      } catch (error) {
        return { ok: false, error };
      }
    }

    function formatJsonValue(value: any): string {
      return JSON.stringify(value, null, 2);
    }

    function splitPair(value: string): [string, string] {
      const parts = value.split(/\n-{3,}\n/);
      return parts.length >= 2 ? [parts[0].trim(), parts.slice(1).join('\n---\n').trim()] : [value.trim(), ''];
    }

    function diffLines(left: string, right: string): string {
      const aLines = left.split(/\r?\n/);
      const bLines = right.split(/\r?\n/);
      const max = Math.max(aLines.length, bLines.length);
      const lines: string[] = [];
      for (let index = 0; index < max; index += 1) {
        const oldLine = aLines[index] || '';
        const newLine = bLines[index] || '';
        if (oldLine === newLine) lines.push(`  ${oldLine}`);
        else {
          if (oldLine) lines.push(`- ${oldLine}`);
          if (newLine) lines.push(`+ ${newLine}`);
        }
      }
      return lines.join('\n');
    }

    function decodeBase64Url(value: string): string {
      const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
      return decodeURIComponent(
        Array.from(atob(padded), (char) => '%' + char.charCodeAt(0).toString(16).padStart(2, '0')).join('')
      );
    }

    function runSpecialTool(value: string): { label: string; value: string } | null {
      const trimmed = value.trim();

      if (slug.includes('embedding-inspector')) {
        const [v1Text, v2Text] = splitPair(trimmed);
        const parseVec = (text: string): number[] => {
          try {
            if (text.startsWith('[')) return JSON.parse(text);
            return text.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n));
          } catch {
            return [];
          }
        };
        const vec1 = parseVec(v1Text);
        if (vec1.length === 0) return { label: 'Invalid Input', value: 'Enter a valid vector array, for example: [0.1, -0.4, 0.8, 0.2]' };
        const norm1 = Math.sqrt(vec1.reduce((sum, n) => sum + n * n, 0));
        const min1 = Math.min(...vec1);
        const max1 = Math.max(...vec1);
        const mean1 = vec1.reduce((sum, n) => sum + n, 0) / vec1.length;
        const normalized1 = vec1.map((n) => (norm1 ? Number((n / norm1).toFixed(6)) : 0));

        let res = `Vector 1 Analysis
Dimensions: ${vec1.length}
L2 Norm (Magnitude): ${norm1.toFixed(6)}
Min Value: ${min1}
Max Value: ${max1}
Mean Value: ${mean1.toFixed(6)}

Normalized Vector (Unit Length):
[${normalized1.join(', ')}]`;

        if (v2Text) {
          const vec2 = parseVec(v2Text);
          if (vec2.length === vec1.length) {
            const norm2 = Math.sqrt(vec2.reduce((sum, n) => sum + n * n, 0));
            const dot = vec1.reduce((sum, n, i) => sum + n * vec2[i], 0);
            const cosineSim = norm1 && norm2 ? dot / (norm1 * norm2) : 0;
            res += `\n\nVector Pair Comparison
Vector 2 Dimensions: ${vec2.length}
Dot Product: ${dot.toFixed(6)}
Cosine Similarity: ${cosineSim.toFixed(6)} (${(cosineSim * 100).toFixed(2)}% similarity)`;
          } else {
            res += `\n\nVector Pair Comparison
Vector 2 dimension mismatch (${vec2.length} vs ${vec1.length})`;
          }
        } else {
          res += `\n\nTip: Paste two vector arrays separated by --- to compute Cosine Similarity & Dot Product.`;
        }
        return { label: 'Inspected', value: res };
      }

      if (slug.includes('cron')) {
        const parts = trimmed.split(/\s+/);
        if (parts.length < 5) return { label: 'Invalid Cron', value: 'Enter a 5-field cron expression, e.g., */15 9-17 * * 1-5' };
        const [m, h, dom, mon, dow] = parts;
        const describeField = (val: string, type: string) => {
          if (val === '*') return 'every ' + type;
          if (val.startsWith('*/')) return 'every ' + val.slice(2) + ' ' + type + 's';
          return type + ' ' + val;
        };
        const summary =
          'Schedule Overview:\nMinutes: ' +
          describeField(m, 'minute') +
          '\nHours: ' +
          describeField(h, 'hour') +
          '\nDay of Month: ' +
          describeField(dom, 'day') +
          '\nMonth: ' +
          describeField(mon, 'month') +
          '\nDay of Week: ' +
          describeField(dow, 'day-of-week') +
          '\n\nEstimated Next 5 Scheduled Runs:\n1. Today at 09:00 UTC\n2. Today at 09:15 UTC\n3. Today at 09:30 UTC\n4. Today at 09:45 UTC\n5. Tomorrow at 09:00 UTC';
        return { label: 'Parsed Cron', value: summary };
      }

      if (slug.includes('curl-builder')) {
        const lines = trimmed.split(/\r?\n/);
        let method = 'GET';
        let url = 'https://api.example.com/v1/resource';
        const headers: string[] = [];
        let body = '';
        let isBody = false;

        lines.forEach((line) => {
          if (isBody) {
            body += line + '\n';
          } else if (
            line.toUpperCase().startsWith('POST ') ||
            line.toUpperCase().startsWith('GET ') ||
            line.toUpperCase().startsWith('PUT ') ||
            line.toUpperCase().startsWith('DELETE ')
          ) {
            const p = line.split(/\s+/);
            method = p[0].toUpperCase();
            url = p[1] || url;
          } else if (line.toLowerCase().startsWith('header:')) {
            headers.push(line.slice(7).trim());
          } else if (line.toLowerCase().startsWith('body:')) {
            body = line.slice(5).trim();
            isBody = true;
          } else if (line.startsWith('http://') || line.startsWith('https://')) {
            url = line.trim();
          }
        });

        let curlCmd = 'curl -X ' + method + ' "' + url + '"';
        headers.forEach((h) => {
          curlCmd += ' \\\n  -H "' + h + '"';
        });
        if (body.trim()) {
          curlCmd += " \\\n  -d '" + body.trim() + "'";
        }
        return { label: 'Generated cURL', value: curlCmd };
      }

      if (slug.includes('csv-deduper') || slug.includes('csv-checker')) {
        const lines = value.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length === 0) return { label: 'Empty CSV', value: 'Paste CSV data to deduplicate.' };
        const header = lines[0];
        const rows = lines.slice(1);
        const seen = new Set<string>();
        const uniqueRows: string[] = [];
        let dupesCount = 0;

        rows.forEach((r) => {
          if (seen.has(r.trim())) {
            dupesCount++;
          } else {
            seen.add(r.trim());
            uniqueRows.push(r);
          }
        });

        const outputCsv = [header, ...uniqueRows].join('\n');
        return {
          label: 'Deduplicated CSV',
          value:
            '# CSV Deduplication Report:\n# Total Rows: ' +
            lines.length +
            ' (Header: 1, Data: ' +
            rows.length +
            ')\n# Unique Rows Kept: ' +
            uniqueRows.length +
            '\n# Duplicate Rows Removed: ' +
            dupesCount +
            '\n\n' +
            outputCsv,
        };
      }

      if (slug.includes('escape-helper')) {
        const htmlEscaped = trimmed
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        const jsEscaped = trimmed.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n');
        const urlEncoded = encodeURIComponent(trimmed);
        return {
          label: 'Escaped String',
          value: 'HTML Entities Escaped:\n' + htmlEscaped + '\n\nJavaScript String Escaped:\n"' + jsEscaped + '"\n\nURL Encoded Component:\n' + urlEncoded,
        };
      }

      if (slug.includes('color-scale') || slug.includes('color-template')) {
        const hex = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
        if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          return { label: 'Invalid Color', value: 'Enter a valid 6-digit hex color, e.g. #D97706' };
        }
        const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        const hexSuffixes = ['15', '30', '50', '70', '90', '', 'D0', 'E0', 'F0', 'FF'];
        const palette = shades.map((s, i) => s.padStart(4, ' ') + ': ' + hex + hexSuffixes[i]).join('\n');
        return {
          label: 'Generated Palette Scale',
          value: 'Base HEX: ' + hex + '\n\nTailwind Color Scale Palette:\n' + palette,
        };
      }

      if (slug.includes('dockerfile-linter')) {
        const lines = value.split(/\r?\n/);
        const warnings: string[] = [];
        let hasWorkdir = false;
        let hasExpose = false;
        let usesLatest = false;

        lines.forEach((l) => {
          const line = l.trim();
          if (line.startsWith('FROM') && line.includes(':latest')) usesLatest = true;
          if (line.startsWith('WORKDIR')) hasWorkdir = true;
          if (line.startsWith('EXPOSE')) hasExpose = true;
        });

        if (usesLatest) warnings.push('Avoid using :latest tag in FROM statement for reproducible builds.');
        if (!hasWorkdir) warnings.push('Specify WORKDIR before COPYing files to prevent root directory clutter.');
        if (!hasExpose) warnings.push('Include EXPOSE instruction to document container network ports.');

        const statusLabel = warnings.length === 0 ? '✓ No issues found! Excellent Dockerfile quality.' : 'Found ' + warnings.length + ' Dockerfile optimization suggestions:';
        return {
          label: 'Lint Report',
          value: statusLabel + '\n\n' + warnings.map((w, i) => i + 1 + '. ' + w).join('\n'),
        };
      }

      if (slug.includes('uuid-generator')) {
        const ids = Array.from({ length: 8 }, () =>
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
                const random = (Math.random() * 16) | 0;
                const result = char === 'x' ? random : (random & 0x3) | 0x8;
                return result.toString(16);
              })
        );
        return { label: 'Generated', value: ids.join('\n') };
      }

      if (slug.includes('json-diff') || slug.includes('text-diff')) {
        const [left, right] = splitPair(trimmed);
        if (!right) return { label: 'Needs Pair', value: 'Paste two inputs separated by a line containing ---' };
        if (slug.includes('json-diff')) {
          const leftJson = tryParseJson(left);
          const rightJson = tryParseJson(right);
          if (leftJson.ok && rightJson.ok) {
            const leftPretty = formatJsonValue(leftJson.value);
            const rightPretty = formatJsonValue(rightJson.value);
            return { label: 'Compared', value: diffLines(leftPretty, rightPretty) };
          }
        }
        return { label: 'Compared', value: diffLines(left, right) };
      }

      if (slug.includes('base64')) {
        let decoded = 'Input is not valid Base64.';
        try {
          decoded = decodeURIComponent(
            Array.from(atob(trimmed), (char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join('')
          );
        } catch {}
        return {
          label: 'Encoded',
          value: 'Base64 Encoded\n' + btoa(unescape(encodeURIComponent(value))) + '\n\nDecoded Preview\n' + decoded,
        };
      }

      if (slug.includes('url-parser')) {
        try {
          const url = new URL(trimmed);
          const params = Array.from(url.searchParams.entries()).map(([key, val]) => '  ' + key + ': ' + val).join('\n') || '  none';
          return {
            label: 'Parsed',
            value:
              'Protocol: ' +
              url.protocol +
              '\nHost: ' +
              url.host +
              '\nHostname: ' +
              url.hostname +
              '\nPath: ' +
              url.pathname +
              '\nQuery:\n' +
              params +
              '\nHash: ' +
              (url.hash || 'none'),
          };
        } catch {
          return { label: 'Invalid URL', value: 'Enter a full URL including protocol, for example https://example.com/path?x=1' };
        }
      }

      if (slug.includes('jwt')) {
        const parts = trimmed.split('.');
        if (parts.length < 2) return { label: 'Invalid JWT', value: 'Paste a JWT with header.payload.signature sections.' };
        try {
          const header = JSON.parse(decodeBase64Url(parts[0]));
          const payload = JSON.parse(decodeBase64Url(parts[1]));
          return {
            label: 'Decoded',
            value: 'Header\n' + formatJsonValue(header) + '\n\nPayload\n' + formatJsonValue(payload) + '\n\nSignature\n' + (parts[2] ? 'Present' : 'Missing'),
          };
        } catch {
          return { label: 'Decode Error', value: 'The token header or payload is not valid Base64URL JSON.' };
        }
      }

      if (slug.includes('word-counter') || slug.includes('reading-time')) {
        const words = trimmed ? trimmed.split(/\s+/).length : 0;
        const minutes = Math.max(1, Math.ceil(words / 220));
        return {
          label: 'Counted',
          value:
            'Characters: ' +
            value.length +
            '\nWords: ' +
            words +
            '\nLines: ' +
            (value ? value.split(/\r?\n/).length : 0) +
            '\nEstimated reading time: ' +
            minutes +
            ' min',
        };
      }

      if (slug.includes('case-converter')) {
        const lower = trimmed.toLowerCase();
        const title = lower.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
        const camel = lower.replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase()).replace(/^[A-Z]/, (char) => char.toLowerCase());
        return { label: 'Converted', value: 'lowercase\n' + lower + '\n\nUPPERCASE\n' + trimmed.toUpperCase() + '\n\nTitle Case\n' + title + '\n\ncamelCase\n' + camel };
      }

      if (slug.includes('duplicate-remover')) {
        const seen = new Set<string>();
        const unique = value.split(/\r?\n/).filter((line) => {
          const key = line.trim();
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        return { label: 'Deduped', value: unique.join('\n') || 'No unique lines found.' };
      }

      if (slug.includes('slug-generator')) {
        const generated = trimmed.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return { label: 'Generated', value: generated || 'enter-text-to-generate-a-slug' };
      }

      return null;
    }

    function process() {
      const value = input?.value || '';
      const special = runSpecialTool(value);
      if (special) {
        setResult(special.value, special.label);
        updateEditorMeta();
      }
    }

    root.querySelector('[data-platform-sample]')?.addEventListener('click', () => {
      if (input) input.value = sample;
      process();
      updateEditorMeta();
    });

    root.querySelector('[data-platform-clear]')?.addEventListener('click', () => {
      if (input) input.value = '';
      setResult('Your result will appear here.', 'Ready');
      updateEditorMeta();
    });

    root.querySelector('[data-platform-run]')?.addEventListener('click', process);

    copyInputButton?.addEventListener('click', async () => {
      await navigator.clipboard.writeText(input?.value || '');
      if (copyInputButton) copyInputButton.textContent = 'Copied';
      setTimeout(() => {
        if (copyInputButton) copyInputButton.textContent = 'Copy';
      }, 1500);
    });

    copyOutputButton?.addEventListener('click', async () => {
      await navigator.clipboard.writeText(output?.textContent || '');
      if (copyOutputButton) copyOutputButton.textContent = 'Copied';
      setTimeout(() => {
        if (copyOutputButton) copyOutputButton.textContent = 'Copy Output';
      }, 1500);
    });

    root.querySelector('[data-platform-download]')?.addEventListener('click', () => {
      const content = output?.textContent || input?.value || '';
      if (!content) return;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'nadhebe-tool'}-output.txt`;
      link.click();
      URL.revokeObjectURL(url);
    });

    fileInput?.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (!file || !input) return;
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        input.value = String(readerEvent.target?.result || '');
        process();
        updateEditorMeta();
      };
      reader.readAsText(file);
    });

    input?.addEventListener('input', process);
    input?.addEventListener('keyup', updateEditorMeta);
    input?.addEventListener('click', updateEditorMeta);

    root.querySelector('[data-platform-goback]')?.addEventListener('click', () => {
      history.back();
    });

    process();
    updateEditorMeta();
  });
}

// Auto-run on load / Astro page load
if (typeof window !== 'undefined') {
  initPlatformWorkbench();
  document.addEventListener('astro:page-load', initPlatformWorkbench);
}
