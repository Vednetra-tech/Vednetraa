import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
        width: '100%'
      }}>
        {items.map((_, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(38, 12, 17, 0.65)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Shimmer Overlay */}
            <div className="skeleton-shimmer" />

            {/* Header tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '90px', height: '24px', borderRadius: '6px', background: 'rgba(217, 194, 167, 0.1)' }} />
              <div style={{ width: '60px', height: '22px', borderRadius: '999px', background: 'rgba(234, 139, 112, 0.1)' }} />
            </div>

            {/* Title */}
            <div style={{ width: '75%', height: '28px', borderRadius: '6px', background: 'rgba(252, 249, 242, 0.12)' }} />
            <div style={{ width: '50%', height: '18px', borderRadius: '4px', background: 'rgba(217, 194, 167, 0.08)' }} />

            {/* Description lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.5rem 0' }}>
              <div style={{ width: '100%', height: '14px', borderRadius: '4px', background: 'rgba(252, 249, 242, 0.07)' }} />
              <div style={{ width: '90%', height: '14px', borderRadius: '4px', background: 'rgba(252, 249, 242, 0.07)' }} />
              <div style={{ width: '65%', height: '14px', borderRadius: '4px', background: 'rgba(252, 249, 242, 0.07)' }} />
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(217, 194, 167, 0.1)' }}>
              <div style={{ flex: 1, height: '38px', borderRadius: '999px', background: 'rgba(217, 194, 167, 0.1)' }} />
              <div style={{ flex: 1.2, height: '38px', borderRadius: '999px', background: 'rgba(234, 139, 112, 0.15)' }} />
            </div>
          </div>
        ))}

        <style>{`
          .skeleton-shimmer {
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent 0%, rgba(234, 139, 112, 0.08) 50%, transparent 100%);
            animation: skeletonSweep 1.8s infinite;
          }
          @keyframes skeletonSweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  // Row / List skeleton
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%' }}>
      {items.map((_, idx) => (
        <div
          key={idx}
          style={{
            background: 'rgba(38, 12, 17, 0.65)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="skeleton-shimmer" />
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '70%' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(234, 139, 112, 0.12)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '80%' }}>
              <div style={{ width: '60%', height: '18px', borderRadius: '4px', background: 'rgba(252, 249, 242, 0.1)' }} />
              <div style={{ width: '40%', height: '12px', borderRadius: '4px', background: 'rgba(217, 194, 167, 0.08)' }} />
            </div>
          </div>
          <div style={{ width: '80px', height: '28px', borderRadius: '6px', background: 'rgba(217, 194, 167, 0.1)' }} />
        </div>
      ))}
    </div>
  );
}
