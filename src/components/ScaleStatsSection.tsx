import React from 'react';

export const ScaleStatsSection: React.FC = () => {
  const stats = [
    {
      metric: '10,000+',
      label: 'Target Mandal Scale',
      desc: 'Architected to onboard thousands of local mandals across Maharashtra and India.',
      icon: 'temple_hindu',
    },
    {
      metric: '50 - 300',
      label: 'Members Per Mandal',
      desc: 'Concurrent field volunteers issuing receipt slips simultaneously during peak festival windows.',
      icon: 'groups',
    },
    {
      metric: '< 500ms',
      label: 'API Form Response',
      desc: 'Ultra-low latency mobile slip generation even under 3G field network conditions.',
      icon: 'speed',
    },
    {
      metric: '100% Audit',
      label: 'Financial Transparency',
      desc: 'End-to-end receipt verification, bank matching, and super admin activity audit logging.',
      icon: 'verified_user',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1c1b1b] text-white relative overflow-hidden">
      {/* Background mandala glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--festival-orange)]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-max relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[var(--festival-deep)] text-[var(--festival-light)] font-label-sm inline-block">
            Engineered For Scale
          </span>
          <h2 className="font-headline-md text-white">Built For Peak Festival Traffic</h2>
          <p className="font-body-md text-white/70">
            Non-functional scale specifications designed for high concurrency during Ganesh Chaturthi and Navratri collection windows.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-[var(--festival-orange)]/50 transition-all hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--festival-orange)]/20 text-[var(--marigold-dim)] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </div>
              <div className="font-display-lg text-white mb-2" style={{ fontSize: '38px' }}>
                {s.metric}
              </div>
              <div className="font-label-md text-[var(--marigold-dim)] mb-2">{s.label}</div>
              <p className="font-body-md text-white/60 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs font-label-md text-white/70">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[var(--marigold-dim)]">security</span>
            <span>Multi-Tenant Database Isolation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[var(--marigold-dim)]">cloud_sync</span>
            <span>Offline-First PWA Sync Capability</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[var(--marigold-dim)]">mark_email_read</span>
            <span>Automated WhatsApp &amp; Webhook Pipeline</span>
          </div>
        </div>

      </div>
    </section>
  );
};
