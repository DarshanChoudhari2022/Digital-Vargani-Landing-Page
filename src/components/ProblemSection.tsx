import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="section-padding" style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
      <div className="container-main">
        {/* Top Header Row matching second section of reference image */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
            alignItems: 'flex-start',
            marginBottom: 64,
          }}
          className="problem-grid"
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 999,
                background: '#ffedd5',
                color: '#ea580c',
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              ★ Feature
            </div>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 54px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                fontFamily: 'var(--font-body)',
              }}
            >
              A Platform Built <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Around Your Mandal
              </span>
            </h2>
          </div>

          <div style={{ maxWidth: 480 }}>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
              Paper receipt books weren't built for modern festival operations. Every season, committees juggle handwritten books, cash in multiple hands, and misplaced donor lists.
            </p>
            <button
              style={{
                padding: '10px 20px',
                borderRadius: 999,
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(15,23,42,0.15)',
              }}
            >
              Learn More
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#ea580c',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: 'white',
                }}
              >
                ➔
              </span>
            </button>
          </div>
        </div>

        {/* 3 Featured Feature Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
          className="cards-grid"
        >
          {/* Card 1 */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 24,
              padding: 32,
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#ffedd5',
                color: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>receipt_long</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              Instant WhatsApp Slips
            </h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
              Every contribution generates a digital slip with a unique serial number sent directly to the donor's phone.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 24,
              padding: 32,
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>monitoring</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              Real-Time Tally
            </h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
              The president and committee members see live collection totals, member-wise rankings, and area stats instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 24,
              padding: 32,
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#e0e7ff',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>account_balance</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              Auditable Expenses
            </h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
              Log mandap, prasad, and festival expenses with photos. Know your live balance — collected minus spent.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .problem-grid { grid-template-columns: 1fr 1fr; }
        .cards-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .problem-grid { grid-template-columns: 1fr !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
