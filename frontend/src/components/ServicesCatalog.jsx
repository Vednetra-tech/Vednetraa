import React, { useState, useEffect } from 'react';
import { staticServices } from '../data/staticServices';
import ServiceDetailModal from './ServiceDetailModal';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyState from './EmptyState';
import { Sparkles, Calendar, Clock, Globe, ArrowRight, Eye, Check, Heart } from 'lucide-react';

export default function ServicesCatalog({ onSelectServiceForBooking, onOpenAstrology, externalCategory }) {
  const [services, setServices] = useState(staticServices);
  const [activeCategory, setActiveCategory] = useState(
    externalCategory && externalCategory !== 'all' ? externalCategory : 'katha'
  );
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getServiceImage = (srv) => {
    if (srv.image) return srv.image;
    switch (srv.id) {
      case 1: return '/hero-pedestal-kalash.jpg';
      case 2: return '/cat-katha-stone.jpg';
      case 3: return '/cat-pooja-stone.jpg';
      case 4: return '/editorial-stone-shankh.jpg';
      case 5: return '/ceremony-hawan-card.jpg';
      case 6: return '/cat-ratna-stone.jpg';
      case 7: return '/ceremony-kundali-card.jpg';
      case 8: return '/cat-ratna-stone.jpg';
      case 9: return '/ceremony-rudra-card.jpg';
      case 10: return '/ceremony-rudra-card.jpg';
      case 11: return '/ceremony-hawan-card.jpg';
      case 12: return '/ceremony-hawan-card.jpg';
      default: {
        if (srv.category === 'katha') return '/cat-katha-stone.jpg';
        if (srv.category === 'pooja') return '/cat-pooja-stone.jpg';
        if (srv.category === 'abhishekh') return '/ceremony-rudra-card.jpg';
        if (srv.category === 'hawan') return '/ceremony-hawan-card.jpg';
        if (srv.category === 'ratna_salah') return '/ceremony-kundali-card.jpg';
        return '/hero-pedestal-kalash.jpg';
      }
    }
  };

  useEffect(() => {
    if (externalCategory) {
      setActiveCategory(externalCategory === 'all' ? 'katha' : externalCategory);
    }
  }, [externalCategory]);

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/services');
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setServices(json.data);
          }
        }
      } catch (err) {
        console.warn('Using static services catalog fallback:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  const categories = [
    { id: 'katha', label: 'श्रीमद्भागवत कथा', en: 'Bhagwat Katha' },
    { id: 'pooja', label: 'विशिष्ट पूजा', en: 'Pooja (Online/Offline)' },
    { id: 'dosh_nivaran', label: 'दोष निवारण', en: 'Dosh & Vastu' },
    { id: 'ratna_salah', label: 'रत्न व ज्योतिष', en: 'Ratna & Kundali' },
    { id: 'abhishekh', label: 'अभिषेक', en: 'Abhishekh' },
    { id: 'hawan', label: 'वैदिक हवन', en: 'Hawan & Homam' }
  ];

  const filteredServices = (!activeCategory || activeCategory === 'all')
    ? services.filter(s => s.category === 'katha')
    : services.filter(s => s.category === activeCategory);

  const handleBook = (srv) => {
    if (srv.category === 'ratna_salah') {
      onOpenAstrology(srv);
    } else {
      onSelectServiceForBooking(srv);
    }
  };

  return (
    <section id="services" style={{
      padding: '6rem 0',
      position: 'relative',
      background: 'var(--color-stone-canvas)',
      borderBottom: '1px solid var(--color-stone-border)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="tag">
            <Sparkles size={16} />
            <span>पवित्र अनुष्ठान एवं सेवाएं</span>
          </div>
          <h2>
            <span className="text-flame-gradient">शास्त्रीय सेवाएं एवं महा-अनुष्ठान</span>
          </h2>
          <div className="motif-divider">
            <span className="line" />
            <span className="symbol">☸</span>
            <span className="line" />
          </div>
          <p>
            पंडित राकेश चन्द्र रावल द्वारा यजमान की कुल-परंपरा, गोत्र एवं वैदिक आचार संहिता के अनुसार 
            प्रत्येक अनुष्ठान का पूर्ण निष्ठा एवं फलदायी संकल्प से संपादन किया जाता है।
          </p>
        </div>

        {/* Category Pills Navigation with Smooth Active Animation */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          marginBottom: '3.5rem'
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: isActive 
                    ? 'var(--color-burgundy-base)' 
                    : 'var(--color-stone-surface)',
                  border: isActive 
                    ? '1.5px solid var(--color-burgundy-base)' 
                    : '1px solid var(--color-stone-border)',
                  color: isActive ? '#ffffff' : 'var(--color-text-charcoal)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.65rem 1.4rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: isActive ? '0 4px 14px rgba(104, 46, 54, 0.25)' : 'none',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <span style={{ fontSize: '0.94rem', fontWeight: isActive ? 600 : 500 }}>{cat.label}</span>
                <span style={{ fontSize: '0.72rem', opacity: isActive ? 0.95 : 0.7, color: isActive ? '#ffe4d6' : 'var(--color-text-stone-muted)' }}>
                  {cat.en}
                </span>
              </button>
            );
          })}
        </div>

        {/* Conditional View: Loading Skeleton vs Empty State vs Services Grid */}
        {isLoading ? (
          <LoadingSkeleton type="card" count={6} />
        ) : filteredServices.length === 0 ? (
          <EmptyState
            title="कोई सेवा उपलब्ध नहीं है"
            description="इस श्रेणी में वर्तमान में कोई अनुष्ठान सूचीबद्ध नहीं है। कृपया अन्य श्रेणी का चयन करें।"
            actionText="भागवत कथा देखें"
            onAction={() => setActiveCategory('katha')}
          />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {filteredServices.map((srv) => {
              const isFav = !!wishlist[srv.id];
              const serviceImg = getServiceImage(srv);

              return (
                <article
                  key={srv.id}
                  style={{
                    background: 'var(--color-stone-card)',
                    borderRadius: 'var(--radius-xs)',
                    border: srv.featured ? '1.5px solid var(--color-burgundy-base)' : '1px solid var(--color-stone-border)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                    e.currentTarget.style.borderColor = 'var(--color-burgundy-base)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = srv.featured ? 'var(--color-burgundy-base)' : 'var(--color-stone-border)';
                  }}
                >
                  {/* Aspect Ratio Top Image with Pedestal Visuals */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4 / 3',
                    background: 'var(--color-stone-surface)',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={serviceImg}
                      alt={srv.title}
                      loading="eager"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: (srv.id === 7 || srv.id === 9 || srv.id === 10) ? 'center 62%' : 'center center',
                        display: 'block',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />

                    {/* Top-Left: Subcategory Tag & Featured Label */}
                    <div style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      display: 'flex',
                      gap: '0.4rem',
                      zIndex: 2
                    }}>
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--color-burgundy-base)',
                        border: '1px solid rgba(104, 46, 54, 0.2)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '0.24rem 0.65rem',
                        borderRadius: '2px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                      }}>
                        {srv.subcategory || srv.category}
                      </span>
                      {srv.featured && (
                        <span style={{
                          background: 'var(--color-burgundy-base)',
                          color: '#ffffff',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '0.24rem 0.55rem',
                          borderRadius: '2px'
                        }}>
                          विशिष्ट
                        </span>
                      )}
                    </div>

                    {/* Top-Right: Interactive Wishlist Heart Button */}
                    <button
                      onClick={(e) => toggleWishlist(srv.id, e)}
                      aria-label={`पसंदीदा में जोड़ें - ${srv.title}`}
                      title="पसंदीदा सूची में जोड़ें"
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        right: '0.85rem',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(8px)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, background 0.2s ease',
                        zIndex: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      <Heart
                        size={16}
                        strokeWidth={2}
                        fill={isFav ? 'var(--color-burgundy-base)' : 'none'}
                        color={isFav ? 'var(--color-burgundy-base)' : '#441820'}
                      />
                    </button>

                    {/* Bottom-Left: Mode Badges (Online / Offline) */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      left: '0.85rem',
                      display: 'flex',
                      gap: '0.35rem',
                      zIndex: 2
                    }}>
                      {(Array.isArray(srv.modes) ? srv.modes : [srv.modes]).map((m, i) => (
                        <span
                          key={i}
                          style={{
                            background: m === 'Online' ? 'rgba(240, 249, 255, 0.94)' : 'rgba(255, 247, 244, 0.94)',
                            backdropFilter: 'blur(6px)',
                            border: m === 'Online' ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid rgba(104, 46, 54, 0.25)',
                            color: m === 'Online' ? '#0369a1' : 'var(--color-burgundy-base)',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            padding: '0.18rem 0.55rem',
                            borderRadius: '2px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                          }}
                        >
                          <Globe size={11} />
                          <span>{m}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Padded Content Body */}
                  <div style={{
                    padding: '1.4rem 1.45rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      {/* Title in Deep Charcoal */}
                      <h3 style={{
                        fontFamily: 'var(--font-serif-royal)',
                        fontSize: 'clamp(1.18rem, 2.3vw, 1.35rem)',
                        fontWeight: 700,
                        color: 'var(--color-text-charcoal)',
                        marginBottom: '0.25rem',
                        lineHeight: 1.3
                      }}>
                        {srv.title}
                      </h3>

                      {/* English Subtitle in Signature Burgundy */}
                      <div style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-burgundy-base)',
                        marginBottom: '0.85rem'
                      }}>
                        {srv.title_en}
                      </div>

                      {/* Description in Readable Warm Stone Body Text */}
                      <p style={{
                        fontSize: '0.88rem',
                        lineHeight: '1.65',
                        color: 'var(--color-text-stone-body)',
                        marginBottom: '1.15rem'
                      }}>
                        {srv.description}
                      </p>
                    </div>

                    <div>
                      {/* Duration Info */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        color: 'var(--color-text-stone-muted)',
                        marginBottom: '0.95rem'
                      }}>
                        <Clock size={13} style={{ color: 'var(--color-burgundy-base)', flexShrink: 0 }} />
                        <span>{srv.duration}</span>
                      </div>

                      {/* Auspicious Muhurat and Guidance Links */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        fontSize: '0.78rem',
                        marginBottom: '1.25rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px dashed var(--color-stone-border)'
                      }}>
                        <a
                          href="#muhurat"
                          style={{
                            color: 'var(--color-burgundy-base)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            transition: 'opacity 0.2s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                          title="इस पूजा के लिए शुभ मुहूर्त देखें"
                        >
                          <span>📅 शुभ मुहूर्त</span>
                        </a>
                        <a
                          href="#contact"
                          style={{
                            color: 'var(--color-text-charcoal)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            transition: 'opacity 0.2s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                          title="पंडित जी से सीधा मार्गदर्शन प्राप्त करें"
                        >
                          <span>💬 मार्गदर्शन</span>
                        </a>
                      </div>

                      {/* Action Buttons: Clean Editorial Outline & Editorial Primary */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.35fr',
                        gap: '0.65rem'
                      }}>
                        <button
                          onClick={() => setSelectedService(srv)}
                          className="btn-editorial-outline"
                          style={{
                            padding: '0.68rem 0.6rem',
                            fontSize: '0.78rem',
                            letterSpacing: '0.06em',
                            width: '100%',
                            gap: '0.35rem'
                          }}
                        >
                          <Eye size={14} />
                          <span>विवरण</span>
                        </button>

                        <button
                          onClick={() => handleBook(srv)}
                          className="btn-editorial-primary"
                          style={{
                            padding: '0.68rem 0.75rem',
                            fontSize: '0.78rem',
                            letterSpacing: '0.06em',
                            width: '100%',
                            gap: '0.35rem'
                          }}
                        >
                          <Calendar size={14} />
                          <span>{srv.category === 'ratna_salah' ? 'Consult Now' : 'Book Now'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onBookService={(srv) => handleBook(srv)}
        />
      )}
    </section>
  );
}
