// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

#[tauri::command]
fn get_system_info() -> String {
    format!(
        "OS: {}, Arch: {}",
        std::env::consts::OS,
        std::env::consts::ARCH
    )
}

#[tauri::command]
async fn async_operation(delay_ms: u64) -> Result<String, String> {
    tokio::time::sleep(tokio::time::Duration::from_millis(delay_ms)).await;
    Ok(format!("Async operation completed after {}ms", delay_ms))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            add_numbers,
            get_system_info,
            async_operation
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
