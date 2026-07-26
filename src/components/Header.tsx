import React, { useState, useEffect } from 'react';
import { EksutraLogo } from './EksutraLogo';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Features');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#product' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        padding: '16px 0',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <EksutraLogo size={36} />
        </a>

        {/* Floating Dark Pill Navbar */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: '#1e293b',
            padding: '4px 6px',
            borderRadius: 999,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveTab(link.label)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Primary Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
          <a
            href="#how-it-works"
            style={{
              padding: '10px 22px', borderRadius: 999,
              fontSize: 14, fontWeight: 700,
              background: '#0f172a', color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(15,23,42,0.15)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            Get Started
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              background: '#ea580c',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, color: 'white'
            }}>➔</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0f172a' }}
          aria-label="Toggle menu"
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
            background: '#ffffff', borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }}
        >
          <nav className="container-main" style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: '#0f172a', textDecoration: 'none',
                  padding: '14px 0', fontSize: 15, fontWeight: 600,
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <a
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ width: '100%', borderRadius: 999, background: '#0f172a', textDecoration: 'none', textAlign: 'center' }}
              >
                Get Started
              </a>
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
