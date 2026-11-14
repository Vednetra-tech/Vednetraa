'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, ShieldCheck, Languages, CheckCircle2 } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    name: 'Verified Client',
    nameHi: 'सत्यापित यजमान',
    city: 'Indore',
    cityHi: 'इन्दौर',
    isConfidential: true,
    confidentialNote: 'Name kept confidential as requested by client',
    confidentialNoteHi: 'यजमान के अनुरोध पर नाम गोपनीय रखा गया है',
    rating: 5,
    avatarType: 'shield',
    accentColor: '#682e36',
    english:
      'I was struggling with job uncertainty and mental stress for four months due to difficult issues at career and home. Pandit Ji patiently understood my situation and suggested simple remedies, including regular chanting and positive thinking. Following his advice brought immense peace, helped me secure a good job opportunity, and restored family happiness.',
    hindi:
      'मैं पिछले चार महीनों से नौकरी की अनिश्चितता और घर की परेशानियों के कारण भारी मानसिक तनाव से जूझ रहा था। पंडित जी ने मेरी समस्याओं को धैर्यपूर्वक सुना और नियमित जाप तथा सकारात्मक विचार बनाए रखने जैसे सरल उपाय बताए। उनके मार्गदर्शन से मुझे मानसिक शांति मिली, एक अच्छी नौकरी का अवसर प्राप्त हुआ और परिवार में पुनः सुख-शांति लौट आई।'
  },
  {
    id: 2,
    name: 'Neha Matre',
    nameHi: 'नेहा मात्रे',
    city: 'Ujjain',
    cityHi: 'उज्जैन',
    isConfidential: false,
    rating: 5,
    avatarType: 'initials',
    initials: 'NM',
    avatarBg: 'linear-gradient(135deg, #ea8b70 0%, #b85e46 100%)',
    english:
      'After nearly seven months of career anxiety and disturbances at home, I consulted Pandit Ji for guidance. He listened with great patience and gave simple, practical remedies that I followed with sincere faith. Today, my job worries are resolved with a great job, my children’s studies have improved, and our home is filled with positivity.',
    hindi:
      'लगभग सात महीनों से नौकरी की चिंता और घर की समस्याओं के कारण मैं काफी परेशान चल रही थी। पंडित जी ने मेरी पूरी बात ध्यान से सुनी और बहुत ही सरल उपाय अपनाने की सलाह दी। उनके बताए मार्गदर्शन से मुझे अच्छी नौकरी मिल गई, बच्चों की पढ़ाई में सुधार हुआ और घर में सुखद व शांत माहौल बन गया।'
  },
  {
    id: 3,
    name: 'Meeta Joshi',
    nameHi: 'मीता जोशी',
    city: 'Mumbai',
    cityHi: 'मुंबई',
    isConfidential: false,
    rating: 5,
    avatarType: 'initials',
    initials: 'MJ',
    avatarBg: 'linear-gradient(135deg, #682e36 0%, #9c414e 100%)',
    english:
      'I was going through severe mental stress due to continuous losses in my business. Pandit Ji carefully evaluated my situation and recommended wearing a suitable gemstone. Following his advice resolved my problems and brought immense positivity and stability back into my life.',
    hindi:
      'व्यापार में लगातार नुकसान और मानसिक तनाव के कारण मैं बेहद परेशान थी। पंडित जी ने मेरी स्थिति समझकर मुझे उचित रत्न धारण करने का सुझाव दिया। उनके बताए उपाय के बाद मेरी सारी परेशानियां दूर हो गईं और जीवन में सकारात्मकता व स्थिरता वापस आ गई।'
  },
  {
    id: 4,
    name: 'Kapil Jagdish Choudhary',
    nameHi: 'कपिल जगदीश चौधरी',
    city: 'Indore',
    cityHi: 'इन्दौर',
    isConfidential: false,
    rating: 5,
    avatarType: 'initials',
    initials: 'KC',
    avatarBg: 'linear-gradient(135deg, #b85e46 0%, #e2725b 100%)',
    english:
      'Before consulting Pandit Ji, everything in my life was disorganized and going off track. Pandit Ji provided very effective guidance and solutions to address my situation. Following his advice brought a positive turnaround and put things back in order.',
    hindi:
      'पंडित जी से मिलने से पहले मेरे जीवन की सारी व्यवस्था बिगड़ी हुई थी और काम सही से नहीं चल रहे थे। पंडित जी ने मुझे बहुत ही प्रभावशाली उपाय और सही मार्गदर्शन दिया। उनके बताए सुझावों पर अमल करने के बाद स्थिति में सुधार हुआ और सब कुछ सकारात्मक हो गया।'
  },
  {
    id: 5,
    name: 'Pt. Dr. Bhupendra Dharwa',
    nameHi: 'पं. डॉ. भूपेंद्र धारवा',
    city: 'Indore',
    cityHi: 'इन्दौर',
    isConfidential: false,
    rating: 5,
    avatarType: 'initials',
    initials: 'BD',
    avatarBg: 'linear-gradient(135deg, #522129 0%, #682e36 100%)',
    english:
      'I consulted Pandit Ji regarding Vastu, karmakand, and puja requirements. He guided and performed dedicated prayers to Lord Ganesha for our needs. The guidance and spiritual support were the absolute best, bringing great peace and results.',
    hindi:
      'मैंने वास्तु, कर्मकांड और अनुष्ठान के कार्यों के लिए पंडित जी से संपर्क किया था। उन्होंने हमारे लिए श्री गणेश जी की विशेष पूजा और सही अनुष्ठान का मार्गदर्शन किया। उनका अनुभव और सहयोग सबसे श्रेष्ठ रहा, जिससे हमें उत्तम फल और शांति मिली।'
  },
  {
    id: 6,
    name: 'Dr. Bhupendra Bhai Dharwa',
    nameHi: 'डॉ. भूपेंद्र भाई धारवा',
    city: 'Indore',
    cityHi: 'इन्दौर',
    isConfidential: false,
    rating: 5,
    avatarType: 'initials',
    initials: 'BD',
    avatarBg: 'linear-gradient(135deg, #7c333f 0%, #ea8b70 100%)',
    english:
      'I sought Pandit Ji\'s guidance for vivah patrika milan (marriage horoscope matching). He thoroughly analyzed the horoscopes and recommended the appropriate puja and remedies. His astrological advice was truly the best and provided complete clarity.',
    hindi:
      'मैंने विवाह पत्रिका मिलान और परामर्श के लिए पंडित जी से मार्गदर्शन लिया था। उन्होंने कुंडलियों का सटीक अध्ययन कर सही पूजा और उपाय का सुझाव दिया। उनका यह मार्गदर्शन सर्वश्रेष्ठ रहा और हमें पूर्ण संतुष्टि मिली।'
  },
  {
    id: 7,
    name: 'Babulal Dave',
    nameHi: 'बाबूलाल दवे',
    city: 'Mumbai',
    cityHi: 'मुंबई',
    isConfidential: false,
    verifiedPermission: 'हाँ, बिल्कुल।',
    rating: 5,
    avatarType: 'initials',
    initials: 'BD',
    avatarBg: 'linear-gradient(135deg, #3d1219 0%, #682e36 100%)',
    english:
      'I received an excellent response and consultation from Pandit Rakesh Rawal Ji for my concerns. He advised me to recite the Hanuman Chalisa with devotion every single day. Following this practice consistently brought positive change and well-being into my life.',
    hindi:
      'मुझे अपनी परेशानियों को लेकर पंडित राकेश रावल जी से अत्यंत उत्तम मार्गदर्शन और सहयोग प्राप्त हुआ। उन्होंने मुझे प्रतिदिन नियम से श्री हनुमान चालीसा का पाठ करने का सुझाव दिया। इस नियम का पालन करने से जीवन में सकारात्मक बदलाव और शुभ परिणाम महसूस हुए।'
  }
];

