// ChatGPT Ad Blocker Tool Client Script

export const EXTENSION_FILES: Record<string, string> = {
  'manifest.json': JSON.stringify({
    manifest_version: 3,
    name: "ChatGPT Ad & Promo Blocker",
    version: "1.0",
    description: "Hides upgrade banners, promo cards, and ad-like elements on chatgpt.com",
    permissions: ["storage"],
    host_permissions: ["https://chatgpt.com/*", "https://chat.openai.com/*"],
    background: {
      service_worker: "background.js"
    },
    content_scripts: [
      {
        matches: ["https://chatgpt.com/*", "https://chat.openai.com/*"],
        css: ["hide.css"],
        js: ["blocker.js"],
        run_at: "document_start"
      }
    ],
    action: {
      default_popup: "popup.html"
    },
    icons: {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  }, null, 2),

  'hide.css': `/* Known upgrade/promo banner patterns on chatgpt.com */
html:not([data-adblock-disabled="true"]) [data-testid*="upgrade"],
html:not([data-adblock-disabled="true"]) [data-testid*="promo"],
html:not([data-adblock-disabled="true"]) [data-testid*="upsell"],
html:not([data-adblock-disabled="true"]) [data-testid*="banner-ad"],
html:not([data-adblock-disabled="true"]) [data-testid*="app-card"],
html:not([data-adblock-disabled="true"]) [data-testid*="app-suggestion"],
html:not([data-adblock-disabled="true"]) [data-testid*="connector-card"],
html:not([data-adblock-disabled="true"]) [data-testid*="external-app"],
html:not([data-adblock-disabled="true"]) [data-testid*="ad-badge"],
html:not([data-adblock-disabled="true"]) [data-testid*="sponsored"],
html:not([data-adblock-disabled="true"]) [aria-label="Advertisement"],
html:not([data-adblock-disabled="true"]) [aria-label="Sponsored"],
html:not([data-adblock-disabled="true"]) a[href*="/pricing"] > div,
html:not([data-adblock-disabled="true"]) div[class*="promo-banner"],
html:not([data-adblock-disabled="true"]) div[class*="upgrade-banner"] {
  display: none !important;
}`,

  'blocker.js': `// ChatGPT re-renders via React with changing class names, so CSS alone
// won't catch everything. This scans new nodes for known promo phrases
// and hides their nearest reasonable container.

const PROMO_PHRASES = [
  "Upgrade to Plus",
  "Upgrade to Go",
  "Upgrade to Pro",
  "Get Plus",
  "Try Plus",
  "Unlock GPT",
  "Upgrade your plan",
  "Limited time",
  "Try advanced voice"
];

const APP_CARD_BRANDS = [
  "monday.com",
  "canva",
  "zillow",
  "doordash",
  "coursera",
  "spotify",
  "booking.com",
  "expedia",
  "peloton",
  "wolfram",
  "instacart",
  "figma",
  "notion"
];

const AD_BADGE_LABELS = ["ad", "sponsored", "promoted"];
const MAX_ANCESTOR_HOPS = 4;
const MAX_CARD_ANCESTOR_HOPS = 8;

function textMatches(node) {
  if (!node.textContent) return false;
  const t = node.textContent.trim();
  if (t.length === 0 || t.length > 200) return false;
  return PROMO_PHRASES.some(p => t.includes(p));
}

let isEnabled = true;

function unhideAll() {
  document.querySelectorAll('[data-__adblock-hidden="true"]').forEach((el) => {
    el.style.removeProperty("display");
    delete el.dataset.__adblockHidden;
  });
}

function hideElement(el, name = "Upgrade Banner", category = "Upgrade Promo") {
  if (!isEnabled || !el || el.dataset.__adblockHidden) return;
  el.dataset.__adblockHidden = "true";
  el.style.setProperty("display", "none", "important");
  chrome.runtime.sendMessage({ 
    type: "AD_BLOCKED",
    name: name,
    category: category,
    timestamp: Date.now()
  }).catch(() => {});
}

function isBrandLabel(node) {
  if (node.children.length > 1) return false;
  const t = (node.textContent || "").trim().toLowerCase();
  if (t.length === 0 || t.length > 40) return false;
  return APP_CARD_BRANDS.some(b => t === b || t === b.replace(".com", ""));
}

function isAdBadge(node) {
  if (node.children.length > 0) return false;
  const t = (node.textContent || "").trim().toLowerCase();
  return AD_BADGE_LABELS.includes(t);
}

function hasVisibleBorder(el) {
  const s = getComputedStyle(el);
  const bordered = s.borderStyle !== "none" && parseFloat(s.borderWidth) > 0;
  const wideEnough = el.getBoundingClientRect().width > 250;
  return bordered && wideEnough;
}

function climbToCard(node, maxHops) {
  let target = node;
  let lastBordered = null;
  for (let i = 0; i < maxHops; i++) {
    if (!target.parentElement) break;
    target = target.parentElement;
    if (hasVisibleBorder(target)) {
      lastBordered = target;
    }
  }
  if (lastBordered) return lastBordered;
  let target2 = node;
  for (let i = 0; i < maxHops; i++) {
    if (!target2.parentElement) break;
    target2 = target2.parentElement;
    if (
      target2.matches('[role="button"], a[href]') ||
      target2.querySelectorAll("button,a").length > 0 ||
      getComputedStyle(target2).cursor === "pointer"
    ) {
      break;
    }
  }
  return target2;
}

function findAndHide(root) {
  if (!isEnabled || !root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode;
  while (node) {
    if (node.children.length <= 3 && textMatches(node)) {
      const matchPhrase = PROMO_PHRASES.find(p => (node.textContent || "").includes(p)) || "Upgrade Banner";
      hideElement(climbToCard(node, MAX_ANCESTOR_HOPS), matchPhrase, "Upgrade Promo");
    } else if (isBrandLabel(node)) {
      hideElement(climbToCard(node, MAX_CARD_ANCESTOR_HOPS), node.textContent.trim(), "Partner App");
    } else if (isAdBadge(node)) {
      hideElement(climbToCard(node, MAX_CARD_ANCESTOR_HOPS), "Sponsored Ad", "Sponsored Ad");
    }
    node = walker.nextNode();
  }
}

const observer = new MutationObserver(mutations => {
  if (!isEnabled) return;
  for (const m of mutations) {
    m.addedNodes.forEach(n => {
      if (n.nodeType === Node.ELEMENT_NODE) {
        findAndHide(n);
      }
    });
  }
});

function applyState(enabled) {
  isEnabled = enabled;
  if (isEnabled) {
    if (document.documentElement) delete document.documentElement.dataset.adblockDisabled;
    if (document.body) {
      findAndHide(document.body);
      observer.disconnect();
      observer.observe(document.body, { childList: true, subtree: true });
    }
  } else {
    if (document.documentElement) document.documentElement.dataset.adblockDisabled = "true";
    observer.disconnect();
    unhideAll();
  }
}

function init() {
  chrome.storage.local.get({ enabled: true }, (data) => {
    applyState(data.enabled);
  });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.enabled) {
    applyState(changes.enabled.newValue);
  }
});

if (document.body) init();
else document.addEventListener("DOMContentLoaded", init);`,

  'popup.html': `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, sans-serif; width: 260px; padding: 14px; margin: 0; color: #202124; background: #ffffff; }
  .header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .header img { width: 20px; height: 20px; }
  h3 { margin: 0; font-size: 14px; font-weight: 700; }
  .subtitle { font-size: 11px; color: #5f6368; margin: 2px 0 12px; }
  .toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .status { font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 6px; }
  .status.active { background: #e6f4ea; color: #137333; }
  .status.disabled { background: #f1f3f4; color: #5f6368; }
  .count-box { font-size: 11px; padding: 8px 10px; border-radius: 8px; background: #f8f9fa; border: 1px solid #eef0f2; text-align: center; margin-bottom: 10px; }
  .count-number { font-size: 22px; font-weight: 700; color: #d93025; display: block; }
  button { width: 100%; font-size: 12px; padding: 7px; border: 1px solid #dadce0; border-radius: 6px; background: white; cursor: pointer; }
</style>
</head>
<body>
  <div class="header">
    <img src="icon48.png" alt="Logo">
    <h3>ChatGPT Ad Blocker</h3>
  </div>
  <p class="subtitle">Hides upgrade banners, promo cards & ads on chatgpt.com.</p>
  <div class="toggle-row">
    <div id="status" class="status active">Active</div>
    <label><input type="checkbox" id="toggle-enabled" checked></label>
  </div>
  <div class="count-box">
    <span class="count-number" id="count">0</span>
    total blocked
  </div>
  <div id="blocked-container"></div>
  <button id="reset">Reset count & list</button>
  <script src="popup.js"></script>
</body>
</html>`,

  'popup.js': `const statusEl = document.getElementById("status");
const toggleEl = document.getElementById("toggle-enabled");
const countEl = document.getElementById("count");
const blockedContainer = document.getElementById("blocked-container");
const resetBtn = document.getElementById("reset");

function updateUI(enabled, count) {
  toggleEl.checked = enabled;
  statusEl.textContent = enabled ? "Active" : "Disabled";
  statusEl.className = "status " + (enabled ? "active" : "disabled");
  countEl.textContent = count ?? 0;
}

chrome.storage.local.get({ enabled: true, count: 0 }, (data) => {
  updateUI(data.enabled, data.count);
});

toggleEl.addEventListener("change", (e) => {
  const enabled = e.target.checked;
  chrome.storage.local.set({ enabled }, () => {
    chrome.storage.local.get({ count: 0 }, (data) => {
      updateUI(enabled, data.count);
    });
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({ count: 0, blockedItems: {} }, () => {
    updateUI(toggleEl.checked, 0);
  });
});`,

  'background.js': `function updateBadge(enabled, count) {
  if (!enabled) {
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#757575" });
  } else {
    chrome.action.setBadgeText({ text: count > 0 ? String(count) : "" });
    chrome.action.setBadgeBackgroundColor({ color: "#d93025" });
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "AD_BLOCKED") {
    chrome.storage.local.get({ enabled: true, count: 0, blockedItems: {} }, (data) => {
      if (data.enabled) {
        const count = data.count + 1;
        chrome.storage.local.set({ count });
        updateBadge(true, count);
      }
    });
  }
});`
};

// PURE JS PK ZIP CREATOR
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  CRC_TABLE[i] = c;
}

