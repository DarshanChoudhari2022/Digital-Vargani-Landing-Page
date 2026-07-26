import React from 'react';

export const TrustStrip: React.FC = () => {
  const items = [
    { icon: 'groups', text: '500+ mandals registered' },
    { icon: 'receipt_long', text: '2,00,000+ receipts generated' },
    { icon: 'wifi_off', text: 'Offline-first — works in crowded pandals' },
  ];

  return (
    <section style={{ background: 'var(--cream)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '24px 0' }}>
      <div className="container-main">
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px 48px' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', fontSize: 14, fontWeight: 500 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--body)' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
