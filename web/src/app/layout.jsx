import '../index.css';
import '../App.css';
import Providers from './providers.jsx';

const JSON_LD = `
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://vednetra.com/#organization",
      "name": "Vedनेत्र — वैदिक अनुष्ठान एवं ज्योतिष संस्थान",
      "alternateName": "VedNetra",
      "url": "https://vednetra.com",
      "logo": "https://vednetra.com/Logo-transparent.png",
      "image": "https://vednetra.com/og-image.svg",
      "description": "पूज्य पंडित राकेश चन्द्र रावल जी द्वारा शास्त्रोक्त श्रीमद्भागवत कथा, महापूजा, नवग्रह शांति, कालसर्प व वास्तु दोष निवारण, रत्न सलाह एवं कुण्डली मिलान।",
      "telephone": "+91-9827514489",
      "email": "panditrakeshrawal26@gmail.com",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "गंगा तट, वैदिक पीठ",
        "addressLocality": "हरिद्वार",
        "addressRegion": "उत्तराखंड",
        "postalCode": "249401",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "29.9457",
        "longitude": "78.1642"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "06:00",
        "closes": "21:00"
      },
      "founder": {
        "@type": "Person",
        "name": "पं. राकेश चन्द्र रावल",
        "jobTitle": "वेदाचार्य एवं कथा व्यास",
        "email": "panditrakeshrawal26@gmail.com",
        "telephone": "+91-9827514489"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://vednetra.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "क्या ऑनलाइन पूजा में यजमान का संकल्प प्रत्यक्ष पूजा जैसा ही फलदायी होता है?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "हाँ, वैदिक शास्त्रों के अनुसार संकल्प भाव और मन्त्रध्वनि पर आधारित होता है। लाइव वीडियो प्रसारण के माध्यम से यजमान के नाम एवं गोत्रोच्चार से लिया गया संकल्प पूर्ण रूपेण फलदायी होता है।"
          }
        },
        {
          "@type": "Question",
          "name": "पूजा की समस्त आवश्यक सामग्री की व्यवस्था किसके द्वारा की जाती है?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "समस्त दुर्लभ एवं शास्त्रोक्त पूजन सामग्री (हवन समिधा, घृत, नवग्रह समिधा, पुष्प, रोली आदि) की व्यवस्था हमारे संस्थान द्वारा की जाती है।"
          }
        },
        {
          "@type": "Question",
          "name": "श्रीमद्भागवत कथा का आयोजन अपने गृह स्थान पर कैसे कराएं?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "श्रीमद्भागवत कथा (सदा पाठ अथवा संगीतमय कथा) हेतु आप तिथि एवं स्थान के साथ पूजा आरक्षण फॉर्म भरें अथवा पंडित जी से सीधे संपर्क करें।"
          }
        }
      ]
    }
  ]
}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="hi" dir="ltr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

        {/* Primary Page Title & Meta Description */}
        <title>Vedनेत्र | पं. राकेश चन्द्र रावल — वैदिक अनुष्ठान, भागवत कथा एवं ज्योतिष संस्थान</title>
        <meta name="title" content="Vedनेत्र | पं. राकेश चन्द्र रावल — वैदिक अनुष्ठान, भागवत कथा एवं ज्योतिष संस्थान" />
        <meta name="description" content="पूज्य पंडित राकेश चन्द्र रावल जी द्वारा शास्त्रोक्त श्रीमद्भागवत कथा, महापूजा, नवग्रह शांति, कालसर्प व वास्तु दोष निवारण, रत्न सलाह एवं कुण्डली मिलान। प्रत्यक्ष एवं ऑनलाइन संकल्प सेवा।" />
        <meta name="keywords" content="पंडित राकेश चन्द्र रावल, भागवत कथा, वैदिक पूजा, कालसर्प दोष निवारण, वास्तु दोष, कुण्डली मिलान, रुद्राभिषेक, हवन, हरिद्वार, ऋषिकेश, VedNetra" />
        <meta name="author" content="पं. राकेश चन्द्र रावल" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#682e36" />
        <meta name="color-scheme" content="dark" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://vednetra.com/" />

        {/* Multi-format Favicons & Web Manifest */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/Logo-emblem-transparent.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Logo-emblem-transparent.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vednetra.com/" />
        <meta property="og:site_name" content="Vedनेत्र (VedNetra)" />
        <meta property="og:title" content="Vedनेत्र | पं. राकेश चन्द्र रावल — वैदिक अनुष्ठान एवं ज्योतिष संस्थान" />
        <meta property="og:description" content="शास्त्रोक्त श्रीमद्भागवत कथा, महापूजा, नवग्रह शांति, कालसर्प व वास्तु दोष निवारण, रत्न सलाह एवं कुण्डली मिलान। प्रत्यक्ष एवं ऑनलाइन संकल्प उपलब्ध।" />
        <meta property="og:image" content="https://vednetra.com/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="वेदनेत्र — पं. राकेश चन्द्र रावल वैदिक अनुष्ठान एवं ज्योतिष संस्थान" />
        <meta property="og:locale" content="hi_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://vednetra.com/" />
        <meta name="twitter:title" content="Vedनेत्र | पं. राकेश चन्द्र रावल — वैदिक अनुष्ठान एवं ज्योतिष संस्थान" />
        <meta name="twitter:description" content="पूज्य पंडित राकेश चन्द्र रावल जी द्वारा शास्त्रोक्त श्रीमद्भागवत कथा, महापूजा, नवग्रह शांति एवं कुण्डली मिलान।" />
        <meta name="twitter:image" content="https://vednetra.com/og-image.svg" />

        {/* Faster Font Loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Rozha+One&display=swap" rel="stylesheet" />

        {/* Schema.org JSON-LD. dangerouslySetInnerHTML keeps the JSON unescaped */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
