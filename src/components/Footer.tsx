import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--charcoal-900)] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6" aria-label="Digital Mandal Home">
              <div className="w-8 h-8 rounded-lg bg-[var(--festival-orange)] text-white flex items-center justify-center">
                 <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>temple_hindu</span>
              </div>
              <span className="font-headline-sm tracking-tight text-white">
                Digital<span className="text-[var(--festival-orange)]">Mandal</span>
              </span>
            </a>
            <p className="font-body-sm text-slate-400 max-w-xs">
              The modern OS for local festivals. Replace paper receipts, manage expenses, and build trust in your community.
            </p>
          </div>
          
          {/* Links Cols */}
          <div>
            <h4 className="font-label-sm text-white mb-4">Product</h4>
            <ul className="space-y-3 font-body-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Vargani Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Expense Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Real-time Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Role-based Access</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-label-sm text-white mb-4">Resources</h4>
            <ul className="space-y-3 font-body-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Setup Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mandal Best Practices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-label-sm text-white mb-4">Company</h4>
            <ul className="space-y-3 font-body-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500 flex items-center gap-2">
            Made with <span className="text-[var(--festival-orange)]">♥</span> in Maharashtra
          </div>
          
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Digital Mandal. All rights reserved.
          </div>
          
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-colors"
            aria-label="Scroll to top"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
