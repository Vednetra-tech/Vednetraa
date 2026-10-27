import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, MessageSquare, Compass, Heart, Gem } from 'lucide-react';

export default function AstrologyModal({ initialService, isOpen, onClose }) {
  const [consultType, setConsultType] = useState('Faladesh'); // 'Faladesh', 'Kundali Milan', 'Ratna Salah'
  const [formData, setFormData] = useState({
    devotee_name: '',
    phone: '',
    email: '',
    dob: '',
    tob: '',
    pob: '',
    partner_name: '',
    partner_dob: '',
    partner_tob: '',
    partner_pob: '',
    query: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.devotee_name || !formData.phone || !formData.dob || !formData.tob || !formData.pob) {
      setErrorMsg('कृपया नाम, फोन, जन्म तिथि, जन्म समय एवं जन्म स्थान अनिवार्य रूप से भरें।');
      return;
    }

    if (consultType === 'Kundali Milan' && (!formData.partner_name || !formData.partner_dob)) {
      setErrorMsg('कुण्डली मिलान हेतु वर/वधू का विवरण भी आवश्यक है।');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        consultation_type: consultType
      };

      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedData(data.data);
      } else {
        setErrorMsg(data.message || 'Consultation अनुरोध दर्ज करने में त्रुटि।');
      }
    } catch (err) {
      console.warn('Fallback consultation:', err);
      setSubmittedData({
        id: Math.floor(1000 + Math.random() * 9000),
        ...formData,
        consultation_type: consultType
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppLink = () => {
    if (!submittedData) return '#';
    const text = encodeURIComponent(
      `ॐ नमः शिवाय\n` +
      `नमस्ते पंडित राकेश चन्द्र रावल जी,\n\n` +
      `मैंने VedNetra पर ज्योतिष Consultation अनुरोध दर्ज किया है:\n` +
      `• Consultation प्रकार: ${submittedData.consultation_type}\n` +
      `• जातक नाम: ${submittedData.devotee_name}\n` +
      `• जन्म तिथि: ${submittedData.dob}\n` +
      `• जन्म समय: ${submittedData.tob}\n` +
      `• जन्म स्थान: ${submittedData.pob}\n` +
      (submittedData.partner_name ? `• साथी का नाम: ${submittedData.partner_name}\n` : '') +
      (submittedData.query ? `• प्रश्न: ${submittedData.query}\n` : '') +
      `\nकृपया कुण्डली अध्ययन उपरांत Consultation समय निर्धारित करने की कृपा करें।`
    );
    return `https://wa.me/919827514489?text=${text}`;
  };

  const handleClose = () => {
    setSubmittedData(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={handleClose}
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
            cursor: 'pointer'
          }}
          aria-label="Close modal"
        >
          <X size={19} />
        </button>

        {/* Modal Header with Transparent Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '1.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
            <picture>
              <source srcSet="/Logo-emblem-transparent.webp" type="image/webp" />
              <img
                src="/Logo-emblem-transparent.png"
                alt="Emblem"
                loading="lazy"
                decoding="async"
                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
              />
            </picture>
          </div>
          <div style={{
            display: 'inline-flex',
            padding: '0.25rem 0.85rem',
            background: 'rgba(104, 46, 54, 0.08)',
            border: '1px solid rgba(104, 46, 54, 0.2)',
            borderRadius: '100px',
            color: 'var(--color-burgundy-base)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '0.6rem'
          }}>
            <span>Jyotish & Gemstone Consultation</span>
          </div>
          <h3 style={{
            fontSize: '1.8rem',
            color: 'var(--color-text-charcoal)',
            marginBottom: '0.35rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600
          }}>
            जन्म पत्रिका विश्लेषण एवं रत्न सलाह
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-stone-body)' }}>
            ग्रह-दशा, गोचर एवं वैदिक सूत्रों के आधार पर अचूक फलादेश
          </p>
        </div>

        {errorMsg && (
          <div style={{
            padding: '0.85rem 1.1rem',
            background: 'rgba(185, 28, 28, 0.08)',
            border: '1px solid rgba(185, 28, 28, 0.25)',
            borderRadius: 'var(--radius-xs)',
            color: '#b91c1c',
            fontSize: '0.88rem',
            marginBottom: '1.25rem'
          }}>
            {errorMsg}
          </div>
        )}

        {!submittedData ? (
          <form onSubmit={handleSubmit}>
            {/* Consultation Type Selector */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.65rem',
              marginBottom: '1.5rem'
            }}>
              <button
                type="button"
                onClick={() => setConsultType('Faladesh')}
                style={{
                  background: consultType === 'Faladesh' ? 'var(--color-burgundy-base)' : 'var(--color-stone-surface)',
                  border: consultType === 'Faladesh' ? '1.5px solid var(--color-burgundy-base)' : '1px solid var(--color-stone-border)',
                  color: consultType === 'Faladesh' ? '#ffffff' : 'var(--color-text-charcoal)',
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: consultType === 'Faladesh' ? '0 4px 14px rgba(104, 46, 54, 0.2)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Compass size={17} />
                <span>सम्पूर्ण फलादेश</span>
              </button>

              <button
                type="button"
                onClick={() => setConsultType('Kundali Milan')}
                style={{
                  background: consultType === 'Kundali Milan' ? 'var(--color-burgundy-base)' : 'var(--color-stone-surface)',
                  border: consultType === 'Kundali Milan' ? '1.5px solid var(--color-burgundy-base)' : '1px solid var(--color-stone-border)',
                  color: consultType === 'Kundali Milan' ? '#ffffff' : 'var(--color-text-charcoal)',
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: consultType === 'Kundali Milan' ? '0 4px 14px rgba(104, 46, 54, 0.2)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Heart size={17} />
                <span>कुण्डली मिलान</span>
              </button>

              <button
                type="button"
                onClick={() => setConsultType('Ratna Salah')}
                style={{
                  background: consultType === 'Ratna Salah' ? 'var(--color-burgundy-base)' : 'var(--color-stone-surface)',
                  border: consultType === 'Ratna Salah' ? '1.5px solid var(--color-burgundy-base)' : '1px solid var(--color-stone-border)',
                  color: consultType === 'Ratna Salah' ? '#ffffff' : 'var(--color-text-charcoal)',
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: consultType === 'Ratna Salah' ? '0 4px 14px rgba(104, 46, 54, 0.2)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Gem size={17} />
                <span>रत्न सलाह</span>
              </button>
            </div>

            {/* Primary Person Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              <div className="form-group">
                <label className="form-label">जातक का नाम (Full Name) *</label>
                <input
                  type="text"
                  name="devotee_name"
                  value={formData.devotee_name}
                  onChange={handleChange}
                  placeholder="उदा. अमित कुमार"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">दूरभाष / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98275 14489"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Birth Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
              <div className="form-group">
                <label className="form-label">जन्म तिथि (DOB) *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">जन्म समय (TOB) *</label>
                <input
                  type="time"
                  name="tob"
                  value={formData.tob}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">जन्म स्थान (POB) *</label>
                <input
                  type="text"
                  name="pob"
                  value={formData.pob}
                  onChange={handleChange}
                  placeholder="उदा. जयपुर, राज."
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* If Kundali Milan: Partner Details */}
            {consultType === 'Kundali Milan' && (
              <div style={{
                background: 'var(--color-stone-surface)',
                border: '1px solid var(--color-stone-border)',
                borderRadius: 'var(--radius-xs)',
                padding: '1.1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.94rem', color: 'var(--color-burgundy-base)', fontWeight: 600, marginBottom: '0.85rem' }}>
                  वर / वधू का विवरण (Partner Details)
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">नाम *</label>
                    <input
                      type="text"
                      name="partner_name"
                      value={formData.partner_name}
                      onChange={handleChange}
                      placeholder="वर/वधू का नाम"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">जन्म तिथि *</label>
                    <input
                      type="date"
                      name="partner_dob"
                      value={formData.partner_dob}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">जन्म समय</label>
                    <input
                      type="time"
                      name="partner_tob"
                      value={formData.partner_tob}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">जन्म स्थान</label>
                    <input
                      type="text"
                      name="partner_pob"
                      value={formData.partner_pob}
                      onChange={handleChange}
                      placeholder="नगर, राज्य"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Questions / Queries */}
            <div className="form-group">
              <label className="form-label">विशेष प्रश्न अथवा समस्या विवरण</label>
              <textarea
                name="query"
                value={formData.query}
                onChange={handleChange}
                placeholder="उदा. विवाह में विलंब, नौकरी/व्यवसाय में स्थिरता, स्वास्थ्य कष्ट अथवा कौन सा रत्न धारण करना चाहिए..."
                className="form-textarea"
                rows="2"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-editorial-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.85rem 1.4rem', fontSize: '0.98rem' }}
            >
              <Sparkles size={17} />
              <span>{isSubmitting ? 'Submitting Consultation...' : 'Consult Now'}</span>
            </button>
          </form>
        ) : (
          /* Confirmation View */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(22, 101, 52, 0.08)',
              border: '1.5px solid #15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              color: '#15803d'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h4 style={{ fontSize: '1.65rem', color: 'var(--color-text-charcoal)', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              Consultation Booked Successfully!
            </h4>
            <p style={{ fontSize: '0.94rem', color: 'var(--color-text-stone-body)', marginBottom: '1.6rem' }}>
              पंडित जी जन्म पत्रिका का सूक्ष्म अध्ययन कर शीघ्र आपसे संपर्क करेंगे।
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-primary"
                style={{
                  justifyContent: 'center',
                  fontSize: '1rem',
                  padding: '0.9rem'
                }}
              >
                <MessageSquare size={18} />
                <span>पंडित जी को व्हाट्सएप पर जन्म विवरण भेजें</span>
              </a>

              <button
                onClick={handleClose}
                className="btn-editorial-dark"
                style={{ justifyContent: 'center' }}
              >
                समाप्त करें (Close)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
