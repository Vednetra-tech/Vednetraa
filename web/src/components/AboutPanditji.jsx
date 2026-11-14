'use client';

import React from 'react';
import { BookOpen, ShieldCheck, Feather, Award, MapPin, Sparkles, Flame, GraduationCap } from 'lucide-react';

export default function AboutPanditji({ onOpenBooking, onOpenAstrology }) {
  return (
    <section id="about" style={{
      padding: '6rem 0',
      position: 'relative',
      background: 'var(--color-stone-surface)',
      borderBottom: '1px solid var(--color-stone-border)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Official Emblem & Vedic Profile Card */}
          <div style={{ position: 'relative' }}>
            <div className="card-vedic" style={{
              padding: '2.5rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--color-stone-border)',
              background: 'var(--color-stone-card)',
              boxShadow: 'var(--shadow-card)',
              borderRadius: '24px'
            }}>
              {/* Sun Chakra Emblem Transparent */}
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 1.25rem auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <picture>
                  <source srcSet="/Logo-emblem-transparent.webp" type="image/webp" />
                  <img
                    src="/Logo-emblem-transparent.png"
                    alt="VedNetra Sun Mandala Emblem"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '95px',
                      height: '95px',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                </picture>
              </div>

              <div className="badge-flame" style={{ marginBottom: '0.8rem' }}>
                <span>व्यास पीठ • कर्मकांड • ज्योतिर्विद</span>
              </div>

              <h3 style={{
                fontSize: '2.1rem',
                marginBottom: '0.3rem',
                color: 'var(--color-text-charcoal)',
                fontWeight: 700
              }}>
                पं. राकेश रावल
              </h3>

              <div style={{
                fontSize: '0.96rem',
                color: 'var(--color-burgundy-base)',
                marginBottom: '1.2rem',
                fontFamily: 'var(--font-serif-royal)',
                letterSpacing: '0.04em',
                fontWeight: 600
              }}>
                Pandit Rakesh Rawal
              </div>

              <p style={{
                fontSize: '0.92rem',
                lineHeight: '1.7',
                color: 'var(--color-text-stone-body)',
                fontStyle: 'italic',
                marginBottom: '1.6rem'
              }}>
                "मंत्रोच्चारण का प्रत्येक स्वर जब भाव, शुचिता एवं गुरु-परंपरा के अनुशासन से उच्चारित होता है, 
                तभी वह यजमान के जीवन और परिवेश को सुख, शांति एवं दिव्यता से परिपूर्ण करता है।"
              </p>

              {/* Badges Row: 41+ Years Experience */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                borderTop: '1px solid rgba(104, 46, 54, 0.12)',
                paddingTop: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-burgundy-base)', fontFamily: 'var(--font-serif-royal)' }}>
                    41+
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-stone-muted)', fontWeight: 600 }}>वर्षों की पौरोहित्य साधना</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-burgundy-base)', fontFamily: 'var(--font-serif-royal)' }}>
                    13 वर्ष
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-stone-muted)', fontWeight: 600 }}>आयु से नित्य सप्तशती पाठ</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-burgundy-base)', fontFamily: 'var(--font-serif-royal)' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-stone-muted)', fontWeight: 600 }}>वैदिक एवं शास्त्रसम्मत</div>
                </div>
              </div>

              {/* Sacred Locations Pill */}
              <div style={{
                background: 'rgba(104, 46, 54, 0.05)',
                border: '1px solid rgba(104, 46, 54, 0.12)',
                borderRadius: '12px',
                padding: '0.75rem 0.9rem',
                textAlign: 'left'
              }}>
                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: 'var(--color-burgundy-base)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginBottom: '0.3rem'
                }}>
                  <MapPin size={13} />
                  <span>मुख्य सेवा क्षेत्र (Work Centers)</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-charcoal)', fontWeight: 600 }}>
                  उज्जैन • रतलाम • इंदौर • देवास
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Guru Parampara, Sadhana & Honors */}
          <div>
            <div className="tag" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-burgundy-base)',
              fontSize: '0.84rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.8rem'
            }}>
              <Feather size={15} />
              <span>41 वर्षों की पावन वैदिक परंपरा</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)', marginBottom: '1.25rem', lineHeight: 1.25, fontWeight: 700, color: 'var(--color-text-charcoal)' }}>
              सनातन ज्ञान, गुरु परंपरा एवं <span className="text-flame-gradient">शास्त्रीय निष्ठा</span>
            </h2>

            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-text-stone-body)', marginBottom: '1.2rem', fontWeight: 400 }}>
              <span style={{ color: 'var(--color-text-charcoal)', fontWeight: 700 }}>पंडित राकेश रावल (Pandit Rakesh Rawal)</span> विगत <strong style={{ color: 'var(--color-burgundy-base)' }}>41 वर्षों से</strong> अनवरत कर्मकांड, पौरोहित्य, ज्योतिष एवं वैदिक अनुष्ठानों का संचालन कर रहे हैं। 
              आपकी कर्मकांड साधना का पावन शुभारंभ <strong style={{ color: 'var(--color-text-charcoal)' }}>रतलाम</strong> से हुआ। 
              मात्र <strong style={{ color: 'var(--color-burgundy-base)' }}>13 वर्ष की अल्पायु</strong> से ही आप नित्य <strong style={{ color: 'var(--color-text-charcoal)' }}>श्री दुर्गा सप्तशती</strong> एवं <strong style={{ color: 'var(--color-text-charcoal)' }}>रुद्राष्टाध्यायी</strong> का अखंड पाठ व आराधना कर रहे हैं।
            </p>

            {/* Detailed Cards for Gurus, Sadhana, Awards & Locations */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {/* Card 1: Guru Parampara */}
              <div style={{
                background: 'var(--color-stone-card)',
                border: '1px solid var(--color-stone-border)',
                borderRadius: '14px',
                padding: '1.1rem 1.2rem',
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(104, 46, 54, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-burgundy-base)',
                  flexShrink: 0
                }}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--color-text-charcoal)', marginBottom: '0.3rem', fontWeight: 700 }}>
                    पूज्य गुरु परंपरा (काशी के पारंपरिक विद्वान)
                  </h4>
                  <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--color-text-stone-body)', lineHeight: '1.6' }}>
                    प्रारंभिक शिक्षा एवं वैदिक दीक्षा काशी के मूर्धन्य विद्वानों—<strong>पं. शिवनारायण जी शुक्ल</strong>, <strong>पं. बसंतीलाल जी भट्ट</strong> एवं <strong>पं. चतुर्भुज जी उपाध्याय</strong> के सान्निध्य में संपन्न हुई।
                  </p>
                </div>
              </div>

              {/* Card 2: Sadhana Tapobhoomi */}
              <div style={{
                background: 'var(--color-stone-card)',
                border: '1px solid var(--color-stone-border)',
                borderRadius: '14px',
                padding: '1.1rem 1.2rem',
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(234, 139, 112, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b85e46',
                  flexShrink: 0
                }}>
                  <Flame size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--color-text-charcoal)', marginBottom: '0.3rem', fontWeight: 700 }}>
                    तपोभूमि एवं साधना
                  </h4>
                  <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--color-text-stone-body)', lineHeight: '1.6' }}>
                    पंडित जी की साधना स्थली <strong>गढ़ कैलाश (रतलाम) स्थित माताजी का पावन मंदिर</strong> रही है, जहाँ वर्षों के कठोर जप-तप और शक्ति आराधना से आपने आध्यात्मिक तेज अर्जित किया।
                  </p>
                </div>
              </div>

              {/* Card 3: Awards & Honors */}
              <div style={{
                background: 'var(--color-stone-card)',
                border: '1px solid var(--color-stone-border)',
                borderRadius: '14px',
                padding: '1.1rem 1.2rem',
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d97706',
                  flexShrink: 0
                }}>
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--color-text-charcoal)', marginBottom: '0.3rem', fontWeight: 700 }}>
                    प्राप्त सम्मान एवं अलंकरण
                  </h4>
                  <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--color-text-stone-body)', lineHeight: '1.6' }}>
                    विशिष्ट ज्योतिषीय ज्ञान हेतु <strong>"ज्योतिष शिरोमणि"</strong> अलंकरण से विभूषित। इसके अतिरिक्त <strong>अंतर्राष्ट्रीय ज्योतिष तंत्र एवं वास्तु महाविश्लेषण</strong> में विशिष्ट प्रस्तुति एवं सम्मान प्राप्त।
                  </p>
                </div>
              </div>

              {/* Card 4: Karyakshetra */}
              <div style={{
                background: 'var(--color-stone-card)',
                border: '1px solid var(--color-stone-border)',
                borderRadius: '14px',
                padding: '1.1rem 1.2rem',
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(104, 46, 54, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-burgundy-base)',
                  flexShrink: 0
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--color-text-charcoal)', marginBottom: '0.3rem', fontWeight: 700 }}>
                    प्रमुख कर्मक्षेत्र एवं तीर्थ पीठ
                  </h4>
                  <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--color-text-stone-body)', lineHeight: '1.6' }}>
                    पंडित जी मुख्य रूप से <strong>उज्जैन (महाकाल नगरी), रतलाम, इंदौर एवं देवास</strong> सहित देश-विदेश के श्रद्धालुओं को प्रत्यक्ष एवं ऑनलाइन मार्गदर्शन व संकल्प प्रदान कर रहे हैं।
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => onOpenBooking()} className="btn-editorial-primary">
                <span>Book Now</span>
              </button>
              <button onClick={() => onOpenAstrology()} className="btn-editorial-dark">
                <span>Consult Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
