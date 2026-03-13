---
name: hooks
description: Work with custom React hooks (usePopup, etc.)
trigger: code imports from './Hooks' or '../Hooks', or user asks about custom hooks
---

# Hooks Module Skill

This skill helps you work with custom React hooks in OpenixWidgets.

## Available Hooks

### usePopup
- Location: `src/Hooks/usePopup.ts`
- Manages popup/toast notification state
- Returns: `{ popup, showPopup, hidePopup }`

## usePopup Hook

### Usage
```tsx
import { usePopup } from './Hooks';

const MyComponent = () => {
  const { popup, showPopup, hidePopup } = usePopup();

  const handleClick = () => {
    showPopup('success', 'Success!', 'Operation completed.');
  };

  return (
    <>
      <button onClick={handleClick}>Show Popup</button>
      <Popup
        visible={popup.visible}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={hidePopup}
      />
    </>
  );
};
```

### Return Values

#### popup (PopupState)
```typescript
interface PopupState {
  visible: boolean;
  type: PopupType;      // 'success' | 'error' | 'warning' | 'info'
  title: string;
  message: string;
}
```

#### showPopup(type, title, message)
- Shows a popup with the specified type, title, and message
- Type: `'success' | 'error' | 'warning' | 'info'`

#### hidePopup()
- Hides the currently visible popup

## Common Tasks

### Adding a new custom hook
1. Create hook file in `src/Hooks/useHookName.ts`
2. Export hook function with `use` prefix
3. Add export to `src/Hooks/index.ts`
4. Document hook usage and return values

### Using multiple popups
```tsx
// For multiple independent popups, create multiple instances
const popup1 = usePopup();
const popup2 = usePopup();

// Each instance manages its own state
popup1.showPopup('success', 'Title 1', 'Message 1');
popup2.showPopup('error', 'Title 2', 'Message 2');
```

## Important Notes

- All hooks must follow React hooks rules (use prefix, call at top level)
- Hooks are exported as named exports only
- usePopup manages local state - each instance is independent
- For global popup state, consider using React Context instead
