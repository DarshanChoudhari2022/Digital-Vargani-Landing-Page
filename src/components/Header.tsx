import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Mandals', href: '#product' },
    { label: 'Why Digital', href: '#trust' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 4px rgba(26,26,46,0.04)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--saffron)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>temple_hindu</span>
          </div>
          <span className="t-h3" style={{ fontSize: 18, letterSpacing: '-0.02em' }}>
            Digital<span style={{ color: 'var(--saffron)' }}>Mandal</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="t-label"
              style={{ color: 'var(--body)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--body)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="desktop-nav">
          <a href="#" className="t-label" style={{ color: 'var(--body)', textDecoration: 'none' }}>Log in</a>
          <button onClick={onOpenDemo} className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>
            Book a Demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="anim-scale-in"
          style={{
            position: 'absolute', top: '100%', left: 0, width: '100%',
            background: 'var(--white)', borderBottom: '1px solid var(--border)',
            boxShadow: 'var(--shadow-elevated)',
          }}
        >
          <nav className="container-main" style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="t-label"
                style={{
                  color: 'var(--ink)', textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--border-light)',
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <button className="btn-secondary" style={{ width: '100%' }}>Log in</button>
              <button
                onClick={() => { setMobileOpen(false); onOpenDemo(); }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Book a Demo
              </button>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex; }
        .mobile-toggle { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
