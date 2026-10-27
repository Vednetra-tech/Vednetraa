import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  UserCheck
} from 'lucide-react';

// WhatsApp SVG Icon
const WhatsAppIcon = ({ size = 15, color = '#25D366', style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.63 7.37C8.42 7.37 8.23 7.45 8.08 7.62C7.93 7.78 7.38 8.3 7.38 9.35C7.38 10.4 8.15 11.41 8.26 11.55C8.37 11.7 9.77 13.86 11.93 14.79C12.44 15.01 12.84 15.14 13.15 15.24C13.67 15.41 14.13 15.38 14.51 15.33C14.93 15.26 15.8 14.8 15.98 14.29C16.16 13.78 16.16 13.34 16.11 13.25C16.05 13.16 15.9 13.11 15.68 13C15.46 12.89 14.38 12.36 14.18 12.29C13.98 12.21 13.83 12.18 13.68 12.4C13.53 12.62 13.11 13.11 12.98 13.25C12.85 13.4 12.72 13.42 12.5 13.31C12.28 13.2 11.57 12.97 10.73 12.22C10.07 11.64 9.63 10.92 9.5 10.7C9.37 10.48 9.49 10.36 9.6 10.25C9.7 10.15 9.82 10 9.93 9.87C10.04 9.74 10.08 9.65 10.15 9.5C10.22 9.35 10.18 9.22 10.13 9.11C10.07 9 9.63 7.92 9.45 7.48C9.27 7.05 9.09 7.11 8.95 7.1C8.82 7.1 8.67 7.1 8.52 7.1L8.63 7.37Z" />
  </svg>
);

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = 'client',
  resetTokenFromUrl = null,
  emailFromUrl = null,
  onLoginSuccess
}) {
  const {
    sendClientOtp,
    verifyClientOtp,
    loginWithCredentials,
    requestForgotPassword,
    resetPassword
  } = useAuth();

  const [activeTab, setActiveTab] = useState(initialTab); // 'client', 'panditji', 'admin'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Client State
  const [clientStep, setClientStep] = useState('phone'); // 'phone', 'otp'
  const [countryCode, setCountryCode] = useState('+91');
  const [clientPhone, setClientPhone] = useState('');
  const [clientName, setClientName] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const otpInputRefs = useRef([]);

  // Panditji & Admin State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Forgot / Reset Password State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetToken, setResetToken] = useState(resetTokenFromUrl || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Sync initial tab and reset token if provided via props
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (resetTokenFromUrl) {
      setActiveTab('panditji');
      setIsForgotMode(true);
      setResetToken(resetTokenFromUrl);
      if (emailFromUrl) {
        setEmail(emailFromUrl);
      }
    }
  }, [resetTokenFromUrl, emailFromUrl]);

  // Resend OTP Countdown
  useEffect(() => {
    let timer;
    if (clientStep === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [clientStep, countdown]);

  if (!isOpen) return null;

  const resetFormState = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(false);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetFormState();
    setIsForgotMode(false);
    if (tab === 'client') {
      setClientStep('phone');
    } else if (tab === 'panditji') {
      setEmail('');
      setPassword('');
    } else if (tab === 'admin') {
      setEmail('');
      setPassword('');
    }
  };

  // ==========================================
  // CLIENT OTP HANDLERS
  // ==========================================
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanDigits = clientPhone.replace(/\D/g, '');
    const minLength = countryCode === '+91' ? 10 : 7;
    if (cleanDigits.length < minLength) {
      setErrorMessage(countryCode === '+91' ? 'कृपया केवल मान्य 10-अंकीय WhatsApp नंबर दर्ज करें (WhatsApp Number Only)' : 'Please enter a valid WhatsApp number only');
      return;
    }

    setLoading(true);
    try {
      const res = await sendClientOtp(cleanDigits, countryCode);
      setSuccessMessage(res.message || `ओटीपी ${countryCode} ${cleanDigits} पर WhatsApp द्वारा भेज दिया गया है।`);
      setClientStep('otp');
      setCountdown(30);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err) {
      setErrorMessage(err.message || 'ओटीपी भेजने में असमर्थ');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpDigitChange = (index, value) => {
    if (value.length > 1) {
      // User pasted full OTP
      const pasted = value.replace(/\D/g, '').slice(0, 6).split('');
      const newDigits = [...otpDigits];
      pasted.forEach((d, i) => {
        if (i < 6) newDigits[i] = d;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(pasted.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = value.replace(/\D/g, '');
    setOtpDigits(newDigits);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMessage('कृपया पूरा 6-अंकीय ओटीपी कोड दर्ज करें');
      return;
    }

    setLoading(true);
    try {
      const cleanDigits = clientPhone.replace(/\D/g, '');
      const verifyRes = await verifyClientOtp(cleanDigits, fullOtp, clientName, countryCode);
      setSuccessMessage('प्रवेश सफल! स्वागत है।');
      if (onLoginSuccess && verifyRes?.user) {
        onLoginSuccess(verifyRes.user);
      }
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'ओटीपी सत्यापन विफल');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PANDITJI & ADMIN LOGIN HANDLERS
  // ==========================================
  const handleCredentialsLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('कृपया ईमेल और पासवर्ड दोनों दर्ज करें');
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithCredentials(email, password);
      setSuccessMessage(res.message || 'लॉगिन सफल!');
      if (onLoginSuccess && res?.user) {
        onLoginSuccess(res.user);
      }
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'लॉगिन विफल: क्रेडेंशियल्स की जांच करें');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FORGOT & RESET PASSWORD HANDLERS
  // ==========================================
  const handleRequestResetLink = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage('कृपया अपना पंजीकृत ईमेल दर्ज करें');
      return;
    }

    setLoading(true);
    try {
      const res = await requestForgotPassword(email);
      setSuccessMessage(res.message || 'रीसेट लिंक आपके ईमेल पर भेज दिया गया है');
      if (res.resetToken) {
        setResetToken(res.resetToken);
      }
    } catch (err) {
      setErrorMessage(err.message || 'रीसेट लिंक भेजने में त्रुटि');
    } finally {
      setLoading(false);
    }
  };

  const handlePerformReset = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!resetToken) {
      setErrorMessage('रीसेट टोकन अनिवार्य है');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('दोनों पासवर्ड मेल नहीं खाते हैं');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(resetToken, newPassword);
      setResetSuccess(true);
      setSuccessMessage(res.message || 'पासवर्ड सफलतापूर्वक बदल दिया गया है');
      setTimeout(() => {
        setIsForgotMode(false);
        setResetToken('');
        setNewPassword('');
        setConfirmPassword('');
        setPassword('');
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || 'पासवर्ड रीसेट विफल');
    } finally {
      setLoading(false);
    }
  };

  // Demo helper buttons
  const fillDemoPanditji = () => {
    setEmail('panditrakeshrawal26@gmail.com');
    setPassword('Panditji@VedNetra2026');
  };

  const fillDemoAdmin = () => {
    setEmail('shiwansh8888@gmail.com');
    setPassword('Admin@VedNetra2026');
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
        background: 'rgba(12, 4, 6, 0.85)',
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
          maxWidth: '520px',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          padding: 'clamp(1.5rem, 4vw, 2.25rem)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--color-stone-surface)',
            border: '1px solid var(--color-stone-border)',
            color: 'var(--color-burgundy-base)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Sacred Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.6rem' }}>
          <img
            src="/Logo-two-tone.png"
            alt="Vedनेत्र Logo"
            style={{ height: '38px', width: 'auto', margin: '0 auto 0.75rem auto', display: 'block' }}
          />
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--color-burgundy-base)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            marginBottom: '0.35rem'
          }}>
            <Sparkles size={14} />
            <span>ॐ श्री गणेशाय नमः • वेदांग प्रवेश</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.35rem, 3vw, 1.65rem)',
            color: 'var(--color-text-charcoal)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            marginBottom: '0.3rem'
          }}>
            वेदनेत्र प्रमाणीकरण केंद्र
          </h2>
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--color-text-stone-body)',
            maxWidth: '380px',
            margin: '0 auto'
          }}>
            यजमान, पूज्य पंडित जी एवं व्यवस्थापक हेतु सुरक्षित वैदिक प्रमाणीकरण
          </p>
        </div>

        {/* Role Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.4rem',
          background: 'var(--color-stone-surface)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--color-stone-border)',
          marginBottom: '1.6rem'
        }}>
          <button
            type="button"
            onClick={() => switchTab('client')}
            style={{
              padding: '0.6rem 0.3rem',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'client' ? '1px solid var(--color-burgundy-base)' : '1px solid transparent',
              background: activeTab === 'client' ? 'var(--color-burgundy-base)' : 'transparent',
              color: activeTab === 'client' ? '#FFFFFF' : 'var(--color-text-charcoal)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s'
            }}
          >
            <WhatsAppIcon size={16} color={activeTab === 'client' ? '#FFFFFF' : '#25D366'} />
            <span>यजमान (WhatsApp)</span>
          </button>

          <button
            type="button"
            onClick={() => switchTab('panditji')}
            style={{
              padding: '0.6rem 0.3rem',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'panditji' ? '1px solid var(--color-burgundy-base)' : '1px solid transparent',
              background: activeTab === 'panditji' ? 'var(--color-burgundy-base)' : 'transparent',
              color: activeTab === 'panditji' ? '#FFFFFF' : 'var(--color-text-charcoal)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={15} style={{ color: activeTab === 'panditji' ? '#FFFFFF' : 'var(--color-burgundy-base)' }} />
            <span>पंडित जी</span>
          </button>

          <button
            type="button"
            onClick={() => switchTab('admin')}
            style={{
              padding: '0.6rem 0.3rem',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'admin' ? '1px solid var(--color-burgundy-base)' : '1px solid transparent',
              background: activeTab === 'admin' ? 'var(--color-burgundy-base)' : 'transparent',
              color: activeTab === 'admin' ? '#FFFFFF' : 'var(--color-text-charcoal)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s'
            }}
          >
            <ShieldCheck size={15} style={{ color: activeTab === 'admin' ? '#FFFFFF' : 'var(--color-burgundy-base)' }} />
            <span>व्यवस्थापक</span>
          </button>
        </div>

        {/* Global Feedback Messages */}
        {errorMessage && (
          <div style={{
            background: '#fef2f2',
            border: '1.5px solid #f87171',
            color: '#991b1b',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.84rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.2rem',
            boxShadow: '0 2px 8px rgba(185, 28, 28, 0.08)'
          }}>
            <AlertCircle size={18} style={{ color: '#dc2626', flexShrink: 0 }} />
            <span style={{ lineHeight: 1.4 }}>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div style={{
            background: '#f0fdf4',
            border: '1.5px solid #4ade80',
            color: '#14532d',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.2rem',
            boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)'
          }}>
            <CheckCircle2 size={18} style={{ color: '#16a34a', flexShrink: 0 }} />
            <span style={{ lineHeight: 1.4 }}>{successMessage}</span>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 1: CLIENT (DEVOTEE) - PHONE OTP AUTHENTICATION */}
        {/* ==================================================== */}
        {activeTab === 'client' && (
          <div>
            {clientStep === 'phone' ? (
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-text-charcoal)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    यजमान का नाम (वैकल्पिक / Optional)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="उदा. राहुल शर्मा"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'var(--color-stone-canvas)',
                      border: '1px solid var(--color-stone-border)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--color-text-charcoal)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-burgundy-base)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--color-stone-border)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-charcoal)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <WhatsAppIcon size={15} color="#25D366" />
                      व्हाट्सएप नंबर (WhatsApp Number Only) *
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      color: '#15803d',
                      fontWeight: 700,
                      background: '#dcfce7',
                      border: '1px solid #bbf7d0',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      letterSpacing: '0.02em'
                    }}>
                      केवल WhatsApp
                    </span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        background: 'var(--color-stone-surface)',
                        border: '1px solid var(--color-stone-border)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--color-burgundy-base)',
                        fontWeight: 600,
                        fontSize: '0.84rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="+91">🇮🇳 +91 (IN)</option>
                      <option value="+1">🇺🇸 +1 (US)</option>
                      <option value="+44">🇬🇧 +44 (UK)</option>
                      <option value="+1">🇨🇦 +1 (CA)</option>
                      <option value="+971">🇦🇪 +971 (UAE)</option>
                      <option value="+61">🇦🇺 +61 (AU)</option>
                      <option value="+977">🇳🇵 +977 (NP)</option>
                      <option value="+65">🇸🇬 +65 (SG)</option>
                      <option value="+49">🇩🇪 +49 (DE)</option>
                      <option value="+33">🇫🇷 +33 (FR)</option>
                      <option value="+60">🇲🇾 +60 (MY)</option>
                    </select>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value.replace(/\D/g, '').slice(0, countryCode === '+91' ? 10 : 15))}
                      placeholder={countryCode === '+91' ? "10-अंकीय WhatsApp नंबर (उदा. 9827514489)" : "WhatsApp number only"}
                      style={{
                        flex: 1,
                        padding: '0.75rem 0.9rem',
                        background: 'var(--color-stone-canvas)',
                        border: '1px solid var(--color-stone-border)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--color-text-charcoal)',
                        fontSize: '0.95rem',
                        letterSpacing: '0.04em',
                        outline: 'none'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-burgundy-base)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--color-stone-border)')}
                    />
                  </div>

                  {/* WhatsApp Notice Callout */}
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '0.65rem 0.85rem',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontSize: '0.76rem',
                    lineHeight: 1.45,
                    color: '#166534'
                  }}>
                    <WhatsAppIcon size={18} color="#16a34a" />
                    <div>
                      <div style={{ fontWeight: 700, color: '#14532d', marginBottom: '0.15rem' }}>
                        केवल WhatsApp नंबर दर्ज करें (WhatsApp Number Only):
                      </div>
                      <div>
                        सत्यापन व सुरक्षा OTP <strong>केवल आपके WhatsApp</strong> पर प्रेषित किया जाएगा। नया यजमान स्वतः पंजीकृत होगा अथवा पूर्व खाते में सुरक्षित प्रवेश होगा।
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || clientPhone.replace(/\D/g, '').length < (countryCode === '+91' ? 10 : 7)}
                  className="btn-editorial-primary"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                    opacity: loading || clientPhone.replace(/\D/g, '').length < (countryCode === '+91' ? 10 : 7) ? 0.6 : 1,
                    cursor: loading || clientPhone.replace(/\D/g, '').length < (countryCode === '+91' ? 10 : 7) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <WhatsAppIcon size={16} color="#FFFFFF" />
                  )}
                  <span>{loading ? 'ओटीपी भेजा जा रहा है...' : 'WhatsApp पर OTP प्राप्त करें (Get OTP on WhatsApp)'}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '0.84rem', color: 'var(--color-text-stone-body)' }}>
                    WhatsApp नंबर <strong style={{ color: 'var(--color-burgundy-base)' }}>{countryCode} {clientPhone}</strong> पर प्रेषित 6-अंकीय कोड दर्ज करें:
                  </span>
                </div>

                {/* 6-Digit OTP Boxes */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      style={{
                        width: '44px',
                        height: '50px',
                        textAlign: 'center',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        color: 'var(--color-text-charcoal)',
                        background: 'var(--color-stone-canvas)',
                        border: digit ? '1.5px solid var(--color-burgundy-base)' : '1px solid var(--color-stone-border)',
                        borderRadius: 'var(--radius-xs)',
                        outline: 'none',
                        boxShadow: digit ? '0 0 10px rgba(104, 46, 54, 0.15)' : 'none'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-burgundy-base)')}
                      onBlur={(e) => {
                        if (!digit) e.target.style.borderColor = 'var(--color-stone-border)';
                      }}
                    />
                  ))}
                </div>

                {/* WhatsApp Dispatch Notification Note */}
                <div style={{
                  background: '#f0fdf4',
                  border: '1.5px solid #86efac',
                  padding: '0.7rem 0.9rem',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.8rem'
                }}>
                  <WhatsAppIcon size={18} color="#16a34a" />
                  <span style={{ color: '#14532d', lineHeight: 1.4, fontWeight: 500 }}>
                    ओटीपी आपके <strong>WhatsApp</strong> पर भेजा गया है। कृपया अपना WhatsApp चैट इनबॉक्स जांचें।
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                  <button
                    type="button"
                    onClick={() => setClientStep('phone')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-burgundy-base)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontWeight: 600
                    }}
                  >
                    <ArrowLeft size={13} />
                    <span>WhatsApp नंबर बदलें</span>
                  </button>

                  {countdown > 0 ? (
                    <span style={{ color: 'var(--color-text-stone-body)' }}>
                      पुनः भेजें: {countdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-burgundy-base)',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      WhatsApp पर पुनः भेजें
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || otpDigits.join('').length < 6}
                  className="btn-editorial-primary"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    justifyContent: 'center',
                    opacity: loading || otpDigits.join('').length < 6 ? 0.6 : 1,
                    cursor: loading || otpDigits.join('').length < 6 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <UserCheck size={16} />
                  )}
                  <span>{loading ? 'सत्यापित हो रहा है...' : 'सत्यापित करें एवं प्रवेश करें'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: PANDITJI (EMAIL & PASSWORD + FORGOT PASSWORD) */}
        {/* ==================================================== */}
        {activeTab === 'panditji' && (
          <div>
            {!isForgotMode ? (
              <form onSubmit={handleCredentialsLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-text-charcoal)', marginBottom: '0.4rem', fontWeight: 600 }}>
                    पंडित जी पंजीकृत ईमेल (Registered Email) *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-burgundy-base)' }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem 0.75rem 2.4rem',
                        background: 'var(--color-stone-canvas)',
                        border: '1px solid var(--color-stone-border)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--color-text-charcoal)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-burgundy-base)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--color-stone-border)')}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.82rem', color: 'var(--color-text-charcoal)', fontWeight: 600 }}>
                      गोपनीय पासवर्ड (Password) *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setErrorMessage('');
                        setSuccessMessage('');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-burgundy-base)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      पासवर्ड भूल गए? (Forgot?)
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-burgundy-base)' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.4rem 0.75rem 2.4rem',
                        background: 'var(--color-stone-canvas)',
                        border: '1px solid var(--color-stone-border)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--color-text-charcoal)',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-burgundy-base)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--color-stone-border)')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.85rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-stone-body)',
                        cursor: 'pointer',
                        padding: 0
                      }}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Quick Demo Pre-filler Button */}
                <div style={{
                  background: 'var(--color-stone-surface)',
                  border: '1px solid var(--color-stone-border)',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem'
                }}>
                  <span style={{ color: 'var(--color-text-stone-body)' }}>डेमो क्रेडेंशियल: panditrakeshrawal26@gmail.com</span>
                  <button
                    type="button"
                    onClick={fillDemoPanditji}
                    style={{
                      background: 'var(--color-stone-card)',
                      border: '1px solid var(--color-stone-border)',
                      color: 'var(--color-burgundy-base)',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      cursor: 'pointer',
                      fontSize: '0.72rem'
                    }}
                  >
                    ऑटो भरें
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-editorial-primary"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    justifyContent: 'center',
                    marginTop: '0.3rem'
                  }}
                >
                  {loading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  <span>{loading ? 'सत्यापित हो रहा है...' : 'पंडित जी पोर्टल में लॉगिन करें'}</span>
                </button>
              </form>
            ) : (
              /* Forgot Password & Reset Form */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(false);
                      setErrorMessage('');
                      setSuccessMessage('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-burgundy-base)',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: 600
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>वापस लॉगिन पर लौटें</span>
                  </button>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-stone-body)' }}>पासवर्ड रीसेट सेवा</span>
                </div>

                {!resetToken ? (
                  <form onSubmit={handleRequestResetLink} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-text-charcoal)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        पंडित जी पंजीकृत ईमेल (Registered Email) *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-burgundy-base)' }} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="panditrakeshrawal26@gmail.com"
                          style={{
                            width: '100%',
                            padding: '0.75rem 0.9rem 0.75rem 2.4rem',
                            background: 'var(--color-stone-canvas)',
                            border: '1px solid var(--color-stone-border)',
                            borderRadius: 'var(--radius-xs)',
                            color: 'var(--color-text-charcoal)',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-stone-body)', marginTop: '0.3rem', display: 'block' }}>
                        इस ईमेल पर एक सुरक्षित पासवर्ड रीसेट लिंक भेजा जाएगा।
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !email}
                      className="btn-editorial-primary"
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        justifyContent: 'center'
                      }}
                    >
                      {loading ? <RefreshCw size={16} className="animate-spin" /> : <Mail size={16} />}
                      <span>{loading ? 'लिंक प्रेषित किया जा रहा है...' : 'ईमेल पर रीसेट लिंक भेजें'}</span>
                    </button>
                  </form>
                ) : (
                  /* Step 2: Set New Password using Reset Token */
                  <form onSubmit={handlePerformReset} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                      background: 'var(--color-stone-surface)',
                      border: '1px solid var(--color-stone-border)',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.78rem',
                      color: 'var(--color-text-charcoal)'
                    }}>
                      रीसेट टोकन प्राप्त हुआ! कृपया नया पासवर्ड निर्धारित करें।
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-text-charcoal)', marginBottom: '0.35rem', fontWeight: 600 }}>
                        नया पासवर्ड (New Password) *
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="कम से कम 6 अक्षर"
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.9rem',
                          background: 'var(--color-stone-canvas)',
                          border: '1px solid var(--color-stone-border)',
                          borderRadius: 'var(--radius-xs)',
                          color: 'var(--color-text-charcoal)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-text-charcoal)', marginBottom: '0.35rem', fontWeight: 600 }}>
                        नया पासवर्ड पुनः दर्ज करें (Confirm Password) *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="वही पासवर्ड दोबारा लिखें"
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.9rem',
                          background: 'var(--color-stone-canvas)',
                          border: '1px solid var(--color-stone-border)',
                          borderRadius: 'var(--radius-xs)',
                          color: 'var(--color-text-charcoal)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !newPassword || newPassword !== confirmPassword}
                      className="btn-editorial-primary"
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        justifyContent: 'center'
                      }}
                    >
                      {loading ? <RefreshCw size={16} className="animate-spin" /> : <KeyRound size={16} />}
                      <span>{loading ? 'अपडेट हो रहा है...' : 'नया पासवर्ड सुरक्षित करें'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: ADMIN (EMAIL/USERNAME & PASSWORD CREDENTIALS) */}
        {/* ==================================================== */}
        {activeTab === 'admin' && (
          <form onSubmit={handleCredentialsLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-text-charcoal)', marginBottom: '0.4rem', fontWeight: 600 }}>
                व्यवस्थापक ईमेल / यूजरनेम (Admin Email) *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-burgundy-base)' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem 0.75rem 2.4rem',
                    background: 'var(--color-stone-canvas)',
                    border: '1px solid var(--color-stone-border)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-text-charcoal)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-burgundy-base)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-stone-border)')}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-text-charcoal)', marginBottom: '0.4rem', fontWeight: 600 }}>
                व्यवस्थापक पासवर्ड (Admin Password) *
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-burgundy-base)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.4rem 0.75rem 2.4rem',
                    background: 'var(--color-stone-canvas)',
                    border: '1px solid var(--color-stone-border)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-text-charcoal)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-burgundy-base)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-stone-border)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-stone-body)',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Quick Demo Pre-filler Button for Admin */}
            <div style={{
              background: 'var(--color-stone-surface)',
              border: '1px solid var(--color-stone-border)',
              padding: '0.55rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem'
            }}>
              <span style={{ color: 'var(--color-text-stone-body)' }}>डेमो क्रेडेंशियल: shiwansh8888@gmail.com</span>
              <button
                type="button"
                onClick={fillDemoAdmin}
                style={{
                  background: 'var(--color-stone-card)',
                  border: '1px solid var(--color-stone-border)',
                  color: 'var(--color-burgundy-base)',
                  fontWeight: 600,
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                  fontSize: '0.72rem'
                }}
              >
                ऑटो भरें
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-editorial-primary"
              style={{
                width: '100%',
                padding: '0.8rem',
                justifyContent: 'center',
                marginTop: '0.3rem'
              }}
            >
              {loading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <ShieldCheck size={16} />
              )}
              <span>{loading ? 'सत्यापित हो रहा है...' : 'व्यवस्थापक के रूप में प्रवेश करें'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
