import React from 'react';
import { X, Calendar, Clock, Globe, Sparkles, BookOpen } from 'lucide-react';

export default function ServiceDetailModal({ service, onClose, onBookService }) {
  if (!service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--color-stone-surface)',
            border: '1px solid var(--color-stone-border)',
            color: 'var(--color-burgundy-base)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          aria-label="Close modal"
        >
          <X size={19} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <picture>
            <source srcSet="/Logo-emblem-transparent.webp" type="image/webp" />
            <img
              src="/Logo-emblem-transparent.png"
              alt="Emblem"
              loading="lazy"
              decoding="async"
              style={{ width: '45px', height: '45px', objectFit: 'contain' }}
            />
          </picture>
          <div>
            <div style={{
              display: 'inline-block',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--color-burgundy-base)',
              background: 'rgba(104, 46, 54, 0.08)',
              border: '1px solid rgba(104, 46, 54, 0.2)',
              padding: '0.22rem 0.65rem',
              borderRadius: '100px',
              marginBottom: '0.5rem'
            }}>
              <span>{service.subcategory}</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.8rem)', marginBottom: '0.25rem', color: 'var(--color-text-charcoal)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              {service.title}
            </h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-stone-body)', fontFamily: 'var(--font-heading)' }}>
              {service.title_en}
            </div>
          </div>
        </div>

        {/* Meta badges row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.85rem',
          padding: '0.9rem 1.1rem',
          background: 'var(--color-stone-surface)',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--color-stone-border)',
          marginBottom: '1.5rem'
        }}>
          {service.duration && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.9rem', color: 'var(--color-text-charcoal)' }}>
              <Clock size={16} style={{ color: 'var(--color-burgundy-base)' }} />
              <span><span style={{ color: 'var(--color-text-stone-body)' }}>समय:</span> {service.duration}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.9rem', color: 'var(--color-text-charcoal)' }}>
            <Globe size={16} style={{ color: 'var(--color-burgundy-base)' }} />
            <span>
              <span style={{ color: 'var(--color-text-stone-body)' }}>माध्यम:</span> {Array.isArray(service.modes) ? service.modes.join(' / ') : service.modes}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.9rem', color: 'var(--color-text-charcoal)' }}>
            <Sparkles size={16} style={{ color: 'var(--color-burgundy-base)' }} />
            <span>
              <span style={{ color: 'var(--color-text-stone-body)' }}>सामग्री:</span> {service.samagri_included ? 'संस्थान द्वारा उपलब्ध' : 'यजमान अनुसार / सूची उपलब्ध'}
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.15rem', color: 'var(--color-burgundy-base)', marginBottom: '0.6rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
            विधि एवं स्वरूप (Ritual Overview)
          </h4>
          <p style={{ fontSize: '0.96rem', lineHeight: '1.75', marginBottom: '0.85rem', color: 'var(--color-text-charcoal)', fontWeight: 400 }}>
            {service.description}
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-stone-body)', fontStyle: 'italic', lineHeight: '1.65', fontWeight: 400 }}>
            {service.description_en}
          </p>
        </div>

        {/* Shastrik Significance */}
        {service.significance && (
          <div style={{
            padding: '1.2rem',
            background: 'var(--color-stone-surface)',
            border: '1px solid var(--color-stone-border)',
            borderLeft: '4px solid var(--color-burgundy-base)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '1.8rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-burgundy-base)',
              fontWeight: 600,
              fontSize: '0.98rem',
              marginBottom: '0.45rem'
            }}>
              <BookOpen size={17} style={{ color: 'var(--color-burgundy-base)' }} />
              <span>शास्त्रीय महत्व एवं फलश्रुति</span>
            </div>
            <p style={{ fontSize: '0.94rem', color: 'var(--color-text-charcoal)', margin: 0, lineHeight: '1.65' }}>
              {service.significance}
            </p>
          </div>
        )}

        {/* Internal Cross-Linking Navigation */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          padding: '0.85rem 1rem',
          background: 'var(--color-stone-surface)',
          border: '1px solid var(--color-stone-border)',
          borderRadius: 'var(--radius-xs)',
          marginBottom: '1.25rem',
          fontSize: '0.82rem'
        }}>
          <span style={{ color: 'var(--color-text-stone-body)', fontWeight: 600 }}>संबंधित पृष्ठ व जानकारी:</span>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="#muhurat"
              onClick={onClose}
              style={{ color: 'var(--color-burgundy-base)', textDecoration: 'none', fontWeight: 500 }}
            >
              📅 शुभ मुहूर्त तालिका
            </a>
            <span style={{ color: 'var(--color-stone-border)' }}>•</span>
            <a
              href="#about"
              onClick={onClose}
              style={{ color: 'var(--color-burgundy-base)', textDecoration: 'none', fontWeight: 500 }}
            >
              ⚜️ पंडित जी का परिचय
            </a>
            <span style={{ color: 'var(--color-stone-border)' }}>•</span>
            <a
              href="#faq"
              onClick={onClose}
              style={{ color: 'var(--color-burgundy-base)', textDecoration: 'none', fontWeight: 500 }}
            >
              ❓ अनुष्ठान प्रश्नोत्तर
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'flex-end',
          borderTop: '1px solid var(--color-stone-border)',
          paddingTop: '1.35rem'
        }}>
          <button
            onClick={onClose}
            className="btn-editorial-dark"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem' }}
          >
            बंद करें
          </button>
          <button
            onClick={() => {
              onClose();
              onBookService(service);
            }}
            className="btn-editorial-primary"
            style={{ padding: '0.75rem 1.95rem', fontSize: '0.95rem' }}
          >
            <Calendar size={17} />
            <span>{service?.category === 'ratna_salah' ? 'Consult Now' : 'Book Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
