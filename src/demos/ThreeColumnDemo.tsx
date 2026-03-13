import React, { useState } from 'react';
import './ThreeColumnDemo.css';

interface LogEntry {
  time: string;
  level: 'info' | 'warn' | 'erro' | 'okay';
  message: string;
}

export const ThreeColumnDemo: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [inputValue, setInputValue] = useState('Sample Input');
  const [rangeValue, setRangeValue] = useState('100');
  const [dataContent, setDataContent] = useState<string[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: '14:30:15', level: 'info', message: 'Application started' },
    { time: '14:30:16', level: 'okay', message: 'System ready' },
  ]);

  const items = ['Project Alpha', 'Project Beta', 'Project Gamma'];
  const categories = ['Development', 'Testing', 'Production'];

  const addLog = (level: LogEntry['level'], message: string) => {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    setLogs((prev) => [...prev, { time, level, message }]);
  };

  const handleLoadData = () => {
    if (!selectedItem) {
      addLog('erro', 'Please select an item first');
      return;
    }
    addLog('info', `Loading data for ${selectedItem}...`);
    const data = Array.from({ length: 12 }, (_, i) => {
      const id = (i * 16).toString(16).padStart(8, '0').toUpperCase();
      return `0x${id}`;
    });
    setDataContent(data);
    addLog('okay', 'Data loaded successfully');
  };

  return (
    <div className="tc-gui">
      {/* Left Sidebar - Control Panel */}
      <div className="tc-sidebar">
        {/* Item Selection Section */}
        <div className="tc-section">
          <div className="section-header">Item Selection</div>
          <div className="section-body">
            <button className="tc-btn tc-btn-primary tc-btn-block">Refresh List</button>
            <div className="tc-device-list">
              {items.map((item) => (
                <div
                  key={item}
                  className={`tc-device-item ${selectedItem === item ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedItem(item);
                    addLog('info', `Selected: ${item}`);
                  }}
                >
                  <div className="device-name">{item}</div>
                  <div className="device-info">
                    <span className="device-mode">Status: Active</span>
                    <span className="device-status">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Configuration Section */}
        <div className="tc-section">
          <div className="section-header">Data Configuration</div>
          <div className="section-body">
            <div className="tc-form-group">
              <label>Input Field</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
              />
            </div>
            <div className="tc-form-group">
              <label>Range Value</label>
              <input
                type="text"
                value={rangeValue}
                onChange={(e) => setRangeValue(e.target.value)}
                placeholder="0-1000"
              />
            </div>
            <div className="tc-btn-row">
              <button
                className="tc-btn tc-btn-primary tc-btn-flex-3"
                onClick={handleLoadData}
                disabled={!selectedItem}
              >
                Load Data
              </button>
              <button
                className="tc-btn tc-btn-primary tc-btn-flex-1"
                disabled={dataContent.length === 0}
              >
                Export
              </button>
            </div>
          </div>
        </div>

        {/* File Operations Section */}
        <div className="tc-section">
          <div className="section-header">File Operations</div>
          <div className="section-body">
            <div className="tc-form-group">
              <label>Category</label>
              <select className="tc-select" disabled={!selectedItem}>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="tc-form-group">
              <label>File Path</label>
              <div className="tc-file-row">
                <input type="text" placeholder="Select file..." disabled={!selectedItem} />
                <button className="tc-btn tc-btn-small" disabled={!selectedItem}>
                  Browse
                </button>
              </div>
            </div>
            <button className="tc-btn tc-btn-warning tc-btn-block" disabled={!selectedItem}>
              Upload File
            </button>
          </div>
        </div>

        {/* Actions Section */}
        <div className="tc-section">
          <div className="section-header">Quick Actions</div>
          <div className="section-body">
            <div className="tc-form-group">
              <label>Action Parameter</label>
              <input type="text" placeholder="Optional parameter" disabled={!selectedItem} />
            </div>
            <button
              className="tc-btn tc-btn-warning tc-btn-block"
              disabled={!selectedItem}
              onClick={() => addLog('warn', 'Action executed')}
            >
              Execute Action
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="tc-main">
        {/* Data Viewer */}
        <div className="tc-hex-container">
          <div className="section-header">
            <div className="hex-header">
              <span>Data Viewer</span>
              <div className="hex-header-controls">
                <span className="hex-header-label">Format:</span>
                <select className="tc-select tc-select-inline">
                  <option>Hexadecimal</option>
                  <option>Decimal</option>
                  <option>Binary</option>
                </select>
              </div>
            </div>
          </div>
          {dataContent.length > 0 ? (
            <div className="hex-view">
              {dataContent.map((addr, i) => (
                <div key={i} className="hex-row">
                  <span className="hex-addr">{addr}</span>
                  <span className="hex-bytes">
                    {Array.from({ length: 16 }, () =>
                      Math.floor(Math.random() * 256)
                        .toString(16)
                        .padStart(2, '0')
                        .toUpperCase()
                    ).join(' ')}
                  </span>
                  <span className="hex-ascii">
                    {Array.from({ length: 16 }, () =>
                      String.fromCharCode(33 + Math.floor(Math.random() * 94))
                    ).join('')}
                  </span>
                  <span className="hex-disasm">
                    {['ADD', 'SUB', 'MOV', 'JMP', 'CMP'][Math.floor(Math.random() * 5)]} R
                    {Math.floor(Math.random() * 8)}, #{Math.floor(Math.random() * 256)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="tc-empty-hex">
              No data available. Click &quot;Load Data&quot; to display content.
            </div>
          )}
        </div>

        {/* Log Panel */}
        <div className="tc-log-container">
          <div className="section-header">Activity Log</div>
          <div className="tc-log">
            {logs.map((log, i) => (
              <div key={i} className={`tc-log-entry log-${log.level}`}>
                <span className="log-time">{log.time}</span>
                <span className="log-level">[{log.level.toUpperCase()}]</span>
                <span className="log-msg">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnDemo;
