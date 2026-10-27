import React, { useState, useEffect, useRef } from 'react';
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
  ExternalLink,
  PhoneCall,
  ArrowLeft,
  ArrowRight,
  Check,
  Pencil
} from 'lucide-react';

const STEPS = [
  { label: 'अनुष्ठान', title: 'कौन-सा अनुष्ठान कराना है?', hint: 'माध्यम एवं पूजा चुनें' },
  { label: 'तिथि', title: 'आपकी सुविधा की तिथियां', hint: 'पंडित जी इनमें से श्रेष्ठ मुहूर्त तय करेंगे' },
  { label: 'विवरण', title: 'यजमान का परिचय', hint: 'संकल्प हेतु आवश्यक जानकारी' },
  { label: 'पुष्टि', title: 'एक बार जाँच लें', hint: 'सब सही है तो बुकिंग पूर्ण करें' }
];

const categoryChips = [
  { id: 'all', label: 'सभी' },
  { id: 'katha', label: 'कथा' },
  { id: 'pooja', label: 'पूजा' },
  { id: 'dosh_nivaran', label: 'दोष निवारण' },
  { id: 'abhishekh', label: 'अभिषेक' },
  { id: 'hawan', label: 'हवन' },
  { id: 'ratna_salah', label: 'ज्योतिष' }
];

// `value` strings are stored with the booking, so they must stay unchanged
const timeSlots = [
  { value: 'प्रातः 09:00 - 11:00 AM (Morning Slot)', label: 'प्रातः', time: '9 – 11 AM' },
  { value: 'मध्याह्न 11:00 - 01:00 PM (Midday Slot)', label: 'मध्याह्न', time: '11 AM – 1 PM' },
  { value: 'दोपहर 02:00 - 04:00 PM (Afternoon Slot)', label: 'दोपहर', time: '2 – 4 PM' },
  { value: 'सायं 04:00 - 06:00 PM (Evening Slot)', label: 'सायं', time: '4 – 6 PM' },
  { value: 'संध्या 06:00 - 08:00 PM (Late Evening Slot)', label: 'संध्या', time: '6 – 8 PM' },
  { value: 'पंडित जी की उपलब्धता अनुसार (Flexible Slot)', label: 'कोई भी', time: 'पंडित जी अनुसार' }
];

const sankalpSuggestions = ['गृह प्रवेश', 'स्वास्थ्य लाभ', 'विवाह बाधा शांति', 'संतान सुख', 'व्यापार वृद्धि', 'पितृ शांति'];

const dateFields = [
  { name: 'preferred_date', label: 'पहली पसंद', required: true },
  { name: 'second_date', label: 'दूसरी पसंद', required: true },
  { name: 'third_date', label: 'तीसरी पसंद', required: false }
];

