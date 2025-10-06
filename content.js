// content.js

let settings = {
  isEnabled: true,
  preserveIndentation: true,
};

// Selectors for code blocks
const CODE_SELECTORS = 'pre, code, .code-block, .highlight, div[class*="code"]';

// --- Core Functions ---

/**
 * Finds and prepares all code blocks on the page.
 */
function initializeCodeCleaner() {
  if (!settings.isEnabled) return;

  const codeBlocks = document.querySelectorAll(CODE_SELECTORS);
  codeBlocks.forEach(block => {
    // Ensure we only target blocks with significant code content
    if (block.textContent.trim().length > 10 && !block.hasAttribute('data-ccc-processed')) {
      // Check if the block is a child of another detected block to avoid nested buttons
      if (block.closest(CODE_SELECTORS) !== block) return;

      addCopyButton(block);
      block.setAttribute('data-ccc-processed', 'true');
    }
  });
}

/**
 * Removes all injected buttons and attributes.
 */
function cleanupCodeCleaner() {
  document.querySelectorAll('.ccc-copy-button-wrapper').forEach(btn => btn.remove());
  document.querySelectorAll('[data-ccc-processed]').forEach(el => el.removeAttribute('data-ccc-processed'));
}

/**
 * Adds a "Copy Clean" button above a given code block.
 * @param {HTMLElement} codeBlock The code block element.
 */
function addCopyButton(codeBlock) {
  const wrapper = document.createElement('div');
  wrapper.className = 'ccc-copy-button-wrapper';
  wrapper.style.position = 'relative';

  const button = document.createElement('button');
  button.textContent = 'Copy Clean';
  button.className = 'ccc-copy-button';

  button.onclick = (e) => handleCopyClick(e, codeBlock);

  // Position the button. Use parentNode to insert wrapper before codeBlock.
  codeBlock.parentNode.insertBefore(wrapper, codeBlock);
  wrapper.appendChild(codeBlock); // Move codeBlock inside the wrapper
  wrapper.insertBefore(button, codeBlock); // Add button before codeBlock inside wrapper
}

/**
 * Handles the button click event to clean and copy code.
 * @param {Event} event The click event.
 * @param {HTMLElement} codeBlock The associated code block.
 */
async function handleCopyClick(event, codeBlock) {
  const button = event.target;
  const originalText = getCodeFromBlock(codeBlock);
  const cleanedText = cleanCode(originalText);

  try {
    await navigator.clipboard.writeText(cleanedText);
    showFeedback(button, 'Copied!');
  } catch (err) {
    console.error('Copy Code Cleaner: Failed to copy text.', err);
    showFeedback(button, 'Failed!');
  }
}

/**
 * Extracts raw text from a code block, handling various structures.
 * @param {HTMLElement} codeBlock
 * @returns {string}
 */
function getCodeFromBlock(codeBlock) {
    // Clone the node to avoid modifying the original DOM
    const clone = codeBlock.cloneNode(true);
    // Remove elements that are often not part of the code itself (e.g., toolbars, line numbers)
    clone.querySelectorAll('.toolbar, .line-number, .copy-button, [aria-hidden="true"]').forEach(el => el.remove());
    return clone.innerText || clone.textContent;
}


/**
 * Cleans the raw code string.
 * @param {string} text The raw code text.
 * @returns {string} The cleaned code.
 */
function cleanCode(text) {
  // 1. Decode HTML entities
  const tempEl = document.createElement('textarea');
  tempEl.innerHTML = text;
  let decodedText = tempEl.value;

  // 2. Process lines
  const lines = decodedText.split('\n');
  let cleanedLines = lines
    .map(line => {
      // Remove common line number prefixes (e.g., "1.", "1 ", "$ ")
      return line.replace(/^\s*(\d+\.?\s*|\$\s*|>*\s*)/, '');
    })
    .map(line => line.trimEnd()); // Remove trailing whitespace

  // 3. Remove leading/trailing blank lines
  while (cleanedLines.length > 0 && cleanedLines[0].trim() === '') {
    cleanedLines.shift();
  }
  while (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1].trim() === '') {
    cleanedLines.pop();
  }

  // 4. Handle indentation
  if (!settings.preserveIndentation) {
    cleanedLines = normalizeIndentation(cleanedLines);
  }

  return cleanedLines.join('\n');
}

/**
 * Normalizes indentation by removing the common leading whitespace.
 * @param {string[]} lines Array of code lines.
 * @returns {string[]} Lines with normalized indentation.
 */
function normalizeIndentation(lines) {
  const nonEmtpyLines = lines.filter(line => line.trim() !== '');
  if (nonEmtpyLines.length === 0) return lines;

  let minIndent = Infinity;
  for (const line of nonEmtpyLines) {
    const match = line.match(/^\s*/);
    if (match) {
      minIndent = Math.min(minIndent, match[0].length);
    }
  }

  if (minIndent > 0) {
    return lines.map(line => line.startsWith(' ') ? line.substring(minIndent) : line);
  }

  return lines;
}

/**
 * Shows a brief "Copied!" tooltip on the button.
 * @param {HTMLElement} button The button that was clicked.
 * @param {string} message The message to display.
 */
function showFeedback(button, message) {
  const originalText = button.textContent;
  button.textContent = message;
  button.style.backgroundColor = '#4CAF50'; // Green feedback

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = ''; // Revert to original color
  }, 1500);
}

// --- Event Listeners and Observers ---

/**
 * MutationObserver to detect dynamically added code blocks.
 */
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      // Debounce to avoid excessive calls on rapidly changing pages
      clearTimeout(observer.debounce);
      observer.debounce = setTimeout(initializeCodeCleaner, 500);
    }
  });
});

/**
 * Starts the MutationObserver.
 */
function startObserver() {
  if (!settings.isEnabled) return;
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/**
 * Stops the MutationObserver.
 */
function stopObserver() {
  observer.disconnect();
}


// --- Initialization ---

// Add styles to the document head
function injectStyles() {
    const style = document.createElement('style');
    style.id = 'ccc-styles';
    style.textContent = `
        .ccc-copy-button-wrapper {
            position: relative;
        }
        .ccc-copy-button {
            position: absolute;
            top: 4px;
            right: 4px;
            z-index: 1000;
            padding: 4px 8px;
            font-size: 12px;
            font-family: sans-serif;
            background-color: #2a2a2a;
            color: #e0e0e0;
            border: 1px solid #555;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
        }
        .ccc-copy-button-wrapper:hover .ccc-copy-button {
            opacity: 1;
        }
        .ccc-copy-button:hover {
            background-color: #444;
        }
    `;
    document.head.appendChild(style);
}
injectStyles();


// Load settings and initialize the extension
chrome.storage.local.get(['isEnabled', 'preserveIndentation'], (result) => {
  settings.isEnabled = result.isEnabled !== false; // default to true
  settings.preserveIndentation = result.preserveIndentation !== false; // default to true

  if (settings.isEnabled) {
    initializeCodeCleaner();
    startObserver();
  }
});

// Listen for changes in settings from the popup
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    if (changes.isEnabled !== undefined) {
      settings.isEnabled = !!changes.isEnabled.newValue;
      if (settings.isEnabled) {
        initializeCodeCleaner();
        startObserver();
      } else {
        cleanupCodeCleaner();
        stopObserver();
      }
    }
    if (changes.preserveIndentation !== undefined) {
      settings.preserveIndentation = !!changes.preserveIndentation.newValue;
    }
  }
});