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
          background: 'radial-gradient(ellipse at center, rgba(254, 215, 170, 0.4) 0%, rgba(253, 230, 138, 0.15) 50%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-main" style={{ position: 'relative', zIndex: 1, maxWidth: 1000 }}>
        {/* Top Badge Pill (Warm Orange) */}
        <div
          className="anim-fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 16px',
            borderRadius: 999,
            background: '#ffedd5',
            color: '#ea580c',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.02em',
            marginBottom: 20,
            border: '1px solid #fed7aa',
          }}
        >
          <span style={{ fontSize: 14 }}>🚩</span> Ultimate Festival OS
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
              background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #d97706 100%)',
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
          Experience seamless financial management. Replace paper receipt books with instant Eksutra Vargani slips and live committee tracking.
        </p>

        {/* Action CTAs (Replacing Store Buttons) */}
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
          <button
            onClick={onOpenDemo}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              borderRadius: 999,
              background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(234, 88, 12, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Try Interactive Demo
            <span style={{ fontSize: 16 }}>➔</span>
          </button>

          <a
            href="#product"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 999,
              background: '#f8fafc',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Explore Platform ↓
          </a>
        </div>

        {/* Main Interactive Phone Showcase with Festival Badges */}
        <div
          className="anim-fade-up anim-delay-4"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {/* Left Festival Logos / Badges */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'absolute',
              left: 10,
              top: '45%',
              transform: 'translateY(-50%)',
            }}
          >
            {/* Ganesh Utsav Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                borderRadius: 16,
                background: '#ffffff',
                border: '1px solid #fed7aa',
                boxShadow: '0 10px 25px rgba(249,115,22,0.12)',
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>temple_hindu</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Ganesh Utsav</div>
                <div style={{ fontSize: 10, color: '#ea580c', fontWeight: 600 }}>8,400+ Mandals</div>
              </div>
            </div>

            {/* Navratri Utsav Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                borderRadius: 16,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>celebration</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Navratri Utsav</div>
                <div style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>3,200+ Mandals</div>
              </div>
            </div>
          </div>

          {/* CENTERED PHONE FRAME */}
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
                    background: '#ea580c',
                    color: '#ffffff',
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

            {/* VARGANI SLIP CARD STACK */}
            <div style={{ padding: '12px 18px', position: 'relative', marginTop: 10 }}>
              {/* Stack Card 3 (Back layer) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 36,
                  right: 36,
                  height: 150,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
                  opacity: 0.5,
                }}
              />

              {/* Stack Card 2 (Middle layer) */}
              <div
                style={{
                  position: 'absolute',
                  top: 6,
                  left: 26,
                  right: 26,
                  height: 155,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                  opacity: 0.85,
                }}
              />

              {/* Front Main Vargani Slip Card (Pure Warm Orange Palette) */}
              <div
                style={{
                  position: 'relative',
                  marginTop: 12,
                  background: 'linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%)',
                  borderRadius: 22,
                  padding: '20px 20px 18px',
                  color: '#ffffff',
                  boxShadow: '0 15px 30px rgba(234, 88, 12, 0.4)',
                  textAlign: 'left',
                }}
              >
                {/* Top header on card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>temple_hindu</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>EKSUTRA VARGANI</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,0.25)', padding: '2px 8px', borderRadius: 999 }}>VERIFIED SLIP</span>
                </div>

                {/* Serial Number */}
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

            {/* Quick Action Pills under Slip Card */}
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
                  Send <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#ea580c', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white' }}>💬</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#e2e8f0' }}>
                  Receipt <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#334155', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>🧾</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Festival Logos / Badges */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'absolute',
              right: 10,
              top: '45%',
              transform: 'translateY(-50%)',
            }}
          >
            {/* Dahi Handi Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                borderRadius: 16,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>sports_kabaddi</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Dahi Handi</div>
                <div style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>1,500+ Pathaks</div>
              </div>
            </div>

            {/* Shiv Jayanti Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                borderRadius: 16,
                background: '#ffffff',
                border: '1px solid #fed7aa',
                boxShadow: '0 10px 25px rgba(249,115,22,0.12)',
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>fort</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Shiv Jayanti</div>
                <div style={{ fontSize: 10, color: '#ea580c', fontWeight: 600 }}>Community Welfare</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