const formatDate = (value) => {
  if (!value) return '';
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('hi-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const modeLabel = (mode) => (mode === 'Offline' ? 'प्रत्यक्ष पूजा' : 'ऑनलाइन पूजा');

const initialFormData = {
  service_id: '',
  service_title: '',
  ritual_mode: 'Offline',
  preferred_date: '',
  second_date: '',
  third_date: '',
  preferred_time: timeSlots[0].value,
  devotee_name: '',
  phone: '',
  gotra: '',
  city: '',
  venue_address: '',
  special_sankalp: '',
  terms_accepted: true
};

export default function BookingModal({ initialService, isOpen, onClose }) {
  const { user } = useAuth();
  const toast = useToast();
  const contentRef = useRef(null);

  const [activeSection, setActiveSection] = useState('Offline');
  const [activeCategory, setActiveCategory] = useState('all');
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showCalendarViewer, setShowCalendarViewer] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Start every opening from the first step
  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    setMaxStep(0);
    setFieldErrors({});
    setActiveCategory('all');
  }, [isOpen]);

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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape' && !isTermsOpen) handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [step, submittedBooking]);

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  const handleSectionSwitch = (section) => {
    setActiveSection(section);
    setActiveCategory('all');
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

      return { ...prev, ritual_mode: section, service_title: newTitle, service_id: newId };
    });
  };

  const clearFieldError = (name) => {
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    clearFieldError(name);
  };

  const setField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const selectService = (svc) => {
    setFormData(prev => ({ ...prev, service_title: svc.title, service_id: svc.id }));
    clearFieldError('service_title');
  };

  const toggleSankalp = (tag) => {
    setFormData(prev => {
      const parts = prev.special_sankalp.split(',').map(p => p.trim()).filter(Boolean);
      const next = parts.includes(tag) ? parts.filter(p => p !== tag) : [...parts, tag];
      return { ...prev, special_sankalp: next.join(', ') };
    });
  };

  const modeServices = staticServices.filter(s => !s.modes || s.modes.includes(activeSection));
  const visibleChips = categoryChips.filter(c => c.id === 'all' || modeServices.some(s => s.category === c.id));
  const visibleServices = activeCategory === 'all'
    ? modeServices
    : modeServices.filter(s => s.category === activeCategory);
  const activeServiceObj = staticServices.find(s => s.title === formData.service_title);
  const selectedSankalp = formData.special_sankalp.split(',').map(p => p.trim());

  const validateStep = (index) => {
    const errs = {};
    if (index === 0) {
      if (!formData.service_title) errs.service_title = 'कृपया एक अनुष्ठान चुनें।';
    }
    if (index === 1) {
      if (!formData.preferred_date) errs.preferred_date = 'पहली पसंद की तिथि चुनें।';
      if (!formData.second_date) errs.second_date = 'दूसरी पसंद की तिथि चुनें।';
      else if (formData.second_date === formData.preferred_date) errs.second_date = 'कृपया अलग तिथि चुनें।';
      if (formData.third_date && [formData.preferred_date, formData.second_date].includes(formData.third_date)) {
        errs.third_date = 'कृपया अलग तिथि चुनें।';
      }
    }
    if (index === 2) {
      if (!formData.devotee_name.trim()) errs.devotee_name = 'यजमान का पूरा नाम दर्ज करें।';
      if (!formData.phone.trim()) errs.phone = 'मोबाइल / WhatsApp नंबर दर्ज करें।';
      else if (formData.phone.replace(/\D/g, '').length < 10) errs.phone = 'कृपया सही १० अंकों का नंबर दर्ज करें।';
      if (activeSection === 'Offline' && !formData.venue_address.trim()) errs.venue_address = 'पूजा स्थल का पता दर्ज करें।';
      if (activeSection === 'Online' && !formData.city.trim()) errs.city = 'अपना नगर / देश दर्ज करें।';
    }
    if (index === 3) {
      if (!formData.terms_accepted) errs.terms_accepted = 'आगे बढ़ने हेतु नियम एवं शर्तें स्वीकार करें।';
    }
    return errs;
  };

  const goToStep = (index) => {
    if (index <= maxStep) {
      setFieldErrors({});
      setStep(index);
    }
  };

  const goNext = () => {
    const errs = validateStep(step);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const next = Math.min(step + 1, STEPS.length - 1);
    setStep(next);
    setMaxStep(prev => Math.max(prev, next));
  };

  const goBack = () => {
    setFieldErrors({});
    setStep(prev => Math.max(prev - 1, 0));
  };

  const recordFallbackBooking = () => {
    const mockBooking = {
      id: Math.floor(1000 + Math.random() * 9000),
      ...formData,
      status: 'pending'
    };
    setSubmittedBooking(mockBooking);
    toast.success('पूजा Booking सङ्कल्प दर्ज कर लिया गया है।', 'सङ्कल्प पुष्ट');
    trackBookingCompleted(mockBooking.id, formData.service_title, formData.ritual_mode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < STEPS.length - 1) {
      goNext();
      return;
    }

    for (let i = 0; i < STEPS.length; i++) {
      const errs = validateStep(i);
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        setStep(i);
        return;
      }
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
        recordFallbackBooking();
      }
    } catch (err) {
      console.warn('Booking API fallback:', err);
      recordFallbackBooking();
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

  function handleClose() {
    setSubmittedBooking(null);
    setErrorMsg('');
    setFieldErrors({});
    setShowCalendarViewer(false);
    onClose();
  }

  const renderError = (name) => (
    fieldErrors[name] ? <p className="bk-field-error" role="alert">{fieldErrors[name]}</p> : null
  );

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;
  const selectedSlot = timeSlots.find(t => t.value === formData.preferred_time);

  const reviewRows = [
    { step: 0, label: 'अनुष्ठान', value: `${formData.service_title} · ${modeLabel(activeSection)}` },
    {
      step: 1,
      label: 'तिथियां',
      value: [formData.preferred_date, formData.second_date, formData.third_date].filter(Boolean).map(formatDate).join('  |  ')
    },
    { step: 1, label: 'समय', value: selectedSlot ? `${selectedSlot.label} · ${selectedSlot.time}` : formData.preferred_time },
    { step: 2, label: 'यजमान', value: `${formData.devotee_name}${formData.gotra ? ` (${formData.gotra} गोत्र)` : ''} · ${formData.phone}` },
    { step: 2, label: activeSection === 'Offline' ? 'पूजा स्थल' : 'नगर', value: activeSection === 'Offline' ? formData.venue_address : formData.city },
    ...(formData.special_sankalp ? [{ step: 2, label: 'सङ्कल्प', value: formData.special_sankalp }] : [])
  ];

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}>
        <div
          ref={contentRef}
          className="modal-content bk-modal"
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="bk-title"
        >
          <button type="button" onClick={handleClose} className="bk-close" aria-label="Close modal">
            <X size={16} />
          </button>

          {!submittedBooking ? (
            <form onSubmit={handleSubmit} noValidate className="bk-form">
              {/* Header + progress */}
              <header className="bk-header">
                <p className="bk-eyebrow">पूजा बुकिंग · चरण {step + 1} / {STEPS.length}</p>
                <h3 id="bk-title" className="bk-title">{currentStep.title}</h3>
                <p className="bk-hint">{currentStep.hint}</p>

                <ol className="bk-steps" aria-label="Booking progress">
                  {STEPS.map((s, i) => {
                    const state = i < step ? 'done' : i === step ? 'active' : 'todo';
                    return (
                      <li key={s.label} className={`bk-step is-${state}`}>
                        <button
                          type="button"
                          onClick={() => goToStep(i)}
                          disabled={i > maxStep}
                          aria-current={i === step ? 'step' : undefined}
                        >
                          <span className="bk-step-dot">{state === 'done' ? <Check size={12} /> : i + 1}</span>
                          <span className="bk-step-label">{s.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
                <div className="bk-progress" aria-hidden="true">
                  <span style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
                </div>
              </header>

              {step > 0 && activeServiceObj && (
                <button type="button" className="bk-selected-pill" onClick={() => goToStep(0)}>
                  <Sparkles size={13} />
                  <span className="bk-selected-text">{activeServiceObj.title}</span>
                  <span className="bk-selected-mode">{modeLabel(activeSection)}</span>
                  <Pencil size={12} />
                </button>
              )}

              {errorMsg && <div className="bk-alert" role="alert">{errorMsg}</div>}

              <div key={step} className="bk-panel">
                {/* STEP 1: Ritual */}
                {step === 0 && (
                  <>
                    <div className="bk-mode-grid" role="radiogroup" aria-label="पूजा का माध्यम">
                      {[
                        { id: 'Offline', icon: MapPin, title: 'प्रत्यक्ष पूजा', desc: 'पंडित जी आपके स्थल पर' },
                        { id: 'Online', icon: Video, title: 'ऑनलाइन पूजा', desc: 'लाइव वीडियो व प्रसाद प्रेषण' }
                      ].map(({ id, icon: Icon, title, desc }) => (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={activeSection === id}
                          className={`bk-mode-card ${activeSection === id ? 'is-selected' : ''}`}
                          onClick={() => handleSectionSwitch(id)}
                        >
                          <span className="bk-mode-icon"><Icon size={18} /></span>
                          <span>
                            <strong>{title}</strong>
                            <small>{desc}</small>
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="bk-chips" role="tablist" aria-label="श्रेणी">
                      {visibleChips.map(chip => (
                        <button
                          key={chip.id}
                          type="button"
                          role="tab"
                          aria-selected={activeCategory === chip.id}
                          className={`bk-chip ${activeCategory === chip.id ? 'is-selected' : ''}`}
                          onClick={() => setActiveCategory(chip.id)}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    <div className="bk-service-list" role="radiogroup" aria-label="अनुष्ठान">
                      {visibleServices.map(svc => {
                        const selected = formData.service_title === svc.title;
                        return (
                          <button
                            key={svc.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            className={`bk-service ${selected ? 'is-selected' : ''}`}
                            onClick={() => selectService(svc)}
                          >
                            <span className="bk-service-main">
                              <strong>{svc.title}</strong>
                              <small>{svc.title_en}</small>
                            </span>
                            <span className="bk-service-meta">
                              <Clock size={11} /> {svc.duration}
                            </span>
                            <span className="bk-radio" aria-hidden="true">{selected && <Check size={12} />}</span>
                          </button>
                        );
                      })}
                    </div>
                    {renderError('service_title')}
                  </>
                )}

                {/* STEP 2: Dates & time */}
                {step === 1 && (
                  <>
                    <div className="bk-date-grid">
                      {dateFields.map((f, i) => (
                        <label
                          key={f.name}
                          className={`bk-date-card ${formData[f.name] ? 'is-filled' : ''} ${fieldErrors[f.name] ? 'has-error' : ''}`}
                        >
                          <span className="bk-date-head">
                            <span className="bk-date-num">{i + 1}</span>
                            {f.label}
                            {!f.required && <em>वैकल्पिक</em>}
                          </span>
                          <input
                            type="date"
                            name={f.name}
                            value={formData[f.name]}
                            onChange={handleChange}
                            min={today}
                            onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch { /* unsupported */ } }}
                            className="bk-input"
                            aria-invalid={!!fieldErrors[f.name]}
                          />
                          <span className="bk-date-pretty">
                            {formData[f.name] ? formatDate(formData[f.name]) : 'तिथि चुनें'}
                          </span>
                          {renderError(f.name)}
                        </label>
                      ))}
                    </div>

                    <div className="bk-section-label">
                      <span>वार्ता हेतु सुविधाजनक समय</span>
                      <button
                        type="button"
                        className="bk-link"
                        onClick={() => setShowCalendarViewer(v => !v)}
                      >
                        <Calendar size={12} />
                        {showCalendarViewer ? 'कैलेंडर छिपाएं' : 'पंडित जी का कैलेंडर देखें'}
                      </button>
                    </div>

                    {showCalendarViewer && (
                      <div className="bk-calendar">
                        <div className="bk-calendar-bar">
                          <span>पंडित जी की उपलब्धता (इस सप्ताह)</span>
                          <a href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={11} /> फुल स्क्रीन
                          </a>
                        </div>
                        <iframe
                          src="https://calendar.google.com/calendar/embed?src=panditrakeshrawal26%40gmail.com&ctz=Asia%2FKolkata&mode=WEEK"
                          title="Panditji Live Google Calendar"
                        />
                      </div>
                    )}

                    <div className="bk-slot-grid" role="radiogroup" aria-label="समय">
                      {timeSlots.map(slot => {
                        const selected = formData.preferred_time === slot.value;
                        return (
                          <button
                            key={slot.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            className={`bk-slot ${selected ? 'is-selected' : ''}`}
                            onClick={() => setField('preferred_time', slot.value)}
                          >
                            <strong>{slot.label}</strong>
                            <small>{slot.time}</small>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* STEP 3: Devotee details */}
                {step === 2 && (
                  <div className="bk-fields">
                    <div className="bk-field">
                      <label htmlFor="bk-name">यजमान का पूरा नाम</label>
                      <input
                        id="bk-name"
                        type="text"
                        name="devotee_name"
                        autoComplete="name"
                        placeholder="उदा. राहुल शर्मा"
                        value={formData.devotee_name}
                        onChange={handleChange}
                        className="bk-input"
                        aria-invalid={!!fieldErrors.devotee_name}
                        autoFocus
                      />
                      {renderError('devotee_name')}
                    </div>

                    <div className="bk-field">
                      <label htmlFor="bk-phone">मोबाइल / WhatsApp नंबर</label>
                      <input
                        id="bk-phone"
                        type="tel"
                        inputMode="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="98XXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bk-input"
                        aria-invalid={!!fieldErrors.phone}
                      />
                      {renderError('phone')}
                    </div>

                    <div className="bk-field bk-field-wide">
                      {activeSection === 'Offline' ? (
                        <>
                          <label htmlFor="bk-venue">पूजा स्थल / निवास का पता</label>
                          <textarea
                            id="bk-venue"
                            name="venue_address"
                            rows={2}
                            autoComplete="street-address"
                            placeholder="घर का पता, कॉलोनी, शहर"
                            value={formData.venue_address}
                            onChange={handleChange}
                            className="bk-input"
                            aria-invalid={!!fieldErrors.venue_address}
                          />
                          {renderError('venue_address')}
                        </>
                      ) : (
                        <>
                          <label htmlFor="bk-city">गृह नगर एवं देश</label>
                          <input
                            id="bk-city"
                            type="text"
                            name="city"
                            autoComplete="address-level2"
                            placeholder="उदा. मुंबई, लंदन, न्यूयॉर्क"
                            value={formData.city}
                            onChange={handleChange}
                            className="bk-input"
                            aria-invalid={!!fieldErrors.city}
                          />
                          {renderError('city')}
                        </>
                      )}
                    </div>

                    <div className="bk-field">
                      <label htmlFor="bk-gotra">गोत्र <em>वैकल्पिक</em></label>
                      <input
                        id="bk-gotra"
                        type="text"
                        name="gotra"
                        placeholder="उदा. कश्यप"
                        value={formData.gotra}
                        onChange={handleChange}
                        className="bk-input"
                      />
                    </div>

                    <div className="bk-field bk-field-wide">
                      <label htmlFor="bk-sankalp">विशेष सङ्कल्प / मनोकामना <em>वैकल्पिक</em></label>
                      <div className="bk-chips bk-chips-tight">
                        {sankalpSuggestions.map(tag => {
                          const selected = selectedSankalp.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              aria-pressed={selected}
                              className={`bk-chip ${selected ? 'is-selected' : ''}`}
                              onClick={() => toggleSankalp(tag)}
                            >
                              {selected ? <Check size={11} /> : '+'} {tag}
                            </button>
                          );
                        })}
                      </div>
                      <textarea
                        id="bk-sankalp"
                        name="special_sankalp"
                        rows={2}
                        placeholder="अपनी मनोकामना लिखें या ऊपर से चुनें"
                        value={formData.special_sankalp}
                        onChange={handleChange}
                        className="bk-input"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Review */}
                {step === 3 && (
                  <>
                    <dl className="bk-review">
                      {reviewRows.map(row => (
                        <div key={row.label} className="bk-review-row">
                          <dt>{row.label}</dt>
                          <dd>{row.value}</dd>
                          <button type="button" className="bk-link" onClick={() => goToStep(row.step)} aria-label={`${row.label} बदलें`}>
                            <Pencil size={12} />
                          </button>
                        </div>
                      ))}
                    </dl>

                    <div className="bk-note">
                      <PhoneCall size={15} />
                      <p>बुकिंग के बाद पंडित जी आपसे ऑनलाइन कॉल पर बात कर इन तिथियों में से सर्वश्रेष्ठ मुहूर्त तय करेंगे।</p>
                    </div>

                    <label className={`bk-terms ${fieldErrors.terms_accepted ? 'has-error' : ''}`}>
                      <input
                        type="checkbox"
                        name="terms_accepted"
                        checked={formData.terms_accepted}
                        onChange={handleChange}
                      />
                      <span>
                        मैं{' '}
                        <button type="button" className="bk-link bk-link-inline" onClick={() => setIsTermsOpen(true)}>
                          सेवा नियम एवं शर्तें
                        </button>{' '}
                        स्वीकार करता/करती हूँ।
                      </span>
                    </label>
                    {renderError('terms_accepted')}
                  </>
                )}
              </div>

              {/* Footer actions */}
              <footer className="bk-footer">
                {step > 0 ? (
                  <button type="button" className="bk-btn-ghost" onClick={goBack}>
                    <ArrowLeft size={15} /> पीछे
                  </button>
                ) : <span />}
                <button type="submit" className="bk-btn-primary" disabled={isSubmitting}>
                  {isLastStep
                    ? (isSubmitting ? 'बुकिंग दर्ज हो रही है…' : <><Sparkles size={15} /> बुकिंग पक्की करें</>)
                    : <>आगे बढ़ें <ArrowRight size={15} /></>}
                </button>
              </footer>
            </form>
          ) : (
            /* Confirmation */
            <div className="bk-success">
              <div className="bk-success-icon"><CheckCircle2 size={30} /></div>
              <h3 id="bk-title" className="bk-title">शुभम् भवतु! बुकिंग दर्ज हुई</h3>
              <p className="bk-hint">
                Booking Ref: <strong>#VN-{submittedBooking.id}</strong>
              </p>

              <div className="bk-success-card">
                <strong>{submittedBooking.service_title}</strong>
                <span>{modeLabel(submittedBooking.ritual_mode)} · {submittedBooking.devotee_name}</span>
                <span>
                  {[submittedBooking.preferred_date, submittedBooking.second_date, submittedBooking.third_date]
                    .filter(Boolean).map(formatDate).join('  |  ')}
                </span>
              </div>

              <div className="bk-note">
                <PhoneCall size={15} />
                <p><strong>अगला चरण:</strong> पंडित जी शीघ्र ही आपसे संपर्क कर मुहूर्त निर्धारण कॉल का समय तय करेंगे।</p>
              </div>

              <div className="bk-success-actions">
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="bk-btn-primary">
                  <MessageSquare size={16} /> WhatsApp पर विवरण भेजें
                </a>
                <a href={generateGoogleCalendarEventUrl()} target="_blank" rel="noopener noreferrer" className="bk-btn-ghost">
                  <Calendar size={15} /> Google Calendar में जोड़ें
                </a>
                <button type="button" onClick={handleClose} className="bk-link bk-link-center">
                  बंद करें
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <TermsAndConditionsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={() => {
          setField('terms_accepted', true);
          setIsTermsOpen(false);
        }}
      />
    </>
  );
}
