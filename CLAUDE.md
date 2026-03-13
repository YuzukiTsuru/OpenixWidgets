# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenixWidgets is a modern UI component framework built with React, TypeScript, and Tauri. It provides a complete theming system, internationalization support, and reusable UI components for building desktop applications.

## Development Commands

```bash
# Start development server (Vite only, no Tauri)
npm run dev

# Build TypeScript and bundle for production
npm run build

# Preview production build
npm run preview

# Run Tauri commands (requires Rust toolchain)
npm run tauri dev    # Start Tauri development mode
npm run tauri build  # Build Tauri application

# Type checking (no dedicated script, use directly)
npx tsc --noEmit
```

## Architecture

### Core Module Structure

The codebase is organized into distinct modules under `src/`:

- **CoreUI/** - Four foundational components that work together:
  - `Layout` - Main application layout wrapper
  - `Sidebar` - Collapsible navigation sidebar with tool items
  - `PageContainer` - Page-level container with title/description
  - `Popup` - Toast-style notification component

- **Themes/** - Complete theming system using CSS variables:
  - `ThemeProvider` - React context provider that manages theme state
  - `configs/` - Theme definitions (Catppuccin, Dracula, Atom One, Arduino, Yuzuki, Openix)
  - Computes derived colors (alpha variants) from base theme colors
  - Supports light/dark mode with separate theme selection per mode
  - All themes use CSS custom properties (--color-*) for styling

- **Settings/** - Built-in settings panel component:
  - Manages language, theme mode, theme selection, and sidebar state
  - Persists to localStorage via `loadUISettings()` / `saveUISettings()`

- **i18n/** - Internationalization using i18next:
  - Supports: zh-CN, zh-TW, en-US, ja-JP, ko-KR
  - Auto-detects browser language, falls back to zh-CN
  - Import `./i18n` in entry point to initialize

- **Hooks/** - Custom React hooks (e.g., `usePopup`)

- **demos/** - Demo components showcasing framework features

### Component Export Pattern

All modules use named exports only (no default exports):

```typescript
// ✓ Correct
export { Component } from './Component';
export type { ComponentProps } from './Component';

// ✗ Incorrect - causes TypeScript errors
export default Component;
```

### Theme System Integration

Components should use CSS variables for all colors:

```css
color: var(--color-text);
background: var(--color-surface0);
border: 1px solid var(--color-border);
```

Available color variables include: `--color-base`, `--color-mantle`, `--color-crust`, `--color-surface0/1/2`, `--color-text`, `--color-subtext0/1`, `--color-overlay0/1/2`, `--color-accent`, `--color-success`, `--color-warning`, `--color-error`, and their derived variants (dim, muted, subtle, shadow, border).

### Typical Application Setup

```typescript
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
        {content}
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

## TypeScript Configuration

- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- Remove unused imports immediately to avoid type errors
- Use `npx tsc --noEmit` to check for type errors before committing

## Tauri Integration

This is a Tauri v2 application. The Rust backend is in `src-tauri/`. Vite dev server runs on port 1420 (fixed port required by Tauri).
