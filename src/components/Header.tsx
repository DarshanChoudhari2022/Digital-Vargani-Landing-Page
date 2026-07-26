import { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Collection', href: '#collection' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Admin', href: '#admin' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-500 ease-out backdrop-blur-lg ${
        scrolled
          ? 'top-0 w-full max-w-none rounded-none px-8 py-2 bg-[#313030]/95 shadow-xl'
          : 'top-5 w-[92%] max-w-3xl rounded-full px-8 py-3 bg-[#5d5f5f]/90 floating-pill'
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 group" aria-label="Digital Mandal Home">
        <span
          className="material-symbols-outlined text-2xl"
          style={{
            color: 'var(--festival-light)',
            fontVariationSettings: "'FILL' 1",
          }}
        >
          temple_hindu
        </span>
        <span
          className="font-headline-sm tracking-tight text-white"
          style={{ fontSize: '20px' }}
        >
          Digital <span style={{ color: 'var(--marigold-dim)' }}>Mandal</span>
        </span>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-label-md text-white/80 hover:text-[var(--marigold-dim)] transition-colors relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--marigold-dim)] rounded-full transition-all group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* CTA */}
      <button
        onClick={onOpenDemo}
        className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-label-md text-white transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: 'var(--festival-orange)' }}
      >
        <span className="material-symbols-outlined text-base">login</span>
        Login
      </button>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-white"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        <span className="material-symbols-outlined text-2xl">
          {mobileOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl bg-[#313030] p-6 shadow-2xl md:hidden animate-scale-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-label-md text-white/80 hover:text-[var(--marigold-dim)] py-2 border-b border-white/10 last:border-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenDemo();
              }}
              className="mt-2 py-3 rounded-xl font-label-md text-white text-center transition-all"
              style={{ backgroundColor: 'var(--festival-orange)' }}
            >
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
