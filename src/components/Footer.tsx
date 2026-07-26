import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1c1b1b] text-white pt-16 pb-12 relative overflow-hidden">
      {/* Rangoli Divider at top */}
      <div className="rangoli-divider mb-12 opacity-30" />

      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-3xl"
                style={{ color: 'var(--festival-orange)', fontVariationSettings: "'FILL' 1" }}
              >
                temple_hindu
              </span>
              <span className="font-headline-md text-white tracking-tight">
                Digital <span style={{ color: 'var(--marigold-dim)' }}>Mandal</span>
              </span>
            </div>

            <p className="font-body-md text-white/70 max-w-sm text-sm">
              Empowering local festival committees across India with digital transparency, WhatsApp receipts, and member dashboards.
            </p>

            <div className="pt-2 text-xs font-label-sm text-[var(--marigold-dim)] flex items-center gap-2">
              <span className="material-symbols-outlined text-base">favorite</span>
              <span>Proudly Built in Maharashtra for Mandals Nationwide</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-label-md text-white">Platform</h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li><a href="#features" className="hover:text-[var(--marigold-dim)] transition-colors">Vargani Features</a></li>
                <li><a href="#leaderboard" className="hover:text-[var(--marigold-dim)] transition-colors">Collector Leaderboard</a></li>
                <li><a href="#admin" className="hover:text-[var(--marigold-dim)] transition-colors">PRD Specs</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-label-md text-white">Festivals</h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li><a href="#" className="hover:text-[var(--marigold-dim)] transition-colors">Ganesh Utsav</a></li>
                <li><a href="#" className="hover:text-[var(--marigold-dim)] transition-colors">Dahi Handi</a></li>
                <li><a href="#" className="hover:text-[var(--marigold-dim)] transition-colors">Navratri Garba</a></li>
                <li><a href="#" className="hover:text-[var(--marigold-dim)] transition-colors">Shiv Jayanti</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-label-md text-white">Compliance</h4>
              <ul className="space-y-2 text-xs text-white/60">
                <li><a href="#" className="hover:text-[var(--marigold-dim)] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[var(--marigold-dim)] transition-colors">Audit Standards</a></li>
                <li><a href="#" className="hover:text-[var(--marigold-dim)] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Digital Mandal Platform. All Rights Reserved.</div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-[var(--festival-orange)] transition-all font-label-sm"
          >
            <span>Back to Top</span>
            <span className="material-symbols-outlined text-sm">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