function getCrc32(bytes: Uint8Array): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

export function createZip(files: { name: string; data: Uint8Array }[]): Blob {
  const fileHeaders: Uint8Array[] = [];
  const centralDirs: Uint8Array[] = [];
  let offset = 0;
  const encoder = new TextEncoder();

  files.forEach(file => {
    const nameBytes = encoder.encode(file.name);
    const fileData = file.data;
    const fileCrc = getCrc32(fileData);
    const size = fileData.length;

    const header = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint32(14, fileCrc, true);
    view.setUint32(18, size, true);
    view.setUint32(22, size, true);
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);
    header.set(nameBytes, 30);

    fileHeaders.push(header, fileData);

    const cd = new Uint8Array(46 + nameBytes.length);
    const cdView = new DataView(cd.buffer);
    cdView.setUint32(0, 0x02014b50, true);
    cdView.setUint16(4, 20, true);
    cdView.setUint16(6, 20, true);
    cdView.setUint16(8, 0, true);
    cdView.setUint16(10, 0, true);
    cdView.setUint16(12, 0, true);
    cdView.setUint16(14, 0, true);
    cdView.setUint32(16, fileCrc, true);
    cdView.setUint32(20, size, true);
    cdView.setUint32(24, size, true);
    cdView.setUint16(28, nameBytes.length, true);
    cdView.setUint16(30, 0, true);
    cdView.setUint16(32, 0, true);
    cdView.setUint16(34, 0, true);
    cdView.setUint16(36, 0, true);
    cdView.setUint32(38, 0, true);
    cdView.setUint32(42, offset, true);
    cd.set(nameBytes, 46);

    centralDirs.push(cd);
    offset += header.length + fileData.length;
  });

  const cdOffset = offset;
  let cdSize = 0;
  centralDirs.forEach(cd => cdSize += cd.length);

  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true);
  eocdView.setUint16(4, 0, true);
  eocdView.setUint16(6, 0, true);
  eocdView.setUint16(8, files.length, true);
  eocdView.setUint16(10, files.length, true);
  eocdView.setUint32(12, cdSize, true);
  eocdView.setUint32(16, cdOffset, true);
  eocdView.setUint16(20, 0, true);

  return new Blob([...fileHeaders, ...centralDirs, eocd], { type: 'application/zip' });
}

