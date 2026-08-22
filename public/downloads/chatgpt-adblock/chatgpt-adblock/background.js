function updateBadge(enabled, count) {
  if (!enabled) {
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#757575" });
  } else {
    chrome.action.setBadgeText({ text: count > 0 ? String(count) : "" });
    chrome.action.setBadgeBackgroundColor({ color: "#d93025" });
  }
}

function refreshBadge() {
  chrome.storage.local.get({ enabled: true, count: 0 }, (data) => {
    updateBadge(data.enabled, data.count);
  });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "AD_BLOCKED") {
    chrome.storage.local.get({ enabled: true, count: 0, blockedItems: {} }, (data) => {
      if (data.enabled) {
        const count = data.count + 1;
        const blockedItems = data.blockedItems || {};
        const itemName = msg.name || "Promo Banner";
        const category = msg.category || "Ad / Promo";

        if (!blockedItems[itemName]) {
          blockedItems[itemName] = {
            name: itemName,
            category: category,
            count: 1,
            lastSeen: msg.timestamp || Date.now()
          };
        } else {
          blockedItems[itemName].count += 1;
          blockedItems[itemName].lastSeen = msg.timestamp || Date.now();
        }

        chrome.storage.local.set({ count, blockedItems });
        updateBadge(true, count);
      }
    });
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && (changes.enabled || changes.count)) {
    refreshBadge();
  }
});

// Restore badge on browser restart and extension load
chrome.runtime.onStartup.addListener(refreshBadge);
chrome.runtime.onInstalled.addListener(refreshBadge);
refreshBadge();
