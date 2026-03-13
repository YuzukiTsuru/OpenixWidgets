import React from 'react';
import { useTheme } from '../ThemeProvider';
import { useTranslation } from 'react-i18next';
import './ThemeViewer.css';

interface ThemeViewerProps {
  visible: boolean;
  onClose: () => void;
}

const ThemeViewer: React.FC<ThemeViewerProps> = ({ visible, onClose }) => {
  const { currentThemeId, availableThemes } = useTheme();
  const { t } = useTranslation();

  const currentTheme = availableThemes.find((t) => t.id === currentThemeId);

  if (!visible || !currentTheme) return null;

  return (
    <div className="theme-viewer-overlay" onClick={onClose}>
      <div className="theme-viewer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="theme-viewer-header">
          <h2>
            {t('themeViewer.title')} - {currentTheme.name} ({currentTheme.variantName})
          </h2>
          <button className="theme-viewer-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="theme-viewer-content">
          <div className="theme-card" data-theme={currentTheme.variant}>
            <div className="theme-preview">
              <div className="preview-section">
                <h5>{t('themeViewer.buttons')}</h5>
                <div className="preview-buttons">
                  <button className="preview-btn preview-btn-primary">{t('themeViewer.primaryButton')}</button>
                  <button className="preview-btn preview-btn-secondary">{t('themeViewer.secondaryButton')}</button>
                  <button className="preview-btn preview-btn-success">{t('themeViewer.success')}</button>
                  <button className="preview-btn preview-btn-warning">{t('themeViewer.warning')}</button>
                  <button className="preview-btn preview-btn-error">{t('themeViewer.error')}</button>
                  <button className="preview-btn" disabled>{t('themeViewer.disabled')}</button>
                </div>
              </div>
              <div className="preview-section">
                <h5>{t('themeViewer.inputFields')}</h5>
                <div className="preview-inputs">
                  <input type="text" placeholder={t('themeViewer.textInput')} className="preview-input" />
                  <input type="email" placeholder={t('themeViewer.emailInput')} className="preview-input" />
                  <select className="preview-select">
                    <option>{t('themeViewer.selectOption')}</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                  <textarea placeholder={t('themeViewer.textarea')} className="preview-textarea" rows={3} />
                </div>
              </div>
              <div className="preview-section">
                <h5>{t('themeViewer.progressBars')}</h5>
                <div className="preview-progress-container">
                  <div className="preview-progress-label">
                    <span>{t('themeViewer.progress25')}</span>
                    <div className="preview-progress"><div className="preview-progress-bar" style={{ width: '25%' }} /></div>
                  </div>
                <div className="preview-progress-label">
                    <span>{t('themeViewer.progress50')}</span>
                    <div className="preview-progress"><div className="preview-progress-bar" style={{ width: '50%' }} /></div>
                  </div>
                  <div className="preview-progress-label">
                    <span>{t('themeViewer.progress75')}</span>
                    <div className="preview-progress"><div className="preview-progress-bar" style={{ width: '75%' }} /></div>
                  </div>
                  <div className="preview-progress-label">
                    <span>{t('themeViewer.progress100')}</span>
                    <div className="preview-progress"><div className="preview-progress-bar" style={{ width: '100%' }} /></div>
                  </div>
                </div>
              </div>
              <div className="preview-section">
                <h5>{t('themeViewer.cards')}</h5>
                <div className="preview-cards">
                  <div className="preview-card">
                    <div className="preview-card-header">{t('themeViewer.cardTitle')}</div>
                    <div className="preview-card-body">{t('themeViewer.cardBody')}</div>
                    <div className="preview-card-footer">
                      <button className="preview-btn preview-btn-primary">{t('themeViewer.cardAction')}</button>
                    </div>
                  </div>
                  <div className="preview-card preview-card-accent">
                    <div className="preview-card-header">{t('themeViewer.accentCardTitle')}</div>
                    <div className="preview-card-body">{t('themeViewer.accentCardBody')}</div>
                    <div className="preview-card-footer">
                      <button className="preview-btn preview-btn-secondary">{t('themeViewer.cardAction')}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="preview-section">
                <h5>{t('themeViewer.alerts')}</h5>
                <div className="preview-alerts">
                  <div className="preview-alert preview-alert-info">{t('themeViewer.infoAlert')}</div>
                  <div className="preview-alert preview-alert-success">{t('themeViewer.successAlert')}</div>
                  <div className="preview-alert preview-alert-warning">{t('themeViewer.warningAlert')}</div>
                  <div className="preview-alert preview-alert-error">{t('themeViewer.errorAlert')}</div>
                </div>
              </div>
              <div className="preview-section">
                <h5>{t('themeViewer.typography')}</h5>
                <div className="preview-typography">
                  <h1>{t('themeViewer.heading1')}</h1>
                  <h2>{t('themeViewer.heading2')}</h2>
                  <h3>{t('themeViewer.heading3')}</h3>
                  <p>{t('themeViewer.paragraph')}</p>
                  <p><small>{t('themeViewer.smallText')}</small></p>
                  <p><strong>{t('themeViewer.boldText')}</strong></p>
                  <p><em>{t('themeViewer.italicText')}</em></p>
                  <a href="#">{t('themeViewer.linkText')}</a>
                </div>
              </div>
              <div className="preview-section">
                <h5>{t('themeViewer.badges')}</h5>
                <div className="preview-badges">
                  <span className="preview-badge preview-badge-primary">{t('themeViewer.primaryBadge')}</span>
                  <span className="preview-badge preview-badge-secondary">{t('themeViewer.secondaryBadge')}</span>
                  <span className="preview-badge preview-badge-success">{t('themeViewer.successBadge')}</span>
                  <span className="preview-badge preview-badge-warning">{t('themeViewer.warningBadge')}</span>
                  <span className="preview-badge preview-badge-error">{t('themeViewer.errorBadge')}</span>
                </div>
              </div>
              <div className="preview-section">
                <h5>{t('themeViewer.toggles')}</h5>
                <div className="preview-toggles">
                  <label className="preview-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="preview-toggle-slider" />
                    <span>{t('themeViewer.toggleOn')}</span>
                  </label>
                  <label className="preview-toggle">
                    <input type="checkbox" />
                    <span className="preview-toggle-slider" />
                    <span>{t('themeViewer.toggleOff')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeViewer;
