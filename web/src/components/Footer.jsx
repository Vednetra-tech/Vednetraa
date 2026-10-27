import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onSelectCategory, onOpenTerms, onToggleAdmin }) {
  return (
    <footer style={{
      background: 'var(--color-stone-dark)',
      borderTop: '1px solid rgba(234, 139, 112, 0.2)',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      position: 'relative',
      color: '#ffffff'
    }}>
      <div className="container">
        {/* Sacred Vedic Shloka Ribbon */}
        <div style={{
          textAlign: 'center',
          maxWidth: '760px',
          margin: '0 auto 3.2rem auto',
          padding: '1.25rem 1.6rem',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid rgba(234, 139, 112, 0.2)',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{
            fontSize: '1.15rem',
            color: 'var(--color-champagne-300)',
            fontFamily: 'var(--font-serif-royal)',
            fontWeight: 500,
            marginBottom: '0.35rem',
            letterSpacing: '0.04em'
          }}>
            ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--color-text-subtle)' }}>
            (हे प्रभु! हमें असत्य से सत्य की ओर, अंधकार से प्रकाश की ओर, और मृत्यु से अमरता की ओर ले चलिए।)
          </div>
        </div>

        {/* Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.2rem'
        }}>
          {/* Column 1: Brand & Spacious Logo */}
          <div>
            <div style={{ marginBottom: '1.2rem' }}>
              <picture>
                <source srcSet="/Logo-transparent.webp" type="image/webp" />
                <img
                  src="/Logo-transparent.png"
                  alt="VedNetra Logo - Pandit Rakesh Chandra Rawal"
                  loading="lazy"
                  decoding="async"
                  style={{
                    height: '48px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </picture>
            </div>

            <div style={{ fontSize: '0.98rem', fontWeight: 500, color: 'var(--color-champagne-300)', marginBottom: '0.5rem' }}>
              पं. राकेश चन्द्र रावल
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.75' }}>
              श्रीमद्भागवत कथा, विशिष्ट पूजा, दोष निवारण, रत्न Consultation, रुद्राभिषेक एवं वैदिक हवन का प्रामाणिक संस्थान।
            </p>
          </div>

          {/* Column 2: Katha & Pooja */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--color-ivory)', marginBottom: '1rem' }}>
              कथा एवं पूजन सेवाएं
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  श्रीमद्भागवत कथा (सादा पाठ)
                </a>
              </li>
              <li>
                <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  संगीतमय भागवत कथा
                </a>
              </li>
              <li>
                <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  विशिष्ट ऑनलाइन पूजा
                </a>
              </li>
              <li>
                <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  गृह एवं पारिवारिक ऑफलाइन पूजा
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Dosh, Jyotish & Hawan */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--color-ivory)', marginBottom: '1rem' }}>
              दोष शांति व ज्योतिष
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  सम्पूर्ण दोष निवारण (कालसर्प / पितृ)
                </a>
              </li>
              <li>
                <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  वास्तु दोष परीक्षण व उपाय
                </a>
              </li>
              <li>
                <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  कुण्डली मिलान व गुण विचार
                </a>
              </li>
              <li>
                <a href="#services" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  महिमामंडित रुद्र अभिषेक व हवन
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Reach Out */}
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--color-ivory)', marginBottom: '1rem' }}>
              संपर्क विवरण
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <div>दूरभाष: +91 98275 14489</div>
              <div>ईमेल: panditrakeshrawal26@gmail.com</div>
              <div>स्थान: हरिद्वार / ऋषिकेश, उत्तराखंड</div>
              <div style={{ color: 'var(--color-gold-300)', marginTop: '0.2rem', fontWeight: 500 }}>
                प्रत्यक्ष एवं ऑनलाइन Consultation उपलब्ध
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Internal Quick Links */}
        <div style={{
          borderTop: '1px solid rgba(197, 160, 89, 0.15)',
          paddingTop: '1.8rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.84rem',
          color: 'var(--color-text-subtle)',
          gap: '1.25rem'
        }}>
          <div>
            © {new Date().getFullYear()} Vedनेत्र (VedNetra) — सर्वाधिकार सुरक्षित। पं. राकेश चन्द्र रावल।
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8rem'
          }}>
            <a href="#hero" style={{ color: 'var(--color-sand)', textDecoration: 'none' }}>मुख्य पृष्ठ</a>
            <span>•</span>
            <a href="#services" style={{ color: 'var(--color-sand)', textDecoration: 'none' }}>वैदिक अनुष्ठान</a>
            <span>•</span>
            <a href="#muhurat" style={{ color: 'var(--color-sand)', textDecoration: 'none' }}>शुभ मुहूर्त</a>
            <span>•</span>
            <a href="#about" style={{ color: 'var(--color-sand)', textDecoration: 'none' }}>परिचय</a>
            <span>•</span>
            <a href="#contact" style={{ color: 'var(--color-sand)', textDecoration: 'none' }}>संपर्क</a>
            <span>•</span>
            <button
              type="button"
              onClick={onOpenTerms}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-champagne-300)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                textDecoration: 'underline'
              }}
            >
              नियम एवं शर्तें (Terms & Conditions)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onToggleAdmin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-champagne-300)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                textDecoration: 'underline'
              }}
            >
              नियंत्रण कक्ष (Dashboard)
            </button>
            <span>•</span>
            <a href="/404" style={{ color: 'var(--color-terracotta)', textDecoration: 'none', opacity: 0.85 }}>४०४ पृष्ठ</a>
          </div>

          <div>
            सनातन वैदिक परंपरा एवं जनकल्याण हेतु समर्पित
          </div>
        </div>
      </div>
    </footer>
  );
}