// Fixed Center Pivot in the 14-item ring buffer
const CENTER_INDEX = 5;

// Build initial 14-card ring such that cards[CENTER_INDEX] is Card 2 (Neha Matre)
const buildInitialRing = () => {
  const shift = (2 - 1 - CENTER_INDEX + 7) % 7; // shift so ID 2 lands on CENTER_INDEX
  const ring = [];
  for (let i = 0; i < 14; i++) {
    ring.push(testimonialsData[(i + shift) % 7]);
  }
  return ring;
};

export default function Testimonials() {
  const [globalLang, setGlobalLang] = useState('en'); // 'en' | 'hi'
  const [cardLangOverride, setCardLangOverride] = useState({});
  const [cards, setCards] = useState(buildInitialRing);
  const [isSliding, setIsSliding] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const slideTimerRef = useRef(null);

  const cardWidth = 290;
  const gap = 24;
  const step = cardWidth + gap;

  const toggleCardLang = (id, e) => {
    e.stopPropagation();
    setCardLangOverride((prev) => {
      const current = prev[id] || globalLang;
      return { ...prev, [id]: current === 'en' ? 'hi' : 'en' };
    });
  };

  // Forward rotation: slides 1 card left, then rotates array circularly (NEVER BLANK)
  const handleNext = useCallback(() => {
    if (isSliding) return;
    setIsSliding(true);

    if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    slideTimerRef.current = setTimeout(() => {
      setCards((prev) => [...prev.slice(1), prev[0]]);
      setIsSliding(false);
    }, 320);
  }, [isSliding]);

  // Backward rotation
  const handlePrev = useCallback(() => {
    if (isSliding) return;
    // Rotate backwards instantly by placing last card at front
    setCards((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  }, [isSliding]);

  // Infinite automated single-direction scroll (advances every 4 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, []);

  // Jump to specific dot by rotating ring buffer
  const handleDotClick = (targetIndex) => {
    if (isSliding) return;
    const currentCenterId = cards[CENTER_INDEX].id;
    const targetId = targetIndex + 1;
    const diff = (targetId - currentCenterId + 7) % 7;
    if (diff === 0) return;

    setCards((prev) => [...prev.slice(diff), ...prev.slice(0, diff)]);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // The card currently occupying the center position
  const activeMiddleIndex = isSliding ? CENTER_INDEX + 1 : CENTER_INDEX;
  const activeDotIndex = (cards[activeMiddleIndex]?.id - 1 + 7) % 7;

  return (
    <section
      id="testimonials"
      style={{
        padding: '5rem 1rem 6.5rem 1rem',
        position: 'relative',
        background: '#f1f4f9',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {/* Main Outer White Card Container (matches screenshot) */}
        <div
          style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: '32px',
            boxShadow: '0 12px 40px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.03)',
            padding: '3.5rem 1.5rem 0.5rem 1.5rem',
            marginBottom: '1.5rem'
          }}
        >
          {/* Subtle Huge Watermark Quote Icon on Top-Left (matches screenshot) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-15px',
              left: '30px',
              fontSize: '11rem',
              lineHeight: 1,
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              color: '#f1f4f9',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0
            }}
          >
            “
          </div>

          {/* Section Header */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              marginBottom: '2rem'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
                fontWeight: 800,
                color: '#1e293b',
                letterSpacing: '-0.02em',
                margin: 0,
                fontFamily: 'inherit'
              }}
            >
              {globalLang === 'en' ? 'What our Clients say!' : 'यजमानों के पावन अनुभव!'}
            </h2>

            {/* Coral/Terracotta Accent Bar (matches screenshot) */}
            <div
              style={{
                width: '84px',
                height: '4px',
                background: 'linear-gradient(90deg, #ea8b70, #f09a73)',
                borderRadius: '999px',
                margin: '0.75rem auto 1rem auto'
              }}
            />

            {/* Subtitle & Language Toggle Switch */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginTop: '0.75rem'
              }}
            >
              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#64748b',
                  margin: 0,
                  maxWidth: '560px'
                }}
              >
                {globalLang === 'en'
                  ? 'Real experiences, remedies, and blessings shared with gratitude by devotees.'
                  : 'श्रद्धालु यजमानों द्वारा साझा किए गए वास्तविक अनुभव, मार्गदर्शन एवं आत्मिक शांति।'}
              </p>

              {/* Language Switch Pill */}
              <button
                type="button"
                onClick={() => {
                  const nextLang = globalLang === 'en' ? 'hi' : 'en';
                  setGlobalLang(nextLang);
                  setCardLangOverride({});
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.95rem',
                  borderRadius: '999px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#334155',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <Languages size={14} style={{ color: '#ea8b70' }} />
                <span>Language: </span>
                <span style={{ color: '#682e36', fontWeight: 700 }}>
                  {globalLang === 'en' ? 'English (EN)' : 'हिन्दी (HI)'}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>⇄</span>
              </button>
            </div>
          </div>

          {/* Cards Carousel Area with Infinite Single-Direction Scrolling */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden',
              paddingTop: '0.5rem',
              paddingBottom: '3.5rem',
              marginBottom: '-2.5rem'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              style={{
                position: 'absolute',
                left: '12px',
                top: '46%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 25,
                color: '#334155',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              style={{
                position: 'absolute',
                right: '12px',
                top: '46%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 25,
                color: '#334155',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Hardware-Accelerated Sliding Track (Never Blank, Infinite Ring Buffer) */}
            <div
              style={{
                display: 'flex',
                gap: `${gap}px`,
                transform: isSliding
                  ? `translateX(calc(50% - ${cardWidth / 2}px - ${(CENTER_INDEX + 1) * step}px))`
                  : `translateX(calc(50% - ${cardWidth / 2}px - ${CENTER_INDEX * step}px))`,
                transition: isSliding ? 'transform 0.32s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                willChange: 'transform',
                alignItems: 'flex-start',
                paddingTop: '0.5rem',
                paddingBottom: '1rem'
              }}
            >
              {cards.map((item, idx) => {
                const isMiddle = idx === activeMiddleIndex;
                const currentLang = cardLangOverride[item.id] || globalLang;
                const displayText = currentLang === 'en' ? item.english : item.hindi;
                const displayName = currentLang === 'en' ? item.name : item.nameHi;
                const displayCity = currentLang === 'en' ? item.city : item.cityHi;

                return (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => {
                      if (!isMiddle && !isSliding) {
                        const diff = idx - CENTER_INDEX;
                        if (diff > 0) {
                          setCards((prev) => [...prev.slice(diff), ...prev.slice(0, diff)]);
                        } else if (diff < 0) {
                          const shift = Math.abs(diff);
                          setCards((prev) => [...prev.slice(prev.length - shift), ...prev.slice(0, prev.length - shift)]);
                        }
                      }
                    }}
                    style={{
                      flex: `0 0 ${cardWidth}px`,
                      width: `${cardWidth}px`,
                      background: '#ffffff',
                      borderRadius: '22px',
                      padding: '1.85rem 1.4rem 1.6rem 1.4rem',
                      cursor: isMiddle ? 'default' : 'pointer',
                      // Popped up middle card effect: elevated downwards & scaled up matching reference image
                      transform: isMiddle ? 'translateY(24px) scale(1.05)' : 'translateY(-4px) scale(0.96)',
                      boxShadow: isMiddle
                        ? '0 24px 50px rgba(15, 23, 42, 0.16), 0 8px 20px rgba(15, 23, 42, 0.08)'
                        : '0 8px 20px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.03)',
                      border: isMiddle ? '1.5px solid #ea8b70' : '1px solid #edf2f7',
                      zIndex: isMiddle ? 15 : 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      transition: isSliding
                        ? 'transform 0.32s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.25s ease'
                        : 'none'
                    }}
                  >
                    <div>
                      {/* Avatar Centered at Top (matches screenshot) */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginBottom: '0.85rem'
                        }}
                      >
                        <div
                          style={{
                            width: isMiddle ? '62px' : '56px',
                            height: isMiddle ? '62px' : '56px',
                            borderRadius: '50%',
                            background: item.avatarType === 'shield'
                              ? 'linear-gradient(135deg, #1e293b 0%, #475569 100%)'
                              : item.avatarBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: isMiddle ? '1.25rem' : '1.15rem',
                            letterSpacing: '0.04em',
                            boxShadow: isMiddle ? '0 6px 16px rgba(234, 139, 112, 0.35)' : '0 4px 12px rgba(0, 0, 0, 0.12)',
                            border: '3px solid #ffffff',
                            outline: isMiddle ? '2px solid #ea8b70' : '1.5px solid #e2e8f0',
                            transition: isSliding ? 'all 0.25s ease' : 'none'
                          }}
                        >
                          {item.avatarType === 'shield' ? (
                            <ShieldCheck size={isMiddle ? 28 : 24} color="#ffffff" />
                          ) : (
                            item.initials
                          )}
                        </div>

                        {/* Name (matches bold text below avatar in screenshot) */}
                        <div
                          style={{
                            fontSize: isMiddle ? '1.05rem' : '0.96rem',
                            fontWeight: 700,
                            color: '#1e293b',
                            marginTop: '0.65rem',
                            textAlign: 'center',
                            transition: isSliding ? 'font-size 0.25s ease' : 'none'
                          }}
                        >
                          {displayName}
                        </div>

                        {/* City / Location Badge */}
                        <div
                          style={{
                            fontSize: '0.78rem',
                            color: '#64748b',
                            fontWeight: 500,
                            marginTop: '0.15rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <span>{displayCity}</span>
                          {item.verifiedPermission && (
                            <span
                              title="Website sharing verified"
                              style={{ display: 'inline-flex', alignItems: 'center' }}
                            >
                              <CheckCircle2 size={12} color="#16a34a" />
                            </span>
                          )}
                        </div>

                        {/* Star Rating (5 Stars) */}
                        <div
                          style={{
                            display: 'flex',
                            gap: '0.2rem',
                            marginTop: '0.45rem'
                          }}
                        >
                          {[...Array(item.rating)].map((_, s) => (
                            <Star
                              key={s}
                              size={isMiddle ? 15 : 13}
                              fill="#f59e0b"
                              color="#f59e0b"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Subtle Quotation Icon Watermark above text (matches screenshot) */}
                      <div
                        style={{
                          fontSize: '2rem',
                          lineHeight: 1,
                          fontFamily: 'Georgia, serif',
                          color: isMiddle ? '#cbd5e1' : '#e2e8f0',
                          fontWeight: 700,
                          marginBottom: '-0.3rem',
                          transition: isSliding ? 'color 0.25s ease' : 'none'
                        }}
                      >
                        “
                      </div>

                      {/* Testimonial Quote Text */}
                      <p
                        style={{
                          fontSize: '0.86rem',
                          lineHeight: '1.62',
                          color: '#475569',
                          margin: 0,
                          textAlign: 'left'
                        }}
                      >
                        {displayText}
                      </p>
                    </div>

                    {/* Bottom Card Footer with language toggle */}
                    <div
                      style={{
                        marginTop: '1.25rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <button
                        type="button"
                        onClick={(e) => toggleCardLang(item.id, e)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ea8b70',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          padding: '0.2rem 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <span>{currentLang === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}</span>
                        <span style={{ fontSize: '0.65rem' }}>→</span>
                      </button>

                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: isMiddle ? '#ea8b70' : '#94a3b8',
                          fontWeight: isMiddle ? 700 : 500,
                          transition: isSliding ? 'color 0.25s ease' : 'none'
                        }}
                      >
                        {isMiddle ? '★ Featured' : `${item.id} / 7`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Indicator Dots at Bottom */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.45rem',
                marginTop: '1.25rem'
              }}
            >
              {testimonialsData.map((_, i) => {
                const isActive = activeDotIndex === i;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => handleDotClick(i)}
                    style={{
                      width: isActive ? '26px' : '8px',
                      height: '8px',
                      borderRadius: '999px',
                      background: isActive ? '#ea8b70' : '#cbd5e1',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
