import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Calendar,
  Phone,
  Sparkles,
  MessageSquare,
  Check,
  X,
  RefreshCw,
  Search,
  Filter,
  Mail,
  User,
  Clock,
  MapPin,
  Lock,
  LogOut,
  KeyRound
} from 'lucide-react';

export default function AdminPortal({ onClose, onOpenAuth }) {
  const { user, token, isStaff, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'consultations', 'inquiries'
  const [bookings, setBookings] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (!token) return;
    setIsLoading(true);
    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      if (activeTab === 'bookings') {
        const res = await fetch(`/api/bookings?status=${statusFilter}&search=${encodeURIComponent(searchTerm)}`, {
          headers: authHeaders
        });
        if (res.ok) {
          const json = await res.json();
          setBookings(json.data || []);
        }
      } else if (activeTab === 'consultations') {
        const res = await fetch(`/api/consultations?status=${statusFilter}`, {
          headers: authHeaders
        });
        if (res.ok) {
          const json = await res.json();
          setConsultations(json.data || []);
        }
      } else if (activeTab === 'inquiries') {
        const res = await fetch(`/api/inquiries?status=${statusFilter}`, {
          headers: authHeaders
        });
        if (res.ok) {
          const json = await res.json();
          setInquiries(json.data || []);
        }
      }
    } catch (err) {
      console.warn('Admin fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isStaff) {
      fetchData();
    }
  }, [activeTab, statusFilter, isStaff, token]);

  const updateBookingStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  const updateConsultationStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/consultations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setConsultations(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      }
    } catch (err) {
      console.error('Error updating consultation status:', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span style={{ background: 'rgba(2, 132, 199, 0.1)', color: '#0369a1', border: '1px solid rgba(2, 132, 199, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 600 }}>स्वीकृत (Confirmed)</span>;
      case 'completed':
        return <span style={{ background: 'rgba(22, 101, 52, 0.1)', color: '#15803d', border: '1px solid rgba(22, 101, 52, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 600 }}>संपन्न (Completed)</span>;
      case 'cancelled':
        return <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 600 }}>रद्द (Cancelled)</span>;
      default:
        return <span style={{ background: 'rgba(104, 46, 54, 0.1)', color: 'var(--color-burgundy-base)', border: '1px solid rgba(104, 46, 54, 0.25)', padding: '0.2rem 0.65rem', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 600 }}>प्रतीक्षारत (Pending)</span>;
    }
  };

  // Guarded View: If user is not logged in as Panditji or Admin
  if (!isStaff) {
    return (
      <section style={{
        minHeight: '85vh',
        paddingTop: '8rem',
        paddingBottom: '5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-stone-canvas)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: 'var(--color-stone-card)',
            border: '1px solid var(--color-stone-border)',
            borderRadius: 'var(--radius-xs)',
            padding: 'clamp(2rem, 5vw, 2.75rem)',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(71, 26, 33, 0.12)'
          }}>
            <img
              src="/Logo-two-tone.png"
              alt="Vedनेत्र Logo"
              style={{ height: '42px', width: 'auto', margin: '0 auto 1.25rem auto', display: 'block' }}
            />

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(104, 46, 54, 0.08)',
              border: '1px solid rgba(104, 46, 54, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              color: 'var(--color-burgundy-base)'
            }}>
              <Lock size={28} />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--color-burgundy-base)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              <ShieldCheck size={14} />
              <span>प्रवेश प्रतिबंधित • RESTRICTED ZONE</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              color: 'var(--color-text-charcoal)',
              fontFamily: 'var(--font-serif-royal)',
              fontWeight: 700,
              marginBottom: '0.75rem'
            }}>
              पंडित जी एवं व्यवस्थापक नियंत्रण कक्ष
            </h2>

            <p style={{
              fontSize: '0.88rem',
              color: 'var(--color-text-stone-body)',
              lineHeight: 1.65,
              marginBottom: '1.85rem'
            }}>
              यह अनुभाग केवल पूज्य पंडित राकेश चन्द्र रावल जी एवं अधिकृत व्यवस्थापक के लिए आरक्षित है। यजमानों के सङ्कल्प एवं बुकिंग प्रबंधन हेतु कृपया लॉगिन करें।
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <button
                onClick={() => onOpenAuth && onOpenAuth('panditji')}
                className="btn-editorial-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                <Sparkles size={16} />
                <span>पंडित जी के रूप में लॉगिन करें</span>
              </button>

              <button
                onClick={() => onOpenAuth && onOpenAuth('admin')}
                className="btn-editorial-dark"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                <ShieldCheck size={16} />
                <span>व्यवस्थापक (Admin) लॉगिन</span>
              </button>

              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-stone-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  paddingTop: '0.4rem',
                  textDecoration: 'underline'
                }}
              >
                ← मुख्य वेबसाइट पर वापस जाएं
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      minHeight: '85vh',
      paddingTop: '8rem',
      paddingBottom: '5rem',
      background: 'var(--color-stone-canvas)'
    }}>
      <div className="container">
        {/* Top Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--color-stone-border)',
          paddingBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <img src="/Logo-two-tone.png" alt="Vedनेत्र Logo" style={{ height: '38px', width: 'auto', display: 'block' }} />
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--color-burgundy-base)',
                fontSize: '0.76rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.25rem'
              }}>
                <ShieldCheck size={14} />
                <span>पंडित जी एवं व्यवस्थापक नियंत्रण कक्ष</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)', color: 'var(--color-text-charcoal)', fontFamily: 'var(--font-serif-royal)', fontWeight: 700, margin: 0 }}>
                यजमान Bookings & Consultations प्रबंधन
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            {/* Authenticated Staff Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'var(--color-stone-surface)',
              border: '1px solid var(--color-stone-border)',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--color-text-charcoal)'
            }}>
              <Sparkles size={14} style={{ color: 'var(--color-burgundy-base)' }} />
              <span>{user?.name} ({user?.role === 'panditji' ? 'पंडित जी' : 'एडमिन'})</span>
            </div>

            <button onClick={fetchData} className="btn-editorial-outline" style={{ padding: '0.55rem 0.95rem', fontSize: '0.78rem' }}>
              <RefreshCw size={13} />
              <span>ताज़ा करें</span>
            </button>

            <button
              onClick={logout}
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#dc2626',
                padding: '0.55rem 0.95rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              title="लॉगआउट करें"
            >
              <LogOut size={13} />
              <span>लॉगआउट</span>
            </button>

            <button onClick={onClose} className="btn-editorial-primary" style={{ padding: '0.55rem 1.15rem', fontSize: '0.78rem' }}>
              <span>मुख्य वेबसाइट पर लौटें</span>
            </button>
          </div>
        </div>

        {/* Tabs Row */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--color-stone-border)',
          paddingBottom: '0.85rem',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => { setActiveTab('bookings'); setStatusFilter('all'); }}
            style={{
              background: activeTab === 'bookings' ? 'var(--color-burgundy-base)' : 'var(--color-stone-surface)',
              border: '1px solid ' + (activeTab === 'bookings' ? 'var(--color-burgundy-base)' : 'var(--color-stone-border)'),
              color: activeTab === 'bookings' ? '#ffffff' : 'var(--color-text-charcoal)',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-xs)',
              fontWeight: 600,
              fontSize: '0.84rem',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Calendar size={15} />
            <span>Pooja & Katha Bookings</span>
            {bookings.length > 0 && <span style={{ opacity: 0.85, fontSize: '0.78rem' }}>({bookings.length})</span>}
          </button>

          <button
            onClick={() => { setActiveTab('consultations'); setStatusFilter('all'); }}
            style={{
              background: activeTab === 'consultations' ? 'var(--color-burgundy-base)' : 'var(--color-stone-surface)',
              border: '1px solid ' + (activeTab === 'consultations' ? 'var(--color-burgundy-base)' : 'var(--color-stone-border)'),
              color: activeTab === 'consultations' ? '#ffffff' : 'var(--color-text-charcoal)',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-xs)',
              fontWeight: 600,
              fontSize: '0.84rem',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={15} />
            <span>Jyotish & Gemstone Consultations</span>
            {consultations.length > 0 && <span style={{ opacity: 0.85, fontSize: '0.78rem' }}>({consultations.length})</span>}
          </button>

          <button
            onClick={() => { setActiveTab('inquiries'); setStatusFilter('all'); }}
            style={{
              background: activeTab === 'inquiries' ? 'var(--color-burgundy-base)' : 'var(--color-stone-surface)',
              border: '1px solid ' + (activeTab === 'inquiries' ? 'var(--color-burgundy-base)' : 'var(--color-stone-border)'),
              color: activeTab === 'inquiries' ? '#ffffff' : 'var(--color-text-charcoal)',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-xs)',
              fontWeight: 600,
              fontSize: '0.84rem',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <MessageSquare size={15} />
            <span>यजमान संदेश</span>
            {inquiries.length > 0 && <span style={{ opacity: 0.85, fontSize: '0.78rem' }}>({inquiries.length})</span>}
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          background: 'var(--color-stone-card)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--color-stone-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
            <Search size={16} style={{ color: 'var(--color-burgundy-base)' }} />
            <input
              type="text"
              placeholder="नाम, फोन, गोत्र अथवा सेवा खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchData()}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-charcoal)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-burgundy-base)' }}>स्थिति:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                background: 'var(--color-stone-canvas)',
                border: '1px solid var(--color-stone-border)',
                color: 'var(--color-text-charcoal)',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            >
              <option value="all">सभी (All)</option>
              <option value="pending">प्रतीक्षारत (Pending)</option>
              <option value="confirmed">स्वीकृत (Confirmed)</option>
              <option value="completed">संपन्न (Completed)</option>
              <option value="cancelled">रद्द (Cancelled)</option>
            </select>
          </div>
        </div>

        {/* TAB 1: BOOKINGS LIST */}
        {activeTab === 'bookings' && (
          <div>
            {bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 0', color: 'var(--color-text-stone-body)' }}>
                {isLoading ? 'डेटा लोड हो रहा है...' : 'कोई पूजा Booking उपलब्ध नहीं है।'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: 'var(--color-stone-card)',
                      border: '1px solid var(--color-stone-border)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '1.4rem 1.6rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1.25rem',
                      boxShadow: 'var(--shadow-stone)'
                    }}
                  >
                    <div style={{ flex: 2, minWidth: '260px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-text-charcoal)', fontWeight: 600, margin: 0, fontFamily: 'var(--font-heading)' }}>
                          {b.devotee_name}
                        </h4>
                        {getStatusBadge(b.status)}
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-burgundy-base)', opacity: 0.7, fontWeight: 500 }}>
                          #VN-{b.id}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.96rem', color: 'var(--color-burgundy-base)', fontWeight: 600, marginBottom: '0.4rem' }}>
                        {b.service_title} ({b.ritual_mode})
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--color-text-stone-body)' }}>
                        <div>
                          📅 <strong>३ तिथियां (Date Band):</strong> {b.preferred_date}
                          {b.second_date && ` • २: ${b.second_date}`}
                          {b.third_date && ` • ३: ${b.third_date}`}
                        </div>
                        <div>⏱️ <strong>कैलेंडर समय:</strong> {b.preferred_time || 'प्रातः 09:00 - 11:00 AM'}</div>
                        {b.gotra && <div>☸ <strong>गोत्र:</strong> {b.gotra}</div>}
                        {b.city && <div>📍 <strong>नगर:</strong> {b.city}</div>}
                      </div>

                      {b.special_sankalp && (
                        <div style={{
                          marginTop: '0.65rem',
                          fontSize: '0.82rem',
                          background: 'var(--color-stone-surface)',
                          padding: '0.45rem 0.75rem',
                          borderRadius: 'var(--radius-xs)',
                          borderLeft: '3px solid var(--color-burgundy-base)',
                          color: 'var(--color-text-charcoal)'
                        }}>
                          <strong style={{ color: 'var(--color-burgundy-base)' }}>सङ्कल्प/मनोकामना:</strong> {b.special_sankalp}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'flex-end' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a
                          href={`tel:${b.phone}`}
                          className="btn-outline"
                          style={{
                            padding: '0.45rem 0.85rem',
                            fontSize: '0.8rem',
                            background: 'var(--color-stone-surface)',
                            borderColor: 'var(--color-stone-border)',
                            color: 'var(--color-text-charcoal)'
                          }}
                          title="कॉल करें"
                        >
                          <Phone size={13} />
                          <span>{b.phone}</span>
                        </a>

                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=नमस्ते%20${encodeURIComponent(b.devotee_name)}%20जी,%20पंडित%20राकेश%20चन्द्र%20रावल%20जी%20के%20कार्यालय%20से%20आपकी%20पूजा%20के%20संदर्भ%20में...`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-editorial-primary"
                          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                          title="व्हाट्सएप"
                        >
                          <MessageSquare size={13} />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {b.status !== 'confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'confirmed')}
                            style={{
                              background: 'rgba(28, 90, 160, 0.08)',
                              border: '1px solid rgba(28, 90, 160, 0.25)',
                              color: '#1a5695',
                              padding: '0.35rem 0.7rem',
                              borderRadius: 'var(--radius-xs)',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              cursor: 'pointer'
                            }}
                          >
                            स्वीकार करें
                          </button>
                        )}

                        {b.status !== 'completed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'completed')}
                            style={{
                              background: 'rgba(22, 101, 52, 0.08)',
                              border: '1px solid rgba(22, 101, 52, 0.25)',
                              color: '#15803d',
                              padding: '0.35rem 0.7rem',
                              borderRadius: 'var(--radius-xs)',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              cursor: 'pointer'
                            }}
                          >
                            संपन्न चिह्नित करें
                          </button>
                        )}

                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'cancelled')}
                            style={{
                              background: 'rgba(185, 28, 28, 0.08)',
                              border: '1px solid rgba(185, 28, 28, 0.25)',
                              color: '#b91c1c',
                              padding: '0.35rem 0.7rem',
                              borderRadius: 'var(--radius-xs)',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              cursor: 'pointer'
                            }}
                          >
                            रद्द करें
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONSULTATIONS LIST */}
        {activeTab === 'consultations' && (
          <div>
            {consultations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 0', color: 'var(--color-text-stone-body)' }}>
                {isLoading ? 'डेटा लोड हो रहा है...' : 'कोई Consultation अनुरोध नहीं है।'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {consultations.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      background: 'var(--color-stone-card)',
                      border: '1px solid var(--color-stone-border)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '1.4rem 1.6rem',
                      boxShadow: 'var(--shadow-stone)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-text-charcoal)', fontWeight: 600, margin: 0, fontFamily: 'var(--font-heading)' }}>
                          {c.devotee_name}
                        </h4>
                        <div style={{ fontSize: '0.88rem', color: 'var(--color-burgundy-base)', fontWeight: 600, marginTop: '0.2rem' }}>
                          प्रकार: {c.consultation_type}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a
                          href={`tel:${c.phone}`}
                          className="btn-outline"
                          style={{
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.8rem',
                            background: 'var(--color-stone-surface)',
                            borderColor: 'var(--color-stone-border)',
                            color: 'var(--color-text-charcoal)'
                          }}
                        >
                          <Phone size={13} />
                          <span>{c.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-editorial-primary"
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                          <MessageSquare size={13} />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    <div style={{
                      background: 'var(--color-stone-surface)',
                      border: '1px solid var(--color-stone-border)',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                      marginBottom: '0.6rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '0.5rem',
                      color: 'var(--color-text-stone-body)'
                    }}>
                      <div>📅 <strong>जन्म तिथि:</strong> {c.dob}</div>
                      <div>⏰ <strong>समय:</strong> {c.tob}</div>
                      <div>📍 <strong>स्थान:</strong> {c.pob}</div>
                      {c.partner_name && <div>💍 <strong>साथी:</strong> {c.partner_name} ({c.partner_dob || ''})</div>}
                    </div>

                    {c.query && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-stone-body)', fontStyle: 'italic' }}>
                        <strong style={{ color: 'var(--color-text-charcoal)' }}>प्रश्न:</strong> "{c.query}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INQUIRIES LIST */}
        {activeTab === 'inquiries' && (
          <div>
            {inquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 0', color: 'var(--color-text-stone-body)' }}>
                {isLoading ? 'डेटा लोड हो रहा है...' : 'कोई संदेश नहीं मिला।'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {inquiries.map((iq) => (
                  <div
                    key={iq.id}
                    style={{
                      background: 'var(--color-stone-card)',
                      border: '1px solid var(--color-stone-border)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '1.4rem 1.6rem',
                      boxShadow: 'var(--shadow-stone)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.15rem', color: 'var(--color-text-charcoal)', fontWeight: 600, margin: 0, fontFamily: 'var(--font-heading)' }}>
                          {iq.name}
                        </h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-burgundy-base)', fontWeight: 600, marginTop: '0.2rem' }}>
                          विषय: {iq.subject}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a
                          href={`tel:${iq.phone}`}
                          className="btn-outline"
                          style={{
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.8rem',
                            background: 'var(--color-stone-surface)',
                            borderColor: 'var(--color-stone-border)',
                            color: 'var(--color-text-charcoal)'
                          }}
                        >
                          <Phone size={13} />
                          <span>{iq.phone}</span>
                        </a>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-stone-body)', margin: 0 }}>
                      "{iq.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

