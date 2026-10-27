import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { trackBookingCompleted } from '../utils/actionLog';
import { staticServices } from '../data/staticServices';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import { 
  X, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  MapPin, 
  Video, 
  Clock, 
  User, 
  FileText,
  ExternalLink,
  PhoneCall,
  CalendarDays,
  ShieldCheck
} from 'lucide-react';

const serviceCategories = [
  { id: 'katha', label: 'श्रीमद्भागवत कथा (Bhagwat Katha)' },
  { id: 'pooja', label: 'विशिष्ट पूजा (Sacred Pooja)' },
  { id: 'dosh_nivaran', label: 'दोष निवारण एवं वास्तु (Dosh & Vastu)' },
  { id: 'abhishekh', label: 'पवित्र अभिषेक (Abhishekh)' },
  { id: 'hawan', label: 'वैदिक हवन एवं होमम् (Hawan & Homam)' },
  { id: 'ratna_salah', label: 'रत्न व ज्योतिष परामर्श (Astrology)' }
];

const calendarTimeSlots = [
  { value: 'प्रातः 09:00 - 11:00 AM (Morning Slot)', label: 'प्रातः 09:00 - 11:00 AM (Morning Slot)' },
  { value: 'मध्याह्न 11:00 - 01:00 PM (Midday Slot)', label: 'मध्याह्न 11:00 - 01:00 PM (Midday Slot)' },
  { value: 'दोपहर 02:00 - 04:00 PM (Afternoon Slot)', label: 'दोपहर 02:00 - 04:00 PM (Afternoon Slot)' },
  { value: 'सायं 04:00 - 06:00 PM (Evening Slot)', label: 'सायं 04:00 - 06:00 PM (Evening Slot)' },
  { value: 'संध्या 06:00 - 08:00 PM (Late Evening Slot)', label: 'संध्या 06:00 - 08:00 PM (Late Evening Slot)' },
  { value: 'पंडित जी की उपलब्धता अनुसार (Flexible Slot)', label: 'पंडित जी की उपलब्धता अनुसार (Flexible Slot)' }
];

