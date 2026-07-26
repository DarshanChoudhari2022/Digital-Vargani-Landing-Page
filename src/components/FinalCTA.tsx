import React from 'react';

interface FinalCTAProps {
  onOpenDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenDemo }) => {
  return (
    <section style={{
      background: 'var(--ink)', color: 'white', padding: '80px 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle warm glow */}
      <div style={{
        position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(230,126,34,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 640 }}>
        <h2 className="t-h2" style={{ color: 'white', marginBottom: 16 }}>
          Ganesh Utsav is weeks away.<br />Is your mandal ready?
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
          Set up your committee on Digital Mandal in under 5 minutes. Replace the receipt book before collection day.
        </p>

        <button onClick={onOpenDemo} className="btn-primary" style={{
          padding: '16px 40px', fontSize: 16,
          background: 'var(--saffron)', color: 'white',
          boxShadow: '0 4px 20px rgba(230,126,34,0.3)',
        }}>
          Book a Demo
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
        </button>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 20 }}>
          {['Free to start', 'No credit card', 'Marathi support'].map((item, i) => (
            <span key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
              ✓ {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
