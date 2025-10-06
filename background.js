// background.js

// Set default settings on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    isEnabled: true,
    preserveIndentation: true,
  });
});