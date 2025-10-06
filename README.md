# 🧹 Copy Code Cleaner

[![Version](https://img.shields.io/badge/version-1.0-brightgreen)](manifest.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Repo Size](https://img.shields.io/github/repo-size/EternalKnight002/copy-code-cleaner)](https://github.com/EternalKnight002/copy-code-cleaner)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-brightgreen.svg?style=flat)](https://github.com/EternalKnight002/copy-code-cleaner/pulls)

A lightweight Chrome Extension that adds a "Copy Clean" button to code blocks on any website, allowing you to copy code without line numbers, formatting, or other unwanted clutter.

---

## 🎯 The Problem

Have you ever copied a code snippet from a blog, tutorial, or Stack Overflow, only to paste a mess of line numbers, hidden characters, and weird indentation into your editor?

**Copy Code Cleaner** solves this by intelligently detecting code blocks and giving you a one-click button to copy the pure, raw code to your clipboard.

## ✨ Features

-   📋 **One-Click Clean Copy**: Copies code to your clipboard without any unwanted extras.
-   🌐 **Works Everywhere**: Detects code blocks on nearly any website (`<pre>`, `<code>`, etc.).
-   🧠 **Smart Cleaning**: Removes line numbers, trims whitespace, and decodes HTML entities.
-   🚀 **Lightweight & Fast**: Built with plain JavaScript (no frameworks) for maximum performance.
-   🔧 **Configurable**: Use the popup to enable/disable the extension or to preserve original indentation.
-   👀 **Dynamic Detection**: Uses a `MutationObserver` to find code blocks loaded dynamically after the page loads.


## 🛠️ Installation

You can install the extension in two ways:

### 1. Manual Installation (For Developers)

1.  **Download:** Clone or download this repository as a ZIP file and unzip it.
    ```bash
    git clone [https://github.com/EternalKnight002/copy-code-cleaner.git](https://github.com/EternalKnight002/copy-code-cleaner.git)
    ```
2.  **Open Chrome Extensions:** Open Google Chrome and navigate to `chrome://extensions`.
3.  **Enable Developer Mode:** In the top-right corner, toggle on **"Developer mode"**.
4.  **Load the Extension:**
    -   Click the **"Load unpacked"** button.
    -   Select the `copy-code-cleaner` folder you just downloaded.

The extension is now installed and active!

### 2. Chrome Web Store (Coming Soon!)

*(Once you publish the extension, you can replace this with a direct link.)*

[Link to Chrome Web Store]

## 🚀 How to Use

1.  **Browse:** Navigate to any webpage containing a code block (e.g., a tutorial, documentation, or Stack Overflow).
2.  **Hover:** Move your mouse over the code block. A **"Copy Clean"** button will appear at the top right.
3.  **Click & Paste:** Click the button. A "Copied!" confirmation will appear. Paste the clean code directly into your editor!

### Extension Popup Settings

Click the extension's icon in your Chrome toolbar to open the settings popup:

-   **Enable Buttons:** Globally turn the "Copy Clean" buttons on or off.
-   **Preserve Indentation:** Choose whether to keep the original indentation or "flatten" the code by removing common leading whitespace.

## 💻 Tech Stack

-   **Manifest V3:** The latest standard for Chrome Extensions.
-   **JavaScript (ES6+):** No frameworks, just modern, vanilla JS.
-   **HTML5 & CSS3:** For the popup and button styling.
-   **Chrome APIs:** `storage` and `runtime` for managing settings and state.

## 🤝 Contributing

Contributions are welcome! Whether it's a bug report, a feature request, or a pull request, your help is appreciated.

1.  **Fork** the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and **commit** them (`git commit -m 'Add some amazing feature'`).
4.  **Push** to the branch (`git push origin feature/your-feature-name`).
5.  Open a **Pull Request**.

Please open an issue first to discuss any significant changes.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [EternalKnight002](https://github.com/EternalKnight002)
