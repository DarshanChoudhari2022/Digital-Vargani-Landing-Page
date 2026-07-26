import React from 'react';

export const FestivalGallerySection: React.FC = () => {
  return (
    <section className="section-padding" style={{ background: 'var(--white)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container-main">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
          <h2 className="t-h2" style={{ marginBottom: 16 }}>
            Built for Ganesh Utsav. Ready for every celebration.
          </h2>
          <p className="t-body-lg">
            While optimized for Ganesh Utsav, Eksutra adapts to any festival or community fundraising event.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="festival-grid">
          {[
            { title: 'Ganesh Utsav', sub: '10-day festival', icon: 'temple_hindu', bg: '#ffedd5', color: '#ea580c', primary: true },
            { title: 'Navratri Utsav', sub: '9 nights festival', icon: 'celebration', bg: '#fef3c7', color: '#d97706', primary: false },
            { title: 'Dahi Handi', sub: 'Gokulashtami', icon: 'sports_kabaddi', bg: '#e0f2fe', color: '#0284c7', primary: false },
            { title: 'Shiv Jayanti', sub: 'Welfare & Events', icon: 'fort', bg: '#ffedd5', color: '#ea580c', primary: false },
          ].map((fest, i) => (
            <div key={i} style={{
              padding: 28, borderRadius: 16, textAlign: 'center',
              border: fest.primary ? '2px solid #ea580c' : '1px solid var(--border)',
              background: fest.primary ? '#fff7ed' : 'var(--white)',
              position: 'relative',
              boxShadow: fest.primary ? '0 8px 20px rgba(234, 88, 12, 0.12)' : 'none',
            }}>
              {fest.primary && (
                <div style={{
                  position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                  background: '#ea580c', color: 'white', fontSize: 10, fontWeight: 700,
                  padding: '3px 12px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>Primary</div>
              )}
              <div style={{
                width: 52, height: 52, borderRadius: 14, margin: '0 auto 16px',
                background: fest.bg, color: fest.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 26 }}>{fest.icon}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{fest.title}</div>
              <div className="t-caption">{fest.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .festival-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 768px) {
          .festival-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .festival-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
