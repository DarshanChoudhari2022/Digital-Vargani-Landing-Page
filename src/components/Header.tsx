import React, { useState } from 'react';
import { ArrowRight, Menu, X, Flame } from 'lucide-react';

interface HeaderProps {
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feature');

  const navItems = [
    { id: 'feature', label: 'Feature', href: '#feature' },
    { id: 'prd', label: 'PRD Modules', href: '#prd' },
    { id: 'roles', label: 'Role Access', href: '#roles' },
    { id: 'scale', label: 'Scale & Audit', href: '#scale' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 flex justify-center items-center pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between w-full max-w-5xl glass-nav rounded-full px-4 py-2.5 shadow-2xl transition-all duration-300">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 pl-2 group">
          <div className="w-9 h-9 rounded-full gradient-orange-bg flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              Digital<span className="text-[#FF6B00]">Mandal</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center bg-[#1A1A22] rounded-full p-1 border border-white/10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-[#2A2A36] text-white shadow-sm border border-white/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDemo}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white gradient-orange-bg shadow-md gradient-orange-glow hover:opacity-95 active:scale-95 transition-all duration-200"
          >
            <span>Try Generator</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-[#1A1A22] text-gray-300 hover:text-white border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 bg-[#121218] border border-white/10 rounded-2xl p-5 shadow-2xl md:hidden z-50 text-white animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium text-gray-200 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-3 rounded-xl gradient-orange-bg text-white font-bold text-sm text-center shadow-lg"
              >
                Launch Live Mandal Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
