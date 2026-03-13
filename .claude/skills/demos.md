---
name: demos
description: Work with demo components and examples
trigger: code in src/demos/ directory, or user asks about demos, examples, or ThreeColumnDemo
---

# Demos Module Skill

This skill helps you work with demo components in OpenixWidgets.

## Demo Components

### LayoutDemo
- Location: `src/demos/LayoutDemo.tsx`
- Demonstrates Layout and Sidebar components
- Shows component props and usage examples
- Uses PageContainer

### PopupDemo
- Location: `src/demos/PopupDemo.tsx`
- Demonstrates Popup component and usePopup hook
- Shows all popup types (success, error, warning, info)
- Demonstrates auto-dismiss functionality

### ThemeDemo
- Location: `src/demos/ThemeDemo.tsx`
- Demonstrates theme system
- Shows theme mode switching (light/dark/system)
- Displays current theme color palette
- Shows CSS variables usage

### ThreeColumnDemo
- Location: `src/demos/ThreeColumnDemo.tsx`
- Demonstrates three-column layout (EFELGui-style)
- **Does NOT use PageContainer** - renders full-screen
- Layout: Left sidebar (260px) + Main area (flex) with top/bottom split
- Styled with `src/demos/ThreeColumnDemo.css`

### PageContainerDemo
- Location: `src/App.tsx` (inline component)
- Demonstrates PageContainer component
- Shows basic usage and props table

### TauriDemo
- Location: `src/demos/TauriDemo.tsx`
- Demonstrates calling Rust backend functions from React
- Shows different types of Tauri commands (string, numeric, async)
- Includes error handling examples
- Uses PageContainer

## Demo Styles

### demos.css
- Location: `src/demos/demos.css`
- Shared styles for all demos
- Classes: `.demo-card`, `.demo-btn`, `.demo-badge`, `.demo-code`, `.demo-info`

### ThreeColumnDemo.css
- Location: `src/demos/ThreeColumnDemo.css`
- Specific styles for three-column layout
- Uses EFELGui naming conventions (`.efex-*`)

## Common Tasks

### Adding a new demo
1. Create demo file in `src/demos/DemoName.tsx`
2. Use PageContainer for standard demos
3. Import and add to `src/App.tsx` DEMO_TOOLS array
4. Add case in `renderContent()` switch statement
5. Use English for all text content

### Creating a full-screen demo (like ThreeColumnDemo)
1. Do NOT wrap content in PageContainer
2. Create custom CSS file for layout
3. Use `height: 100%` to fill Layout's main area
4. Ensure proper overflow handling

### Demo content guidelines
- Use English for all text
- Use CSS variables for colors
- Follow existing demo structure
- Include usage examples and props documentation
- Use `.demo-card` for content sections

## Important Notes

- All demos except ThreeColumnDemo use PageContainer
- ThreeColumnDemo renders full-screen without PageContainer
- Demo content should be in English (not Chinese)
- Use FontAwesome icons for demo tools in sidebar
- Demos are registered in App.tsx DEMO_TOOLS array
