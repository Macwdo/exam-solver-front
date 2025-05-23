chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_HTML") {
    sendResponse({ html: document.documentElement.outerHTML });
  }
});