export function initChatgptAdBlockerPage() {
  const root = document.getElementById('chatgpt-adblock-app');
  if (!root) return;

  // SIMULATOR
  const masterToggle = document.getElementById('sim-master-toggle') as HTMLInputElement | null;
  const simStatusBadge = document.getElementById('sim-status-badge');
  const popupStatusBadge = document.getElementById('popup-status-badge');
  const simBlockedCount = document.getElementById('sim-blocked-count');
  const simItemCountText = document.getElementById('sim-item-count-text');
  const simBlockedLedger = document.getElementById('sim-blocked-ledger');
  const resetSimBtn = document.getElementById('btn-sim-reset');

  const filterPromos = document.getElementById('filter-promos') as HTMLInputElement | null;
  const filterPartners = document.getElementById('filter-partners') as HTMLInputElement | null;
  const filterSponsored = document.getElementById('filter-sponsored') as HTMLInputElement | null;
  const filterSidebar = document.getElementById('filter-sidebar') as HTMLInputElement | null;

  const simElements = [
    { id: 'sim-ad-sidebar', name: 'Upgrade plan (Sidebar)', category: 'Upgrade Promo', filterInput: filterSidebar },
    { id: 'sim-ad-upsell', name: 'Unlock GPT-5 (Plus Upsell)', category: 'Upgrade Promo', filterInput: filterPromos },
    { id: 'sim-ad-canva', name: 'Canva (Partner App)', category: 'Partner App', filterInput: filterPartners },
    { id: 'sim-ad-monday', name: 'Monday.com (Sponsored Ad)', category: 'Sponsored Ad', filterInput: filterSponsored },
  ];

  function updateSimulator() {
    const isBlocking = masterToggle ? masterToggle.checked : true;
    let blockedCount = 0;
    const blockedListHtml: string[] = [];

    simElements.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const isFilterActive = item.filterInput ? item.filterInput.checked : true;
      const shouldHide = isBlocking && isFilterActive;

      if (shouldHide) {
        el.style.opacity = '0';
        el.style.maxHeight = '0px';
        el.style.paddingTop = '0px';
        el.style.paddingBottom = '0px';
        el.style.marginTop = '0px';
        el.style.marginBottom = '0px';
        el.style.overflow = 'hidden';
        el.style.pointerEvents = 'none';
        blockedCount++;

        const badgeColor = item.category === 'Partner App'
          ? 'bg-blue-500/20 text-blue-300'
          : item.category === 'Sponsored Ad'
          ? 'bg-amber-500/20 text-amber-300'
          : 'bg-purple-500/20 text-purple-300';

        blockedListHtml.push(
          '<div class="flex items-center justify-between p-8 rounded-8 bg-surface2 dark:bg-surface2-dark border border-border/60 text-xs">' +
            '<div class="flex items-center gap-6 truncate">' +
              '<span class="w-6 h-6 rounded-full bg-emerald-500 shrink-0"></span>' +
              '<span class="font-bold text-ink dark:text-ink-dark truncate">' + item.name + '</span>' +
            '</div>' +
            '<span class="text-[10px] font-mono px-6 py-1 rounded ' + badgeColor + ' shrink-0">' + item.category + '</span>' +
          '</div>'
        );
      } else {
        el.style.opacity = '1';
        el.style.maxHeight = '200px';
        el.style.removeProperty('padding-top');
        el.style.removeProperty('padding-bottom');
        el.style.removeProperty('margin-top');
        el.style.removeProperty('margin-bottom');
        el.style.overflow = 'visible';
        el.style.pointerEvents = 'auto';
      }
    });

    if (simStatusBadge) {
      simStatusBadge.textContent = isBlocking ? 'Active (Blocking)' : 'Disabled (Bypassed)';
      simStatusBadge.className = isBlocking
        ? 'text-caption font-bold text-emerald-600 dark:text-emerald-400'
        : 'text-caption font-bold text-muted dark:text-muted-dark';
    }

    if (popupStatusBadge) {
      popupStatusBadge.textContent = isBlocking ? 'ACTIVE' : 'OFF';
      popupStatusBadge.className = isBlocking
        ? 'px-8 py-3 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
        : 'px-8 py-3 rounded-full text-xs font-mono font-bold bg-slate-500/15 text-slate-500';
    }

    if (simBlockedCount) {
      simBlockedCount.textContent = String(blockedCount);
    }

    if (simItemCountText) {
      simItemCountText.textContent = blockedCount + ' detected';
    }

    if (simBlockedLedger) {
      if (blockedListHtml.length > 0) {
        simBlockedLedger.innerHTML = blockedListHtml.join('');
      } else {
        simBlockedLedger.innerHTML = '<div class="p-12 text-center text-xs text-muted dark:text-muted-dark bg-surface2/40 rounded-8 border border-dashed border-border">All ads allowed. Toggle blocker ON to hide.</div>';
      }
    }
  }

  if (masterToggle) masterToggle.addEventListener('change', updateSimulator);
  if (filterPromos) filterPromos.addEventListener('change', updateSimulator);
  if (filterPartners) filterPartners.addEventListener('change', updateSimulator);
  if (filterSponsored) filterSponsored.addEventListener('change', updateSimulator);
  if (filterSidebar) filterSidebar.addEventListener('change', updateSimulator);

  if (resetSimBtn) {
    resetSimBtn.addEventListener('click', () => {
      if (masterToggle) masterToggle.checked = true;
      if (filterPromos) filterPromos.checked = true;
      if (filterPartners) filterPartners.checked = true;
      if (filterSponsored) filterSponsored.checked = true;
      if (filterSidebar) filterSidebar.checked = true;
      updateSimulator();
    });
  }

  updateSimulator();

  // FILE TABS
  const tabButtons = root.querySelectorAll<HTMLButtonElement>('.file-tab-btn');
  const activeFileLabel = document.getElementById('active-file-label');
  const activeFileSize = document.getElementById('active-file-size');
  const activeFileContent = document.getElementById('active-file-content');
  const copyActiveFileBtn = document.getElementById('btn-copy-active-file');
  const copyActiveFileText = document.getElementById('copy-active-file-text');

  let currentActiveFileName = 'manifest.json';

  function showFile(fileName: string) {
    currentActiveFileName = fileName;
    const content = EXTENSION_FILES[fileName] || '';

    if (activeFileLabel) activeFileLabel.textContent = fileName;
    if (activeFileSize) activeFileSize.textContent = new Blob([content]).size + ' bytes';
    if (activeFileContent) activeFileContent.textContent = content;

    tabButtons.forEach(btn => {
      if (btn.dataset.file === fileName) {
        btn.className = 'file-tab-btn px-14 py-7 rounded-8 text-caption font-mono font-bold bg-accent text-white border border-accent cursor-pointer transition-all shadow-subtle shrink-0';
      } else {
        btn.className = 'file-tab-btn px-14 py-7 rounded-8 text-caption font-mono font-semibold bg-surface dark:bg-surface-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark border border-border dark:border-border-dark cursor-pointer transition-all shrink-0';
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const file = btn.dataset.file;
      if (file) showFile(file);
    });
  });

  showFile('manifest.json');

  function handleCopy(btn: HTMLElement | null, textEl: HTMLElement | null, textToCopy: string, originalLabel = 'Copy') {
    if (!btn) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (textEl) textEl.textContent = 'Copied!';
      btn.classList.add('border-emerald-500', 'text-emerald-500');
      setTimeout(() => {
        if (textEl) textEl.textContent = originalLabel;
        btn.classList.remove('border-emerald-500', 'text-emerald-500');
      }, 2000);
    });
  }

  if (copyActiveFileBtn) {
    copyActiveFileBtn.addEventListener('click', () => {
      const content = EXTENSION_FILES[currentActiveFileName] || '';
      handleCopy(copyActiveFileBtn, copyActiveFileText, content, 'Copy File');
    });
  }

  // CUSTOM RULE BUILDER
  const phrasesInput = document.getElementById('custom-phrases-input') as HTMLTextAreaElement | null;
  const brandsInput = document.getElementById('custom-brands-input') as HTMLTextAreaElement | null;
  const customJsPreview = document.getElementById('custom-js-preview');
  const copyCustomJsBtn = document.getElementById('btn-copy-custom-js');
  const copyCustomJsText = document.getElementById('copy-custom-js-text');
  const exportCustomZipBtn = document.getElementById('btn-export-custom-zip');
  const customZipBtnText = document.getElementById('custom-zip-btn-text');

  function generateCustomBlockerJs(): string {
    const phrases = (phrasesInput ? phrasesInput.value : '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const brands = (brandsInput ? brandsInput.value : '')
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    return '// Customized ChatGPT Ad Blocker Engine\n' +
      '// Generated via Nadhebe Tools (https://nadhebe.com/tools/chatgpt-ad-blocker)\n\n' +
      'const PROMO_PHRASES = ' + JSON.stringify(phrases, null, 2) + ';\n\n' +
      'const APP_CARD_BRANDS = ' + JSON.stringify(brands, null, 2) + ';\n\n' +
      'const AD_BADGE_LABELS = ["ad", "sponsored", "promoted"];\n' +
      'const MAX_ANCESTOR_HOPS = 4;\n' +
      'const MAX_CARD_ANCESTOR_HOPS = 8;\n\n' +
      'function textMatches(node) {\n' +
      '  if (!node.textContent) return false;\n' +
      '  const t = node.textContent.trim();\n' +
      '  if (t.length === 0 || t.length > 200) return false;\n' +
      '  return PROMO_PHRASES.some(p => t.includes(p));\n' +
      '}\n\n' +
      'let isEnabled = true;\n\n' +
      'function hideElement(el, name = "Promo Banner", category = "Upgrade Promo") {\n' +
      '  if (!isEnabled || !el || el.dataset.__adblockHidden) return;\n' +
      '  el.dataset.__adblockHidden = "true";\n' +
      '  el.style.setProperty("display", "none", "important");\n' +
      '  chrome.runtime.sendMessage({ type: "AD_BLOCKED", name, category, timestamp: Date.now() }).catch(() => {});\n' +
      '}\n\n' +
      'function isBrandLabel(node) {\n' +
      '  if (node.children.length > 1) return false;\n' +
      '  const t = (node.textContent || "").trim().toLowerCase();\n' +
      '  return APP_CARD_BRANDS.some(b => t === b || t === b.replace(".com", ""));\n' +
      '}\n\n' +
      'function climbToCard(node, maxHops) {\n' +
      '  let target = node;\n' +
      '  for (let i = 0; i < maxHops; i++) {\n' +
      '    if (!target.parentElement) break;\n' +
      '    target = target.parentElement;\n' +
      '    const s = getComputedStyle(target);\n' +
      '    if (s.borderStyle !== "none" && parseFloat(s.borderWidth) > 0 && target.getBoundingClientRect().width > 250) {\n' +
      '      return target;\n' +
      '    }\n' +
      '  }\n' +
      '  return target;\n' +
      '}\n\n' +
      'function findAndHide(root) {\n' +
      '  if (!isEnabled || !root) return;\n' +
      '  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);\n' +
      '  let node = walker.currentNode;\n' +
      '  while (node) {\n' +
      '    if (node.children.length <= 3 && textMatches(node)) {\n' +
      '      hideElement(climbToCard(node, MAX_ANCESTOR_HOPS), "Upgrade Banner", "Upgrade Promo");\n' +
      '    } else if (isBrandLabel(node)) {\n' +
      '      hideElement(climbToCard(node, MAX_CARD_ANCESTOR_HOPS), node.textContent.trim(), "Partner App");\n' +
      '    }\n' +
      '    node = walker.nextNode();\n' +
      '  }\n' +
      '}\n\n' +
      'const observer = new MutationObserver(mutations => {\n' +
      '  if (!isEnabled) return;\n' +
      '  for (const m of mutations) {\n' +
      '    m.addedNodes.forEach(n => { if (n.nodeType === Node.ELEMENT_NODE) findAndHide(n); });\n' +
      '  }\n' +
      '});\n\n' +
      'if (document.body) {\n' +
      '  findAndHide(document.body);\n' +
      '  observer.observe(document.body, { childList: true, subtree: true });\n' +
      '}';
  }

  function updateCustomPreview() {
    const jsCode = generateCustomBlockerJs();
    if (customJsPreview) {
      customJsPreview.textContent = jsCode;
    }
  }

  if (phrasesInput) phrasesInput.addEventListener('input', updateCustomPreview);
  if (brandsInput) brandsInput.addEventListener('input', updateCustomPreview);
  updateCustomPreview();

  if (copyCustomJsBtn) {
    copyCustomJsBtn.addEventListener('click', () => {
      handleCopy(copyCustomJsBtn, copyCustomJsText, generateCustomBlockerJs(), 'Copy Script');
    });
  }

  if (exportCustomZipBtn) {
    exportCustomZipBtn.addEventListener('click', () => {
      const encoder = new TextEncoder();
      const customBlockerJs = generateCustomBlockerJs();

      const filesToZip = [
        { name: 'manifest.json', data: encoder.encode(EXTENSION_FILES['manifest.json']) },
        { name: 'blocker.js', data: encoder.encode(customBlockerJs) },
        { name: 'hide.css', data: encoder.encode(EXTENSION_FILES['hide.css']) },
        { name: 'popup.html', data: encoder.encode(EXTENSION_FILES['popup.html']) },
        { name: 'popup.js', data: encoder.encode(EXTENSION_FILES['popup.js']) },
        { name: 'background.js', data: encoder.encode(EXTENSION_FILES['background.js']) },
      ];

      const zipBlob = createZip(filesToZip);
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chatgpt-adblock-custom.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (customZipBtnText) {
        customZipBtnText.textContent = 'Custom ZIP Downloaded!';
        setTimeout(() => {
          if (customZipBtnText) customZipBtnText.textContent = 'Generate & Download Custom ZIP';
        }, 2500);
      }
    });
  }
}
