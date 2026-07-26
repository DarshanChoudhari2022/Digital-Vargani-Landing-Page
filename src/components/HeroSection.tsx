import React from 'react';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--festival-orange)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--festival-light)] text-[var(--festival-deep)] font-label-sm shadow-sm animate-fade-up">
              <span className="material-symbols-outlined text-base">celebration</span>
              <span>Trusted by 5,000+ Mandals Pan-India</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display-lg text-[var(--charcoal)] animate-fade-up delay-100">
              Digitize Your Mandal's <br className="hidden sm:inline" />
              <span style={{ color: 'var(--festival-orange)' }}>Devotion & Vargani</span>
            </h1>

            {/* Subhead */}
            <p className="font-body-lg text-[var(--on-surface-variant)] max-w-xl animate-fade-up delay-200">
              A transparent, mobile-first SaaS designed for Ganpati, Dahi Handi, &amp; Navratri mandals. Collect vargani, issue WhatsApp receipts, and reconcile expenses with 100% auditability.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 animate-fade-up delay-300">
              <button
                onClick={onOpenDemo}
                className="px-8 py-4 rounded-2xl font-headline-sm text-white shadow-lg hover-lift flex items-center gap-3 transition-all"
                style={{ backgroundColor: 'var(--festival-orange)' }}
              >
                <span>Try Live Interactive Demo</span>
                <span className="material-symbols-outlined">trending_up</span>
              </button>

              <a
                href="#features"
                className="px-8 py-4 rounded-2xl font-headline-sm text-[var(--secondary)] border-2 border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white transition-all flex items-center gap-2"
              >
                <span>Explore Features</span>
                <span className="material-symbols-outlined">arrow_downward</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-[var(--outline-variant)]/40 grid grid-cols-3 gap-4 max-w-lg animate-fade-up delay-400">
              <div>
                <div className="font-headline-sm text-[var(--festival-deep)]">100%</div>
                <div className="font-label-sm text-[var(--on-surface-variant)] lowercase">Instant Receipts</div>
              </div>
              <div>
                <div className="font-headline-sm text-[var(--festival-deep)]">&lt; 500ms</div>
                <div className="font-label-sm text-[var(--on-surface-variant)] lowercase">Response Time</div>
              </div>
              <div>
                <div className="font-headline-sm text-[var(--festival-deep)]">Zero</div>
                <div className="font-label-sm text-[var(--on-surface-variant)] lowercase">Paper Loss</div>
              </div>
            </div>

          </div>

          {/* Right Column: Mobile App UI & Vargani Slip Mockup */}
          <div className="lg:col-span-5 relative animate-scale-in delay-200">
            {/* Soft Ambient Shadow Container */}
            <div className="relative mx-auto max-w-sm rounded-[2.5rem] p-3 bg-white border-4 border-white shadow-2xl card-warm">
              
              {/* Phone Content Screen */}
              <div className="rounded-[2rem] overflow-hidden bg-[var(--surface-container-lowest)] p-5 border border-[var(--outline-variant)]/40 relative">
                
                {/* Phone Header */}
                <div className="flex justify-between items-center pb-4 border-b border-[var(--outline-variant)]/30">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[var(--festival-orange)]">temple_hindu</span>
                    <span className="font-label-md text-[var(--charcoal)]">Lalbaug Vargani</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-label-sm bg-green-100 text-green-800">
                    Live Session
                  </span>
                </div>

                {/* Vargani Receipt Mockup */}
                <div className="mt-4 bg-[var(--surface-container)] rounded-2xl p-4 space-y-3 border border-[var(--outline-variant)]/30 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-label-sm text-[var(--on-surface-variant)]">Vargani Receipt #9021</div>
                      <div className="font-headline-sm text-[var(--charcoal)]" style={{ fontSize: '20px' }}>Rajesh Kumar</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[var(--festival-light)] text-[var(--festival-deep)] flex items-center justify-center font-bold">
                      RK
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm">
                    <span className="font-label-md text-[var(--on-surface-variant)]">Contribution</span>
                    <span className="font-display-lg text-[var(--festival-orange)]" style={{ fontSize: '24px' }}>₹ 5,001</span>
                  </div>

                  <div className="space-y-1 text-xs text-[var(--on-surface-variant)] font-body-md">
                    <div className="flex justify-between"><span>Festival:</span> <span className="font-semibold text-[var(--charcoal)]">Ganesh Utsav 2026</span></div>
                    <div className="flex justify-between"><span>Payment Mode:</span> <span className="font-semibold text-[var(--charcoal)]">UPI Direct (GPay)</span></div>
                    <div className="flex justify-between"><span>Collector:</span> <span className="font-semibold text-[var(--charcoal)]">Amit Kulkarni</span></div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-[var(--outline-variant)]/30 text-green-700 font-label-md">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Verified &amp; WhatsApp Sent
                    </span>
                    <span>10:42 AM</span>
                  </div>
                </div>

                {/* Floating Action Badge */}
                <div className="mt-4 bg-[var(--charcoal)] text-white rounded-xl p-3 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[var(--marigold-dim)]">qr_code_scanner</span>
                    <span className="font-label-md text-xs">Scan &amp; Collect Vargani</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
