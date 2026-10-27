import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  RefreshCw,
  LogOut,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  XCircle
} from 'lucide-react';

export default function ClientBookingsModal({ isOpen, onClose, onOpenNewBooking }) {
  const { user, fetchMyBookings, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await fetchMyBookings();
      setBookings(data || []);
    } catch (err) {
      console.error('Error loading client bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span style={{
            background: 'rgba(28, 90, 160, 0.08)',
            color: '#1a5695',
            border: '1px solid rgba(28, 90, 160, 0.25)',
            padding: '0.2rem 0.65rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.74rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <CheckCircle2 size={12} />
            स्वीकृत (Confirmed)
          </span>
        );
      case 'completed':
        return (
          <span style={{
            background: 'rgba(22, 101, 52, 0.08)',
            color: '#15803d',
            border: '1px solid rgba(22, 101, 52, 0.25)',
            padding: '0.2rem 0.65rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.74rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <Sparkles size={12} />
            संपन्न (Completed)
          </span>
        );
      case 'cancelled':
        return (
          <span style={{
            background: 'rgba(185, 28, 28, 0.08)',
            color: '#b91c1c',
            border: '1px solid rgba(185, 28, 28, 0.25)',
            padding: '0.2rem 0.65rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.74rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <XCircle size={12} />
            रद्द (Cancelled)
          </span>
        );
      default:
        return (
          <span style={{
            background: 'rgba(104, 46, 54, 0.08)',
            color: 'var(--color-burgundy-base)',
            border: '1px solid rgba(104, 46, 54, 0.2)',
            padding: '0.2rem 0.65rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.74rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <Clock3 size={12} />
            प्रतीक्षारत (Pending)
          </span>
        );
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(24, 7, 12, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: 'var(--color-stone-card)',
          border: '1px solid var(--color-stone-border)',
          borderRadius: 'var(--radius-xs)',
          boxShadow: '0 24px 64px rgba(71, 26, 33, 0.25)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: 'clamp(1.25rem, 3.5vw, 2rem)'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--color-stone-border)',
          paddingBottom: '1.2rem',
          marginBottom: '1.2rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-burgundy-base)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              marginBottom: '0.25rem'
            }}>
              <img src="/Logo-emblem-burgundy.png" alt="" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
              <span>यजमान व्यक्तिगत कक्ष (Devotee Portal)</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.3rem, 2.5vw, 1.55rem)',
              color: 'var(--color-text-charcoal)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}>
              <span>{user?.name || 'यजमान'}</span>
              <span style={{
                fontSize: '0.78rem',
                color: 'var(--color-burgundy-base)',
                background: 'var(--color-stone-surface)',
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-stone-border)',
                fontWeight: 600
              }}>
                +91 {user?.phone}
              </span>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={loadBookings}
              disabled={loading}
              style={{
                background: 'var(--color-stone-surface)',
                border: '1px solid var(--color-stone-border)',
                color: 'var(--color-burgundy-base)',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="रिफ्रेश करें"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'var(--color-stone-surface)',
                border: '1px solid var(--color-stone-border)',
                color: 'var(--color-burgundy-base)',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-stone-body)' }}>
              <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 0.75rem auto', color: 'var(--color-burgundy-base)' }} />
              <p style={{ fontSize: '0.88rem' }}>आपकी पूजा Bookings लोड की जा रही हैं...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1.5rem',
              background: 'var(--color-stone-surface)',
              borderRadius: 'var(--radius-xs)',
              border: '1px dashed var(--color-stone-border)'
            }}>
              <Calendar size={36} style={{ color: 'var(--color-burgundy-base)', margin: '0 auto 0.8rem auto', opacity: 0.9 }} />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-text-charcoal)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                अभी कोई पूजा Booking दर्ज नहीं है
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-stone-body)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                पंडित राकेश चन्द्र रावल जी के मार्गदर्शन में अपने अभीष्ट अनुष्ठान या पूजा का सङ्कल्प लें।
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenNewBooking) onOpenNewBooking();
                }}
                className="btn-editorial-primary"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
              >
                <Sparkles size={15} />
                <span>Book Now</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  style={{
                    background: 'var(--color-stone-surface)',
                    border: '1px solid var(--color-stone-border)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'border-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-burgundy-base)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-stone-border)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-burgundy-base)', fontWeight: 600 }}>
                          #VN-{booking.id.toString().padStart(4, '0')}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          background: 'var(--color-stone-card)',
                          color: 'var(--color-text-charcoal)',
                          border: '1px solid var(--color-stone-border)',
                          padding: '0.1rem 0.45rem',
                          borderRadius: 'var(--radius-xs)',
                          fontWeight: 500,
                          textTransform: 'uppercase'
                        }}>
                          {booking.ritual_mode === 'online' ? 'ऑनलाइन संकल्प' : 'प्रत्यक्ष पूजा'}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--color-text-charcoal)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                        {booking.service_title}
                      </h4>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-stone-body)',
                    background: 'var(--color-stone-card)',
                    border: '1px solid var(--color-stone-border)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-xs)'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={13} style={{ color: 'var(--color-burgundy-base)' }} />
                        <span><strong>प्राथमिक:</strong> {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'अनिर्धारित'}</span>
                      </div>
                      {(booking.second_date || booking.third_date) && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-stone-body)', paddingLeft: '1.2rem' }}>
                          {booking.second_date && <span>२: {new Date(booking.second_date).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}</span>}
                          {booking.third_date && <span> • ३: {new Date(booking.third_date).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}</span>}
                        </div>
                      )}
                    </div>

                    {booking.preferred_time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={13} style={{ color: 'var(--color-burgundy-base)' }} />
                        <span><strong>कैलेंडर समय:</strong> {booking.preferred_time}</span>
                      </div>
                    )}

                    {booking.gotra && (
                      <div>
                        <strong style={{ color: 'var(--color-burgundy-base)' }}>गोत्र:</strong> {booking.gotra}
                      </div>
                    )}

                    {booking.city && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MapPin size={13} style={{ color: 'var(--color-burgundy-base)' }} />
                        <span>{booking.city}</span>
                      </div>
                    )}
                  </div>

                  {booking.special_sankalp && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-stone-body)' }}>
                      <strong style={{ color: 'var(--color-burgundy-base)' }}>विशेष सङ्कल्प:</strong> {booking.special_sankalp}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.2rem' }}>
                    <a
                      href={`https://wa.me/919827514489?text=${encodeURIComponent(`प्रणाम पंडित जी! मेरी पूजा Booking (#VN-${booking.id.toString().padStart(4, '0')}) "${booking.service_title}" के विषय में चर्चा करनी है।`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-primary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.76rem',
                        textDecoration: 'none'
                      }}
                    >
                      <MessageSquare size={13} />
                      <span>पंडित जी से संवाद</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--color-stone-border)',
          paddingTop: '1rem',
          marginTop: '1rem'
        }}>
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            style={{
              background: 'rgba(185, 28, 28, 0.04)',
              border: '1px solid rgba(185, 28, 28, 0.25)',
              color: '#b91c1c',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(185, 28, 28, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(185, 28, 28, 0.04)')}
          >
            <LogOut size={14} />
            <span>लॉगआउट (Logout)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onOpenNewBooking) onOpenNewBooking();
            }}
            className="btn-editorial-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
          >
            <Sparkles size={14} />
            <span>नई पूजा आरक्षित करें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
