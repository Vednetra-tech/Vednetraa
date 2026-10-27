import React from 'react';
import { Home, Sparkles, Calendar, Phone, ArrowLeft, Compass } from 'lucide-react';

export default function NotFoundPage({ onReturnHome, onExploreServices, onOpenBooking, onOpenAstrology }) {
  return (
    <section style={{
      minHeight: '90vh',
      paddingTop: '8rem',
      paddingBottom: '5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-stone-canvas)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Celestial Rings */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        border: '1px dashed rgba(104, 46, 54, 0.15)',
        pointerEvents: 'none',
        animation: 'spinSlow 120s linear infinite'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '640px' }}>
        <img
          src="/Logo-two-tone.png"
          alt="Vedनेत्र Logo"
          style={{ height: '42px', width: 'auto', margin: '0 auto 1.5rem auto', display: 'block' }}
        />

        {/* Sacred Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'rgba(104, 46, 54, 0.08)',
          border: '1px solid rgba(104, 46, 54, 0.2)',
          color: 'var(--color-burgundy-base)',
          padding: '0.35rem 0.9rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.82rem',
          fontWeight: 600,
          marginBottom: '1.25rem'
        }}>
          <Compass size={15} />
          <span>त्रुटि ४०४ • मार्ग अनुपलब्ध (Path Not Found)</span>
        </div>

        {/* Big Vedic Numerals */}
        <div style={{
          fontSize: 'clamp(5rem, 12vw, 8rem)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          lineHeight: 1,
          background: 'linear-gradient(180deg, var(--color-burgundy-base) 0%, var(--color-text-charcoal) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.8rem',
          letterSpacing: '0.04em'
        }}>
          ४०४
        </div>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
          color: 'var(--color-text-charcoal)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          marginBottom: '0.85rem'
        }}>
          भटके हुए पथिक, यह मार्ग शास्त्रसम्मत नहीं है
        </h1>

        <p style={{
          fontSize: '0.94rem',
          color: 'var(--color-text-stone-body)',
          lineHeight: 1.7,
          maxWidth: '520px',
          margin: '0 auto 2.25rem auto'
        }}>
          जिस पृष्ठ या सेवा की आप खोज कर रहे हैं, वह स्थानांतरित हो चुकी है अथवा इस समय अनुपलब्ध है। आइए, आपको पुनः मुख्य वैदिक पीठ पर ले चलें।
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <button
            onClick={onReturnHome}
            className="btn-editorial-primary"
            style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}
          >
            <Home size={16} />
            <span>मुख्य वेदी पर लौटें (Return Home)</span>
          </button>

          <button
            onClick={onExploreServices}
            className="btn-editorial-dark"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem' }}
          >
            <Sparkles size={16} style={{ color: 'var(--color-burgundy-base)' }} />
            <span>वैदिक सेवाएं देखें</span>
          </button>
        </div>

        {/* Quick Vedic Navigation Links */}
        <div style={{
          background: 'var(--color-stone-card)',
          border: '1px solid var(--color-stone-border)',
          borderRadius: 'var(--radius-xs)',
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          fontSize: '0.84rem',
          boxShadow: 'var(--shadow-stone)'
        }}>
          <button
            onClick={onOpenBooking}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-charcoal)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              padding: '0.4rem',
              fontWeight: 500
            }}
          >
            <Calendar size={14} style={{ color: 'var(--color-burgundy-base)' }} />
            <span>Book Pooja</span>
          </button>

          <button
            onClick={onOpenAstrology}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-charcoal)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              padding: '0.4rem',
              fontWeight: 500
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--color-burgundy-base)' }} />
            <span>कुण्डली मिलान</span>
          </button>

          <a
            href="tel:+919827514489"
            style={{
              color: 'var(--color-text-charcoal)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              padding: '0.4rem',
              fontWeight: 500
            }}
          >
            <Phone size={14} style={{ color: 'var(--color-burgundy-base)' }} />
            <span>सीधा संपर्क</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
