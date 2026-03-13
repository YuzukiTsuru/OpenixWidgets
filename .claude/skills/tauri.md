---
name: tauri
description: Work with Tauri backend integration and Rust commands
trigger: code imports from '@tauri-apps/api', or user asks about Tauri, Rust backend, or invoke commands
---

# Tauri Integration Skill

This skill helps you work with Tauri backend integration in OpenixWidgets.

## Tauri Overview

Tauri is a framework for building desktop applications using web technologies with a Rust backend. It allows you to call Rust functions from your frontend JavaScript/TypeScript code.

### Backend Location
- Rust code: `src-tauri/src/lib.rs`
- Main entry: `src-tauri/src/main.rs`

### Frontend API
- Import: `import { invoke } from '@tauri-apps/api/core';`
- Call commands: `await invoke<ReturnType>('command_name', { param: value })`

## Available Commands

### greet
```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
```

Usage:
```typescript
const result = await invoke<string>('greet', { name: 'World' });
```

### add_numbers
```rust
#[tauri::command]
fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}
```

Usage:
```typescript
const result = await invoke<number>('add_numbers', { a: 10, b: 20 });
```

### get_system_info
```rust
#[tauri::command]
fn get_system_info() -> String {
    format!("OS: {}, Arch: {}", std::env::consts::OS, std::env::consts::ARCH)
}
```

Usage:
```typescript
const info = await invoke<string>('get_system_info');
```

### async_operation
```rust
#[tauri::command]
async fn async_operation(delay_ms: u64) -> Result<String, String> {
    tokio::time::sleep(tokio::time::Duration::from_millis(delay_ms)).await;
    Ok(format!("Async operation completed after {}ms", delay_ms))
}
```

Usage:
```typescript
const result = await invoke<string>('async_operation', { delayMs: 1000 });
```

## Common Tasks

### Adding a new Tauri command

1. Add the command function in `src-tauri/src/lib.rs`:
```rust
#[tauri::command]
fn my_command(param: String) -> String {
    // Your logic here
    format!("Result: {}", param)
}
```

2. Register the command in the `invoke_handler`:
```rust
.invoke_handler(tauri::generate_handler![
    greet,
    add_numbers,
    get_system_info,
    async_operation,
    my_command  // Add your command here
])
```

3. Call from frontend:
```typescript
const result = await invoke<string>('my_command', { param: 'value' });
```

### Error handling

Use `Result<T, E>` in Rust for commands that can fail:
```rust
#[tauri::command]
fn risky_operation(value: i32) -> Result<String, String> {
    if value < 0 {
        return Err("Value must be positive".to_string());
    }
    Ok(format!("Success: {}", value))
}
```

Frontend:
```typescript
try {
    const result = await invoke<string>('risky_operation', { value: -1 });
} catch (error) {
    console.error('Command failed:', error);
}
```

### Parameter naming convention

- Rust uses snake_case: `delay_ms`, `user_name`
- JavaScript uses camelCase: `delayMs`, `userName`
- Tauri automatically converts between them

Example:
```rust
#[tauri::command]
fn process_data(user_name: String, max_items: i32) -> String {
    // ...
}
```

```typescript
await invoke('process_data', { userName: 'Alice', maxItems: 10 });
```

## TauriDemo Component

Location: `src/demos/TauriDemo.tsx`

Demonstrates:
- Simple string commands
- Numeric operations
- System information access
- Async operations with loading states
- Error handling

## Important Notes

- All commands must have `#[tauri::command]` attribute
- Commands must be registered in `invoke_handler`
- Use TypeScript generics with `invoke<T>()` for type safety
- Async Rust functions work seamlessly with JavaScript promises
- Parameter names are automatically converted between snake_case and camelCase
- Use `Result<T, E>` for error handling in Rust
- Frontend errors can be caught with try/catch

## Development Commands

```bash
# Run Tauri in development mode
npm run tauri dev

# Build Tauri application
npm run tauri build
```
