import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { PageContainer } from '../CoreUI';
import './demos.css';

export const TauriDemo = () => {
  const [greetInput, setGreetInput] = useState('World');
  const [greetResult, setGreetResult] = useState('');
  const [addA, setAddA] = useState(10);
  const [addB, setAddB] = useState(20);
  const [addResult, setAddResult] = useState<number | null>(null);
  const [systemInfo, setSystemInfo] = useState('');
  const [asyncDelay, setAsyncDelay] = useState(1000);
  const [asyncResult, setAsyncResult] = useState('');
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGreet = async () => {
    try {
      setError('');
      const result = await invoke<string>('greet', { name: greetInput });
      setGreetResult(result);
    } catch (err) {
      setError(`Error: ${err}`);
    }
  };

  const handleAdd = async () => {
    try {
      setError('');
      const result = await invoke<number>('add_numbers', { a: addA, b: addB });
      setAddResult(result);
    } catch (err) {
      setError(`Error: ${err}`);
    }
  };

  const handleGetSystemInfo = async () => {
    try {
      setError('');
      const result = await invoke<string>('get_system_info');
      setSystemInfo(result);
    } catch (err) {
      setError(`Error: ${err}`);
    }
  };

  const handleAsyncOperation = async () => {
    try {
      setError('');
      setAsyncLoading(true);
      setAsyncResult('');
      const result = await invoke<string>('async_operation', { delayMs: asyncDelay });
      setAsyncResult(result);
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setAsyncLoading(false);
    }
  };

  return (
    <PageContainer
      title="Tauri Backend Integration"
      description="Demonstrates calling Rust backend functions from React frontend"
    >
      <div className="demo-card">
        <h3>Overview</h3>
        <p>
          Tauri allows you to call Rust functions from your frontend using the{' '}
          <code className="demo-code">invoke()</code> API. This demo shows various examples of
          frontend-backend communication.
        </p>
      </div>

      {error && (
        <div className="demo-card" style={{ background: 'var(--color-error-subtle)' }}>
          <p style={{ color: 'var(--color-error)' }}>{error}</p>
        </div>
      )}

      <div className="demo-card">
        <h3>1. Simple String Command</h3>
        <p>Call a Rust function that takes a string parameter and returns a greeting.</p>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            value={greetInput}
            onChange={(e) => setGreetInput(e.target.value)}
            placeholder="Enter name"
            style={{
              padding: '8px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              background: 'var(--color-surface0)',
              color: 'var(--color-text)',
            }}
          />
          <button className="demo-btn" onClick={handleGreet}>
            Greet
          </button>
        </div>
        {greetResult && (
          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              background: 'var(--color-success-subtle)',
              borderRadius: '4px',
            }}
          >
            <strong>Result:</strong> {greetResult}
          </div>
        )}
        <pre className="demo-code" style={{ marginTop: '12px' }}>
          {`// Rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

// React
const result = await invoke<string>('greet', { name: 'World' });`}
        </pre>
      </div>

      <div className="demo-card">
        <h3>2. Numeric Operations</h3>
        <p>Call a Rust function that performs calculations with numeric parameters.</p>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="number"
            value={addA}
            onChange={(e) => setAddA(Number(e.target.value))}
            style={{
              width: '80px',
              padding: '8px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              background: 'var(--color-surface0)',
              color: 'var(--color-text)',
            }}
          />
          <span>+</span>
          <input
            type="number"
            value={addB}
            onChange={(e) => setAddB(Number(e.target.value))}
            style={{
              width: '80px',
              padding: '8px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              background: 'var(--color-surface0)',
              color: 'var(--color-text)',
            }}
          />
          <button className="demo-btn" onClick={handleAdd}>
            Calculate
          </button>
        </div>
        {addResult !== null && (
          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              background: 'var(--color-success-subtle)',
              borderRadius: '4px',
            }}
          >
            <strong>Result:</strong> {addA} + {addB} = {addResult}
          </div>
        )}
        <pre className="demo-code" style={{ marginTop: '12px' }}>
          {`// Rust
#[tauri::command]
fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

// React
const result = await invoke<number>('add_numbers', { a: 10, b: 20 });`}
        </pre>
      </div>

      <div className="demo-card">
        <h3>3. System Information</h3>
        <p>Call a Rust function that accesses system-level information.</p>
        <button className="demo-btn" onClick={handleGetSystemInfo}>
          Get System Info
        </button>
        {systemInfo && (
          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              background: 'var(--color-info-subtle)',
              borderRadius: '4px',
            }}
          >
            <strong>System Info:</strong> {systemInfo}
          </div>
        )}
        <pre className="demo-code" style={{ marginTop: '12px' }}>
          {`// Rust
#[tauri::command]
fn get_system_info() -> String {
    format!("OS: {}, Arch: {}",
        std::env::consts::OS,
        std::env::consts::ARCH)
}

// React
const info = await invoke<string>('get_system_info');`}
        </pre>
      </div>

      <div className="demo-card">
        <h3>4. Async Operations</h3>
        <p>Call an async Rust function that takes time to complete.</p>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <label>Delay (ms):</label>
          <input
            type="number"
            value={asyncDelay}
            onChange={(e) => setAsyncDelay(Number(e.target.value))}
            style={{
              width: '100px',
              padding: '8px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              background: 'var(--color-surface0)',
              color: 'var(--color-text)',
            }}
          />
          <button className="demo-btn" onClick={handleAsyncOperation} disabled={asyncLoading}>
            {asyncLoading ? 'Running...' : 'Run Async Operation'}
          </button>
        </div>
        {asyncResult && (
          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              background: 'var(--color-success-subtle)',
              borderRadius: '4px',
            }}
          >
            <strong>Result:</strong> {asyncResult}
          </div>
        )}
        <pre className="demo-code" style={{ marginTop: '12px' }}>
          {`// Rust
#[tauri::command]
async fn async_operation(delay_ms: u64) -> Result<String, String> {
    tokio::time::sleep(Duration::from_millis(delay_ms)).await;
    Ok(format!("Completed after {}ms", delay_ms))
}

// React
const result = await invoke<string>('async_operation', { delayMs: 1000 });`}
        </pre>
      </div>

      <div className="demo-card">
        <h3>Key Points</h3>
        <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
          <li>
            Use <code className="demo-code">#[tauri::command]</code> attribute to expose Rust
            functions
          </li>
          <li>
            Register commands in <code className="demo-code">invoke_handler</code> using{' '}
            <code className="demo-code">generate_handler!</code>
          </li>
          <li>
            Call from frontend using <code className="demo-code">invoke()</code> from{' '}
            <code className="demo-code">@tauri-apps/api/core</code>
          </li>
          <li>Parameter names in Rust use snake_case, but pass as camelCase from JavaScript</li>
          <li>
            Use <code className="demo-code">Result&lt;T, E&gt;</code> for error handling in Rust
          </li>
          <li>
            Async functions work seamlessly - just use <code className="demo-code">async fn</code>{' '}
            in Rust
          </li>
        </ul>
      </div>
    </PageContainer>
  );
};
