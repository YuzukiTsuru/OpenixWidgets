import React, { useState } from 'react';
import { PageContainer, Popup } from '../CoreUI';
import { usePopup } from '../Hooks';
import type { PopupType } from '../CoreUI';

const POPUP_TYPES: { type: PopupType; label: string; title: string; message: string }[] = [
  { type: 'success', label: 'Success', title: 'Operation Successful', message: 'Your operation has been completed successfully! Data saved to local storage.' },
  { type: 'error', label: 'Error', title: 'Operation Failed', message: 'An error occurred. Please check your configuration and try again. Error code: ERR_001' },
  { type: 'warning', label: 'Warning', title: 'Warning', message: 'This operation will modify system configuration. Please confirm to continue.' },
  { type: 'info', label: 'Info', title: 'Information', message: 'Current version is v0.1.0. Visit the official repository for updates.' },
];

export const PopupDemo: React.FC = () => {
  const { popup, showPopup, hidePopup } = usePopup();
  const [autoDismiss, setAutoDismiss] = useState(false);
  const [manualVisible, setManualVisible] = useState(false);
  const [manualType, setManualType] = useState<PopupType>('info');

  return (
    <PageContainer
      title="Popup & usePopup"
      description="Demonstration of Popup component and usePopup Hook usage"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <div className="demo-card">
          <h3>usePopup Hook Demo</h3>
          <p>Use the <code>usePopup</code> hook to manage popup state. Supports 4 types.</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
            {POPUP_TYPES.map(({ type, label, title, message }) => (
              <button
                key={type}
                className={`demo-btn demo-btn-${type}`}
                onClick={() => showPopup(type, title, message)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-card">
          <h3>Auto Dismiss (duration)</h3>
          <p>Set the <code>duration</code> prop to automatically close the popup after specified milliseconds.</p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '12px' }}>
            <label style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--color-text)' }}>
              <input
                type="checkbox"
                checked={autoDismiss}
                onChange={(e) => setAutoDismiss(e.target.checked)}
              />
              Enable 3-second auto dismiss
            </label>
            <button
              className="demo-btn demo-btn-primary"
              onClick={() => showPopup('success', 'Auto Dismiss', autoDismiss ? 'This popup will close automatically in 3 seconds.' : 'This popup requires manual closing.')}
            >
              Show Popup
            </button>
          </div>
        </div>

        <div className="demo-card">
          <h3>Direct Popup Control</h3>
          <p>You can also control the <code>Popup</code> component directly with props, without using the hook.</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
            {(['info', 'success', 'warning', 'error'] as PopupType[]).map((type) => (
              <button
                key={type}
                className={`demo-btn demo-btn-${type}`}
                onClick={() => { setManualType(type); setManualVisible(true); }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-card">
          <h3>API Reference</h3>
          <pre className="demo-code">{
`// usePopup Hook
const { popup, showPopup, hidePopup } = usePopup();
showPopup('success', 'Title', 'Message content');

// Popup Component Props
<Popup
  visible={boolean}
  type="success" | "error" | "warning" | "info"
  title="Title"
  message="Message content"
  duration={3000}       // Auto-dismiss milliseconds (optional)
  onClose={() => {}}    // Close callback
/>`
          }</pre>
        </div>
      </div>

      {/* Popup controlled by usePopup */}
      <Popup
        visible={popup.visible}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={hidePopup}
        duration={autoDismiss ? 3000 : undefined}
      />
      {/* Manually controlled popup */}
      <Popup
        visible={manualVisible}
        type={manualType}
        title={`Manual Control - ${manualType}`}
        message="This popup is controlled directly through Popup component props, without using the usePopup hook."
        onClose={() => setManualVisible(false)}
      />
    </PageContainer>
  );
};

export default PopupDemo;
