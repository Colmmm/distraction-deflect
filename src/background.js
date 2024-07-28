chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");

  // Clear storage to remove old data
  chrome.storage.sync.clear((error) => {
    if (error) {
      console.error('Error clearing storage:', error);
    } else {
      console.log('Chrome storage cleared');

      // Initialize with empty blocked sites
      chrome.storage.sync.get({ blockedSites: [] }, (data) => {
        console.log("Initial blocked sites:", data.blockedSites);
      });
    }
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.blockedSites) {
    console.log("Blocked sites updated:", changes.blockedSites.newValue);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.storage.sync.get({ blockedSites: [] }, (data) => {
      const blockedSites = data.blockedSites || [];
      const isBlocked = blockedSites.some(site => changeInfo.url.includes(site));

      if (isBlocked) {
        chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
      }
    });
  }
});
