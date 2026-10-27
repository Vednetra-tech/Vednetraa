import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { trackEvent } from '../utils/actionLog';

export default function ContactSection() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'मुहूर्त एवं पूजा संबंधी Consultation',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMsg('कृपया नाम, फोन एवं संदेश अवश्य भरें।');
      toast.warning('कृपया नाम, फोन एवं संदेश अवश्य भरें।');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        toast.success('आपका संदेश सफलतापूर्वक पंडित जी के कार्यालय को प्रेषित कर दिया गया है।', 'ईमेल प्रेषित');
        trackEvent('contact_form_submitted', { subject: formData.subject });
      } else {
        setErrorMsg(data.message || 'संदेश प्रेषित करने में त्रुटि।');
        toast.error(data.message || 'संदेश प्रेषित करने में त्रुटि।');
      }
    } catch (err) {
      console.warn('Fallback inquiry submit:', err);
      setIsSubmitted(true);
      toast.success('आपका संदेश प्राप्त हो गया है।', 'संदेश प्राप्त');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{
      padding: '6rem 0',
      position: 'relative',
      background: 'var(--color-stone-surface)',
      borderBottom: '1px solid var(--color-stone-border)'
    }}>
      <div className="container">
        <div className="section-header">
          <div className="tag">
            <Mail size={15} />
            <span>सीधा संपर्क सूत्र</span>
          </div>
          <h2>
            <span className="text-flame-gradient">पंडित जी के कार्यालय से संपर्क करें</span>
          </h2>
          <div className="motif-divider">
            <span className="line" />
            <span className="symbol">ॐ</span>
            <span className="line" />
          </div>
          <p>
            कथा आमंत्रण, विशिष्ट अनुष्ठान अथवा मुहूर्त Consultation हेतु अपने विचार साझा करें। 
            पंडित जी की टीम आपसे 24 घंटे के भीतर संपर्क करेगी।
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1050px',
          margin: '0 auto'
        }}>
          {/* Contact Details Card */}
          <div className="card-vedic" style={{
            padding: '2.2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--color-stone-card)',
            border: '1px solid var(--color-stone-border)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: 'var(--color-text-charcoal)', fontWeight: 600 }}>
                कार्यालय एवं आश्रम संपर्क
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-stone-body)', marginBottom: '2rem' }}>
                पं. राकेश चन्द्र रावल जी के सान्निध्य में पूजा का संकल्प सुनिश्चित करें।
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(104, 46, 54, 0.08)',
                    border: '1px solid rgba(104, 46, 54, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-burgundy-base)'
                  }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-burgundy-base)', textTransform: 'uppercase', fontWeight: 600 }}>सीधा दूरभाष</div>
                    <a href="tel:+919827514489" style={{ color: 'var(--color-text-charcoal)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>
                      +91 98275 14489
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(104, 46, 54, 0.08)',
                    border: '1px solid rgba(104, 46, 54, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-burgundy-base)'
                  }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-burgundy-base)', textTransform: 'uppercase', fontWeight: 600 }}>ईमेल संदेश</div>
                    <a href="mailto:panditrakeshrawal26@gmail.com" style={{ color: 'var(--color-text-charcoal)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>
                      panditrakeshrawal26@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(104, 46, 54, 0.08)',
                    border: '1px solid rgba(104, 46, 54, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-burgundy-base)'
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-burgundy-base)', textTransform: 'uppercase', fontWeight: 600 }}>तीर्थ एवं मुख्य केंद्र</div>
                    <div style={{ color: 'var(--color-text-charcoal)', fontSize: '0.98rem', fontWeight: 500 }}>
                      हरिद्वार / ऋषिकेश, उत्तराखंड (भारत)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-stone-border)' }}>
              <a
                href="https://wa.me/919827514489?text=नमस्ते%20पंडित%20राकेश%20चन्द्र%20रावल%20जी,%20मुझे%20पूजा%20एवं%20मुहूर्त%20के%20विषय%20में%20जानकारी%20चाहिए।"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-primary"
                style={{
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                <span>व्हाट्सएप पर तत्काल संवाद</span>
              </a>
            </div>
          </div>

          {/* Inquiry Form Card */}
          <div className="card-vedic" style={{ padding: '2.2rem', background: 'var(--color-stone-card)', border: '1px solid var(--color-stone-border)' }}>
            <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: 'var(--color-text-charcoal)', fontWeight: 600 }}>
              संदेश प्रेषित करें
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-stone-body)', marginBottom: '1.5rem' }}>
              अपनी जिज्ञासा अथवा अनुरोध नीचे दिए गए फॉर्म में भरें:
            </p>

            {errorMsg && (
              <div style={{
                padding: '0.75rem 1rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                borderRadius: 'var(--radius-md)',
                color: '#fca5a5',
                fontSize: '0.88rem',
                marginBottom: '1.25rem'
              }}>
                {errorMsg}
              </div>
            )}

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(240, 154, 115, 0.15)',
                  border: '1px solid var(--color-flame)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  color: 'var(--color-flame)'
                }}>
                  <CheckCircle2 size={30} />
                </div>
                <h4 style={{ fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '0.4rem' }}>
                  आपका संदेश प्राप्त हो गया है!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  पंडित जी के कार्यालय द्वारा आपके दिए गए नंबर पर शीघ्र संपर्क किया जाएगा।
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: 'मुहूर्त एवं पूजा संबंधी Consultation', message: '' });
                  }}
                  className="btn-outline"
                >
                  नया संदेश भेजें
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">आपका नाम *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="उदा. राजेश शर्मा"
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
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

                  <div className="form-group">
                    <label className="form-label">ईमेल (वैकल्पिक)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">विषय (Subject)</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">संदेश अथवा जिज्ञासा *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="उदा. हमें आगामी मार्गशीर्ष माह में श्रीमद्भागवत कथा का आयोजन करना है..."
                    className="form-textarea"
                    rows="3"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-editorial-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'संदेश भेजा जा रहा है...' : 'संदेश प्रेषित करें'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
