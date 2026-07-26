import React from 'react';

export const FinalCTA: React.FC = () => {
  return (
    <section style={{
      background: 'var(--ink)', color: 'white', padding: '80px 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle warm glow */}
      <div style={{
        position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(234,88,12,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 640 }}>
        <h2 className="t-h2" style={{ color: 'white', marginBottom: 16 }}>
          Ganesh Utsav is weeks away.<br />Is your mandal ready?
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
          Set up your committee on Eksutra in under 5 minutes. Replace the receipt book before collection day.
        </p>

        <a href="#how-it-works" className="btn-primary" style={{
          padding: '16px 40px', fontSize: 16,
          background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)', color: 'white',
          boxShadow: '0 4px 20px rgba(234,88,12,0.4)',
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          Get Started
          <span style={{ fontSize: 16 }}>➔</span>
        </a>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 20 }}>
          {['Free to start', 'Instant setup', 'Marathi support'].map((item, i) => (
            <span key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              ✓ {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
