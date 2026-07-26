import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.5)', paddingTop: 64, paddingBottom: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container-main">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--saffron)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>temple_hindu</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>
                Digital<span style={{ color: 'var(--saffron)' }}>Mandal</span>
              </span>
            </a>
            <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 240 }}>
              The financial operating system for Maharashtra's festival committees.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Vargani Collection', 'Expense Management', 'Admin Dashboard', 'Donor Receipts'].map((link, i) => (
                <li key={i}><a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Setup Guide', 'Help Center', 'Best Practices'].map((link, i) => (
                <li key={i}><a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['About', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link, i) => (
                <li key={i}><a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            Made with <span style={{ color: 'var(--saffron)' }}>♥</span> in Maharashtra
          </div>
          <div style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} Digital Mandal. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            aria-label="Scroll to top"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_upward</span>
          </button>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};
