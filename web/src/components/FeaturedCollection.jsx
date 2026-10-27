import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export default function FeaturedCollection({ onSelectServiceForBooking, onOpenAstrology, onExploreServices }) {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const featuredCeremonies = [
    {
      id: 1,
      title: 'श्रीमद्भागवत कथा',
      titleEn: 'Shrimad Bhagwat Katha',
      category: 'Katha',
      subtitle: '7-Day Shastriya Paath & Vyas Pujan',
      image: '/hero-pedestal-kalash.jpg',
      alt: 'Shrimad Bhagwat Katha on stone pedestal',
      action: 'BOOK NOW',
      onAction: () => onSelectServiceForBooking({
        id: 1,
        title: 'श्रीमद्भागवत कथा (सादा पाठ)',
        category: 'katha'
      })
    },
    {
      id: 2,
      title: 'रुद्राभिषेक महापूजा',
      titleEn: 'Rudra Abhishekh Mahapooja',
      category: 'Abhishekh',
      subtitle: 'Sri Rudram Chanting & Bilva Archana',
      image: '/ceremony-rudra-card.jpg',
      alt: 'Rudra Abhishekh Shiva Lingam on sandstone',
      action: 'BOOK NOW',
      onAction: () => onSelectServiceForBooking({
        id: 9,
        title: 'रुद्र अभिषेक महापूजा',
        category: 'abhishekh'
      })
    },
    {
      id: 3,
      title: 'वैदिक नवग्रह हवन',
      titleEn: 'Vedic Hawan & Homam',
      category: 'Hawan',
      subtitle: 'Saptashati Paath & Consecrated Ahuti',
      image: '/ceremony-hawan-card.jpg',
      alt: 'Vedic Hawan Kund with sacred fire',
      action: 'BOOK NOW',
      onAction: () => onSelectServiceForBooking({
        id: 11,
        title: 'सप्तशती पाठ एवं वैदिक हवन',
        category: 'hawan'
      })
    },
    {
      id: 4,
      title: 'कुण्डली मिलान व रत्न सलाह',
      titleEn: 'Kundali Milan & Gemstone Advice',
      category: 'Jyotish',
      subtitle: 'Ashtakoot & Accurate Dasha Faladesh',
      image: '/ceremony-kundali-card.jpg',
      alt: 'Vedic Kundali birth chart and gemstone ring',
      action: 'CONSULT NOW',
      onAction: () => onOpenAstrology({
        id: 7,
        title: 'कुण्डली मिलान एवं फलादेश',
        category: 'ratna_salah'
      })
    }
  ];

  return (
    <section style={{
      background: 'var(--color-stone-canvas)',
      padding: '5rem 0',
      borderBottom: '1px solid var(--color-stone-border)'
    }}>
      <div className="container">
        {/* Section Header: Title on Left, VIEW ALL on Right */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--color-stone-border)',
          paddingBottom: '1rem'
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--color-text-charcoal)',
              margin: 0
            }}>
              BEST OF Vedनेत्र
            </h2>
            <span style={{
              fontSize: '0.78rem',
              color: 'var(--color-text-stone-muted)',
              letterSpacing: '0.04em'
            }}>
              Most revered sacred rituals conducted by Pandit Rakesh Chandra Rawal
            </span>
          </div>

          <button
            onClick={onExploreServices}
            className="link-editorial-underline"
            style={{
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              color: 'var(--color-text-charcoal)'
            }}
          >
            VIEW ALL
          </button>
        </div>

        {/* 4-Card Luxury Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.75rem'
        }}>
          {featuredCeremonies.map((item) => {
            const isFav = wishlist[item.id];
            return (
              <div
                key={item.id}
                onClick={item.onAction}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') item.onAction(); }}
                style={{
                  background: 'var(--color-stone-card)',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-stone-border)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  position: 'relative',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                  e.currentTarget.style.borderColor = 'var(--color-burgundy-base)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--color-stone-border)';
                }}
              >
                {/* Image Container with Wishlist Heart */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3 / 4',
                  background: 'var(--color-stone-surface)',
                  overflow: 'hidden'
                }}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.45s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />

                  {/* Interactive Heart Icon */}
                  <button
                    onClick={(e) => toggleWishlist(item.id, e)}
                    aria-label={`Add ${item.title} to favorites`}
                    title="पसंदीदा सूची में जोड़ें"
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      background: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(6px)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      zIndex: 2
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <Heart
                      size={17}
                      strokeWidth={2}
                      fill={isFav ? 'var(--color-burgundy-base)' : 'none'}
                      color={isFav ? 'var(--color-burgundy-base)' : '#441820'}
                    />
                  </button>
                </div>

                {/* Card Details */}
                <div style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-burgundy-base)'
                    }}>
                      {item.category}
                    </span>
                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: 'var(--color-text-charcoal)',
                      fontFamily: 'var(--font-serif-royal)',
                      margin: '0.25rem 0'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-text-stone-muted)',
                      margin: 0,
                      lineHeight: 1.45
                    }}>
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Action Link / Button */}
                  <div style={{
                    marginTop: '1.1rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(104, 46, 54, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-burgundy-base)'
                    }}>
                      {item.action}
                    </span>
                    <ArrowRight size={14} color="var(--color-burgundy-base)" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
