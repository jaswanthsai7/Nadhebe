// ChatGPT re-renders via React with changing class names, so CSS alone
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

// Known "Apps in ChatGPT" partner cards (icon + brand + headline + blurb,
// shown inline between messages). Add more brand names here as you spot them.
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

const MAX_ANCESTOR_HOPS = 4; // don't climb so far we hide the whole page
const MAX_CARD_ANCESTOR_HOPS = 8; // app/ad cards nest deeper than promo text

function textMatches(node) {
  if (!node.textContent) return false;
  const t = node.textContent.trim();
  if (t.length === 0 || t.length > 200) return false; // skip huge containers
  return PROMO_PHRASES.some(p => t.includes(p));
}

const BRAND_NAMES = {
  "monday.com": "Monday.com",
  "canva": "Canva",
  "zillow": "Zillow",
  "doordash": "DoorDash",
  "coursera": "Coursera",
  "spotify": "Spotify",
  "booking.com": "Booking.com",
  "expedia": "Expedia",
  "peloton": "Peloton",
  "wolfram": "Wolfram",
  "instacart": "Instacart",
  "figma": "Figma",
  "notion": "Notion"
};

function formatBrandName(str) {
  const lower = (str || "").toLowerCase().trim();
  for (const [key, val] of Object.entries(BRAND_NAMES)) {
    if (lower === key || lower === key.replace(".com", "")) {
      return val;
    }
  }
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "Sponsored Partner";
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
  // Matches a short leaf element whose ENTIRE text is just a known brand
  // name, e.g. the "Monday.com" label at the top of an app card.
  if (node.children.length > 1) return false;
  const t = (node.textContent || "").trim().toLowerCase();
  if (t.length === 0 || t.length > 40) return false;
  return APP_CARD_BRANDS.some(b => t === b || t === b.replace(".com", ""));
}

function isAdBadge(node) {
  // Matches the small "Ad" / "Sponsored" pill badge shown on native ad cards.
  if (node.children.length > 0) return false;
  const t = (node.textContent || "").trim().toLowerCase();
  return AD_BADGE_LABELS.includes(t);
}

function extractBrandFromCard(card) {
  if (!card) return null;
  const text = (card.textContent || "").toLowerCase();
  for (const b of APP_CARD_BRANDS) {
    if (text.includes(b)) {
      return formatBrandName(b);
    }
  }
  return null;
}

function hasVisibleBorder(el) {
  const s = getComputedStyle(el);
  const bordered = s.borderStyle !== "none" && parseFloat(s.borderWidth) > 0;
  // Require real card width too, so we don't stop on a small inner header
  // row (e.g. the "Ad" badge + "..." menu strip) that happens to have its
  // own thin border/rounding.
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
      lastBordered = target; // keep climbing in case there's an outer wrapper too
    }
  }
  // Prefer the widest bordered ancestor found (the true outer card),
  // falling back to a clickable/pointer wrapper, then the raw hop limit.
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
    if (
      node.children.length <= 3 && // leaf-ish container, avoid hiding whole panels
      textMatches(node)
    ) {
      const matchPhrase = PROMO_PHRASES.find(p => (node.textContent || "").includes(p)) || "Upgrade Banner";
      hideElement(climbToCard(node, MAX_ANCESTOR_HOPS), matchPhrase, "Upgrade Promo");
    } else if (isBrandLabel(node)) {
      const brand = formatBrandName(node.textContent);
      hideElement(climbToCard(node, MAX_CARD_ANCESTOR_HOPS), brand, "Partner App");
    } else if (isAdBadge(node)) {
      const card = climbToCard(node, MAX_CARD_ANCESTOR_HOPS);
      const brand = extractBrandFromCard(card) || "Sponsored Ad";
      hideElement(card, brand, "Sponsored Ad");
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
    if (document.documentElement) {
      delete document.documentElement.dataset.adblockDisabled;
    }
    if (document.body) {
      findAndHide(document.body);
      observer.disconnect();
      observer.observe(document.body, { childList: true, subtree: true });
    }
  } else {
    if (document.documentElement) {
      document.documentElement.dataset.adblockDisabled = "true";
    }
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

if (document.body) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
