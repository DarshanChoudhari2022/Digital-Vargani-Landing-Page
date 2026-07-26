import React from 'react';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  return (
    <section
      style={{
        paddingTop: 140,
        paddingBottom: 100,
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background radial glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: 'radial-gradient(ellipse at center, rgba(254, 215, 170, 0.35) 0%, rgba(253, 230, 138, 0.15) 45%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-main" style={{ position: 'relative', zIndex: 1, maxWidth: 1000 }}>
        {/* Top Badge Pill */}
        <div
          className="anim-fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 16px',
            borderRadius: 999,
            background: '#fdf2f8',
            color: '#db2777',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.02em',
            marginBottom: 20,
            border: '1px solid #fbcfe8',
          }}
        >
          <span style={{ fontSize: 14 }}>👑</span> Ultimate Festival OS
        </div>

        {/* Hero Title */}
        <h1
          className="anim-fade-up anim-delay-1"
          style={{
            fontSize: 'clamp(44px, 7vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            color: '#0f172a',
            margin: '0 auto 20px',
            maxWidth: 820,
            fontFamily: 'var(--font-body)',
          }}
        >
          Effortless <br />
          Collection{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #d946ef 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Simplified
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p
          className="anim-fade-up anim-delay-2"
          style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: '#64748b',
            maxWidth: 580,
            margin: '0 auto 36px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Experience seamless financial management. Replace paper receipt books with instant digital Vargani slips and live committee tracking.
        </p>

        {/* App Store & Google Play Badges / CTAs */}
        <div
          className="anim-fade-up anim-delay-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            marginBottom: 64,
            flexWrap: 'wrap',
          }}
        >
          {/* App Store button */}
          <button
            onClick={onOpenDemo}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 22px',
              borderRadius: 14,
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(15,23,42,0.18)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 26 }}>apple</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 9, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Download on the</div>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>App Store</div>
            </div>
          </button>

          {/* Google Play button */}
          <button
            onClick={onOpenDemo}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 22px',
              borderRadius: 14,
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(15,23,42,0.18)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#38bdf8' }}>play_store</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 9, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Get it on</div>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>Google Play</div>
            </div>
          </button>
        </div>

        {/* Main Interactive Phone Showcase with Vargani Slip Card & Side Logos */}
        <div
          className="anim-fade-up anim-delay-4"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            maxWidth: 850,
            margin: '0 auto',
          }}
        >
          {/* Left Floating Payment Logos */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              position: 'absolute',
              left: 0,
              top: '40%',
              transform: 'translateY(-50%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28 }}>apple</span> Pay
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
              UPI
            </div>
          </div>

          {/* CENTERED PHONE FRAME (iPhone style matching screenshot) */}
          <div
            style={{
              width: 320,
              height: 580,
              background: '#090d16',
              borderRadius: 44,
              border: '8px solid #1e293b',
              boxShadow: '0 25px 60px -15px rgba(15,23,42,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
              overflow: 'hidden',
              position: 'relative',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Notch / Dynamic Island */}
            <div
              style={{
                width: 110,
                height: 22,
                background: '#1e293b',
                borderRadius: '0 0 14px 14px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 10,
              }}
            />

            {/* Status bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '4px 20px',
                color: '#94a3b8',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              <span>9:41</span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>signal_cellular_4_bar</span>
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>wifi</span>
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>battery_full</span>
              </div>
            </div>

            {/* App Header inside Phone */}
            <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#334155',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  R
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>Rahul Deshmukh</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>Verified Collector</div>
                </div>
              </div>

              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#1e293b',
                  color: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>notifications</span>
              </div>
            </div>

            {/* VARGANI SLIP CARD STACK (Replacing Credit Card!) */}
            <div style={{ padding: '12px 18px', position: 'relative', marginTop: 10 }}>
              {/* Stack Card 3 (Back layer peeking) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 36,
                  right: 36,
                  height: 150,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                  opacity: 0.5,
                  transform: 'translateY(0)',
                }}
              />

              {/* Stack Card 2 (Middle layer peeking) */}
              <div
                style={{
                  position: 'absolute',
                  top: 6,
                  left: 26,
                  right: 26,
                  height: 155,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
                  opacity: 0.8,
                  transform: 'translateY(0)',
                }}
              />

              {/* Front Main Vargani Slip Card (Matches the vibrant debit card look from image!) */}
              <div
                style={{
                  position: 'relative',
                  marginTop: 12,
                  background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%)',
                  borderRadius: 22,
                  padding: '20px 20px 18px',
                  color: '#ffffff',
                  boxShadow: '0 15px 30px rgba(249,115,22,0.4)',
                  textAlign: 'left',
                }}
              >
                {/* Top header on card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>temple_hindu</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>DIGITAL VARGANI</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 999 }}>VERIFIED SLIP</span>
                </div>

                {/* Serial Number (Matching card number layout in image!) */}
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    marginBottom: 24,
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  2781 8191 6671 3190
                </div>

                {/* Bottom details on card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 9, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Donor Name</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Suresh Patil</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 9, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</div>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>₹ 11,000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Pills under Slip Card (Matching screenshot [Add | Send | Pay]!) */}
            <div style={{ padding: '16px 20px', marginTop: 'auto', marginBottom: 20 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  background: '#1e293b',
                  padding: '8px 12px',
                  borderRadius: 999,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#e2e8f0' }}>
                  Add <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#334155', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>+</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#e2e8f0' }}>
                  Send <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#ec4899', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white' }}>💬</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#e2e8f0' }}>
                  Receipt <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#334155', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🧾</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Payment Logos */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              position: 'absolute',
              right: 0,
              top: '40%',
              transform: 'translateY(-50%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 26, color: '#0284c7' }}>bolt</span> Wise
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
              <span style={{ color: '#ea580c' }}>G</span> Pay
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
