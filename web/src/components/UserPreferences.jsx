import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check } from 'lucide-react';
import { trackEvent } from '../utils/actionLog';

export default function UserPreferences() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('vednetra_cookie_consent');
      if (!consent) {
        // Small delay for gentle page entry
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleConsent = (choice) => {
    try {
      localStorage.setItem('vednetra_cookie_consent', choice);
    } catch {
      // Ignore
    }
    trackEvent('cookie_consent', { consent_level: choice });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="कुकीज़ एवं गोपनीयता सहमति"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        left: '1.25rem',
        maxWidth: '560px',
        margin: '0 0 0 auto',
        zIndex: 9990,
        background: 'var(--color-stone-card)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--color-stone-border)',
        borderRadius: 'var(--radius-xs)',
        padding: '1.25rem 1.4rem',
        boxShadow: '0 20px 50px rgba(71, 26, 33, 0.25)',
        animation: 'cookieSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'rgba(104, 46, 54, 0.08)',
          border: '1px solid rgba(104, 46, 54, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-burgundy-base)',
          flexShrink: 0
        }}>
          <Cookie size={18} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-charcoal)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
              गोपनीयता एवं कुकीज़ नीति (Cookie Consent)
            </span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-stone-body)', lineHeight: 1.5, margin: '0 0 0.8rem 0' }}>
            वेदनेत्र आपके प्रमाणीकरण सत्र, शुभ मुहूर्त प्राथमिकताओं एवं पूजा सङ्कल्प को सुगम बनाने हेतु आवश्यक कुकीज़ का उपयोग करता है।
          </p>

          {showDetails && (
            <div style={{
              background: 'var(--color-stone-surface)',
              border: '1px solid var(--color-stone-border)',
              borderRadius: 'var(--radius-xs)',
              padding: '0.65rem 0.85rem',
              fontSize: '0.74rem',
              color: 'var(--color-text-stone-body)',
              marginBottom: '0.85rem',
              lineHeight: 1.45
            }}>
              <div><strong>आवश्यक कुकीज़:</strong> यजमान / पंडित जी लॉगिन सत्र, सुरक्षा टोकन एवं Booking ड्राफ्ट।</div>
              <div style={{ marginTop: '0.2rem' }}><strong>प्रदर्शन कुकीज़:</strong> सर्वर रिस्पांस टाइम एवं सेवा ब्राउज़िंग विश्लेषण (कोई व्यक्तिगत विज्ञापन ट्रैकर नहीं)।</div>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', alignItems: 'center' }}>
            <button
              onClick={() => handleConsent('all')}
              className="btn-editorial-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.78rem' }}
            >
              <Check size={13} />
              <span>सभी स्वीकार करें</span>
            </button>

            <button
              onClick={() => handleConsent('essential')}
              style={{
                background: 'var(--color-stone-surface)',
                border: '1px solid var(--color-stone-border)',
                color: 'var(--color-text-charcoal)',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              केवल आवश्यक
            </button>

            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-burgundy-base)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                padding: '0.3rem 0.4rem',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              {showDetails ? 'विवरण छुपाएं' : 'नीति विवरण देखें'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cookieSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
