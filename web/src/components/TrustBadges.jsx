import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: 'FAST PRASAD DELIVERY',
      desc: 'Quick & consecrated delivery'
    },
    {
      icon: RotateCcw,
      title: 'EASY CONSULTATION',
      desc: 'Direct online & phone guidance'
    },
    {
      icon: ShieldCheck,
      title: '100% SHASTRIK VIDHI',
      desc: 'Authentic Vedic mantras & rituals'
    },
    {
      icon: Lock,
      title: 'SECURE SANKALP',
      desc: '100% verified Gotra rituals'
    }
  ];

  return (
    <section style={{
      background: 'var(--color-stone-surface-alt)',
      borderBottom: '1px solid var(--color-stone-border)',
      padding: '2.2rem 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.75rem',
          alignItems: 'center'
        }}>
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.5rem 0'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(104, 46, 54, 0.08)',
                  border: '1px solid rgba(104, 46, 54, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--color-burgundy-base)'
                }}>
                  <Icon size={20} strokeWidth={1.7} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-charcoal)',
                    fontFamily: 'var(--font-sans)'
                  }}>
                    {b.title}
                  </span>
                  <span style={{
                    fontSize: '0.74rem',
                    color: 'var(--color-text-stone-muted)',
                    fontWeight: 400
                  }}>
                    {b.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
