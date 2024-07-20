chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.storage.sync.get({ blockedSites: [] }, (data) => {
    console.log("Initial blocked sites:", data.blockedSites);
    updateDynamicRules(data.blockedSites);
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log("Storage changed:", changes, namespace);
  if (namespace === 'sync' && changes.blockedSites) {
    updateDynamicRules(changes.blockedSites.newValue);
  }
});

if (chrome.declarativeNetRequest.onRuleMatchedDebug) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
    console.log("onRuleMatchedDebug", JSON.stringify(info, null, 2));
  });
} else {
  console.warn("declarativeNetRequest.onRuleMatchedDebug is not available.");
}

function updateDynamicRules(blockedSites) {
  console.log("Updating blocking rules for sites:", blockedSites);
  const rules = blockedSites.map((site, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "redirect", redirect: { url: "https://www.productive-site.com" } },
    condition: { urlFilter: `*://${site}/*` }
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id),
    addRules: rules
  }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      console.log("Blocking rules updated:", rules);
    }
  });
}
