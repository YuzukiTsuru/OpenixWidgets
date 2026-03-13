import React from 'react';
import { PageContainer } from '../CoreUI';

export const LayoutDemo: React.FC = () => {
  return (
    <PageContainer
      title="Layout & Sidebar"
      description="Layout and Sidebar components - You're using them right now!"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="demo-card">
          <h3>Component Overview</h3>
          <p>The entire application interface you see is the actual effect of <code>Layout</code> and <code>Sidebar</code> components:</p>
          <ul style={{ lineHeight: 2, color: 'var(--color-text)' }}>
            <li>Collapsible sidebar on the left (click the &lt; / &gt; button at the top to toggle)</li>
            <li>Sidebar tool items with highlight display (current selected item is highlighted)</li>
            <li>Settings button in the bottom right corner (click to open settings panel)</li>
            <li>Supports locked state to disable toggling</li>
          </ul>
        </div>

        <div className="demo-card">
          <h3>Basic Usage</h3>
          <pre className="demo-code">{
`import { Layout } from './CoreUI';
import type { ToolItem } from './CoreUI';

const tools: ToolItem[] = [
  { id: 'home', name: 'Home', icon: faHome, description: 'Home page' },
  { id: 'settings', name: 'Settings', icon: faCog, description: 'Settings' },
];

<Layout
  tools={tools}
  activeTool={activeTool}
  onToolSelect={setActiveTool}
  sidebarCollapsed={collapsed}
  onToggleSidebar={() => setCollapsed(!collapsed)}
  onSettingsClick={() => setSettingsVisible(true)}
  title="App Title"
  subtitle="App Subtitle"
  version="1.0.0"
>
  <YourContent />
</Layout>`
          }</pre>
        </div>

        <div className="demo-card">
          <h3>Props</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface1)' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--color-text)' }}>Prop</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--color-text)' }}>Type</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--color-text)' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['tools', 'ToolItem[]', 'Sidebar tool items list'],
                ['activeTool', 'string', 'Currently active tool ID'],
                ['onToolSelect', '(id: string) => void', 'Tool selection callback'],
                ['sidebarCollapsed', 'boolean', 'Whether sidebar is collapsed'],
                ['onToggleSidebar', '() => void', 'Toggle sidebar callback'],
                ['onSettingsClick', '() => void', 'Settings button click callback'],
                ['title', 'string', 'Application title'],
                ['subtitle', 'string', 'Application subtitle'],
                ['version', 'string', 'Version number'],
                ['children', 'ReactNode', 'Main content area'],
              ].map(([prop, type, desc]) => (
                <tr key={prop} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '10px 16px', color: 'var(--color-accent)', fontFamily: 'monospace' }}>{prop}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--color-success)', fontFamily: 'monospace' }}>{type}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--color-subtext1)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="demo-card">
          <h3>ToolItem Type</h3>
          <pre className="demo-code">{
`interface ToolItem {
  id: string;              // Unique identifier
  name: string;            // Display name
  icon: IconDefinition;    // FontAwesome icon
  description: string;     // Description text
}`
          }</pre>
        </div>
      </div>
    </PageContainer>
  );
};

export default LayoutDemo;
