import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n';
import { useTheme, ThemeMode } from '../Themes';
import { ThemeViewer } from '../Themes/Components';
import './Settings.css';

const THEME_MODE_OPTIONS: { value: ThemeMode; labelKey: string }[] = [
  { value: 'light', labelKey: 'themes.light' },
  { value: 'dark', labelKey: 'themes.dark' },
  { value: 'system', labelKey: 'themes.system' },
];

export interface UISettings {
  language: string;
  themeMode: ThemeMode;
  themeIdDark: string;
  themeIdLight: string;
  sidebarCollapsed: boolean;
}

export function loadUISettings(): UISettings {
  try {
    const raw = localStorage.getItem('openix-widgets-settings');
    if (raw) return JSON.parse(raw) as UISettings;
  } catch {
    // Ignore parse errors
  }
  return {
    language: 'zh-CN',
    themeMode: 'light',
    themeIdDark: 'openix-dark',
    themeIdLight: 'openix-light',
    sidebarCollapsed: false,
  };
}

export function saveUISettings(settings: UISettings): void {
  localStorage.setItem('openix-widgets-settings', JSON.stringify(settings));
}

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
  onSettingsChange?: (settings: UISettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ visible, onClose, onSettingsChange }) => {
  const { t, i18n } = useTranslation();
  const { setThemeMode, setThemeId, availableThemes, currentThemeId, effectiveVariant } =
    useTheme();
  const [settings, setSettings] = useState<UISettings>(loadUISettings);
  const [themeViewerVisible, setThemeViewerVisible] = useState(false);

  const filteredThemes = useMemo(
    () => availableThemes.filter((theme) => theme.variant === effectiveVariant),
    [availableThemes, effectiveVariant]
  );

  const validThemeId = useMemo(() => {
    const isValid = filteredThemes.some((t) => t.id === currentThemeId);
    return isValid ? currentThemeId : filteredThemes[0]?.id || currentThemeId;
  }, [filteredThemes, currentThemeId]);

  const handleChange = <K extends keyof UISettings>(key: K, value: UISettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleChange('language', lang as UISettings['language']);
  };

  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    handleChange('themeMode', mode);
  };

  const handleThemeIdChange = (themeId: string) => {
    setThemeId(themeId, effectiveVariant);
    if (effectiveVariant === 'dark') handleChange('themeIdDark', themeId);
    else handleChange('themeIdLight', themeId);
  };

  const handleSave = () => {
    saveUISettings(settings);
    onSettingsChange?.(settings);
    onClose();
  };

  const handleClose = () => {
    const saved = loadUISettings();
    i18n.changeLanguage(saved.language);
    setThemeMode(saved.themeMode);
    setThemeId(saved.themeIdDark, 'dark');
    setThemeId(saved.themeIdLight, 'light');
    setSettings(saved);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="settings-overlay" onClick={handleClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>{t('settings.title')}</h2>
          <button className="settings-close" onClick={handleClose}>
            {t('settings.close')}
          </button>
        </div>
        <div className="settings-content">
          <div className="settings-section">
            <h3>{t('settings.uiSettings')}</h3>
            <label className="settings-item">
              <span className="settings-label">{t('settings.language')}</span>
              <select
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </label>
            <label className="settings-item">
              <span className="settings-label">{t('settings.themeMode')}</span>
              <select
                value={settings.themeMode}
                onChange={(e) => handleThemeModeChange(e.target.value as ThemeMode)}
              >
                {THEME_MODE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
            </label>
            <label className="settings-item">
              <span className="settings-label">{t('settings.themeStyle')}</span>
              <select value={validThemeId} onChange={(e) => handleThemeIdChange(e.target.value)}>
                {filteredThemes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name} - {theme.variantName}
                  </option>
                ))}
              </select>
            </label>
            <div className="settings-item">
              <span className="settings-label">{t('settings.themeViewer')}</span>
              <button
                className="settings-btn settings-btn-secondary"
                onClick={() => setThemeViewerVisible(true)}
              >
                {t('settings.themeViewer')}
              </button>
            </div>
            <label className="settings-item">
              <span className="settings-label">{t('settings.sidebarCollapsed')}</span>
              <input
                type="checkbox"
                checked={settings.sidebarCollapsed}
                onChange={(e) => handleChange('sidebarCollapsed', e.target.checked)}
              />
            </label>
          </div>
        </div>
        <div className="settings-footer">
          <button className="settings-btn settings-btn-secondary" onClick={handleClose}>
            {t('settings.cancel')}
          </button>
          <button className="settings-btn settings-btn-primary" onClick={handleSave}>
            {t('settings.save')}
          </button>
        </div>
      </div>
      <ThemeViewer visible={themeViewerVisible} onClose={() => setThemeViewerVisible(false)} />
    </div>
  );
};

export default Settings;
