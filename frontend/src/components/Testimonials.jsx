import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'संजय एवं सुनीता जोशी',
      city: 'देहरादून, उत्तराखंड',
      service: 'संगीतमय श्रीमद्भागवत कथा',
      text: 'पंडित राकेश चन्द्र रावल जी के पावन सान्निध्य में हमारे निवास पर 7 दिवसीय संगीतमय श्रीमद्भागवत कथा संपन्न हुई। पूरे परिवार और मोहल्ले में जो दिव्यता और भक्ति का वातावरण बना, वह अविस्मरणीय है। पंडित जी का व्याख्यान अत्यंत सरल और मर्मस्पर्शी था।',
      rating: 5
    },
    {
      name: 'राजेश सिंघानिया (USA)',
      city: 'न्यू जर्सी, अमेरिका',
      service: 'विशिष्ट ऑनलाइन पूजा एवं संकल्प',
      text: 'विदेश में रहते हुए हमें वैदिक परंपरा अनुसार गृह प्रवेश पूजा करवानी थी। पंडित जी ने लाइव वीडियो के माध्यम से एक-एक मंत्रोच्चार और संकल्प इतनी आत्मीयता से कराया कि हमें लगा जैसे वे हमारे घर में ही साक्षात उपस्थित हैं।',
      rating: 5
    },
    {
      name: 'डॉ. विवेक चतुर्वेदी',
      city: 'नई दिल्ली',
      service: 'महिमामंडित रुद्र अभिषेक एवं हवन',
      text: 'स्वास्थ्य एवं मानसिक शांति हेतु हमने पंडित जी द्वारा महाशिवरात्रि पर रुद्र अभिषेक कराया। शास्त्रीय नमक-चमक पाठ के साथ जो ऊर्जा का अनुभव हुआ, उसने हमारे समस्त कष्टों को दूर कर दिया। पंडित जी के ज्ञान और शुचिता को कोटिशः नमन।',
      rating: 5
    },
    {
      name: 'अनामिका एवं गौरव शर्मा',
      city: 'जयपुर, राजस्थान',
      service: 'कुण्डली मिलान एवं रत्न सलाह',
      text: 'पुत्र के विवाह हेतु कई जगह भ्रांतियां थीं। पंडित जी ने अष्टकूट मिलान एवं नाड़ी दोष का गहन वैदिक विश्लेषण कर हमें सही मार्ग दिखाया। उनका सटीक फलादेश और सहज स्वभाव सचमुच वंदनीय है।',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" style={{
      padding: '6rem 0',
      position: 'relative',
      background: 'var(--color-stone-surface)',
      borderBottom: '1px solid var(--color-stone-border)'
    }}>
      <div className="container">
        <div className="section-header">
          <div className="tag">
            <Heart size={15} />
            <span>श्रद्धालु अनुभव एवं कृतज्ञता</span>
          </div>
          <h2>
            <span className="text-flame-gradient">यजमानों के पावन अनुभव</span>
          </h2>
          <div className="motif-divider">
            <span className="line" />
            <span className="symbol">ॐ</span>
            <span className="line" />
          </div>
          <p>
            देश-विदेश के श्रद्धालुओं द्वारा अनुष्ठान उपरांत प्राप्त आत्मिक शांति और प्रसन्नता ही 
            पंडित जी की सबसे बड़ी साधना का प्रमाण है।
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem'
        }}>
          {reviews.map((r, i) => (
            <div
              key={i}
              className="card-vedic"
              style={{
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                background: 'var(--color-stone-card)',
                border: '1px solid var(--color-stone-border)'
              }}
            >
              <div>
                <Quote size={26} style={{ color: 'var(--color-burgundy-base)', opacity: 0.35, marginBottom: '0.8rem' }} />

                {/* Stars in Deep Warm Burgundy */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.9rem' }}>
                  {[...Array(r.rating)].map((_, s) => (
                    <Star key={s} size={15} fill="var(--color-burgundy-base)" color="var(--color-burgundy-base)" />
                  ))}
                </div>

                <p style={{
                  fontSize: '0.92rem',
                  lineHeight: '1.7',
                  color: 'var(--color-text-stone-body)',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  "{r.text}"
                </p>
              </div>

              <div style={{
                borderTop: '1px solid var(--color-stone-border)',
                paddingTop: '1rem'
              }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text-charcoal)', fontSize: '0.95rem' }}>
                  {r.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-burgundy-base)', fontWeight: 500 }}>
                  {r.city} • {r.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
