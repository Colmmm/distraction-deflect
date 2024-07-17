// background.js (Service Worker)
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      id: 1,
      priority: 1,
      action: { type: "redirect", redirect: { url: "https://www.productive-site.com" }},
      condition: { urlFilter: "*://*.example.com/*" }
    },
    {
      id: 2,
      priority: 1,
      action: { type: "redirect", redirect: { url: "https://www.productive-site.com" }},
      condition: { urlFilter: "*://*.another-example.com/*" }
    }],
    removeRuleIds: [1, 2]
  });
});

// Event listener to handle requests
self.addEventListener('fetch', (event) => {
  // Handle fetch events here if needed
});