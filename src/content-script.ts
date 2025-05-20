chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_HTML") {
    console.log("GET_HTML");
    sendResponse({ html: document.documentElement.outerHTML });
  }
});
