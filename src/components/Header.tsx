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
    { label: 'Features', href: '#features' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Platform Specs', href: '#specs' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-[var(--surface-200)] shadow-sm py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container-max flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="Digital Mandal Home">
          <div className="w-8 h-8 rounded-lg bg-[var(--festival-orange)] text-white flex items-center justify-center">
             <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>temple_hindu</span>
          </div>
          <span className="font-headline-sm tracking-tight text-[var(--charcoal-900)]">
            Digital<span className="text-[var(--festival-orange)]">Mandal</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label-md text-[var(--charcoal-600)] hover:text-[var(--charcoal-900)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="font-label-md text-[var(--charcoal-600)] hover:text-[var(--charcoal-900)] transition-colors">
            Log in
          </button>
          <button
            onClick={onOpenDemo}
            className="px-5 py-2 rounded-lg font-label-md text-white bg-[var(--festival-orange)] hover:bg-[var(--festival-orange-hover)] transition-colors shadow-sm"
          >
            Interactive Demo
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center text-[var(--charcoal-900)]"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-[var(--surface-200)] shadow-lg md:hidden animate-scale-in">
          <nav className="flex flex-col p-4 container-max">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-label-md text-[var(--charcoal-700)] hover:text-[var(--festival-orange)] py-3 border-b border-[var(--surface-100)] last:border-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
               <button className="py-2.5 rounded-lg font-label-md text-[var(--charcoal-700)] bg-[var(--surface-50)] border border-[var(--surface-200)] text-center transition-colors">
                  Log in
                </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenDemo();
                }}
                className="py-2.5 rounded-lg font-label-md text-white bg-[var(--festival-orange)] text-center transition-colors shadow-sm"
              >
                Interactive Demo
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
