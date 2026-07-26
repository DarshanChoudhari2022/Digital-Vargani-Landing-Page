import React from 'react';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle warm radial glow */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, var(--saffron-bg) 0%, transparent 70%)',
        pointerEvents: 'none', opacity: 0.6,
      }} />

      <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'center' }} className="hero-grid">

          {/* Copy Column */}
          <div style={{ maxWidth: 640, textAlign: 'left' }} className="hero-copy anim-fade-up">

            <h1 className="t-display" style={{ marginBottom: 24 }}>
              Every rupee collected.{' '}
              <br />
              <span style={{ color: 'var(--saffron)' }}>Every rupee accounted for.</span>
            </h1>

            <p className="t-body-lg" style={{ marginBottom: 40, maxWidth: 540 }}>
              Digital Mandal replaces paper receipt books with instant digital slips, a live collection dashboard, and full expense transparency — built for mandal presidents, treasurers, and field collectors.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }} className="hero-ctas">
              <button onClick={onOpenDemo} className="btn-primary" style={{ padding: '16px 32px', fontSize: 16 }}>
                Try Interactive Demo
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
              <a href="#product" className="btn-secondary" style={{ padding: '16px 32px', fontSize: 16, textDecoration: 'none' }}>
                See how it works ↓
              </a>
            </div>

            {/* Trust microcopy */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              {['Free to start', 'Setup in 5 minutes', 'Works offline'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: 13, fontWeight: 500 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--success)' }}>check_circle</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Mockup Column */}
          <div className="hero-mockup anim-fade-up anim-delay-2" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Phone Frame */}
            <div style={{
              width: 300, background: 'var(--white)',
              borderRadius: 32, border: '6px solid var(--border)',
              boxShadow: 'var(--shadow-elevated)', overflow: 'hidden',
              position: 'relative',
            }}>
              {/* App header bar */}
              <div style={{
                background: 'var(--saffron)', color: 'white', padding: '32px 20px 20px',
                borderRadius: '0 0 24px 24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Today's Collection</div>
                    <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>₹ 1,45,000</div>
                  </div>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>receipt_long</span>
                  </div>
                </div>
                <button style={{
                  width: '100%', background: 'white', color: 'var(--saffron)',
                  padding: '12px', borderRadius: 12, border: 'none',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                  New Vargani Slip
                </button>
              </div>

              {/* Slip list */}
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Recent Collections</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--saffron)' }}>View All</span>
                </div>
                {[
                  { name: 'Rahul Deshmukh', amount: '5,001', mode: 'UPI', time: '2 min ago' },
                  { name: 'Anjali Traders', amount: '11,000', mode: 'Cash', time: '45 min ago' },
                  { name: 'Suresh Patil', amount: '2,501', mode: 'UPI', time: '2 hrs ago' },
                ].map((slip, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px', borderRadius: 12,
                    background: 'var(--cream)', marginBottom: 8,
                    border: '1px solid var(--border-light)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'var(--saffron-light)', color: 'var(--saffron)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 13,
                      }}>
                        {slip.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{slip.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{slip.mode} · {slip.time}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>₹{slip.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating annotation card */}
            <div className="anim-fade-up anim-delay-4" style={{
              position: 'absolute', bottom: 24, left: -20,
              background: 'var(--white)', padding: '14px 18px', borderRadius: 16,
              boxShadow: 'var(--shadow-elevated)', border: '1px solid var(--border-light)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: '#e8f5e9', color: 'var(--success)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>sync</span>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>142 slips synced</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Last sync: 3 seconds ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center !important; }
          .hero-copy { max-width: 100% !important; text-align: center !important; margin: 0 auto; }
          .hero-ctas { justify-content: center !important; }
          .hero-ctas > * { width: 100%; }
        }
      `}</style>
    </section>
  );
};
