import React from 'react';
import { Calendar, Moon, ArrowRight } from 'lucide-react';

export default function MuhuratCalendar({ onSelectMuhurat }) {
  const auspiciousTithis = [
    {
      tithi: 'एकादशी तिथि (Ekadashi)',
      deity: 'भगवान श्री विष्णु',
      significance: 'श्रीमद्भागवत पारायण, सत्यनारायण कथा एवं विष्णु सहस्रनाम हेतु सर्वश्रेष्ठ तिथि।',
      recommended_rituals: 'श्रीमद्भागवत कथा (सादा / संगीतमय)',
      service_title: 'श्रीमद्भागवत कथा (सादा पाठ)',
      color: '#e8d7c3'
    },
    {
      tithi: 'प्रदोष व्रत एवं मासिक शिवरात्रि',
      deity: 'देवाधिदेव महादेव शिव',
      significance: 'समस्त व्याधियों, संकटों एवं ग्रहों के अशुभ प्रभाव को शांत करने हेतु महा-अभिषेक।',
      recommended_rituals: 'रुद्र अभिषेक एवं पंचामृत अभिषेक',
      service_title: 'महिमामंडित रुद्र अभिषेक',
      color: '#8dc2de'
    },
    {
      tithi: 'पूर्णिमा तिथि (Purnima)',
      deity: 'माता महालक्ष्मी व चंद्र देव',
      significance: 'गृह सुख-शांति, आर्थिक समृद्धि, सत्यनारायण कथा एवं अमृत वर्षा पूजन।',
      recommended_rituals: 'गृह पूजा एवं ऑनलाइन विशेष पूजा',
      service_title: 'गृह एवं पारिवारिक ऑफलाइन पूजा',
      color: '#fffbf7'
    },
    {
      tithi: 'अमावस्या तिथि (Amavasya)',
      deity: 'पितृगण एवं यमराज',
      significance: 'पितृ दोष निवारण, कालसर्प योग शांति एवं तंत्र-बाधा निवारक विशेष अनुष्ठान।',
      recommended_rituals: 'सम्पूर्ण दोष निवारण पूजा',
      service_title: 'सम्पूर्ण दोष निवारण पूजा',
      color: '#d48b72'
    },
    {
      tithi: 'अष्टमी व नवमी तिथि (Navami)',
      deity: 'आदिशक्ति माँ जगदम्बा',
      significance: 'शत्रु नाश, कोर्ट-कचहरी विजय, भय मुक्ति एवं सर्व मनोकामना सिद्धि हेतु।',
      recommended_rituals: 'सप्तशती पाठ एवं चंडी हवन',
      service_title: 'सप्तशती पाठ एवं चंडी हवन',
      color: '#c45c6b'
    },
    {
      tithi: 'सर्वार्थ सिद्धि योग (Siddha Yoga)',
      deity: 'सूर्य देव एवं नवग्रह',
      significance: 'नूतन कार्य, व्यापार प्रारंभ, रत्न धारण एवं वास्तु दोष निवारण हेतु अबूझ मुहूर्त।',
      recommended_rituals: 'रत्न सलाह, कुण्डली मिलान एवं वास्तु पूजन',
      service_title: 'रत्न सलाह एवं सम्पूर्ण फलादेश',
      color: '#dfcaa6'
    }
  ];

  return (
    <section id="muhurat" style={{
      padding: '6rem 0',
      position: 'relative',
      background: 'var(--color-stone-canvas)',
      borderBottom: '1px solid var(--color-stone-border)'
    }}>
      <div className="container">
        <div className="section-header">
          <div className="tag">
            <Calendar size={16} />
            <span>पंचांग एवं शुभ योग</span>
          </div>
          <h2>
            <span className="text-flame-gradient">शुभ मुहूर्त एवं तिथि निर्देशिका</span>
          </h2>
          <div className="motif-divider">
            <span className="line" />
            <span className="symbol">☸</span>
            <span className="line" />
          </div>
          <p>
            वैदिक शास्त्रानुसार किसी भी पूजा अथवा अनुष्ठान का फल तभी शत-प्रतिशत प्राप्त होता है 
            जब वह उचित तिथि, शुभ नक्षत्र एवं अभीष्ट मुहूर्त में संकल्पित हो।
          </p>
        </div>

        {/* Tithis Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {auspiciousTithis.map((item, idx) => (
            <div
              key={idx}
              className="card-vedic"
              style={{
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  marginBottom: '1rem',
                  paddingBottom: '0.85rem',
                  borderBottom: '1px solid var(--color-stone-border)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <div
                      style={{
                        border: '1px solid rgba(104, 46, 54, 0.25)',
                        background: 'rgba(104, 46, 54, 0.08)',
                        color: 'var(--color-burgundy-base)',
                        maxWidth: '100%',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        padding: '0.35rem 0.85rem',
                        borderRadius: 'var(--radius-xs)',
                        lineHeight: '1.4',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}
                    >
                      <Moon size={13} style={{ flexShrink: 0 }} />
                      <span>{item.tithi}</span>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.82rem',
                    color: 'var(--color-text-stone-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ opacity: 0.9 }}>अधिष्ठाता देव:</span>
                    <span style={{
                      color: 'var(--color-burgundy-base)',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}>
                      {item.deity}
                    </span>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.92rem',
                  lineHeight: '1.65',
                  color: 'var(--color-text-stone-body)',
                  marginBottom: '1.25rem'
                }}>
                  {item.significance}
                </p>

                <div style={{
                  background: 'var(--color-stone-surface)',
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-stone-border)',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ color: 'var(--color-burgundy-base)', fontWeight: 600 }}>प्रशस्त अनुष्ठान: </span>
                  <span style={{ color: 'var(--color-text-charcoal)', fontWeight: 500 }}>{item.recommended_rituals}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectMuhurat(item.service_title)}
                className="btn-editorial-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.65rem 1rem',
                  fontSize: '0.82rem'
                }}
              >
                <span>Book Now For This Date</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
