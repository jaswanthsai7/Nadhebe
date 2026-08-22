const statusEl = document.getElementById("status");
const toggleEl = document.getElementById("toggle-enabled");
const countEl = document.getElementById("count");
const countBoxEl = document.getElementById("count-box");
const blockedContainer = document.getElementById("blocked-container");
const resetBtn = document.getElementById("reset");

function renderBlockedList(blockedItems) {
  const items = Object.values(blockedItems || {});
  if (items.length === 0) {
    blockedContainer.innerHTML = '<div class="empty-state">No ads or promos detected yet.</div>';
    return;
  }

  // Sort by most recently blocked, then count
  items.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));

  const listEl = document.createElement("ul");
  listEl.className = "blocked-list";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "blocked-item";

    const left = document.createElement("div");
    left.className = "item-left";

    const nameSpan = document.createElement("span");
    nameSpan.className = "item-name";
    nameSpan.textContent = item.name;
    nameSpan.title = item.name;

    const badge = document.createElement("span");
    const isPartner = item.category === "Partner App";
    const isPromo = item.category === "Upgrade Promo";
    badge.className = `item-badge ${isPartner ? "partner" : isPromo ? "promo" : ""}`;
    badge.textContent = item.category || "Ad / Promo";

    left.appendChild(nameSpan);
    left.appendChild(badge);

    const countSpan = document.createElement("span");
    countSpan.className = "item-count";
    countSpan.textContent = `×${item.count}`;

    li.appendChild(left);
    li.appendChild(countSpan);
    listEl.appendChild(li);
  });

  blockedContainer.innerHTML = "";
  blockedContainer.appendChild(listEl);
}

function updateUI(enabled, count, blockedItems) {
  toggleEl.checked = enabled;
  if (enabled) {
    statusEl.textContent = "Active";
    statusEl.className = "status active";
    countBoxEl.classList.remove("dimmed");
  } else {
    statusEl.textContent = "Disabled";
    statusEl.className = "status disabled";
    countBoxEl.classList.add("dimmed");
  }
  countEl.textContent = count ?? 0;
  renderBlockedList(blockedItems);
}

function loadState() {
  chrome.storage.local.get({ enabled: true, count: 0, blockedItems: {} }, (data) => {
    updateUI(data.enabled, data.count, data.blockedItems);
  });
}

toggleEl.addEventListener("change", (e) => {
  const enabled = e.target.checked;
  chrome.storage.local.set({ enabled }, () => {
    chrome.storage.local.get({ count: 0, blockedItems: {} }, (data) => {
      updateUI(enabled, data.count, data.blockedItems);
    });
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({ count: 0, blockedItems: {} }, () => {
    chrome.storage.local.get({ enabled: true }, (data) => {
      updateUI(data.enabled, 0, {});
    });
  });
});

loadState();
