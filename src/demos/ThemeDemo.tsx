import React from 'react';
import { useTheme } from '../Themes';
import { PageContainer } from '../CoreUI';

export const ThemeDemo: React.FC = () => {
  const {
    availableThemes,
    currentThemeId,
    effectiveVariant,
    themeMode,
    setThemeMode,
    setThemeId,
    currentColors,
  } = useTheme();

  const darkThemes = availableThemes.filter((t) => t.variant === 'dark');
  const lightThemes = availableThemes.filter((t) => t.variant === 'light');
  const currentThemes = effectiveVariant === 'dark' ? darkThemes : lightThemes;

  return (
    <PageContainer
      title="Theme System"
      description="Theme system demo: Switch themes and modes in real-time"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="demo-card">
          <h3>Theme Mode</h3>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            {(['light', 'dark', 'system'] as const).map((mode) => (
              <button
                key={mode}
                className={`demo-btn ${themeMode === mode ? 'demo-btn-primary' : 'demo-btn-secondary'}`}
                onClick={() => setThemeMode(mode)}
              >
                {mode === 'light' ? 'Light' : mode === 'dark' ? 'Dark' : 'System'}
              </button>
            ))}
          </div>
          <p style={{ marginTop: '8px', color: 'var(--color-overlay0)', fontSize: '13px' }}>
            Current effective mode: <strong>{effectiveVariant}</strong>
          </p>
        </div>

        <div className="demo-card">
          <h3>Theme Selection ({effectiveVariant === 'dark' ? 'Dark' : 'Light'})</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
            {currentThemes.map((theme) => (
              <button
                key={theme.id}
                className={`demo-btn ${currentThemeId === theme.id ? 'demo-btn-primary' : 'demo-btn-secondary'}`}
                onClick={() => setThemeId(theme.id, theme.variant)}
                style={{ minWidth: '120px' }}
              >
                {theme.name} {theme.variantName}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-card">
          <h3>Current Theme Palette</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '10px',
              marginTop: '12px',
            }}
          >
            {Object.entries(currentColors).map(([key, value]) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '6px',
                    background: value,
                    border: '1px solid var(--color-border)',
                  }}
                />
                <span
                  style={{ fontSize: '11px', color: 'var(--color-subtext1)', textAlign: 'center' }}
                >
                  {key}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-overlay0)',
                    fontFamily: 'monospace',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="demo-card">
          <h3>CSS Variables Usage</h3>
          <pre className="demo-code">{`/* Use theme variables in CSS */
.my-component {
  background: var(--color-base);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.accent-text { color: var(--color-accent); }
.success-bg  { background: var(--color-success-subtle); }
.error-text  { color: var(--color-error); }

/* Use useTheme in React */
const { currentColors, isDark, setThemeMode, setThemeId } = useTheme();`}</pre>
        </div>
      </div>
    </PageContainer>
  );
};

export default ThemeDemo;
