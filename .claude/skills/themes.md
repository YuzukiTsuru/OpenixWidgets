---
name: themes
description: Work with the theme system (ThemeProvider, theme switching, CSS variables)
trigger: code imports from './Themes' or '../Themes', or user asks about themes, colors, dark mode, or styling
---

# Themes Module Skill

This skill helps you work with the theme system in OpenixWidgets.

## Theme System Overview

### ThemeProvider
- React context provider that manages theme state
- Location: `src/Themes/ThemeProvider.tsx`
- Props: initialMode (light/dark/system), initialThemeIdDark, initialThemeIdLight, children
- Computes derived colors (alpha variants) from base theme colors

### useTheme Hook
- Access theme state and controls
- Returns: availableThemes, currentThemeId, currentColors, themeMode, effectiveVariant, isDark, setThemeMode, setThemeId

### Built-in Themes
Located in `src/Themes/configs/`:
- Catppuccin (Mocha, Latte)
- Dracula
- Atom One (Dark, Light)
- Arduino (Dark, Light)
- Yuzuki (Dark, Light)
- Openix (Dark, Light) - **Default theme**

## CSS Variables

All themes use CSS custom properties:
- Base colors: `--color-base`, `--color-mantle`, `--color-crust`
- Surface colors: `--color-surface0`, `--color-surface1`, `--color-surface2`
- Text colors: `--color-text`, `--color-subtext0`, `--color-subtext1`
- Overlay colors: `--color-overlay0`, `--color-overlay1`, `--color-overlay2`
- Semantic colors: `--color-accent`, `--color-success`, `--color-warning`, `--color-error`
- Derived colors: `--color-accent-dim`, `--color-success-subtle`, etc.

## Common Tasks

### Adding a new theme
1. Create theme JSON file in `src/Themes/configs/themename.json`
2. Define theme structure with variants (Dark/Light)
3. Add import to `src/Themes/configs/index.ts`
4. Add to themeConfigs array

### Using themes in components
```tsx
// In React components
const { currentColors, isDark, setThemeMode } = useTheme();

// In CSS
.my-component {
  background: var(--color-base);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

### Changing default theme
- Edit `src/Settings/Settings.tsx`
- Modify `loadUISettings()` function
- Set `themeMode: 'light'` or `'dark'`
- Set `themeIdLight` and `themeIdDark` to desired theme IDs

## Important Notes

- Theme files must be imported in `src/Themes/themes.css`
- All components should use CSS variables, not hardcoded colors
- Derived colors are computed automatically from base colors
- Theme mode can be 'light', 'dark', or 'system' (follows OS preference)
