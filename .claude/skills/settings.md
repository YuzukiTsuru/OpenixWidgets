---
name: settings
description: Work with the Settings panel and UI preferences
trigger: code imports from './Settings' or '../Settings', or user asks about settings, preferences, or configuration
---

# Settings Module Skill

This skill helps you work with the Settings panel in OpenixWidgets.

## Settings Overview

### Settings Component
- Location: `src/Settings/Settings.tsx`
- Modal panel for UI configuration
- Props: visible, onClose, onSettingsChange

### UISettings Interface
```typescript
interface UISettings {
  language: string;           // Current language code
  themeMode: ThemeMode;       // 'light' | 'dark' | 'system'
  themeIdDark: string;        // Theme ID for dark mode
  themeIdLight: string;       // Theme ID for light mode
  sidebarCollapsed: boolean;  // Sidebar state
}
```

### Storage Functions
- `loadUISettings()` - Load from localStorage
- `saveUISettings(settings)` - Save to localStorage
- Storage key: `'openix-widgets-settings'`

## Default Settings

Current defaults (in `loadUISettings()`):
```typescript
{
  language: 'zh-CN',
  themeMode: 'light',
  themeIdDark: 'openix-dark',
  themeIdLight: 'openix-light',
  sidebarCollapsed: false,
}
```

## Settings Panel Sections

### UI Settings
- Language selection (dropdown)
- Theme mode (light/dark/system)
- Theme style (filtered by current mode)
- Theme viewer button
- Sidebar collapsed toggle

## Common Tasks

### Using settings in components
```tsx
import { loadUISettings, saveUISettings } from './Settings';

const MyComponent = () => {
  const [settings, setSettings] = useState(loadUISettings);

  const handleChange = (newSettings) => {
    saveUISettings(newSettings);
    setSettings(newSettings);
  };

  return <Settings
    visible={visible}
    onClose={() => setVisible(false)}
    onSettingsChange={handleChange}
  />;
};
```

### Adding new settings
1. Add field to `UISettings` interface
2. Update `loadUISettings()` default values
3. Add UI control in Settings component
4. Update `handleChange` logic if needed

### Changing default values
- Edit `loadUISettings()` function in `src/Settings/Settings.tsx`
- Modify the return object's default values
- Users' existing settings in localStorage will not be affected

## Important Notes

- Settings persist across sessions via localStorage
- Settings panel uses translations (t() function)
- Theme changes are applied immediately via useTheme hook
- Language changes are applied immediately via i18n.changeLanguage()
- Sidebar state is managed by parent component (App.tsx)
