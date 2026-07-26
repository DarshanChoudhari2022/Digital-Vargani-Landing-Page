import React from 'react';

export const ScaleStatsSection: React.FC = () => {
  const stats = [
    {
      metric: '10,000+',
      label: 'Target Mandal Scale',
      desc: 'Architected to onboard thousands of local mandals across Maharashtra and beyond.',
      icon: 'groups'
    },
    {
      metric: '10M+',
      label: 'Receipts Generated',
      desc: 'Capable of handling millions of vargani slips without database degradation.',
      icon: 'receipt_long'
    },
    {
      metric: '< 50ms',
      label: 'Sync Latency',
      desc: 'Offline-first sync guarantees fast collection even in crowded festival zones.',
      icon: 'bolt'
    }
  ];

  return (
    <section className="py-24 bg-[var(--charcoal-900)] text-white relative overflow-hidden">
      {/* Abstract Tech Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--festival-orange)] rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] mix-blend-screen opacity-30"></div>
      </div>

      <div className="container-max relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-label-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Enterprise Grade
          </div>
          <h2 className="font-headline-md mb-6">
            Engineered for festival-scale traffic
          </h2>
          <p className="font-body-lg text-slate-300">
            During Ganesh Utsav, collection traffic spikes 100x. Digital Mandal is built on a scalable cloud architecture designed specifically for high-concurrency, offline-tolerant data entry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--festival-orange)] to-orange-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/20">
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <div className="font-display-lg text-white mb-2">{stat.metric}</div>
              <div className="font-headline-sm text-slate-200 mb-3">{stat.label}</div>
              <div className="font-body-md text-slate-400 leading-relaxed">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
