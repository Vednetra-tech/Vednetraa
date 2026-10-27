import React from 'react';
import { X, ShieldCheck, Calendar, Video, Clock, ScrollText, CheckCircle2 } from 'lucide-react';

export default function TermsAndConditionsModal({ isOpen, onClose, onAccept }) {
  if (!isOpen) return null;

  const handleAccept = () => {
    if (onAccept) onAccept();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        style={{ 
          maxWidth: '680px', 
          maxHeight: '88vh',
          padding: '1.8rem 2.2rem',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.1rem',
            right: '1.1rem',
            background: 'var(--color-stone-surface)',
            border: '1px solid var(--color-stone-border)',
            color: 'var(--color-burgundy-base)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          aria-label="Close terms modal"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.2rem', flexShrink: 0 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(104, 46, 54, 0.08)',
            border: '1px solid rgba(104, 46, 54, 0.2)',
            color: 'var(--color-burgundy-base)',
            marginBottom: '0.4rem'
          }}>
            <ScrollText size={22} />
          </div>
          <h3 style={{ 
            fontSize: '1.45rem', 
            color: 'var(--color-text-charcoal)', 
            marginBottom: '0.2rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600
          }}>
            नियम एवं सेवा शर्तें (Terms & Conditions)
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-stone-body)', margin: 0 }}>
            Vedनेत्र • पं. राकेश चन्द्र रावल — वैदिक अनुष्ठान, मुहूर्त एवं संकल्प नियमावली
          </p>
        </div>

        {/* Scrollable Terms Content */}
        <div style={{
          overflowY: 'auto',
          paddingRight: '0.5rem',
          fontSize: '0.88rem',
          color: 'var(--color-text-stone-body)',
          lineHeight: 1.6,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flexGrow: 1,
          borderTop: '1px solid var(--color-stone-border)',
          borderBottom: '1px solid var(--color-stone-border)',
          paddingTop: '1rem',
          paddingBottom: '1rem'
        }}>
          {/* Section 1: 3 Dates & Online Call */}
          <div style={{
            background: 'var(--color-stone-surface)',
            padding: '0.9rem 1.1rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--color-stone-border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-burgundy-base)',
              fontWeight: 600,
              fontSize: '0.94rem',
              marginBottom: '0.35rem'
            }}>
              <Calendar size={16} />
              <span>१. ३ तिथियों का विकल्प एवं ऑनलाइन मुहूर्त निर्धारण प्रक्रिया (Date Band & Online Call)</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.84rem' }}>
              <li>
                यजमान द्वारा प्रस्तावित <strong>३ संभावित तिथियों (प्राथमिक, द्वितीय एवं अतिरिक्त तिथि)</strong> के आधार पर पंडित जी पंचांग के पांचों अंगों (तिथि, वार, नक्षत्र, योग, करण) का सूक्ष्म ज्योतिषीय विश्लेषण करेंगे।
              </li>
              <li>
                <strong>बुकिंग के उपरांत ऑनलाइन कॉल:</strong> बुकिंग दर्ज होने के तुरंत बाद संस्थान द्वारा यजमान के साथ एक ऑनलाइन वीडियो/ऑडियो कॉल (Google Meet / Phone) आयोजित की जाएगी। इस कॉल में पंडित जी यजमान से प्रत्यक्ष चर्चा कर इन ३ तिथियों में से सर्वश्रेष्ठ मुहूर्त तय करेंगे तथा अंतिम अप्वाइंटमेंट पुष्टि प्रदान करेंगे।
              </li>
            </ul>
          </div>

          {/* Section 2: Google Calendar & Time Slot */}
          <div style={{
            background: 'var(--color-stone-surface)',
            padding: '0.9rem 1.1rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--color-stone-border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-burgundy-base)',
              fontWeight: 600,
              fontSize: '0.94rem',
              marginBottom: '0.35rem'
            }}>
              <Clock size={16} />
              <span>२. कैलेंडर समय एवं Google Calendar समन्वय (Calendar Time & Availability)</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.84rem' }}>
              <li>
                बुकिंग फॉर्म में दिया गया समय <strong>कैलेंडर समय (वार्ता / परामर्श समय)</strong> है, जिससे पंडित जी के Google Calendar (<code>panditrakeshrawal26@gmail.com</code>) के साथ समय का सामंजस्य बिठाया जा सके।
              </li>
              <li>
                मुख्य अनुष्ठान का पंचांग मुहूर्त कॉल के दौरान ही शास्त्रोक्त विधि से अंतिम रूप से निर्धारित किया जाएगा।
              </li>
            </ul>
          </div>

          {/* Section 3: Offline & Online Ritual Rules */}
          <div style={{
            background: 'var(--color-stone-surface)',
            padding: '0.9rem 1.1rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--color-stone-border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-burgundy-base)',
              fontWeight: 600,
              fontSize: '0.94rem',
              marginBottom: '0.35rem'
            }}>
              <Video size={16} />
              <span>३. प्रत्यक्ष (Offline) एवं ऑनलाइन (Online) अनुष्ठान संचालन</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.84rem' }}>
              <li>
                <strong>प्रत्यक्ष पूजा (Offline):</strong> यजमान के गृह, संस्थान अथवा तीर्थ स्थल पर पंडित जी की व्यक्तिगत शास्त्रीय उपस्थिति रहेगी। यजमान द्वारा पवित्र स्थान, वेदी एवं व्यवस्था पूर्ववत रखी जानी आवश्यक है।
              </li>
              <li>
                <strong>ऑनलाइन पूजा (Online):</strong> देश-विदेश के यजमानों हेतु लाइव HD वीडियो प्रसारण द्वारा संपूर्ण वैदिक विधि, मंत्रोच्चार एवं संकल्प संपन्न कराया जाएगा। पूजनोपरांत अभिमंत्रित रक्षा-कवच एवं प्रसाद यजमान के पते पर प्रेषित किया जाता है।
              </li>
            </ul>
          </div>

          {/* Section 4: Vedic Code of Conduct */}
          <div style={{
            background: 'var(--color-stone-surface)',
            padding: '0.9rem 1.1rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--color-stone-border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-burgundy-base)',
              fontWeight: 600,
              fontSize: '0.94rem',
              marginBottom: '0.35rem'
            }}>
              <ScrollText size={16} />
              <span>४. वैदिक आचार संहिता, संकल्प एवं मर्यादा (Sacred Conduct)</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.84rem' }}>
              <li>
                अनुष्ठान दिवस पर यजमान एवं परिवार को सात्विक आहार एवं आचार का पालन करना श्रेयस्कर है।
              </li>
              <li>
                संकल्प के समय यजमान का पूरा नाम, पिता का नाम, गोत्र एवं अभीष्ट मनोकामना का शुद्ध उच्चारण अनिवार्य है।
              </li>
            </ul>
          </div>

          {/* Section 5: Rescheduling & Privacy */}
          <div style={{
            background: 'var(--color-stone-surface)',
            padding: '0.9rem 1.1rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--color-stone-border)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-burgundy-base)',
              fontWeight: 600,
              fontSize: '0.94rem',
              marginBottom: '0.35rem'
            }}>
              <ShieldCheck size={16} />
              <span>५. पुनर्निर्धारण एवं गोपनीयता (Rescheduling & Devotee Privacy)</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.84rem' }}>
              <li>
                अपरिहार्य परिस्थिति में अनुष्ठान से न्यूनतम ४८ घंटे पूर्व सूचना देकर उपलब्ध तिथियों में से नया समय तय किया जा सकता है।
              </li>
              <li>
                यजमान का नाम, दूरभाष, पता, जन्म विवरण एवं संकल्प पूर्णतः गोपनीय रखे जाते हैं।
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          marginTop: '1.1rem',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          flexShrink: 0
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-editorial-dark"
            style={{ padding: '0.65rem 1.2rem', fontSize: '0.88rem' }}
          >
            बंद करें (Close)
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="btn-editorial-primary"
            style={{ padding: '0.65rem 1.3rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <CheckCircle2 size={16} />
            <span>स्वीकार है (I Understand & Accept)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
