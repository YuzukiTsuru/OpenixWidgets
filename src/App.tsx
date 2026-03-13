import React, { useState } from 'react';
import { ThemeProvider } from './Themes';
import { LayoutDemo } from './demos/LayoutDemo';
import { PopupDemo } from './demos/PopupDemo';
import { ThemeDemo } from './demos/ThemeDemo';
import { ThreeColumnDemo } from './demos/ThreeColumnDemo';
import { Layout, PageContainer } from './CoreUI';
import { Settings, loadUISettings, saveUISettings, UISettings } from './Settings';
import {
  faHome,
  faBell,
  faPalette,
  faCube,
  faColumns,
  faThLarge,
} from '@fortawesome/free-solid-svg-icons';
import type { ToolItem } from './CoreUI';
import './Themes/themes.css';
import './demos/demos.css';
import './i18n';

const DEMO_TOOLS: ToolItem[] = [
  {
    id: 'overview',
    name: 'Overview',
    icon: faCube,
    description: 'OpenixWidgets Framework Overview',
  },
  {
    id: 'layout',
    name: 'Layout & Sidebar',
    icon: faColumns,
    description: 'Layout and Sidebar component demo',
  },
  {
    id: 'three-column',
    name: 'Three Column',
    icon: faThLarge,
    description: 'Three-column layout example',
  },
  { id: 'popup', name: 'Popup & Hooks', icon: faBell, description: 'Popup and usePopup Hook demo' },
  {
    id: 'theme',
    name: 'Theme System',
    icon: faPalette,
    description: 'Theme system: Switch themes and preview palettes',
  },
  {
    id: 'page-container',
    name: 'PageContainer',
    icon: faHome,
    description: 'PageContainer component demo',
  },
];

const OverviewDemo: React.FC = () => (
  <PageContainer
    title="OpenixWidgets Framework Overview"
    description="A modern UI component library based on React + TypeScript"
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="demo-card">
        <h3>Framework Components</h3>
        <ul style={{ lineHeight: 2, color: 'var(--color-text)' }}>
          <li>
            <strong>CoreUI</strong> — Four core components: Layout, Sidebar, PageContainer, Popup
          </li>
          <li>
            <strong>Themes</strong> — Complete theme system with ThemeProvider + CSS variables, 6
            built-in themes
          </li>
          <li>
            <strong>Hooks</strong> — Practical React Hooks like usePopup
          </li>
          <li>
            <strong>Settings</strong> — Built-in settings panel (language, theme, sidebar)
          </li>
          <li>
            <strong>i18n</strong> — Multi-language support (Simplified Chinese, Traditional Chinese,
            English, Japanese, Korean)
          </li>
        </ul>
      </div>
      <div className="demo-card">
        <h3>Built-in Themes</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Catppuccin', 'Dracula', 'Atom One', 'Arduino', 'Yuzuki', 'Openix'].map((name) => (
            <span key={name} className="demo-badge">
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="demo-card">
        <h3>Quick Start</h3>
        <pre className="demo-code">{`import { ThemeProvider } from './Themes';
import { Layout } from './CoreUI';
import './Themes/themes.css';
import './i18n';

const App = () => (
  <ThemeProvider initialMode="dark">
    <Layout tools={tools} activeTool={id} onToolSelect={setId}
      sidebarCollapsed={collapsed} onToggleSidebar={toggle}>
      <YourContent />
    </Layout>
  </ThemeProvider>
);`}</pre>
      </div>
    </div>
  </PageContainer>
);

const PageContainerDemo: React.FC = () => (
  <PageContainer
    title="PageContainer Component"
    description="PageContainer is a page-level container that provides title, description, and content area"
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="demo-card">
        <h3>Basic Usage</h3>
        <pre className="demo-code">{`<PageContainer
  title="Page Title"
  description="Optional page description"
>
  {/* Page content */}
  <YourContent />
</PageContainer>`}</pre>
      </div>
      <div className="demo-card">
        <h3>Props</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: 'var(--color-surface1)' }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--color-text)' }}>
                Prop
              </th>
              <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--color-text)' }}>
                Type
              </th>
              <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--color-text)' }}>
                Required
              </th>
              <th style={{ padding: '10px 16px', textAlign: 'left', color: 'var(--color-text)' }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['title', 'string', '✓', 'Page title'],
              ['description', 'string', '✗', 'Optional page description'],
              ['children', 'ReactNode', '✓', 'Page content'],
            ].map(([prop, type, req, desc]) => (
              <tr key={prop} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td
                  style={{
                    padding: '10px 16px',
                    color: 'var(--color-accent)',
                    fontFamily: 'monospace',
                  }}
                >
                  {prop}
                </td>
                <td
                  style={{
                    padding: '10px 16px',
                    color: 'var(--color-success)',
                    fontFamily: 'monospace',
                  }}
                >
                  {type}
                </td>
                <td style={{ padding: '10px 16px', color: 'var(--color-text)' }}>{req}</td>
                <td style={{ padding: '10px 16px', color: 'var(--color-subtext1)' }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </PageContainer>
);

const AppContent: React.FC = () => {
  const [activeTool, setActiveTool] = useState('overview');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => loadUISettings().sidebarCollapsed);

  const handleSettingsChange = (settings: UISettings) => {
    saveUISettings(settings);
    setSidebarCollapsed(settings.sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeTool) {
      case 'layout':
        return <LayoutDemo />;
      case 'three-column':
        return <ThreeColumnDemo />;
      case 'popup':
        return <PopupDemo />;
      case 'theme':
        return <ThemeDemo />;
      case 'page-container':
        return <PageContainerDemo />;
      default:
        return <OverviewDemo />;
    }
  };

  return (
    <>
      <Layout
        tools={DEMO_TOOLS}
        activeTool={activeTool}
        onToolSelect={setActiveTool}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
        onSettingsClick={() => setSettingsVisible(true)}
        title="OpenixWidgets"
        subtitle="UI Component Framework"
        version="0.1.0"
      >
        {renderContent()}
      </Layout>
      <Settings
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onSettingsChange={handleSettingsChange}
      />
    </>
  );
};

const App: React.FC = () => {
  const saved = loadUISettings();
  return (
    <ThemeProvider
      initialMode={saved.themeMode}
      initialThemeIdDark={saved.themeIdDark}
      initialThemeIdLight={saved.themeIdLight}
    >
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
