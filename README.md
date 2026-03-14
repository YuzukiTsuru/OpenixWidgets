# OpenixWidgets

A modern UI component framework built for OpenixSuit, with React, TypeScript, and Tauri. OpenixWidgets provides a complete theming system, internationalization support, and reusable UI components for building beautiful desktop applications.

<img width="1282" height="930" alt="image" src="https://github.com/user-attachments/assets/2b2f0caf-f164-4499-aed6-74fc9e53680d" />

## Features

- **🎨 Comprehensive Theming System** - 7 built-in themes with light/dark variants
- **🌍 Internationalization** - Support for 5 languages (zh-CN, zh-TW, en-US, ja-JP, ko-KR)
- **🧩 Modular Components** - Layout, Sidebar, PageContainer, Popup, and Settings
- **⚡ Tauri Integration** - Full support for Rust backend communication
- **🎯 TypeScript First** - Fully typed with strict mode enabled
- **💅 CSS Variables** - Dynamic theming with CSS custom properties

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Rust toolchain (for Tauri features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/OpenixWidgets.git
cd OpenixWidgets

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build web version
npm run build

# Build Tauri desktop app
npm run tauri build
```

## Project Structure

```
src/
├── CoreUI/              # Core UI components
│   ├── Layout/          # Main application layout
│   ├── Sidebar/         # Collapsible navigation sidebar
│   ├── PageContainer/   # Page-level container
│   └── Popup/           # Toast notification system
├── Themes/              # Theming system
│   ├── configs/         # Theme definitions (JSON)
│   ├── Components/      # ThemeProvider component
│   └── themes.css       # CSS variable definitions
├── Settings/            # Settings panel component
├── i18n/                # Internationalization
├── Hooks/               # Custom React hooks
└── demos/               # Demo components
```

## Available Themes

OpenixWidgets includes 7 carefully crafted themes:

- **Catppuccin** - Mocha, Macchiato, Frappé, Latte
- **Dracula** - Dark
- **GitHub** - Dark, Light
- **Atom One** - Dark, Light
- **Arduino** - Dark, Light
- **Yuzuki** - Dark, Light
- **Openix** - Dark, Light

## Usage Example

```tsx
import { ThemeProvider } from './Themes';
import { Layout } from './CoreUI';
import { Settings, loadUISettings } from './Settings';
import './Themes/themes.css';
import './i18n';

const App = () => {
  const saved = loadUISettings();

  return (
    <ThemeProvider
      initialMode={saved.themeMode}
      initialThemeIdDark={saved.themeIdDark}
      initialThemeIdLight={saved.themeIdLight}
    >
      <Layout
        tools={toolItems}
        activeTool={activeId}
        onToolSelect={setActiveId}
        sidebarCollapsed={collapsed}
        onToggleSidebar={toggleCollapsed}
        onSettingsClick={() => setSettingsVisible(true)}
      >
        {/* Your content here */}
      </Layout>

      <Settings
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onSettingsChange={saveUISettings}
      />
    </ThemeProvider>
  );
};
```

## Development Scripts

```bash
# Development
npm run dev              # Start Vite dev server
npm run tauri dev        # Start Tauri development mode

# Building
npm run build            # Build for production
npm run preview          # Preview production build
npm run tauri build      # Build Tauri application

# Code Quality
npm run typecheck        # Run TypeScript type checking
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Internationalization
npm run i18n:extract     # Extract translation keys
npm run i18n:status      # Check translation status
npm run i18n:lint        # Lint translation files
npm run i18n:types       # Generate TypeScript types
```

## Theming

All components use CSS variables for styling. Available color variables:

```css
/* Base colors */
--color-base, --color-mantle, --color-crust
--color-surface0, --color-surface1, --color-surface2
--color-text, --color-subtext0, --color-subtext1
--color-overlay0, --color-overlay1, --color-overlay2

/* Semantic colors */
--color-accent, --color-success, --color-warning, --color-error

/* Derived variants */
--color-accent-dim, --color-accent-muted, --color-accent-subtle
--color-accent-shadow, --color-accent-border
/* Similar variants for success, warning, error */
```

## Internationalization

The framework uses i18next for internationalization. Language is auto-detected from the browser with fallback to zh-CN.

Supported languages:
- 🇨🇳 Chinese (Simplified) - zh-CN/Chinese (Traditional) - zh-TW
- 🇺🇸 English - en-US
- 🇯🇵 Japanese - ja-JP
- 🇰🇷 Korean - ko-KR

## Tauri Integration

OpenixWidgets includes full Tauri v2 support for building desktop applications. The demo showcases:

- String and numeric parameter passing
- System information access
- Async operations with Rust backend
- Error handling patterns

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Use named exports only (no default exports)
2. Follow TypeScript strict mode
3. Use CSS variables for all colors
4. Run linting and formatting before committing
5. Write clear commit messages

## License

Apache2.0 License - see LICENSE file for details

## Acknowledgments

- Built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- Desktop support via [Tauri](https://tauri.app/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Themes inspired by Catppuccin, Dracula, GitHub, and more
