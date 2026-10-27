import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'ऑनलाइन पूजा एवं लाइव अनुष्ठान किस प्रकार संपादित होता है?',
      a: 'ऑनलाइन पूजा में यजमान को एक सुरक्षित HD वीडियो कॉन्फ्रेंस लिंक (Google Meet / Zoom) उपलब्ध कराया जाता है। पंडित जी यजमान एवं उनके परिवार का नाम, गोत्र और नक्षत्र बोलकर विधिपूर्वक संकल्प कराते हैं। पूजा का पूरा विधान लाइव यजमान के सम्मुख होता है और वे अपने स्थान से ही आहुति अथवा पुष्प अर्पण कर सकते हैं।'
    },
    {
      q: 'पूजन सामग्री की व्यवस्था किसके द्वारा की जाती है?',
      a: 'ऑफलाइन पूजा में यदि यजमान चाहें, तो सम्पूर्ण वैदिक सामग्री (शुद्ध समिधा, धूप, घी, औषधियां) संस्थान द्वारा उपलब्ध कराई जाती है अथवा शुभ मुहूर्त से पूर्व आवश्यक सामग्री की विस्तृत सूची प्रेषित कर दी जाती है। ऑनलाइन पूजा में मुख्य सामग्री पंडित जी द्वारा प्रयुक्त होती है तथा घर पर आवश्यक सामान्य सामग्री (जल, दीप, पुष्प, फल) यजमान एकत्र करते हैं।'
    },
    {
      q: 'सादा पाठ और संगीतमय श्रीमद्भागवत कथा में क्या अंतर है?',
      a: 'सादा पाठ पारंपरिक वैदिक पारायण है, जिसमें मूल श्लोकों का पाठ, आख्यान और व्यास पीठ द्वारा गूढ़ आध्यात्मिक अर्थ समझाया जाता है। संगीतमय भागवत कथा में व्यास जी के साथ कुशल संगीतकार, भजन-कीर्तन, शास्त्रीय वाद्य यंत्र और झांकियों का भव्य समावेश होता है, जो पूरे माहौल को उत्सवमय बना देता है।'
    },
    {
      q: 'कुण्डली मिलान एवं रत्न सलाह हेतु क्या विवरण देना आवश्यक है?',
      a: 'सटीक ज्योतिषीय फलादेश एवं रत्न निर्धारण हेतु जातक की जन्म तिथि (DOB), सटीक जन्म समय (TOB) तथा जन्म स्थान (POB - नगर व राज्य) की आवश्यकता होती है। कुण्डली मिलान हेतु वर और वधू दोनों का यह विवरण अपेक्षित रहता है।'
    },
    {
      q: 'क्या हम अपने शहर में पंडित जी को कथा अथवा अनुष्ठान हेतु आमंत्रित कर सकते हैं?',
      a: 'हाँ, पंडित राकेश चन्द्र रावल जी भारत के किसी भी राज्य अथवा विदेश में यजमान के आमंत्रण पर प्रत्यक्ष पधारकर श्रीमद्भागवत कथा, महायज्ञ एवं गृह अनुष्ठान संपन्न कराते हैं। इसके लिए कम से कम 2 से 4 सप्ताह पूर्व समय आरक्षित करना उचित रहता है।'
    }
  ];

  return (
    <section id="faq" style={{
      padding: '6rem 0',
      position: 'relative',
      background: 'var(--color-stone-canvas)',
      borderBottom: '1px solid var(--color-stone-border)'
    }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div className="section-header">
          <div className="tag">
            <HelpCircle size={15} />
            <span>जिज्ञासा एवं समाधान</span>
          </div>
          <h2>
            <span className="text-gold-gradient">अक्सर पूछे जाने वाले प्रश्न (FAQ)</span>
          </h2>
          <div className="motif-divider">
            <span className="line" />
            <span className="symbol">☸</span>
            <span className="line" />
          </div>
          <p>
            पूजा Booking, संकल्प विधि एवं ऑनलाइन अनुष्ठानों से जुड़े सामान्य प्रश्नों के स्पष्ट उत्तर।
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="card-vedic"
                style={{
                  padding: '1.25rem 1.5rem',
                  border: isOpen ? '1.5px solid var(--color-burgundy-base)' : '1px solid var(--color-stone-border)',
                  background: 'var(--color-stone-card)',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-charcoal)',
                    textAlign: 'left',
                    fontSize: '1.02rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-serif-royal)'
                  }}
                >
                  <span style={{ color: isOpen ? 'var(--color-burgundy-base)' : 'var(--color-text-charcoal)' }}>
                    {item.q}
                  </span>
                  <span style={{ color: 'var(--color-burgundy-base)', marginLeft: '1rem' }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    marginTop: '0.85rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--color-stone-border)',
                    fontSize: '0.92rem',
                    lineHeight: '1.7',
                    color: 'var(--color-text-stone-body)'
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
