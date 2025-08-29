import { useState, useCallback } from 'react';
import type { ToastType } from '../components/common/Toast';

interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const [duration, setDuration] = useState<number>(6000);

  const showToast = useCallback((message: string, type: ToastType = 'info', customDuration?: number) => {
    setToast({
      message,
      type,
      isVisible: true,
    });
    if (customDuration) {
      setDuration(customDuration);
    } else {
      setDuration(6000);
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const showSuccess = useCallback((message: string, customDuration?: number) => {
    showToast(message, 'success', customDuration);
  }, [showToast]);

  const showError = useCallback((message: string, customDuration?: number) => {
    showToast(message, 'error', customDuration);
  }, [showToast]);

  const showWarning = useCallback((message: string, customDuration?: number) => {
    showToast(message, 'warning', customDuration);
  }, [showToast]);

  const showInfo = useCallback((message: string, customDuration?: number) => {
    showToast(message, 'info', customDuration);
  }, [showToast]);

  return {
    toast,
    duration,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
