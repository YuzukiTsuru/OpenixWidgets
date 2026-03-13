import { useState, useCallback } from 'react';

export type PopupType = 'info' | 'warning' | 'error' | 'success';

export interface PopupState {
  visible: boolean;
  type: PopupType;
  title: string;
  message: string;
}

export function usePopup() {
  const [popup, setPopup] = useState<PopupState>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
  });

  const showPopup = useCallback((type: PopupType, title: string, message: string) => {
    setPopup({ visible: true, type, title, message });
  }, []);

  const hidePopup = useCallback(() => {
    setPopup((prev) => ({ ...prev, visible: false }));
  }, []);

  return { popup, showPopup, hidePopup, setPopup };
}
