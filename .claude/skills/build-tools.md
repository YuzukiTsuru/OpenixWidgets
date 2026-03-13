---
name: build-tools
description: Work with build tools, linting, formatting, and development commands
trigger: user asks about npm scripts, eslint, prettier, typescript, or build commands
---

# Build Tools Skill

This skill helps you work with build tools and development commands in OpenixWidgets.

## Available Commands

### Development
```bash
npm run dev          # Start Vite dev server (port 1420)
npm run build        # Build TypeScript and bundle for production
npm run preview      # Preview production build
npm run tauri dev    # Start Tauri development mode
npm run tauri build  # Build Tauri application
```

### Code Quality
```bash
npm run typecheck    # Run TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Internationalization
```bash
npm run i18n:extract # Extract translation keys from code
npm run i18n:status  # Check translation coverage
npm run i18n:lint    # Find hardcoded strings
npm run i18n:types   # Generate TypeScript types
```

## Configuration Files

### ESLint (eslint.config.js)
- Uses flat config format (ESLint 9+)
- TypeScript support via typescript-eslint
- React and React Hooks plugins
- Prettier integration (no conflicts)
- Ignores: dist, node_modules, src-tauri, .claude

### Prettier (.prettierrc)
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "endOfLine": "lf"
}
```

### TypeScript (tsconfig.json)
- Target: ES2020
- Strict mode enabled
- noUnusedLocals and noUnusedParameters enabled
- JSX: react-jsx (no need to import React)

### i18next (i18next.config.ts)
- Locales: zh-CN, zh-TW, en-US, ja-JP, ko-KR
- Extracts from: `src/**/*.{js,jsx,ts,tsx}`
- Outputs to: `src/i18n/locales/{{language}}.json`

### Vite (vite.config.ts)
- React plugin enabled
- Dev server port: 1420 (fixed for Tauri)
- Ignores src-tauri directory

## Common Tasks

### Running type check before commit
```bash
npm run typecheck && npm run lint
```

### Fixing code style issues
```bash
npm run lint:fix
npm run format
```

### Updating translations
```bash
npm run i18n:extract
npm run i18n:status
```

### Building for production
```bash
npm run build
npm run tauri build  # For Tauri app
```

## Important Notes

- Always run `npm run typecheck` before committing
- Use `npm run lint:fix` to auto-fix most ESLint issues
- Prettier and ESLint are configured to work together (no conflicts)
- i18next-cli helps maintain translation consistency
- Vite dev server runs on port 1420 (required by Tauri)
- All config files use modern formats (flat config, ES modules)
