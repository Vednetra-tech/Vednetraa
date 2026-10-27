import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  // Schema.org BreadcrumbList structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://vednetra.com${item.href}` : 'https://vednetra.com/'
    }))
  };

  return (
    <nav aria-label="ब्रेडक्रम्ब नेविगेशन" style={{ padding: '0.5rem 0', marginBottom: '1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.45rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        fontSize: '0.8rem',
        color: 'var(--color-silk)'
      }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              {index > 0 && (
                <ChevronRight size={12} style={{ color: 'var(--color-sand)', opacity: 0.6 }} />
              )}
              {isLast ? (
                <span style={{ color: 'var(--color-flame)', fontWeight: 500 }} aria-current="page">
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-sand)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ivory)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-sand)')}
                >
                  {index === 0 && <Home size={12} />}
                  <span>{item.label}</span>
                </button>
              ) : (
                <a
                  href={item.href || '#'}
                  style={{
                    color: 'var(--color-sand)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ivory)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-sand)')}
                >
                  {index === 0 && <Home size={12} />}
                  <span>{item.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
