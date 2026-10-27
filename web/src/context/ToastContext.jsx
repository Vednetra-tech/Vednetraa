import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const newToast = { id, type, title, message, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  const toast = {
    success: (message, title = 'सफलता (Success)') => addToast({ type: 'success', title, message }),
    error: (message, title = 'त्रुटि (Error)') => addToast({ type: 'error', title, message }),
    info: (message, title = 'सूचना (Notice)') => addToast({ type: 'info', title, message }),
    warning: (message, title = 'सावधानी (Warning)') => addToast({ type: 'warning', title, message }),
    dismiss: removeToast
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} style={{ color: '#86efac', flexShrink: 0 }} />;
      case 'error':
        return <AlertCircle size={18} style={{ color: '#fca5a5', flexShrink: 0 }} />;
      case 'warning':
        return <Sparkles size={18} style={{ color: '#fde047', flexShrink: 0 }} />;
      default:
        return <Info size={18} style={{ color: 'var(--color-flame)', flexShrink: 0 }} />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'rgba(34, 197, 94, 0.45)';
      case 'error':
        return 'rgba(239, 68, 68, 0.45)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.45)';
      default:
        return 'var(--border-active)';
    }
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Floating Toast Container */}
      <div
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          maxWidth: '420px',
          width: 'calc(100% - 3rem)',
          pointerEvents: 'none'
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            style={{
              pointerEvents: 'auto',
              background: 'linear-gradient(135deg, rgba(38, 12, 17, 0.96) 0%, rgba(22, 7, 10, 0.96) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${getBorderColor(t.type)}`,
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(104, 46, 54, 0.3)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ marginTop: '2px' }}>{getToastIcon(t.type)}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {t.title && (
                <div style={{
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: 'var(--color-ivory)',
                  marginBottom: '0.15rem'
                }}>
                  {t.title}
                </div>
              )}
              <div style={{
                fontSize: '0.78rem',
                color: 'var(--color-silk)',
                lineHeight: 1.4
              }}>
                {t.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-silk)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.75,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
