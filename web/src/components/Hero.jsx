import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

const floatingSacredEntities = [
  { id: 1, text: 'ॐ', size: '2.5rem', top: '10%', left: '7%', anim: 'floatRandom1', dur: '24s', delay: '-3s', opacity: 0.24 },
  { id: 2, text: 'ॐ नमः शिवाय', size: '1.2rem', top: '22%', left: '80%', anim: 'floatRandom2', dur: '30s', delay: '-9s', opacity: 0.2 },
  { id: 3, text: '卐', size: '2rem', top: '76%', left: '10%', anim: 'floatRandom3', dur: '26s', delay: '-14s', opacity: 0.2 },
  { id: 4, text: 'ॐ नमो भगवते वासुदेवाय', size: '1.1rem', top: '14%', left: '62%', anim: 'floatRandom4', dur: '34s', delay: '-18s', opacity: 0.18 },
  { id: 5, text: '☸', size: '2.3rem', top: '68%', left: '86%', anim: 'floatRandom1', dur: '28s', delay: '-5s', opacity: 0.22 },
  { id: 6, text: 'ॐ भूर्भुवः स्वः', size: '1.25rem', top: '84%', left: '66%', anim: 'floatRandom2', dur: '32s', delay: '-12s', opacity: 0.19 },
  { id: 7, text: '🔱', size: '1.9rem', top: '36%', left: '5%', anim: 'floatRandom3', dur: '27s', delay: '-16s', opacity: 0.2 },
  { id: 8, text: 'ॐ गं गणपतये नमः', size: '1.15rem', top: '48%', left: '88%', anim: 'floatRandom4', dur: '29s', delay: '-2s', opacity: 0.18 },
  { id: 9, text: '🪷', size: '1.8rem', top: '88%', left: '32%', anim: 'floatRandom1', dur: '25s', delay: '-11s', opacity: 0.22 },
  { id: 10, text: 'ॐ महालक्ष्म्यै नमः', size: '1.15rem', top: '8%', left: '34%', anim: 'floatRandom2', dur: '36s', delay: '-20s', opacity: 0.19 },
  { id: 11, text: 'सत्यमेव जयते', size: '1.1rem', top: '56%', left: '4%', anim: 'floatRandom3', dur: '31s', delay: '-7s', opacity: 0.16 },
  { id: 12, text: 'ॐ त्र्यम्बकं यजामहे', size: '1.1rem', top: '66%', left: '22%', anim: 'floatRandom4', dur: '33s', delay: '-23s', opacity: 0.18 },
  { id: 13, text: '🪔', size: '1.8rem', top: '24%', left: '22%', anim: 'floatRandom1', dur: '22s', delay: '-6s', opacity: 0.22 },
  { id: 14, text: 'शुभम् भवतु', size: '1.2rem', top: '38%', left: '76%', anim: 'floatRandom2', dur: '27s', delay: '-15s', opacity: 0.18 },
  { id: 15, text: 'ॐ नमो नारायणाय', size: '1.15rem', top: '92%', left: '78%', anim: 'floatRandom3', dur: '35s', delay: '-8s', opacity: 0.17 },
  { id: 16, text: 'वसुधैव कुटुम्बकम्', size: '1.05rem', top: '6%', left: '84%', anim: 'floatRandom4', dur: '38s', delay: '-25s', opacity: 0.16 }
];

