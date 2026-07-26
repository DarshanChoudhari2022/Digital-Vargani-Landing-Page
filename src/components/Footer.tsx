import React from 'react';
import { Flame, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0E] text-white pt-16 pb-12 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full gradient-orange-bg flex items-center justify-center text-white shadow-md">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Digital<span className="text-[#FF6B00]">Mandal</span>
              </span>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Digitizing Indian festival mandal management, vargani collections, mobile receipts, member dashboards & financial reconciliation.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Product PRD</div>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#feature" className="hover:text-orange-400">Digital Vargani Slip</a></li>
                <li><a href="#prd" className="hover:text-orange-400">Custom Slip Templates</a></li>
                <li><a href="#roles" className="hover:text-orange-400">Member Dashboards</a></li>
                <li><a href="#prd" className="hover:text-orange-400">Expense Tracker</a></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Festivals Supported</div>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400">Ganpati Utsav</a></li>
                <li><a href="#" className="hover:text-orange-400">Navratri Mahotsav</a></li>
                <li><a href="#" className="hover:text-orange-400">Dahi Handi</a></li>
                <li><a href="#" className="hover:text-orange-400">Shiv Jayanti</a></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-3">Roles & Security</div>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#roles" className="hover:text-orange-400">Super Admin Portal</a></li>
                <li><a href="#roles" className="hover:text-orange-400">Khajindar Reconciler</a></li>
                <li><a href="#roles" className="hover:text-orange-400">Group Leader View</a></li>
                <li><a href="#scale" className="hover:text-orange-400">Audit Trail Logs</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Digital Mandal Platform. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-400">
              Made with <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> for Indian Mandals
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#1A1A24] text-gray-300 hover:text-white border border-white/10 hover:border-orange-500/50 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