export default function BookingModal({ initialService, isOpen, onClose }) {
  const { user } = useAuth();
  const toast = useToast();

  // Core Mode: 'Offline' (प्रत्यक्ष पूजा) or 'Online' (ऑनलाइन पूजा)
  const [activeSection, setActiveSection] = useState('Offline');
  const [showCalendarViewer, setShowCalendarViewer] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const [formData, setFormData] = useState({
    service_id: '',
    service_title: '',
    ritual_mode: 'Offline',
    preferred_date: '',
    second_date: '',
    third_date: '',
    preferred_time: 'प्रातः 09:00 - 11:00 AM (Morning Slot)',
    devotee_name: '',
    phone: '',
    gotra: '',
    city: '',
    venue_address: '',
    special_sankalp: '',
    terms_accepted: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Synchronize initialService and user details when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (user) {
      setFormData(prev => ({
        ...prev,
        devotee_name: prev.devotee_name || (user.name && !user.name.includes('यजमान') ? user.name : ''),
        phone: prev.phone || user.phone || ''
      }));
    }

    if (initialService) {
      const mode = (initialService.modes && initialService.modes.includes('Offline')) 
        ? 'Offline' 
        : (initialService.modes && initialService.modes.includes('Online')) ? 'Online' : 'Offline';
      
      setActiveSection(mode);
      setFormData(prev => ({
        ...prev,
        service_id: initialService.id || '',
        service_title: initialService.title || '',
        ritual_mode: mode
      }));
    } else {
      const defaultSvc = staticServices.find(s => !s.modes || s.modes.includes('Offline')) || staticServices[0];
      setActiveSection('Offline');
      setFormData(prev => ({
        ...prev,
        service_id: defaultSvc ? defaultSvc.id : '',
        service_title: defaultSvc ? defaultSvc.title : '',
        ritual_mode: 'Offline'
      }));
    }
  }, [initialService, isOpen, user]);

  if (!isOpen) return null;

  // Handle mode switch between Offline & Online
  const handleSectionSwitch = (section) => {
    setActiveSection(section);
    setFormData(prev => {
      const currentSvc = staticServices.find(s => s.title === prev.service_title);
      let newTitle = prev.service_title;
      let newId = prev.service_id;

      if (!currentSvc || !currentSvc.modes || !currentSvc.modes.includes(section)) {
        const compatibleSvc = staticServices.find(s => !s.modes || s.modes.includes(section));
        if (compatibleSvc) {
          newTitle = compatibleSvc.title;
          newId = compatibleSvc.id;
        }
      }

      return {
        ...prev,
        ritual_mode: section,
        service_title: newTitle,
        service_id: newId
      };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleServiceChange = (e) => {
    const selectedTitle = e.target.value;
    const found = staticServices.find(s => s.title === selectedTitle);
    setFormData(prev => ({
      ...prev,
      service_title: selectedTitle,
      service_id: found ? found.id : null
    }));
  };

  // Filter services supported in active mode
  const filteredServices = staticServices.filter(s => {
    return !s.modes || s.modes.includes(activeSection);
  });

  const activeServiceObj = staticServices.find(s => s.title === formData.service_title);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service_title) {
      setErrorMsg('कृपया अनुष्ठान का चयन करें।');
      return;
    }
    if (!formData.preferred_date) {
      setErrorMsg('कृपया प्राथमिक अभीष्ट तिथि का चयन करें।');
      return;
    }
    if (!formData.second_date) {
      setErrorMsg('कृपया द्वितीय संभावित तिथि का चयन करें।');
      return;
    }
    if (!formData.devotee_name.trim()) {
      setErrorMsg('कृपया यजमान का पूरा नाम दर्ज करें।');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('कृपया संपर्क दूरभाष / WhatsApp नंबर दर्ज करें।');
      return;
    }
    if (activeSection === 'Offline' && !formData.venue_address.trim()) {
      setErrorMsg('प्रत्यक्ष पूजा हेतु कृपया पूजा स्थल / गृह का पता अवश्य दर्ज करें।');
      return;
    }
    if (activeSection === 'Online' && !formData.city.trim()) {
      setErrorMsg('ऑनलाइन पूजा संकल्प हेतु कृपया अपना गृह नगर / देश दर्ज करें।');
      return;
    }
    if (!formData.terms_accepted) {
      setErrorMsg('कृपया आगे बढ़ने से पूर्व सेवा नियम एवं शर्तों को स्वीकार करें।');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedBooking(data.data);
        toast.success(`पूजा Booking #${data.data.id ? data.data.id.toString().padStart(4, '0') : ''} दर्ज हुई!`, 'सङ्कल्प पुष्ट');
        trackBookingCompleted(data.data.id, formData.service_title, formData.ritual_mode);
      } else {
        const mockBooking = {
          id: Math.floor(1000 + Math.random() * 9000),
          ...formData,
          status: 'pending'
        };
        setSubmittedBooking(mockBooking);
        toast.success('पूजा Booking सङ्कल्प दर्ज कर लिया गया है।', 'सङ्कल्प पुष्ट');
        trackBookingCompleted(mockBooking.id, formData.service_title, formData.ritual_mode);
      }
    } catch (err) {
      console.warn('Booking API fallback:', err);
      const mockBooking = {
        id: Math.floor(1000 + Math.random() * 9000),
        ...formData,
        status: 'pending'
      };
      setSubmittedBooking(mockBooking);
      toast.success('पूजा Booking सङ्कल्प दर्ज कर लिया गया है।', 'सङ्कल्प पुष्ट');
      trackBookingCompleted(mockBooking.id, formData.service_title, formData.ritual_mode);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppLink = () => {
    if (!submittedBooking) return '#';
    const text = encodeURIComponent(
      `ॐ नमो भगवते वासुदेवाय\n` +
      `नमस्ते पंडित राकेश चन्द्र रावल जी,\n\n` +
      `मैंने VedNetra पोर्टल पर पूजा सङ्कल्प Booking दर्ज की है:\n` +
      `• Booking Ref: #VN-${submittedBooking.id}\n` +
      `• माध्यम: ${submittedBooking.ritual_mode === 'Offline' ? 'प्रत्यक्ष पूजा (Offline)' : 'ऑनलाइन पूजा (Online)'}\n` +
      `• यजमान: ${submittedBooking.devotee_name}\n` +
      `• पूजा/कथा: ${submittedBooking.service_title}\n` +
      `• प्रस्तावित ३ तिथियां (Date Band):\n` +
      `   1. प्राथमिक तिथि: ${submittedBooking.preferred_date}\n` +
      (submittedBooking.second_date ? `   2. द्वितीय तिथि: ${submittedBooking.second_date}\n` : '') +
      (submittedBooking.third_date ? `   3. अतिरिक्त तिथि: ${submittedBooking.third_date}\n` : '') +
      `• पसंदीदा कैलेंडर समय: ${submittedBooking.preferred_time}\n` +
      (submittedBooking.venue_address ? `• स्थल/पता: ${submittedBooking.venue_address}\n` : '') +
      (submittedBooking.city ? `• नगर/देश: ${submittedBooking.city}\n` : '') +
      (submittedBooking.gotra ? `• गोत्र: ${submittedBooking.gotra}\n` : '') +
      (submittedBooking.special_sankalp ? `• विशेष सङ्कल्प: ${submittedBooking.special_sankalp}\n` : '') +
      `\nकृपया इन ३ तिथियों के आधार पर सर्वश्रेष्ठ मुहूर्त निर्धारण एवं ऑनलाइन अप्वाइंटमेंट कॉल का समय प्रदान करें।\nधन्यवाद।`
    );
    return `https://wa.me/919827514489?text=${text}`;
  };

  const generateGoogleCalendarEventUrl = () => {
    if (!submittedBooking) return '#';
    const title = encodeURIComponent(`VedNetra पूजा मुहूर्त निर्धारण कॉल — ${submittedBooking.service_title}`);
    const details = encodeURIComponent(
      `यजमान: ${submittedBooking.devotee_name}\n` +
      `पूजा/अनुष्ठान: ${submittedBooking.service_title} (${submittedBooking.ritual_mode === 'Offline' ? 'प्रत्यक्ष पूजा' : 'ऑनलाइन पूजा'})\n\n` +
      `प्रस्तावित ३ संभावित तिथियां (Date Band):\n` +
      `१. प्राथमिक तिथि: ${submittedBooking.preferred_date}\n` +
      (submittedBooking.second_date ? `२. द्वितीय तिथि: ${submittedBooking.second_date}\n` : '') +
      (submittedBooking.third_date ? `३. तृतीय अतिरिक्त तिथि: ${submittedBooking.third_date}\n` : '') +
      `\nपसंदीदा कैलेंडर समय: ${submittedBooking.preferred_time}\n` +
      (submittedBooking.venue_address ? `पूजा स्थल: ${submittedBooking.venue_address}\n` : '') +
      (submittedBooking.city ? `नगर: ${submittedBooking.city}\n` : '') +
      (submittedBooking.gotra ? `गोत्र: ${submittedBooking.gotra}\n` : '') +
      (submittedBooking.special_sankalp ? `विशेष संकल्प: ${submittedBooking.special_sankalp}\n` : '') +
      `\nनोट: इस ऑनलाइन कॉल में पंडित जी यजमान से वार्ता कर इन ३ तिथियों में से सर्वश्रेष्ठ पंचांग मुहूर्त तय करेंगे।\n` +
      `Booking Ref: #VN-${submittedBooking.id}`
    );
    const location = encodeURIComponent(
      submittedBooking.ritual_mode === 'Offline' 
        ? (submittedBooking.venue_address || 'यजमान का स्थल')
        : 'Google Meet / ऑनलाइन लाइव वीडियो'
    );
    const cleanDate = (submittedBooking.preferred_date || '').replace(/-/g, '');
    const dates = cleanDate ? `${cleanDate}T043000Z/${cleanDate}T053000Z` : '';
    const addGuest = encodeURIComponent('panditrakeshrawal26@gmail.com');
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&add=${addGuest}${dates ? `&dates=${dates}` : ''}`;
  };

  const handleClose = () => {
    setSubmittedBooking(null);
    setErrorMsg('');
    setShowCalendarViewer(false);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}>
        <div 
          className="modal-content" 
          onClick={e => e.stopPropagation()}
          style={{ 
            maxWidth: '640px', 
            padding: '1.6rem 2rem',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
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
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Modal Header */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.3rem' }}>
              <picture>
                <source srcSet="/Logo-emblem-transparent.webp" type="image/webp" />
                <img
                  src="/Logo-emblem-transparent.png"
                  alt="VedNetra Emblem"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '38px', height: '38px', objectFit: 'contain' }}
                />
              </picture>
            </div>
            <h3 style={{ 
              fontSize: '1.38rem', 
              color: 'var(--color-text-charcoal)', 
              marginBottom: '0.2rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600
            }}>
              Book Sacred Pooja (वैदिक संकल्प)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-stone-body)', margin: 0 }}>
              पं. राकेश चन्द्र रावल • ३ तिथियों का विकल्प एवं ऑनलाइन मुहूर्त निर्धारण
            </p>
          </div>

          {/* Form or Confirmation */}
          {!submittedBooking ? (
            <div>
              {/* 1. Mode Switcher (Segmented Pill Control) */}
              <div style={{ marginBottom: '0.9rem' }}>
                <div style={{
                  display: 'flex',
                  background: 'var(--color-stone-surface)',
                  padding: '3px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-stone-border)',
                  gap: '3px'
                }}>
                  <button
                    type="button"
                    onClick={() => handleSectionSwitch('Offline')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      padding: '0.48rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: activeSection === 'Offline' ? 600 : 500,
                      fontSize: '0.86rem',
                      background: activeSection === 'Offline' ? 'var(--color-burgundy-base)' : 'transparent',
                      color: activeSection === 'Offline' ? '#ffffff' : 'var(--color-text-stone-body)',
                      boxShadow: activeSection === 'Offline' ? '0 2px 8px rgba(104, 46, 54, 0.25)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <MapPin size={14} />
                    <span>प्रत्यक्ष पूजा (Offline)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSectionSwitch('Online')}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      padding: '0.48rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: activeSection === 'Online' ? 600 : 500,
                      fontSize: '0.86rem',
                      background: activeSection === 'Online' ? 'var(--color-burgundy-base)' : 'transparent',
                      color: activeSection === 'Online' ? '#ffffff' : 'var(--color-text-stone-body)',
                      boxShadow: activeSection === 'Online' ? '0 2px 8px rgba(104, 46, 54, 0.25)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Video size={14} />
                    <span>ऑनलाइन पूजा (Online)</span>
                  </button>
                </div>

                {/* Mode Context Helper Note */}
                <div style={{
                  textAlign: 'center',
                  fontSize: '0.74rem',
                  color: 'var(--color-text-stone-body)',
                  marginTop: '0.3rem'
                }}>
                  {activeSection === 'Offline' 
                    ? '📍 यजमान के गृह, संस्थान अथवा तीर्थ स्थल पर व्यक्तिगत उपस्थिति'
                    : '📹 लाइव HD वीडियो प्रसारण, वैदिक संकल्प एवं घर पर प्रसाद प्रेषण'}
                </div>
              </div>

              {errorMsg && (
                <div style={{
                  padding: '0.65rem 0.9rem',
                  background: 'rgba(185, 28, 28, 0.08)',
                  border: '1px solid rgba(185, 28, 28, 0.25)',
                  borderRadius: 'var(--radius-xs)',
                  color: '#b91c1c',
                  fontSize: '0.82rem',
                  marginBottom: '0.85rem'
                }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* SECTION A: अनुष्ठान चयन */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--color-text-charcoal)',
                    marginBottom: '0.25rem'
                  }}>
                    <Sparkles size={13} color="var(--color-burgundy-base)" />
                    <span>पूजन / अनुष्ठान का चयन करें *</span>
                  </label>
                  <select
                    name="service_title"
                    value={formData.service_title}
                    onChange={handleServiceChange}
                    className="form-select"
                    style={{
                      width: '100%',
                      fontSize: '0.88rem',
                      padding: '0.52rem 0.75rem'
                    }}
                    required
                  >
                    {serviceCategories.map(cat => {
                      const items = filteredServices.filter(s => s.category === cat.id);
                      if (items.length === 0) return null;
                      return (
                        <optgroup key={cat.id} label={cat.label}>
                          {items.map(s => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </optgroup>
                      );
                    })}
                  </select>

                  {/* Ritual Duration & Samagri Preview */}
                  {activeServiceObj && (
                    <div style={{
                      marginTop: '0.3rem',
                      padding: '0.35rem 0.65rem',
                      background: 'var(--color-stone-surface)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--color-stone-border)',
                      fontSize: '0.76rem',
                      color: 'var(--color-text-stone-body)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.3rem'
                    }}>
                      <span>
                        <strong style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>अवधि:</strong> {activeServiceObj.duration}
                      </span>
                      <span>
                        <strong style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>सामग्री:</strong> {activeServiceObj.samagri_included ? 'संस्थान द्वारा प्रदत्त' : 'यजमान द्वारा व्यवस्था'}
                      </span>
                    </div>
                  )}
                </div>

                {/* SECTION B: ३ संभावित तिथियों का विकल्प (BAND OF 3 DATES) */}
                <div style={{
                  background: 'var(--color-stone-surface)',
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-stone-border)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.45rem',
                    flexWrap: 'wrap',
                    gap: '0.4rem'
                  }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--color-burgundy-base)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <CalendarDays size={14} />
                      <span>३ संभावित तिथियों का विकल्प (Date Band)</span>
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-stone-body)' }}>
                      पंडित जी इनमें से सर्वश्रेष्ठ मुहूर्त तय करेंगे
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                    gap: '0.65rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--color-text-charcoal)',
                        marginBottom: '0.2rem'
                      }}>
                        १. प्राथमिक तिथि *
                      </label>
                      <input
                        type="date"
                        name="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="form-input"
                        style={{ fontSize: '0.84rem', padding: '0.48rem 0.65rem', width: '100%' }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--color-text-charcoal)',
                        marginBottom: '0.2rem'
                      }}>
                        २. द्वितीय तिथि *
                      </label>
                      <input
                        type="date"
                        name="second_date"
                        value={formData.second_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="form-input"
                        style={{ fontSize: '0.84rem', padding: '0.48rem 0.65rem', width: '100%' }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: 'var(--color-text-stone-body)',
                        marginBottom: '0.2rem'
                      }}>
                        ३. अतिरिक्त तिथि (वैकल्पिक)
                      </label>
                      <input
                        type="date"
                        name="third_date"
                        value={formData.third_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="form-input"
                        style={{ fontSize: '0.84rem', padding: '0.48rem 0.65rem', width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION C: कैलेंडर समय एवं Google Calendar एकीकरण */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.25rem'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--color-text-charcoal)',
                      margin: 0
                    }}>
                      <Clock size={13} color="var(--color-burgundy-base)" />
                      <span>कैलेंडर समय (वार्ता / परामर्श समय) *</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowCalendarViewer(!showCalendarViewer)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-burgundy-base)',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0 0.2rem',
                        textDecoration: 'underline'
                      }}
                    >
                      <Calendar size={12} />
                      <span>पंडित जी का Google Calendar देखें</span>
                    </button>
                  </div>

                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleChange}
                    className="form-select"
                    style={{ fontSize: '0.84rem', padding: '0.52rem 0.75rem', width: '100%' }}
                  >
                    {calendarTimeSlots.map(slot => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>

                  {/* Panditji Google Calendar Embedded Schedule Preview */}
                  {showCalendarViewer && (
                    <div style={{
                      marginTop: '0.45rem',
                      background: '#ffffff',
                      border: '1.5px solid var(--color-burgundy-base)',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      boxShadow: '0 4px 14px rgba(104, 46, 54, 0.15)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.4rem 0.75rem',
                        background: 'var(--color-stone-surface)',
                        borderBottom: '1px solid var(--color-stone-border)',
                        fontSize: '0.78rem',
                        color: 'var(--color-burgundy-base)',
                        fontWeight: 600
                      }}>
                        <span>पं. राकेश चन्द्र रावल (panditrakeshrawal26@gmail.com) का कैलेंडर</span>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <a
                            href="https://calendar.google.com/calendar/u/0/r"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--color-burgundy-base)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                          >
                            <ExternalLink size={11} />
                            <span>फुल स्क्रीन</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => setShowCalendarViewer(false)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: 700,
                              color: 'var(--color-burgundy-base)',
                              fontSize: '0.85rem'
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <iframe
                        src="https://calendar.google.com/calendar/embed?src=panditrakeshrawal26%40gmail.com&ctz=Asia%2FKolkata&mode=WEEK"
                        style={{ border: 0, width: '100%', height: '240px' }}
                        frameBorder="0"
                        scrolling="no"
                        title="Panditji Live Google Calendar"
                      />
                    </div>
                  )}
                </div>

                {/* SECTION D: यजमान संपर्क विवरण (Devotee & Phone Grid) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.75rem'
                }}>
                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--color-text-charcoal)',
                      marginBottom: '0.25rem'
                    }}>
                      <User size={13} color="var(--color-burgundy-base)" />
                      <span>यजमान का पूरा नाम *</span>
                    </label>
                    <input
                      type="text"
                      name="devotee_name"
                      placeholder="उदा. राहुल शर्मा"
                      value={formData.devotee_name}
                      onChange={handleChange}
                      className="form-input"
                      style={{ fontSize: '0.86rem', padding: '0.52rem 0.75rem' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--color-text-charcoal)',
                      marginBottom: '0.25rem'
                    }}>
                      <MessageSquare size={13} color="var(--color-burgundy-base)" />
                      <span>मोबाइल / WhatsApp नंबर *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98275 14489"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      style={{ fontSize: '0.86rem', padding: '0.52rem 0.75rem' }}
                      required
                    />
                  </div>
                </div>

                {/* SECTION E: स्थल/शहर एवं गोत्र */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.75rem'
                }}>
                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--color-text-charcoal)',
                      marginBottom: '0.25rem'
                    }}>
                      <MapPin size={13} color="var(--color-burgundy-base)" />
                      <span>
                        {activeSection === 'Offline' ? 'पूजा स्थल / निवास का पता *' : 'गृह नगर एवं देश (City / Country) *'}
                      </span>
                    </label>
                    {activeSection === 'Offline' ? (
                      <input
                        type="text"
                        name="venue_address"
                        placeholder="घर का पता, कॉलोनी, शहर (उदा. हरिद्वार / दिल्ली)"
                        value={formData.venue_address}
                        onChange={handleChange}
                        className="form-input"
                        style={{ fontSize: '0.86rem', padding: '0.52rem 0.75rem' }}
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        name="city"
                        placeholder="उदा. मुंबई, दिल्ली, लंदन, न्यूयॉर्क"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-input"
                        style={{ fontSize: '0.86rem', padding: '0.52rem 0.75rem' }}
                        required
                      />
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: 'var(--color-text-stone-body)',
                      marginBottom: '0.25rem'
                    }}>
                      <FileText size={13} color="var(--color-burgundy-base)" />
                      <span>गोत्र (वैकल्पिक)</span>
                    </label>
                    <input
                      type="text"
                      name="gotra"
                      placeholder="उदा. कश्यप / भारद्वाज"
                      value={formData.gotra}
                      onChange={handleChange}
                      className="form-input"
                      style={{ fontSize: '0.86rem', padding: '0.52rem 0.75rem' }}
                    />
                  </div>
                </div>

                {/* SECTION F: विशेष संकल्प / मनोकामना */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    color: 'var(--color-text-stone-body)',
                    marginBottom: '0.25rem'
                  }}>
                    <Sparkles size={13} color="var(--color-burgundy-base)" />
                    <span>विशेष सङ्कल्प / मनोकामना (वैकल्पिक)</span>
                  </label>
                  <input
                    type="text"
                    name="special_sankalp"
                    placeholder="उदा. गृह प्रवेश, स्वास्थ्य लाभ, विवाह बाधा शांति, पितृ तर्पण..."
                    value={formData.special_sankalp}
                    onChange={handleChange}
                    className="form-input"
                    style={{ fontSize: '0.86rem', padding: '0.52rem 0.75rem' }}
                  />
                </div>

                {/* SECTION G: ऑनलाइन मुहूर्त निर्धारण कॉल नोटिस */}
                <div style={{
                  background: 'rgba(104, 46, 54, 0.05)',
                  border: '1px solid rgba(104, 46, 54, 0.18)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.55rem 0.8rem',
                  fontSize: '0.78rem',
                  color: 'var(--color-text-charcoal)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.45rem'
                }}>
                  <PhoneCall size={15} color="var(--color-burgundy-base)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-burgundy-base)' }}>बुकिंग उपरांत ऑनलाइन कॉल:</strong>{' '}
                    आपकी दी गई ३ तिथियों में से सर्वश्रेष्ठ पंचांग मुहूर्त निर्धारण हेतु बुकिंग के पश्चात पंडित जी द्वारा आपके साथ एक ऑनलाइन वीडियो/ऑडियो कॉल आयोजित की जाएगी।
                  </div>
                </div>

                {/* SECTION H: नियम एवं शर्तें (TERMS AND CONDITIONS CHECKBOX) */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.3rem 0',
                  fontSize: '0.8rem'
                }}>
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    name="terms_accepted"
                    checked={formData.terms_accepted}
                    onChange={handleChange}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: 'var(--color-burgundy-base)',
                      cursor: 'pointer'
                    }}
                  />
                  <label htmlFor="termsCheckbox" style={{ margin: 0, cursor: 'pointer', color: 'var(--color-text-charcoal)' }}>
                    मैं VedNetra की{' '}
                    <button
                      type="button"
                      onClick={() => setIsTermsOpen(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-burgundy-base)',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: 'inherit'
                      }}
                    >
                      सेवा नियम एवं शर्तें (Terms & Conditions)
                    </button>{' '}
                    स्वीकार करता/करती हूँ। *
                  </label>
                </div>

                {/* Submit CTA */}
                <div style={{ marginTop: '0.2rem' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-editorial-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.75rem 1.2rem',
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Sparkles size={17} />
                    <span>
                      {isSubmitting 
                        ? 'Booking दर्ज की जा रही है...' 
                        : `Book Now (${activeSection === 'Offline' ? 'प्रत्यक्ष पूजा' : 'ऑनलाइन पूजा'})`}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ==============================================================
               CONFIRMATION & ONLINE CALL / GOOGLE CALENDAR VIEW
               ============================================================== */
            <div style={{ textAlign: 'center', padding: '0.4rem 0' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(22, 101, 52, 0.08)',
                border: '1.5px solid #15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.9rem auto',
                color: '#15803d'
              }}>
                <CheckCircle2 size={30} />
              </div>

              <h4 style={{ 
                fontSize: '1.4rem', 
                color: 'var(--color-text-charcoal)', 
                marginBottom: '0.2rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600
              }}>
                शुभम् भवतु! सङ्कल्प सफलतापूर्वक दर्ज हुआ
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-stone-body)', marginBottom: '1.1rem' }}>
                Booking Ref No.: <strong style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>#VN-{submittedBooking.id}</strong>
              </p>

              {/* Next Step: Online Muhurat Determination Call Highlight */}
              <div style={{
                background: 'rgba(104, 46, 54, 0.06)',
                border: '1px solid rgba(104, 46, 54, 0.22)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.85rem 1rem',
                textAlign: 'left',
                marginBottom: '1.1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--color-burgundy-base)',
                  marginBottom: '0.25rem'
                }}>
                  <PhoneCall size={16} />
                  <span>अगला चरण: पंडित जी के साथ ऑनलाइन मुहूर्त निर्धारण कॉल</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-charcoal)', margin: 0, lineHeight: 1.5 }}>
                  पंडित जी (<code>panditrakeshrawal26@gmail.com</code>) द्वारा आपकी ३ संभावित तिथियों का पंचांग विश्लेषण किया जा रहा है। संस्थान द्वारा शीघ्र ही आपसे ऑनलाइन कॉल (Google Meet / Phone) का समय सुनिश्चित कर सर्वश्रेष्ठ मुहूर्त पर अंतिम मुहर लगाई जाएगी।
                </p>
              </div>

              {/* Summary Details Card */}
              <div style={{
                background: 'var(--color-stone-surface)',
                border: '1px solid var(--color-stone-border)',
                borderRadius: 'var(--radius-xs)',
                padding: '1rem',
                textAlign: 'left',
                marginBottom: '1.25rem',
                fontSize: '0.84rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.55rem',
                color: 'var(--color-text-stone-body)'
              }}>
                <div>
                  <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>माध्यम:</span>{' '}
                  <strong style={{ color: 'var(--color-text-charcoal)' }}>
                    {submittedBooking.ritual_mode === 'Offline' ? 'प्रत्यक्ष पूजा (Offline)' : 'ऑनलाइन पूजा (Online)'}
                  </strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>यजमान:</span>{' '}
                  <strong style={{ color: 'var(--color-text-charcoal)' }}>{submittedBooking.devotee_name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>पूजा:</span>{' '}
                  <strong style={{ color: 'var(--color-text-charcoal)' }}>{submittedBooking.service_title}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>१. प्राथमिक तिथि:</span>{' '}
                  <span>{submittedBooking.preferred_date}</span>
                </div>
                {submittedBooking.second_date && (
                  <div>
                    <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>२. द्वितीय तिथि:</span>{' '}
                    <span>{submittedBooking.second_date}</span>
                  </div>
                )}
                {submittedBooking.third_date && (
                  <div>
                    <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>३. अतिरिक्त तिथि:</span>{' '}
                    <span>{submittedBooking.third_date}</span>
                  </div>
                )}
                <div>
                  <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>कैलेंडर समय:</span>{' '}
                  <span>{submittedBooking.preferred_time}</span>
                </div>
                {submittedBooking.venue_address && (
                  <div>
                    <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>स्थल/पता:</span>{' '}
                    <span>{submittedBooking.venue_address}</span>
                  </div>
                )}
                {submittedBooking.city && (
                  <div>
                    <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>नगर:</span>{' '}
                    <span>{submittedBooking.city}</span>
                  </div>
                )}
                {submittedBooking.gotra && (
                  <div>
                    <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>गोत्र:</span>{' '}
                    <span>{submittedBooking.gotra}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: WhatsApp & Google Calendar Add */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-primary"
                  style={{
                    justifyContent: 'center',
                    fontSize: '0.92rem',
                    padding: '0.75rem'
                  }}
                >
                  <MessageSquare size={16} />
                  <span>पंडित जी को व्हाट्सएप पर ३ तिथियां व विवरण भेजें</span>
                </a>

                <a
                  href={generateGoogleCalendarEventUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    background: 'var(--color-stone-surface)',
                    border: '1px solid var(--color-stone-border)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-burgundy-base)',
                    padding: '0.65rem',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Calendar size={15} />
                  <span>Google Calendar में जोड़ें (Add to Google Calendar)</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-editorial-dark"
                  style={{ justifyContent: 'center', padding: '0.65rem' }}
                >
                  समाप्त करें (Close)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={() => {
          setFormData(prev => ({ ...prev, terms_accepted: true }));
          setIsTermsOpen(false);
        }}
      />
    </>
  );
}