export default function Hero({ onOpenBooking, onOpenAstrology, onExploreServices }) {
  return (
    <section id="hero" style={{
      position: 'relative',
      paddingTop: '9.8rem',
      paddingBottom: '3.5rem',
      overflow: 'hidden',
      background: 'var(--color-stone-canvas)',
      minHeight: '88vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      scrollMarginTop: '120px'
    }}>
      {/* Background Animated Sacred Mantras & Vedic Symbols Wandering Around */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {floatingSacredEntities.map((item) => (
          <span
            key={item.id}
            className="sacred-mantra-particle"
            style={{
              top: item.top,
              left: item.left,
              fontSize: item.size,
              opacity: item.opacity,
              animation: `${item.anim} ${item.dur} ease-in-out infinite alternate`,
              animationDelay: item.delay
            }}
          >
            {item.text}
          </span>
        ))}

        {/* Central Rotating Sacred Chakra in Lighter Royal Burgundy */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '640px',
          height: '640px',
          maxWidth: '92vw',
          maxHeight: '92vw',
          pointerEvents: 'none',
          opacity: 0.13,
          animation: 'ambientRotate 90s linear infinite',
          transform: 'translate(-50%, -50%)'
        }}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#8C424E" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="76" fill="none" stroke="#682E36" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#8C424E" strokeWidth="0.6" strokeDasharray="2 2" />
            <circle cx="100" cy="100" r="24" fill="none" stroke="#682E36" strokeWidth="0.8" />
            {[...Array(16)].map((_, i) => (
              <path
                key={i}
                d="M100 100 L95 18 Q100 8 105 18 Z"
                fill="none"
                stroke="#8C424E"
                strokeWidth="0.75"
                transform={`rotate(${i * 22.5} 100 100)`}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={100 + 44 * Math.cos((i * 45 * Math.PI) / 180)}
                cy={100 + 44 * Math.sin((i * 45 * Math.PI) / 180)}
                r="2.5"
                fill="#8C424E"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Giant Editorial Brand Typography: Vedनेत्र (Calculated Line-Height and Padding to Never Cut Off Matras) */}
        <div className="hero-title-wrapper" style={{
          textAlign: 'center',
          userSelect: 'none',
          position: 'relative',
          zIndex: 1,
          overflow: 'visible'
        }}>
          <h1 style={{
            fontFamily: "'Rozha One', 'Cinzel', serif",
            fontSize: 'clamp(2.75rem, 9.5vw, 8.8rem)',
            fontWeight: 700,
            letterSpacing: '0.02em',
            lineHeight: 1.18,
            color: 'var(--color-text-charcoal)',
            textTransform: 'none',
            margin: 0,
            padding: '0.25rem 0',
            opacity: 0.96
          }}>
            Vedनेत्र
          </h1>

          {/* Clean Sub-header for Mobile & Desktop */}
          <div className="hero-mobile-subtag" style={{
            fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-burgundy-base)',
            fontWeight: 600,
            marginTop: '0.15rem',
            marginBottom: '1rem'
          }}>
            पं. राकेश चन्द्र रावल • सनातन वैदिक अनुष्ठान संस्थान
          </div>
        </div>

        {/* 3-Column Layout on Desktop / Clean Uncluttered Stacking on Mobile */}
        <div className="hero-content-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr minmax(260px, 380px) 1fr',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left Block (Desktop only details / streamlined) */}
          <div className="hero-col-left" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingRight: '1rem'
          }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-burgundy-base)',
              marginBottom: '0.4rem'
            }}>
              SACRED TRADITION
            </span>

            <h2 style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(1.35rem, 2.1vw, 2.1rem)',
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: '0.04em',
              color: 'var(--color-text-charcoal)',
              textTransform: 'uppercase',
              marginBottom: '1.15rem'
            }}>
              WISDOM<br />THAT ENDURES
            </h2>

            <p style={{
              fontSize: '0.86rem',
              lineHeight: 1.65,
              color: 'var(--color-text-stone-body)',
              marginBottom: '1.4rem',
              maxWidth: '280px'
            }}>
              Authentic Vedic rituals and Rasamrit Shrimad Bhagwat Katha guided by Pandit Rakesh Chandra Rawal.
            </p>

            <button
              onClick={onOpenBooking}
              className="btn-editorial-primary"
              style={{
                background: '#1c080e',
                borderColor: '#1c080e'
              }}
            >
              <span>BOOK NOW</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Center Column: Pedestal Centerpiece on Natural Stone Blocks */}
          <div className="hero-col-center" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '350px',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-pedestal)',
              border: '1px solid rgba(104, 46, 54, 0.12)',
              background: 'var(--color-stone-surface)'
            }}>
              <picture>
                <source srcSet="/hero-pedestal-kalash.jpg" type="image/jpeg" />
                <img
                  src="/hero-pedestal-kalash.jpg"
                  alt="Consecrated brass Kalash on natural stone pedestal - Vedनेत्र"
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '3 / 4',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </picture>

              {/* Consecrated Tag */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(28, 8, 14, 0.84)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#ffffff',
                padding: '0.4rem 1.1rem',
                borderRadius: '2px',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}>
                <img
                  src="/Logo-emblem-transparent.png"
                  alt=""
                  style={{ width: '15px', height: '15px', objectFit: 'contain' }}
                />
                <span>100% SHASTRIYA SANKALP</span>
              </div>
            </div>

            {/* Clean Mobile-Only Action Buttons Container (Only Necessary Details on Mobile) */}
            <div className="hero-mobile-actions" style={{
              display: 'none',
              width: '100%',
              maxWidth: '350px',
              marginTop: '1.4rem',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <button
                onClick={onOpenBooking}
                className="btn-editorial-primary"
                style={{
                  width: '100%',
                  background: '#1c080e',
                  borderColor: '#1c080e',
                  justifyContent: 'center',
                  padding: '0.9rem 1.5rem'
                }}
              >
                <span>BOOK NOW</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onOpenAstrology}
                className="btn-editorial-outline"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.8rem 1.5rem'
                }}
              >
                <span>CONSULT NOW</span>
              </button>
            </div>
          </div>

          {/* Right Text Block (Desktop only details) */}
          <div className="hero-col-right" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingLeft: '1rem'
          }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-burgundy-base)',
              marginBottom: '0.4rem'
            }}>
              VEDIC CEREMONIES
            </span>

            <h3 style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(1.15rem, 1.8vw, 1.6rem)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--color-text-charcoal)',
              textTransform: 'uppercase',
              margin: '0 0 0.5rem 0'
            }}>
              COLLECTION NO. 1
            </h3>

            <div style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'var(--color-text-charcoal)',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              EST. GURUKUL PARAMPARA
            </div>

            <p style={{
              fontSize: '0.82rem',
              lineHeight: 1.65,
              color: 'var(--color-text-stone-muted)',
              marginBottom: '1.5rem',
              maxWidth: '280px'
            }}>
              पं. राकेश चन्द्र रावल • हरिद्वार एवं ऋषिकेश पावन तीर्थ पीठ। सादा व संगीतमय कथा, रुद्राभिषेक एवं नवग्रह शांति।
            </p>

            <button
              onClick={onExploreServices}
              className="link-editorial-underline"
              style={{
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                color: 'var(--color-text-charcoal)'
              }}
            >
              EXPLORE ALL SERVICES
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Styles: Perfectly Clean, Zero-Overlap, Essential-Only Details on Mobile */}
      <style>{`
        /* Desktop spacing */
        @media (min-width: 881px) {
          .hero-title-wrapper {
            margin-bottom: -1.6rem;
          }
          .hero-mobile-subtag {
            display: none !important;
          }
        }

        /* Mobile View: No Overlap, Clean Pedestal & Direct CTAs */
        @media (max-width: 880px) {
          #hero {
            padding-top: 9.6rem !important;
            padding-bottom: 2.5rem !important;
            min-height: auto !important;
            scroll-margin-top: 130px !important;
          }
          .hero-title-wrapper {
            margin-bottom: 0.5rem !important;
            padding: 0.25rem 0 !important;
          }
          .hero-content-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            margin-top: 0 !important;
          }
          /* Hide non-essential desktop clutter on mobile */
          .hero-col-left,
          .hero-col-right {
            display: none !important;
          }
          .hero-col-center {
            width: 100% !important;
          }
          .hero-mobile-actions {
            display: flex !important;
          }
        }

        @media (max-width: 480px) {
          #hero {
            padding-top: 10.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
