import React from 'react';
import { BookOpen, ShieldCheck, Feather } from 'lucide-react';

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
          {/* Left Column: Official Transparent Emblem & Vedic Card */}
          <div style={{ position: 'relative' }}>
            <div className="card-vedic" style={{
              padding: '2.5rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--color-stone-border)',
              background: 'var(--color-stone-card)',
              boxShadow: 'var(--shadow-card)'
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
                <span>व्यास पीठ एवं ज्योतिर्विद</span>
              </div>

              <h3 style={{
                fontSize: '2rem',
                marginBottom: '0.35rem',
                color: 'var(--color-text-charcoal)'
              }}>
                पं. राकेश चन्द्र रावल
              </h3>

              <div style={{
                fontSize: '0.92rem',
                color: 'var(--color-burgundy-base)',
                marginBottom: '1.4rem',
                fontFamily: 'var(--font-serif-royal)',
                letterSpacing: '0.05em',
                fontWeight: 600
              }}>
                Pandit Rakesh Chandra Rawal
              </div>

              <p style={{
                fontSize: '0.94rem',
                lineHeight: '1.75',
                color: 'var(--color-text-stone-body)',
                fontStyle: 'italic',
                marginBottom: '1.8rem'
              }}>
                "मंत्रोच्चारण का प्रत्येक स्वर जब भाव, आस्था एवं शुद्ध व्याकरण से उच्चारित होता है, 
                तभी वह यजमान के अंतःकरण और परिवेश को दिव्यता से भर देता है।"
              </p>

              {/* Badges row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                borderTop: '1px solid rgba(104, 46, 54, 0.1)',
                paddingTop: '1.25rem'
              }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-burgundy-base)', fontFamily: 'var(--font-serif-royal)' }}>
                    25+
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-stone-muted)' }}>वर्षों का अनुभव</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-burgundy-base)', fontFamily: 'var(--font-serif-royal)' }}>
                    1000+
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-stone-muted)' }}>कथा पारायण</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-burgundy-base)', fontFamily: 'var(--font-serif-royal)' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-stone-muted)' }}>वैदिक शुचिता</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio and Philosophy */}
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
              <span>पवित्र परंपरा एवं आदर्श</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)', marginBottom: '1.4rem', lineHeight: 1.25, fontWeight: 600, color: 'var(--color-text-charcoal)' }}>
              सनातन ज्ञान एवं <span className="text-flame-gradient">शास्त्रीय निष्ठा</span>
            </h2>

            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--color-text-stone-body)', marginBottom: '1.2rem', fontWeight: 400 }}>
              <span style={{ color: 'var(--color-text-charcoal)', fontWeight: 600 }}>पंडित राकेश चन्द्र रावल</span> पारंपरिक वैदिक कुल एवं गुरुकुल शिक्षा पद्धति से दीक्षित मूर्धन्य विद्वान हैं। 
              पिछले ढाई दशकों से अधिक समय से आप श्रीमद्भागवत महापुराण, श्री रामकथा, शिवमहापुराण एवं देवी भागवत के माध्यम से 
              लाखों श्रद्धालुओं को अध्यात्म और भक्ति का मार्ग दिखा रहे हैं।
            </p>

            <p style={{ fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--color-text-stone-body)', marginBottom: '2.2rem' }}>
              आपके द्वारा संपादित अनुष्ठानों में न केवल पारम्परिक मंत्रोच्चार की शुद्धता रहती है, अपितु यजमान को प्रत्येक 
              विधान का अर्थ, आध्यात्मिक रहस्य एवं वैज्ञानिक कारण भी समझाया जाता है, जिससे पूजा में पूर्ण मन और श्रद्धा समाहित हो सके।
            </p>

            {/* Principles Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2.4rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-burgundy-base)', marginTop: '0.15rem' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.96rem', color: 'var(--color-text-charcoal)', marginBottom: '0.2rem', fontWeight: 600 }}>
                    वेद-सम्मत संकल्प
                  </h4>
                  <p style={{ fontSize: '0.84rem', margin: 0, color: 'var(--color-text-stone-muted)' }}>
                    यजमान के नाम, गोत्र एवं कुल-रीति का यथार्थ उच्चारण
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--color-burgundy-base)', marginTop: '0.15rem' }}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.96rem', color: 'var(--color-text-charcoal)', marginBottom: '0.2rem', fontWeight: 600 }}>
                    शुद्ध सामग्री एवं व्यवस्था
                  </h4>
                  <p style={{ fontSize: '0.84rem', margin: 0, color: 'var(--color-text-stone-muted)' }}>
                    प्रामाणिक जड़ी-बूटी, हवन समिधा एवं पंचामृत
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
