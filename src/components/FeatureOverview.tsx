import React from 'react';

export const FeatureOverview: React.FC = () => {
  const features = [
    {
      icon: 'person_search',
      title: 'Donor Profiles & History',
      desc: 'Instant donor lookup by mobile number or name. Access multi-year contribution history instantly.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: 'receipt_long',
      title: 'Configurable Receipts',
      desc: 'Dynamic slip numbering, local language support, and custom mandal logos printed on every receipt.',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      icon: 'sync_alt',
      title: 'Real-Time Sync',
      desc: 'Offline-first architecture. Collect vargani without internet; auto-syncs when back online.',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: 'account_balance',
      title: 'Expense Management',
      desc: 'Log daily expenses like mandap, DJ, and prasad. Instantly see remaining balance vs collected vargani.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: 'monitoring',
      title: 'Collection Analytics',
      desc: 'Compare daily trends with previous years. Know your peak collection days and top performing areas.',
      color: 'text-pink-600',
      bg: 'bg-pink-50'
    },
    {
      icon: 'security',
      title: 'Role-Based Access',
      desc: 'Granular permissions. Members can only collect, while admins can view total tally and approve expenses.',
      color: 'text-slate-600',
      bg: 'bg-slate-100'
    }
  ];

  return (
    <section id="features" className="py-24 bg-[var(--surface-50)] relative">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-md text-[var(--charcoal-900)] mb-4">
            Everything you need for a seamless festival
          </h2>
          <p className="font-body-lg text-[var(--charcoal-600)]">
            Digital Mandal replaces 10+ disjointed tools with one unified, mobile-first platform built specifically for local committees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-2xl saas-shadow saas-shadow-hover group"
            >
              <div className={`w-12 h-12 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <span className="material-symbols-outlined text-2xl">{feat.icon}</span>
              </div>
              <h3 className="font-headline-sm text-[var(--charcoal-900)] mb-3">
                {feat.title}
              </h3>
              <p className="font-body-md text-[var(--charcoal-600)] leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
