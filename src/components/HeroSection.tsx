import React from 'react';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden mesh-bg">
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-50)] border border-[var(--surface-200)] text-[var(--charcoal-600)] font-label-sm mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-[var(--festival-orange)]"></span>
              Modernizing Local Mandals
            </div>
            
            <h1 className="font-display-lg text-[var(--charcoal-900)] mb-6 animate-fade-up delay-100">
              The OS for <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--festival-orange)] to-orange-400">
                Festival Management
              </span>
            </h1>
            
            <p className="font-body-lg text-[var(--charcoal-600)] mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-up delay-200">
              Replace messy paper receipt books with a powerful, mobile-first platform. Digital Mandal enables seamless vargani collection, real-time auditing, and transparent expenses for thousands of local committees.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up delay-300">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-label-md text-white bg-[var(--festival-orange)] hover:bg-[var(--festival-orange-hover)] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Try Interactive Demo</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-label-md text-[var(--charcoal-700)] bg-white border border-[var(--surface-200)] hover:bg-[var(--surface-50)] transition-colors shadow-sm flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  play_circle
                </span>
                <span>See How it Works</span>
              </button>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-[var(--charcoal-500)] font-label-sm animate-fade-up delay-300">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-green-500">check_circle</span>
                No Credit Card
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-green-500">check_circle</span>
                Setup in 2 mins
              </div>
            </div>
          </div>

          {/* Right Column: Premium App Mockup */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-full lg:ml-auto animate-fade-up delay-200">
            {/* Soft decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-100/50 to-transparent blur-3xl -z-10 rounded-full"></div>
            
            <div className="relative bg-white rounded-[2rem] border-[8px] border-slate-100 shadow-2xl overflow-hidden aspect-[9/18] sm:aspect-auto sm:h-[600px] w-full max-w-[320px] mx-auto transform rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* App Header */}
              <div className="bg-[var(--festival-orange)] text-white p-6 pt-10 rounded-b-3xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">Current Collection</div>
                    <div className="text-3xl font-bold font-display tracking-tight">₹ 1,45,000</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                </div>
                
                <button className="w-full bg-white text-[var(--festival-orange)] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  New Vargani Slip
                </button>
              </div>

              {/* App Body (Recent Slips) */}
              <div className="p-5">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-semibold text-slate-800">Recent Collections</h3>
                  <span className="text-xs font-medium text-[var(--festival-orange)]">View All</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Rahul Deshmukh", amount: "5,001", mode: "UPI", time: "2 mins ago" },
                    { name: "Anjali Traders", amount: "11,000", mode: "Cash", time: "45 mins ago" },
                    { name: "Suresh Patil", amount: "2,501", mode: "UPI", time: "2 hrs ago" }
                  ].map((slip, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm">
                          {slip.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{slip.name}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">{slip.mode === 'UPI' ? 'qr_code_scanner' : 'payments'}</span>
                            {slip.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        ₹ {slip.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 sm:left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-fade-up delay-300">
               <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
               </div>
               <div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Daily Growth</div>
                  <div className="text-lg font-bold text-slate-900">+ 12.4%</div>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
