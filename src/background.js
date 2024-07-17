chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return { redirectUrl: "https://www.productive-site.com" };
    },
    { urls: ["*://*.example.com/*", "*://*.another-example.com/*"] },
    ["blocking"]
  );
  