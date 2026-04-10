![Repository Banner](/assets/banner.png)

[![CI and Quality](https://github.com/jurgenjacobsen/swift/actions/workflows/ci-quality.yml/badge.svg)](https://github.com/jurgenjacobsen/swift/actions/workflows/ci-quality.yml)
[![wakatime](https://wakatime.com/badge/user/010adc07-6382-419f-87bc-0b3f507ee495/project/a53a7130-77b9-4c12-a488-018078e20f4b.svg)](https://wakatime.com/badge/user/010adc07-6382-419f-87bc-0b3f507ee495/project/a53a7130-77b9-4c12-a488-018078e20f4b)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/jurgenjacobsen/swift/main)
![GitHub top language](https://img.shields.io/github/languages/top/jurgenjacobsen/swift)
![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/ddeehpcbffikdklaelcmnkckfogofjod)
![Chrome Web Store Size](https://img.shields.io/chrome-web-store/size/ddeehpcbffikdklaelcmnkckfogofjod)

# Swift - QR Code Generator
A lightweight Google Chrome extension that creates a QR code from the current tab URL and lets you edit the content instantly.

## Features

✨ **Instant QR From Current Tab**
- Opens with the active tab URL prefilled
- Generates a QR code immediately when the popup opens
- Supports fallback handling when a tab URL is unavailable

✍️ **Live Editing**
- Edit text or paste any URL in the input field
- QR code regenerates in real time as you type

🧰 **Quick Actions**
- Use Current Tab button to refresh with the active tab URL
- Download PNG button to save the generated QR code image

🎨 **User Interface**
- Clean card-style popup with subtle gradients
- Small rounded corners for all controls
- Compact layout designed for quick copy/share workflows

## Installation

1. Clone or download this repository
2. Navigate to `chrome://extensions/` in Chrome
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `swift` folder
6. The extension icon will appear in your toolbar

## Building

### Prerequisites
- Node.js and npm installed
- TypeScript knowledge (optional)

### Build Steps

```bash
# Install dependencies
npm install

# Compile TypeScript to JavaScript
npm run build

# Watch for changes during development
npm run watch

# Package for distribution
npm run bundle
```

## Project Structure

```
swift/
├── assets/
│   └── icon.png              # Extension icon
├── scripts/
│   ├── background.js         # Placeholder service worker output (currently unused)
│   ├── offscreen.js          # Placeholder offscreen output (currently unused)
│   └── popup.js              # Popup logic (compiled from TS)
├── node_modules/
│   └── qrcode-generator/     # QR rendering runtime loaded by popup.html
├── src/
│   ├── popup.ts              # Popup logic: tab URL lookup, QR render, download
│   ├── background.ts         # Placeholder source (currently unused)
│   └── offscreen.ts          # Placeholder source (currently unused)
├── style/
│   └── popup.css             # Popup styling
├── popup.html                # Main extension popup
├── offscreen.html            # Offscreen document for audio playback
├── manifest.json             # Extension configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## File Descriptions

### popup.html
The main UI of the extension displayed when you click the toolbar icon. Features:
- Header with Swift title
- QR canvas preview area
- Editable input for URL/text content
- Action buttons for tab refresh and PNG download
- Script inclusion for QR runtime and popup logic

### style/popup.css
Popup styling includes:
- CSS custom properties for theme colors
- Card container and visual hierarchy
- Small rounded corners across controls
- Action button states and readable status text

### src/popup.ts
Main UI logic including:
- Active tab URL retrieval with Chrome tabs API
- QR code generation and rendering to canvas
- Live input event handling for instant regeneration
- Use Current Tab and Download PNG actions
- Error and unavailable URL status handling

### scripts/background.js
Compiled output from placeholder source. Not used by current QR popup flow.

### scripts/offscreen.js
Compiled output from placeholder source. Not used by current QR popup flow.

## Usage

### Generate QR From Current Tab

1. Click the Swift icon in your toolbar
2. The popup automatically reads the active tab URL
3. A QR code is generated instantly

### Edit QR Content

1. Change the text in the QR content input field
2. The canvas updates in real time

### Quick Actions

1. Click Use Current Tab to reload the active tab URL
2. Click Download PNG to save the generated QR image

## Colors & Design

The popup uses a clean, compact visual style:

- Soft background gradient
- Clear text hierarchy for title, subtitle, and status
- Subtle borders and shadows
- Small rounded corners on input, buttons, and QR card

## Browser Compatibility

- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)

## Permissions

The extension requires these permissions:

- `tabs` - To read the active tab URL for QR generation
- `activeTab` - To access the currently focused tab when popup opens

## Development

### TypeScript Compilation

The project uses TypeScript for type safety. Source files are in `src/` and compile to `scripts/`.

```bash
npm run build    # One-time compilation
npm run watch    # Watch mode for development
```

### Adding New Features

1. Create/modify `.ts` files in `src/`
2. Run `npm run build` to compile
3. Reload the extension in `chrome://extensions/`

### Debugging

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Inspect views" on the Swift extension
4. Use the DevTools console to debug

## Troubleshooting

**QR not generating?**
- Ensure `npm install` has been run so `node_modules/qrcode-generator` exists
- Reload the extension in `chrome://extensions/` after rebuilding
- Check popup console errors via Inspect views

**Current tab URL not loading?**
- Some restricted pages (for example `chrome://` pages) may not expose a usable URL
- Switch to a regular website tab and click Use Current Tab
- Confirm extension permissions are enabled

**Extension not showing?**
- Ensure the extension is enabled in `chrome://extensions/`
- Try reloading the extension (toggle off/on)
- Clear extension data and reload

## License
Affero General Public License v3.0 (AGPL-3.0)

## Author

jurgenjacobsen

## Repository

https://github.com/jurgenjacobsen/swift
