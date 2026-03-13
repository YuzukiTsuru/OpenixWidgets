---
name: coreui
description: Work with CoreUI components (Layout, Sidebar, PageContainer, Popup)
trigger: code imports from './CoreUI' or '../CoreUI', or user asks about Layout, Sidebar, PageContainer, or Popup components
---

# CoreUI Module Skill

This skill helps you work with the CoreUI components in the OpenixWidgets framework.

## Components Overview

### Layout
- Main application layout wrapper
- Props: tools, activeTool, onToolSelect, sidebarCollapsed, onToggleSidebar, onSettingsClick, title, subtitle, version, children
- Location: `src/CoreUI/Layout/`

### Sidebar
- Collapsible navigation sidebar with tool items
- Props: tools, activeTool, onToolSelect, collapsed, onToggleCollapse, onSettingsClick, locked, title, subtitle, version
- Location: `src/CoreUI/Sidebar/`
- Toggle button position can be adjusted via CSS (top property in .sidebar-toggle)

### PageContainer
- Page-level container with title and description
- Props: title, description, children
- Location: `src/CoreUI/PageContainer/`

### Popup
- Toast-style notification component
- Props: visible, type (success/error/warning/info), title, message, duration, onClose
- Location: `src/CoreUI/Popup/`

## Important Notes

- All components use **named exports only** (no default exports)
- Import example: `import { Layout, Sidebar } from './CoreUI';`
- Components use CSS variables for theming (--color-*)
- TypeScript types are exported alongside components

## Common Tasks

### Adding a new CoreUI component
1. Create component folder in `src/CoreUI/ComponentName/`
2. Create `ComponentName.tsx` with named export
3. Create `ComponentName.css` for styles
4. Create `index.ts` with: `export { ComponentName } from './ComponentName';`
5. Add export to `src/CoreUI/index.ts`

### Modifying component styles
- Edit the component's CSS file
- Use CSS variables for colors: `var(--color-text)`, `var(--color-accent)`, etc.
- Ensure styles work with all themes

### Fixing TypeScript errors
- Never use `export default` - always use named exports
- Export types separately: `export type { ComponentProps } from './Component';`
