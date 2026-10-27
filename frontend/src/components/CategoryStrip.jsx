import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryStrip({ onSelectCategory, onOpenBooking, onOpenAstrology }) {
  const categories = [
    {
      id: 'katha',
      title: 'BHAGWAT KATHA',
      subtitle: 'Refined shastriya discourses',
      actionText: 'EXPLORE KATHA',
      image: '/cat-katha-stone.jpg',
      alt: 'Vedic scripture on stone pedestal',
      onClick: () => onSelectCategory('katha')
    },
    {
      id: 'pooja',
      title: 'VISHISHT POOJA',
      subtitle: 'Classic & online sacred utility',
      actionText: 'BOOK NOW',
      image: '/cat-pooja-stone.jpg',
      alt: 'Consecrated brass thali on stone pedestal',
      onClick: () => onOpenBooking()
    },
    {
      id: 'ratna_salah',
      title: 'JYOTISH & RATNA',
      subtitle: 'Pure planetary form & remedy',
      actionText: 'CONSULT NOW',
      image: '/cat-ratna-stone.jpg',
      alt: 'Consecrated gemstones on stone pedestal',
      onClick: () => onOpenAstrology()
    }
  ];

  return (
    <section style={{
      background: 'var(--color-stone-dark)',
      borderTop: '1px solid rgba(234, 139, 112, 0.15)',
      borderBottom: '1px solid rgba(234, 139, 112, 0.15)',
      padding: '2.5rem 0',
      color: '#ffffff'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={cat.onClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') cat.onClick(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                cursor: 'pointer',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'transform 0.25s ease, background 0.25s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Thumbnail Image */}
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                flexShrink: 0,
                background: '#2b1016',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <img
                  src={cat.image}
                  alt={cat.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>

              {/* Text Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-sans)',
                  margin: 0
                }}>
                  {cat.title}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.65)',
                  margin: 0,
                  fontWeight: 400
                }}>
                  {cat.subtitle}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'var(--color-terracotta)',
                  textTransform: 'uppercase',
                  marginTop: '0.2rem'
                }}>
                  <span>{cat.actionText}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
