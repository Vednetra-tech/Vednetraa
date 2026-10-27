import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  User,
  UserCheck,
  Calendar,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Navbar({
  onOpenBooking,
  onOpenAstrology,
  onToggleAdmin,
  isAdminOpen,
  onOpenAuth,
  onOpenClientBookings,
  onSelectCategory
}) {
  const { user, isAuthenticated, isClient, isStaff, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories = [
    { label: 'KATHA', category: 'katha' },
    { label: 'POOJA', category: 'pooja' },
    { label: 'JYOTISH', category: 'ratna_salah' },
    { label: 'ANUSHTHAN', category: 'abhishekh' }
  ];

  const handleCategoryClick = (category) => {
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transition: 'all 0.3s ease'
    }}>
      {/* 1. Top Announcement Ribbon (Matching Screenshot Top Bar) */}
      <div style={{
        background: 'var(--color-stone-surface)',
        borderBottom: '1px solid var(--color-stone-border)',
        padding: '0.4rem 1.25rem',
        fontSize: '0.74rem',
        color: 'var(--color-text-stone-body)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 500
      }}>
        <div className="container announcement-ribbon-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {/* Left Message */}
          <div className="announcement-left-msg" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>ॐ</span>
            <span className="announcement-text-primary">FREE AUSPICIOUS CONSULTATION</span>
          </div>

          {/* Center Message */}
          <div style={{
            display: 'none',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            fontWeight: 600,
            color: 'var(--color-text-charcoal)'
          }} className="announcement-center">
            वैदिक अनुष्ठान, शुद्ध संकल्प एवं ज्योतिष संस्थान • संपर्क: +91 98275 14489
          </div>

          {/* Right Links & Auth Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', whiteSpace: 'nowrap' }}>
            <button
              onClick={onOpenClientBookings}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                fontSize: '0.7rem',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: 0
              }}
              title="Track your ritual booking"
            >
              TRACK SANKALP
            </button>
            <span className="announcement-divider" style={{ opacity: 0.3 }}>|</span>
            <a
              href="tel:+919827514489"
              className="announcement-devotee-help"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              DEVOTEE HELP
            </a>

            {/* Panditji Admin Toggle Key */}
            <button
              onClick={onToggleAdmin}
              aria-label="Admin Portal"
              title="पंडित जी प्रबंधन पोर्टल"
              style={{
                background: isAdminOpen ? 'var(--color-burgundy-base)' : 'transparent',
                color: isAdminOpen ? '#ffffff' : 'var(--color-burgundy-base)',
                border: '1px solid var(--color-burgundy-base)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.15rem 0.45rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.68rem',
                fontWeight: 600
              }}
            >
              <KeyRound size={10} />
              <span>{isAdminOpen ? 'PORTAL ACTIVE' : 'ADMIN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main High-Fashion Navigation Bar */}
      <nav style={{
        background: isScrolled ? 'rgba(246, 239, 234, 0.98)' : 'rgba(246, 239, 234, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-stone-border)',
        boxShadow: isScrolled ? '0 6px 20px rgba(28, 8, 14, 0.08)' : 'none',
        padding: '0.75rem 0',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Left Menu Items (Uppercase category links matching screenshot) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem'
          }} className="nav-desktop-links">
            {navCategories.map((item) => (
              <button
                key={item.category}
                onClick={() => handleCategoryClick(item.category)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  color: 'var(--color-text-charcoal)',
                  cursor: 'pointer',
                  padding: '0.25rem 0',
                  position: 'relative',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-burgundy-base)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-charcoal)'; }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Center Brand: Official Vedनेत्र Logo */}
          <div style={{ textAlign: 'center' }}>
            <a
              href="#hero"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              title="Vedनेत्र — मुख्य पृष्ठ"
            >
              <picture>
                <source srcSet="/Logo-two-tone.webp" type="image/webp" />
                <img
                  src="/Logo-two-tone.png"
                  alt="Vedनेत्र Logo"
                  style={{
                    height: 'clamp(38px, 4.2vw, 48px)',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    transition: 'opacity 0.2s ease'
                  }}
                />
              </picture>
              <span style={{
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                color: 'var(--color-burgundy-base)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '0.2rem'
              }}>
                SANATAN SANCTUARY
              </span>
            </a>
          </div>

          {/* Right Actions: Devotee Account & Sacred Booking CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1.1rem'
          }}>
            {/* Devotee / Panditji Account & Dashboard Actions */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {isStaff ? (
                  <button
                    onClick={onToggleAdmin}
                    style={{
                      background: isAdminOpen ? 'var(--color-burgundy-base)' : 'rgba(104, 46, 54, 0.08)',
                      border: '1px solid var(--color-burgundy-base)',
                      color: isAdminOpen ? '#FFFFFF' : 'var(--color-burgundy-base)',
                      cursor: 'pointer',
                      padding: '0.38rem 0.85rem',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      boxShadow: isAdminOpen ? '0 2px 8px rgba(104, 46, 54, 0.25)' : 'none'
                    }}
                    title={isAdminOpen ? 'मुख्य वेबसाइट पर लौटें' : 'पंडित जी नियंत्रण कक्ष (Dashboard)'}
                  >
                    <ShieldCheck size={15} strokeWidth={2} />
                    <span>{isAdminOpen ? 'मुख्य पृष्ठ' : 'नियंत्रण कक्ष (Dashboard)'}</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenClientBookings}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-burgundy-base)',
                      cursor: 'pointer',
                      padding: '0.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.78rem',
                      fontWeight: 600
                    }}
                    title="मेरी पूजाएं एवं संकल्प"
                  >
                    <UserCheck size={18} strokeWidth={1.8} />
                    <span className="user-name-label">{user?.name?.split(' ')[0] || 'यजमान'}</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-stone-muted)',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    textDecoration: 'underline'
                  }}
                  title="लॉगआउट करें"
                >
                  लॉगआउट
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('client')}
                aria-label="Devotee Sign In"
                title="यजमान प्रवेश (Devotee Login)"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-charcoal)',
                  cursor: 'pointer',
                  padding: '0.3rem 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-burgundy-base)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-charcoal)'; }}
              >
                <User size={18} strokeWidth={1.8} />
                <span className="user-name-label" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>प्रवेश</span>
              </button>
            )}

            {/* Sacred Booking CTA Button */}
            <button
              onClick={onOpenBooking}
              className="btn-editorial-primary"
              style={{
                padding: '0.48rem 1.25rem',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: 'none'
              }}
            >
              <Calendar size={13} />
              <span>Book Now</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--color-text-charcoal)',
                cursor: 'pointer',
                padding: '0.2rem'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--color-stone-canvas)',
            borderTop: '1px solid var(--color-stone-border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeIn 0.25s ease'
          }}>
            <div style={{ textAlign: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-stone-border)' }}>
              <img
                src="/Logo-two-tone.png"
                alt="Vedनेत्र Logo"
                style={{ height: '42px', width: 'auto', margin: '0 auto', display: 'block' }}
              />
            </div>
            {isStaff && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleAdmin();
                }}
                style={{
                  background: isAdminOpen ? 'var(--color-burgundy-base)' : 'rgba(104, 46, 54, 0.08)',
                  border: '1px solid var(--color-burgundy-base)',
                  color: isAdminOpen ? '#FFFFFF' : 'var(--color-burgundy-base)',
                  width: '100%',
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ShieldCheck size={16} />
                <span>{isAdminOpen ? 'मुख्य पृष्ठ पर लौटें (Return Home)' : 'पंडित जी नियंत्रण कक्ष (Dashboard)'}</span>
              </button>
            )}
            {navCategories.map(item => (
              <button
                key={item.category}
                onClick={() => handleCategoryClick(item.category)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'var(--color-text-charcoal)',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--color-stone-border)',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-editorial-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              BOOK A POOJA / SANKALP
            </button>
          </div>
        )}
      </nav>

      <style>{`
        @media (min-width: 769px) {
          .announcement-center {
            display: block !important;
          }
        }
        @media (max-width: 820px) {
          .nav-desktop-links {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: block !important;
          }
          .user-name-label {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .announcement-devotee-help,
          .announcement-divider {
            display: none !important;
          }
          .announcement-text-primary {
            font-size: 0.65rem !important;
            letter-spacing: 0.04em !important;
          }
          nav {
            padding: 0.5rem 0 !important;
          }
        }
      `}</style>
    </header>
  );
}
