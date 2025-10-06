// popup/popup.js

document.addEventListener('DOMContentLoaded', () => {
  const enableToggle = document.getElementById('enable-toggle');
  const indentToggle = document.getElementById('indent-toggle');

  // Load settings from storage and update the UI
  chrome.storage.local.get(['isEnabled', 'preserveIndentation'], (result) => {
    enableToggle.checked = result.isEnabled !== false; // Default to true
    indentToggle.checked = result.preserveIndentation !== false; // Default to true
  });

  // Save settings when the "Enable" toggle changes
  enableToggle.addEventListener('change', () => {
    chrome.storage.local.set({ isEnabled: enableToggle.checked });
  });

  // Save settings when the "Preserve Indentation" toggle changes
  indentToggle.addEventListener('change', () => {
    chrome.storage.local.set({ preserveIndentation: indentToggle.checked });
  });
});