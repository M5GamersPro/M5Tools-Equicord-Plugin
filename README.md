# M5Tools

A sleek, draggable, and production-ready **floating utility toolbar** built natively for the **Equicord** desktop client environment. Designed to bypass Content Security Policy (CSP) and runtime isolation restrictions by executing direct memory-hook operations.

![License](https://shields.io)
![Version](https://shields.io)

## ✨ Features

* **Draggable Pill Interface**: Smooth, white, rounded "pill-style" UI inspired by modern component design. It can be clicked and dragged anywhere across your Discord canvas view.
* **Token Utilities**: Bypasses local storage sandbox boundaries to extract raw tokens or custom-scrambled encrypted configurations straight to your clipboard.
* **Automation Automation Framework**: Pre-configured HTTP fetch handlers built to capture, accept, and batch-process active promotional Discord Quests in a single click.
* **Zero External Dependencies**: Self-contained module logic ensuring compilation compatibility without throwing path resolution errors.

## 🚀 Installation & Setup

Since this plugin operates inside the main Equicord repository workspace monorepo, follow these steps to deploy it:

### 1. File Placement
Place the code files inside your user plugins development space using the exact file structure below:

```text
equicord/
└── src/
    └── userplugins/
        └── m5tools/
            └── index.ts
```

### 2. Manual Registration
Because this module operates independently of a `plugin.json` setup, register it directly in the core engine index:
1. Open **`src/plugins/index.ts`**.
2. Add the path reference import at the top of the file:
   ```typescript
   import m5tools from "../userplugins/m5tools";
   ```
3. Insert **`m5tools`** directly into the core `plugins` array object initialization list.

### 3. Compilation & Injection
Open your terminal inside the root `equicord` folder directory and execute the build pipeline commands:

```bash
# Install required monorepo workspaces dependencies
npx pnpm install

# Compile the user plugin source assets
npx pnpm build

# Inject the freshly compiled modules into the desktop runtime
npx pnpm inject
```

### 4. Client Refresh
* Fully close your **Equicord desktop app** from your Windows notifications system tray (Right-click -> **Quit Discord**).
* Reopen the client. The white floating **M5 Tools** toolbar will automatically initialize on boot.

## 🛠️ Built-In Core Actions

* **COPY TOKEN**: Hooks into active Webpack memory states to copy your decrypted, plain-text authorization string.
* **ENROLL ALL QUESTS**: Sends bulk network requests to fetch and auto-accept all currently available promotional quests.
* **COPY ENCRYPTED TOKEN**: Encodes the authorization payload into an obfuscated Base64-reversed token string to protect it from generic crawlers.
* **CLAIM ALL QUESTS**: Dispatches batch-claim payloads to automatically collect rewards for all completed, unredeemed quest milestones.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Developed by **M5** (ID: `1088354509677404201`) @7xr*
