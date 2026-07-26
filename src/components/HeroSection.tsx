import React, { useState } from 'react';
import { Sparkles, QrCode, TrendingUp, Users, FileText, Play } from 'lucide-react';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  const [liveAmount, setLiveAmount] = useState(1284500);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 hero-radial-glow overflow-hidden">
      {/* Background Soft Ambient Orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-amber-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Floating Top Badge Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-[#FF5722] text-xs font-bold mb-6 shadow-sm animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 fill-[#FF5722]" />
          <span>Ultimate Festival Vargani SaaS Platform</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-[1.08] mb-6">
          Digital Festival <br />
          <span className="gradient-orange-text">Vargani Simplified</span>
        </h1>

        {/* Subtitle Copy */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-8">
          Digitize thousands of local mandals. Replace handwritten paper slips with instant digital receipts, live member collection dashboards, and audit-ready expense tracking.
        </p>

        {/* App Store & Google Play Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <button 
            onClick={onOpenDemo}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#111116] hover:bg-[#1E1E26] text-white font-medium text-xs sm:text-sm shadow-xl border border-white/10 transition-all hover:scale-105 active:scale-95"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.93c.63-.77 1.06-1.83.94-2.93-.91.04-2.04.61-2.69 1.37-.58.67-1.09 1.76-.95 2.83 1.02.08 2.07-.5 2.7-1.27z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Download on the</div>
              <div className="font-bold text-sm leading-tight">App Store</div>
            </div>
          </button>

          <button 
            onClick={onOpenDemo}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#111116] hover:bg-[#1E1E26] text-white font-medium text-xs sm:text-sm shadow-xl border border-white/10 transition-all hover:scale-105 active:scale-95"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3.6 2.25C3.3 2.5 3 2.95 3 3.55v16.9c0 .6.3 1.05.6 1.3l9.8-9.8L3.6 2.25zm11.2 8.45l2.6 2.6c.4.4.4 1 0 1.4l-2.6 2.6 3.1-1.8c1.4-.8 1.4-2.2 0-3l-3.1-1.8zm-1.4-1.4L4.8 2.6l8.6 6.7zm0 5.4l-8.6 6.7 8.6-6.7z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Get it on</div>
              <div className="font-bold text-sm leading-tight">Google Play</div>
            </div>
          </button>

          <button 
            onClick={onOpenDemo}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-full gradient-orange-bg text-white font-bold text-sm shadow-lg gradient-orange-glow hover:opacity-95 transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Interactive Mandal Demo</span>
          </button>
        </div>

        {/* Central Visual Stage */}
        <div className="relative max-w-4xl mx-auto mt-6">
          <div className="relative mx-auto w-[290px] sm:w-[340px] md:w-[380px] bg-[#0E0E12] rounded-[48px] p-3 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] border-[4px] border-slate-800 ring-1 ring-white/10 z-20">
            <div className="w-28 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
              <div className="w-2 h-2 rounded-full bg-blue-900/60" />
            </div>

            <div className="bg-[#121218] rounded-[38px] p-4 text-white text-left overflow-hidden min-h-[480px] flex flex-col justify-between border border-white/5">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-xs">
                      LR
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-medium">Lalbaugcha Raja Mandal</div>
                      <div className="text-xs font-bold text-white">Ganpati Utsav 2026</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    LIVE
                  </span>
                </div>

                <div 
                  className="relative rounded-2xl p-4 bg-gradient-to-br from-[#FF5722] via-[#FF7043] to-[#E64A19] text-white shadow-lg overflow-hidden mb-4 group cursor-pointer"
                  onClick={() => setLiveAmount(prev => prev + 501)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between text-[11px] opacity-90 mb-6 font-medium">
                    <span className="bg-black/20 px-2.5 py-0.5 rounded-full border border-white/20">DIGITAL VARGANI SLIP</span>
                    <span className="font-mono text-[10px]">SLIP #LRM-8492</span>
                  </div>

                  <div className="text-[11px] text-white/80 uppercase tracking-wider font-semibold">Total Mandal Collection</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight mb-4">
                    ₹{liveAmount.toLocaleString('en-IN')}
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-3 border-t border-white/20">
                    <div>
                      <div className="text-white/70 text-[9px] uppercase">Collector</div>
                      <div className="font-bold">Rahul Sharma (Grp A)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/70 text-[9px] uppercase">Payment Mode</div>
                      <div className="font-bold text-amber-200">UPI Instant</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-[#1A1A24] p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-400">Slips Issued</div>
                    <div className="text-base font-bold text-white">1,480 Slips</div>
                  </div>
                  <div className="bg-[#1A1A24] p-3 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-400">Collectors Active</div>
                    <div className="text-base font-bold text-orange-400">32 Members</div>
                  </div>
                </div>

                <div className="bg-[#1A1A24] rounded-xl p-3 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold">Generate New Slip</div>
                  </div>
                  <span className="text-[10px] bg-orange-500 text-white px-2 py-1 rounded-md font-bold">+ New Slip</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-around text-[10px] text-gray-400">
                <span className="text-orange-400 font-bold flex flex-col items-center gap-0.5">
                  <TrendingUp className="w-4 h-4" /> Home
                </span>
                <span className="flex flex-col items-center gap-0.5">
                  <FileText className="w-4 h-4" /> Slips
                </span>
                <span className="flex flex-col items-center gap-0.5">
                  <Users className="w-4 h-4" /> Members
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute -left-16 top-12 w-64 glass-card-light p-3.5 rounded-2xl shadow-2xl border border-orange-200 z-30 animate-float">
            <img 
              src="/digital_vargani_card.png" 
              alt="Digital Vargani Card Pass" 
              className="w-full h-36 object-cover rounded-xl shadow-md mb-2" 
            />
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Ganpati Vargani Pass</span>
              <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-bold">QR Verified</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Direct donor print-ready receipt slip</div>
          </div>

          <div className="hidden lg:block absolute -right-16 top-24 w-64 glass-card-light p-3.5 rounded-2xl shadow-2xl border border-orange-200 z-30 animate-float-reverse">
            <img 
              src="/mobile_vargani_app_ui.png" 
              alt="Mobile Vargani Collector UI" 
              className="w-full h-36 object-cover rounded-xl shadow-md mb-2" 
            />
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Collector Mobile App</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">500ms Sync</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Fast field entry with zero lost records</div>
          </div>
        </div>

        {/* Brand Logos Ticker */}
        <div className="mt-20 pt-8 border-t border-slate-200/80">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
            Supported Payment Modes & Multi-Tenant Infrastructure
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-slate-800">
              <span className="w-3 h-3 rounded-full bg-orange-500" /> UPI Instant
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-slate-800">
              G Pay
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-slate-800">
              PhonePe
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-slate-800">
              Paytm
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-slate-800">
              BHIM
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-slate-800">
              Cash Audit
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
