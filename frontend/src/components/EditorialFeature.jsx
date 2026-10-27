import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EditorialFeature({ onExploreServices, onOpenBooking }) {
  return (
    <section style={{
      background: 'var(--color-stone-surface)',
      borderTop: '1px solid var(--color-stone-border)',
      borderBottom: '1px solid var(--color-stone-border)',
      padding: '5rem 0',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Editorial Headline & Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-burgundy-base)',
              marginBottom: '1rem'
            }}>
              AUSPICIOUS CEREMONIES —
            </span>

            <h2 style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '0.04em',
              color: 'var(--color-text-charcoal)',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              SACRED VIDHI &amp;<br />RAW DEVOTION
            </h2>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--color-text-stone-body)',
              maxWidth: '460px',
              marginBottom: '2.2rem'
            }}>
              Explore our authentic Vedic ceremonies, consecrated samagri, and time-honored rituals led by Pandit Rakesh Chandra Rawal with shastrik precision and pure devotion.
            </p>

            <button
              onClick={onExploreServices}
              className="btn-editorial-primary"
              style={{
                background: '#1c080e',
                borderColor: '#1c080e'
              }}
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Right Column: Editorial Visual on Concrete Pedestal */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-pedestal)',
              border: '1px solid rgba(104, 46, 54, 0.12)'
            }}>
              <img
                src="/editorial-stone-shankh.jpg"
                alt="Consecrated Shankh and Rudraksha on architectural stone pedestal"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />

              {/* Discreet Editorial Badge */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                background: 'rgba(28, 8, 14, 0.75)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                padding: '0.35rem 0.85rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                SHASTRIK PARAMPARA • 100% CONSECRATED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
