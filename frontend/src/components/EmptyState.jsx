import React from 'react';
import { Sparkles, Calendar, Search, FileText } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Search,
  title = 'कोई परिणाम नहीं मिला',
  description = 'आपके द्वारा चुने गए मानदंडों के अनुसार कोई विवरण उपलब्ध नहीं है। कृपया फ़िल्टर बदलें।',
  actionText = 'सभी सेवाएं देखें',
  onAction = null
}) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '3.5rem 1.5rem',
      background: 'var(--color-stone-surface)',
      border: '1px dashed var(--color-stone-border)',
      borderRadius: 'var(--radius-xs)',
      maxWidth: '520px',
      margin: '2rem auto'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'rgba(104, 46, 54, 0.08)',
        border: '1px solid rgba(104, 46, 54, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.25rem auto',
        color: 'var(--color-burgundy-base)'
      }}>
        <Icon size={26} />
      </div>

      <h3 style={{
        fontSize: '1.25rem',
        color: 'var(--color-text-charcoal)',
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        marginBottom: '0.45rem'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '0.86rem',
        color: 'var(--color-text-stone-body)',
        lineHeight: 1.6,
        maxWidth: '420px',
        margin: '0 auto 1.5rem auto'
      }}>
        {description}
      </p>

      {onAction && actionText && (
        <button
          onClick={onAction}
          className="btn-editorial-primary"
          style={{ padding: '0.6rem 1.35rem', fontSize: '0.86rem' }}
        >
          <Sparkles size={14} />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
